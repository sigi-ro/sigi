<?php

use App\Http\Controllers\AdminApi\CMS\MenuController;
use App\Http\Controllers\AdminApi\CMS\PreviewTokenController;
use App\Http\Controllers\AdminApi\CMS\TemplateController;
use App\Http\Controllers\AdminApi\CMS\TemplateSectionController;
use App\Http\Controllers\AdminApi\CMS\UrlAvailableController;
use App\Http\Controllers\AdminApi\CRM\FormController;
use App\Http\Controllers\AdminApi\CRM\OrganisationUnitController;
use App\Http\Controllers\AdminApi\EDU\CourseController;
use App\Http\Controllers\AdminApi\EDU\LectureFileController;
use App\Http\Controllers\AdminApi\FileManager\FileManagerDirectoryController;
use App\Http\Controllers\AdminApi\FileManager\FileManagerFileController;
use App\Http\Controllers\AdminApi\FileManager\StorageQuotaController;
use App\Http\Controllers\AdminApi\Settings\MailerTestController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin API Routes
|--------------------------------------------------------------------------
*/

Route::group([
    'as' => 'cms.',
    'prefix' => 'cms',
    'middleware' => ['tenant.module:cms']
], function() {
    Route::get('/menu', [MenuController::class, 'index'])->name('menus.index');

    Route::get('/template}', [TemplateController::class, 'index'])->name('templates.index');
    Route::get('/template/{template}', [TemplateController::class, 'show'])->name('templates.show');

    // Template Sections API
    Route::get('/template/{template}/sections', [TemplateSectionController::class, 'index'])->name('templates.sections.index');
    Route::post('/template/{template}/sections', [TemplateSectionController::class, 'store'])->name('templates.sections.store');
    Route::get('/template/{template}/sections/{section}', [TemplateSectionController::class, 'show'])->name('templates.sections.show');
    Route::put('/template/{template}/sections/{section}', [TemplateSectionController::class, 'update'])->name('templates.sections.update');
    Route::delete('/template/{template}/sections/{section}', [TemplateSectionController::class, 'destroy'])->name('templates.sections.destroy');
    Route::post('/template/{template}/sections/reorder', [TemplateSectionController::class, 'reorder'])->name('templates.sections.reorder');
    Route::post('/template/{template}/sections/{section}/assign-fields', [TemplateSectionController::class, 'assignFields'])->name('templates.sections.assign-fields');

    Route::get('/url/available', [UrlAvailableController::class, 'handle'])->name('urls.available');

    // Page Preview Token
    Route::get('/pages/{page}/preview-token', [PreviewTokenController::class, 'show'])->name('pages.preview-token.show');
    Route::post('/pages/{page}/preview-token', [PreviewTokenController::class, 'store'])->name('pages.preview-token.store');
    Route::delete('/pages/{page}/preview-token', [PreviewTokenController::class, 'destroy'])->name('pages.preview-token.destroy');
});

Route::group([
    'as' => 'crm.',
    'prefix' => 'crm',
    'middleware' => ['tenant.module:crm']
], function() {
    Route::get('/organisation-units', [OrganisationUnitController::class, 'index'])->name('organisation-units.index');

    Route::get('/form', [FormController::class, 'index'])->name('forms.index');
});

Route::group([
    'as' => 'edu.',
    'prefix' => 'edu',
    'middleware' => ['tenant.module:edu']
], function() {
    Route::get('/course', [CourseController::class, 'index'])->name('courses.index');
    Route::get('/lecture/{lecture_id}/files', [LectureFileController::class, 'show'])->name('lectures.files.show');
});

Route::group([
    'as' => 'file-manager.',
    'prefix' => 'file-manager'
], function() {
    Route::get('/directories', [FileManagerDirectoryController::class, 'index'])->name('directories.index');
    Route::post('/directories', [FileManagerDirectoryController::class, 'store'])->name('directories.store');

    Route::get('/files', [FileManagerFileController::class, 'index'])->name('files.index');
    Route::get('/files/{file}', [FileManagerFileController::class, 'show'])->name('files.show');
    Route::post('/files', [FileManagerFileController::class, 'store'])->name('files.store');

    // Storage quota endpoints
    Route::get('/storage-quota', [StorageQuotaController::class, 'index'])->name('storage-quota.index');
    Route::post('/storage-quota/recalculate', [StorageQuotaController::class, 'recalculate'])->name('storage-quota.recalculate');
});

Route::group([
    'as' => 'settings.',
    'prefix' => 'settings'
], function () {
    Route::post('mailer-test', MailerTestController::class)->name('mailer-test');
});
