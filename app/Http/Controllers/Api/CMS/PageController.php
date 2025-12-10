<?php

namespace App\Http\Controllers\Api\CMS;

use App\Actions\CMS\Page\PageQueryAction;
use App\Events\CMS\PageViewed;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CMS\PageShowRequest;
use App\Http\Resources\Web\CMS\FullPageResource;
use App\Models\CMS\Page;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PageController extends Controller
{
    /**
     * Get all published pages - for static site generation
     */
    public function index(): AnonymousResourceCollection
    {
        $pages = Page::with([
            'content',
            'content.templateField',
            'layout',
            'layout.content',
            'layout.content.templateField',
            'metadata',
            'template',
            'template.templateFields',
            'url',
        ])
        ->whereHas('url', function($query) {
            $query->where('is_enabled', true)
                  ->whereNotNull('published_at')
                  ->where('published_at', '<=', now());
        })
        ->get();

        return FullPageResource::collection($pages);
    }

    /**
     * Get a specific page by slug
     */
    public function showBySlug(string $slug): FullPageResource
    {
        $page = Page::with([
            'content',
            'content.templateField',
            'layout',
            'layout.content',
            'layout.content.templateField',
            'metadata',
            'template',
            'template.templateFields',
            'url',
        ])
        ->whereHas('url', function($query) use ($slug) {
            $query->where('is_enabled', true)
                  ->whereNotNull('published_at')
                  ->where('published_at', '<=', now())
                  ->where(function($q) use ($slug) {
                      $q->where('url_main', $slug)
                        ->orWhere('url_full', '/' . $slug)
                        ->orWhere('url_full', $slug);
                  });
        })
        ->firstOrFail();

        PageViewed::dispatch($page);

        return FullPageResource::make($page);
    }

    public function show(PageShowRequest $request)
    {
        $search_options = $request->validated();
        $search_options['with'] = [
            'content',
            'layout',
            'layout.content',
            'layout.content.templateField',
            'metadata',
            'template',
            'url',
        ];

        $page = app(PageQueryAction::class)
            ->handle($search_options)
            ->firstOrFail();

        PageViewed::dispatch($page);

        return new JsonResponse(FullPageResource::make($page));
    }
}
