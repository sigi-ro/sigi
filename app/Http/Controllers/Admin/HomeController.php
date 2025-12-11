<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\AdminController;
use App\Models\CMS\Page;
use App\Models\CRM\Contact;
use App\Models\CRM\FormSubmission;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use League\Flysystem\StorageAttributes;

class HomeController extends AdminController
{
    /**
     * Show the admin index.
     *
     * @return Response
     */
    public function index()
    {
        $this->shareMeta();
        
        // Get stats
        $stats = [
            'form_submissions' => FormSubmission::count(),
            'contacts' => Contact::count(),
            'pages' => Page::count(),
            'files' => $this->getFileCount(),
        ];
        
        return Inertia::render('admin/home/Index', [
            'stats' => $stats,
        ]);
    }
    
    /**
     * Get the count of files in the file manager storage
     *
     * @return int
     */
    protected function getFileCount(): int
    {
        try {
            $storage_disk = 'file_manager';
            $files = collect(Storage::disk($storage_disk)
                ->listContents('/', true)
                ->filter(fn (StorageAttributes $attributes) => $attributes->isFile()));
            
            return $files->count();
        } catch (\Exception $e) {
            return 0;
        }
    }
}
