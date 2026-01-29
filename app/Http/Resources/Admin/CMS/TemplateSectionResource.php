<?php

namespace App\Http\Resources\Admin\CMS;

use Illuminate\Http\Resources\Json\JsonResource;

class TemplateSectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'template_id' => $this->template_id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'order' => $this->order,
            'is_collapsible' => $this->is_collapsible,
            'is_collapsed_by_default' => $this->is_collapsed_by_default,
            'template_fields' => TemplateFieldResource::collection($this->whenLoaded('templateFields')),
        ];
    }
}

