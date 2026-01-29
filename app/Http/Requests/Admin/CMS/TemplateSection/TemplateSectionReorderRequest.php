<?php

namespace App\Http\Requests\Admin\CMS\TemplateSection;

use App\Http\Requests\BaseRequest;

class TemplateSectionReorderRequest extends BaseRequest
{
    public function rules() : array
    {
        return [
            'sections' => 'required|array',
            'sections.*.id' => 'required|integer|exists:cms_template_sections,id',
            'sections.*.order' => 'required|integer|min:0',
        ];
    }
}

