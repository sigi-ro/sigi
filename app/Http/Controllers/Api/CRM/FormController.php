<?php

namespace App\Http\Controllers\Api\CRM;

use App\Http\Controllers\Controller;
use App\Models\CRM\Form;
use Illuminate\Http\JsonResponse;

class FormController extends Controller
{
    /**
     * Get a specific form by slug with its fields
     */
    public function show(string $slug): JsonResponse
    {
        $form = Form::where('slug', $slug)
            ->with('formFields')
            ->firstOrFail();
        
        return response()->json([
            'data' => [
                'id' => $form->id,
                'name' => $form->name,
                'slug' => $form->slug,
                'success_message' => $form->success_message,
                'redirect_url' => $form->redirect_url,
                'fields' => $form->formFields->map(function ($field) {
                    return [
                        'id' => $field->id,
                        'name' => $field->name,
                        'slug' => $field->slug,
                        'type' => $field->type,
                        'is_required' => $field->is_required,
                        'order' => $field->order,
                        'settings' => $field->settings,
                    ];
                })->sortBy('order')->values(),
            ]
        ]);
    }
}
