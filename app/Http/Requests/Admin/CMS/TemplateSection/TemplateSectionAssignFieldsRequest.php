<?php

namespace App\Http\Requests\Admin\CMS\TemplateSection;

use App\Http\Requests\BaseRequest;
use Illuminate\Validation\Rule;

class TemplateSectionAssignFieldsRequest extends BaseRequest
{
    public function rules() : array
    {
        return [
            'field_ids' => 'required|array',
            'field_ids.*' => [
                'required',
                'integer',
                Rule::exists('cms_template_fields', 'id')->where(function ($query) {
                    $template = $this->route('template');
                    return $query->where('template_id', $template->id);
                })
            ],
        ];
    }
}

