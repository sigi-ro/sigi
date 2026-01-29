<?php

namespace App\Http\Controllers\AdminApi\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CMS\TemplateSection\TemplateSectionAssignFieldsRequest;
use App\Http\Requests\Admin\CMS\TemplateSection\TemplateSectionReorderRequest;
use App\Http\Requests\Admin\CMS\TemplateSection\TemplateSectionStoreRequest;
use App\Http\Requests\Admin\CMS\TemplateSection\TemplateSectionUpdateRequest;
use App\Http\Resources\Admin\CMS\TemplateSectionResource;
use App\Interfaces\PermissionInterface;
use App\Models\CMS\Template;
use App\Models\CMS\TemplateSection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;

class TemplateSectionController extends Controller
{
    public function __construct()
    {
        // Use CMS permissions since section management is part of editing pages
        $this->middleware(
            PermissionInterface::getMiddlewareString(PermissionInterface::VIEW_CMS)
        )->only(['index', 'show']);
        
        $this->middleware(
            PermissionInterface::getMiddlewareString(PermissionInterface::EDIT_CMS)
        )->only(['store', 'update', 'reorder', 'assignFields']);
        
        $this->middleware(
            PermissionInterface::getMiddlewareString(PermissionInterface::DELETE_CMS)
        )->only(['destroy']);
    }

    /**
     * List all sections for a template.
     */
    public function index(Template $template): AnonymousResourceCollection
    {
        $sections = $template->sections()
            ->with('templateFields')
            ->orderBy('order', 'asc')
            ->get();

        TemplateSectionResource::withoutWrapping();
        return TemplateSectionResource::collection($sections);
    }

    /**
     * Show a specific section.
     */
    public function show(Template $template, TemplateSection $section): TemplateSectionResource
    {
        // Ensure section belongs to the template
        if ($section->template_id !== $template->id) {
            abort(404, 'Section not found for this template');
        }

        if (!$section->relationLoaded('templateFields')) {
            $section->load('templateFields');
        }

        TemplateSectionResource::withoutWrapping();
        return TemplateSectionResource::make($section);
    }

    /**
     * Create a new section.
     */
    public function store(TemplateSectionStoreRequest $request, Template $template): TemplateSectionResource
    {
        // Ensure template_id in request matches route template
        $validated = $request->validated();
        $validated['template_id'] = $template->id;
        
        $section = TemplateSection::create($validated);

        TemplateSectionResource::withoutWrapping();
        return TemplateSectionResource::make($section);
    }

    /**
     * Update a section.
     */
    public function update(TemplateSectionUpdateRequest $request, Template $template, TemplateSection $section): TemplateSectionResource
    {
        // Ensure section belongs to the template
        if ($section->template_id !== $template->id) {
            abort(404, 'Section not found for this template');
        }

        $section->update($request->validated());

        TemplateSectionResource::withoutWrapping();
        return TemplateSectionResource::make($section->fresh());
    }

    /**
     * Delete a section.
     */
    public function destroy(Template $template, TemplateSection $section): JsonResponse
    {
        // Ensure section belongs to the template
        if ($section->template_id !== $template->id) {
            abort(404, 'Section not found for this template');
        }

        DB::transaction(function () use ($section) {
            // Set section_id to null for all fields in this section
            $section->templateFields()->update(['section_id' => null]);
            
            // Delete the section
            $section->delete();
        });

        return response()->json(['message' => 'Section deleted successfully'], 200);
    }

    /**
     * Reorder sections for a template.
     */
    public function reorder(TemplateSectionReorderRequest $request, Template $template): JsonResponse
    {
        DB::transaction(function () use ($request) {
            foreach ($request->validated()['sections'] as $sectionData) {
                TemplateSection::where('id', $sectionData['id'])
                    ->where('template_id', $template->id)
                    ->update(['order' => $sectionData['order']]);
            }
        });

        return response()->json(['message' => 'Sections reordered successfully'], 200);
    }

    /**
     * Assign fields to a section.
     */
    public function assignFields(TemplateSectionAssignFieldsRequest $request, Template $template, TemplateSection $section): JsonResponse
    {
        // Ensure section belongs to the template
        if ($section->template_id !== $template->id) {
            abort(404, 'Section not found for this template');
        }

        DB::transaction(function () use ($request, $section, $template) {
            // Update all specified fields to belong to this section
            $fieldIds = $request->validated()['field_ids'];
            
            // Verify all fields belong to the template
            $validFieldIds = \App\Models\CMS\TemplateField::where('template_id', $template->id)
                ->whereIn('id', $fieldIds)
                ->pluck('id')
                ->toArray();
            
            if (count($validFieldIds) !== count($fieldIds)) {
                abort(422, 'Some fields do not belong to this template');
            }
            
            \App\Models\CMS\TemplateField::whereIn('id', $fieldIds)
                ->update(['section_id' => $section->id]);
        });

        return response()->json(['message' => 'Fields assigned to section successfully'], 200);
    }
}

