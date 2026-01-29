<?php

namespace App\Http\Requests\Admin\CMS\TemplateSection;

use App\Http\Requests\BaseRequest;
use App\Interfaces\CMS\TemplateFieldInterface;
use Illuminate\Validation\Rule;

class TemplateSectionStoreRequest extends BaseRequest
{
    public function rules() : array
    {
        $template = $this->route('template');
        $templateId = $template ? $template->id : $this->request->get('template_id');

        return [
            'name' => [
                'required',
                'string',
                'max:' . TemplateFieldInterface::FIELD_NAME_MAX_LENGTH,
            ],
            'slug' => [
                'required',
                'string',
                'max:' . TemplateFieldInterface::FIELD_SLUG_MAX_LENGTH,
                Rule::unique('cms_template_sections')->where(function ($query) use ($templateId) {
                    return $query->where('template_id', $templateId);
                })
            ],
            'description' => 'nullable|string',
            'order' => 'required|integer|min:0',
            'is_collapsible' => 'sometimes|boolean',
            'is_collapsed_by_default' => 'sometimes|boolean',
        ];
    }
}
