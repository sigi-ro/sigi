<?php

namespace App\Http\Controllers\Api\CMS;

use App\Http\Controllers\Controller;
use App\Models\CMS\Menu;
use Illuminate\Http\JsonResponse;

class MenuController extends Controller
{
    /**
     * Get a specific menu by slug
     */
    public function show(string $slug): JsonResponse
    {
        $menu = Menu::where('slug', $slug)->firstOrFail();
        
        return response()->json([
            'data' => [
                'id' => $menu->id,
                'name' => $menu->name,
                'slug' => $menu->slug,
                'items' => $menu->menu_items ?? [],
            ]
        ]);
    }
}
