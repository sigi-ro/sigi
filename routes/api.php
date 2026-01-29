<?php

use App\Http\Controllers\Api\CMS\MenuController;
use App\Http\Controllers\Api\CMS\PageController;
use App\Http\Controllers\Api\CMS\PreviewController;
use App\Http\Controllers\Api\CRM\FormController;
use App\Http\Controllers\Api\CRM\FormSubmissionController;
use App\Http\Controllers\Api\EDU\CourseCheckoutController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
| Rate Limiting:
| - api-public: 120/min (static site generation)
| - form-submission: 5/min, 20/hour (spam prevention)
| - checkout: 10/min, 30/hour (abuse prevention)
|
*/

/*
|--------------------------------------------------------------------------
| CRM Forms API
|--------------------------------------------------------------------------
*/
Route::get('/forms/{slug}', [FormController::class, 'show'])
    ->middleware('throttle:api-public')
    ->name('forms.show');

// Form submission has strict rate limiting to prevent spam
Route::post('/form-submission/{slug}', [FormSubmissionController::class, 'store'])
    ->middleware('throttle:form-submission')
    ->name('form-submission.store');

/*
|--------------------------------------------------------------------------
| CMS Pages API - for static site generation
|--------------------------------------------------------------------------
*/
Route::middleware('throttle:api-public')->group(function () {
    Route::get('/pages', [PageController::class, 'index'])->name('pages.index');
    Route::get('/pages/{slug}', [PageController::class, 'showBySlug'])->name('pages.show');
    Route::get('/page', [PageController::class, 'show'])->name('page'); // Legacy endpoint
});

/*
|--------------------------------------------------------------------------
| CMS Menus API
|--------------------------------------------------------------------------
*/
Route::get('/menus/{slug}', [MenuController::class, 'show'])
    ->middleware('throttle:api-public')
    ->name('menus.show');

/*
|--------------------------------------------------------------------------
| CMS Preview API - Public preview access via token
|--------------------------------------------------------------------------
*/
Route::get('/preview/{token}', [PreviewController::class, 'show'])
    ->middleware('throttle:api-public')
    ->name('preview.show');

/*
|--------------------------------------------------------------------------
| Theme API
|--------------------------------------------------------------------------
*/
Route::get('/theme', [\App\Http\Controllers\Api\ThemeController::class, 'show'])
    ->middleware('throttle:api-public')
    ->name('theme.show');

/*
|--------------------------------------------------------------------------
| EDU Module Routes
|--------------------------------------------------------------------------
*/
Route::group([
    'as' => 'edu.',
    'prefix' => 'edu',
    'middleware' => ['tenant.module:edu']
], function () {
    Route::group([
        'as' => 'courses.',
        'prefix' => 'courses',
    ], function () {
        // Checkout has stricter rate limiting to prevent abuse
        Route::post('/{course}/checkout', CourseCheckoutController::class)
            ->middleware('throttle:checkout')
            ->name('checkout');
    });
});
