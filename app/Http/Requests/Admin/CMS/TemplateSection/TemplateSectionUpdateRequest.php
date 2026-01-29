<?php

namespace App\Http\Requests\Admin\CMS\TemplateSection;

use App\Http\Requests\BaseRequest;
use App\Interfaces\CMS\TemplateFieldInterface;
use Illuminate\Validation\Rule;

class TemplateSectionUpdateRequest extends BaseRequest
{
    public function rules() : array
    {
        $section = $this->route('section');
        $template = $this->route('template');
        $sectionId = $section ? $section->id : null;
        $templateId = $section ? $section->template_id : ($template ? $template->id : $this->request->get('template_id'));

        return [
            'name' => [
                'sometimes',
                'required',
                'string',
                'max:' . TemplateFieldInterface::FIELD_NAME_MAX_LENGTH,
            ],
            'slug' => [
                'sometimes',
                'required',
                'string',
                'max:' . TemplateFieldInterface::FIELD_SLUG_MAX_LENGTH,
                Rule::unique('cms_template_sections')
                    ->where(function ($query) use ($templateId) {
                        return $query->where('template_id', $templateId);
                    })
                    ->ignore($sectionId)
            ],
            'description' => 'nullable|string',
            'order' => 'sometimes|required|integer|min:0',
            'is_collapsible' => 'sometimes|boolean',
            'is_collapsed_by_default' => 'sometimes|boolean',
        ];
    }
}

