<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class ThemeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'colors' => $this->colors ?? [],
            'logo_url' => $this->logo_url,
            'favicon_url' => $this->favicon_url,
            'site_name' => $this->site_name,
        ];
    }
}

