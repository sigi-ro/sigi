<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\ThemeResource;
use App\Models\Settings\ThemeSettings;
use Illuminate\Http\Resources\Json\JsonResource;

class ThemeController extends Controller
{
    public function show(): JsonResource
    {
        $theme = app(ThemeSettings::class);
        
        ThemeResource::withoutWrapping();
        return ThemeResource::make($theme);
    }
}

