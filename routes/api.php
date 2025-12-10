<?php

use App\Http\Controllers\Api\CMS\MenuController;
use App\Http\Controllers\Api\CMS\PageController;
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
*/

    // CRM Forms API
    Route::get('/forms/{slug}', [FormController::class, 'show'])->name('forms.show');
    Route::post('/form-submission/{slug}', [FormSubmissionController::class, 'store'])->name('form-submission.store');// CMS Pages API - for static site generation
Route::get('/pages', [PageController::class, 'index'])->name('pages.index');
Route::get('/pages/{slug}', [PageController::class, 'showBySlug'])->name('pages.show');
Route::get('/page', [PageController::class, 'show'])->name('page'); // Legacy endpoint

// CMS Menus API
Route::get('/menus/{slug}', [MenuController::class, 'show'])->name('menus.show');

Route::group([
    'as' => 'edu.',
    'prefix' => 'edu',
    'middleware' => ['tenant.module:edu']
], function() {
    Route::group([
        'as' => 'courses.',
        'prefix' => 'courses',
    ], function() {
        Route::post('/{course}/checkout', CourseCheckoutController::class)->name('checkout');
    });
});
