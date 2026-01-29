<?php

namespace App\Actions\FileManager;


use App\Models\EDU\Lecture\LectureFiles;
use App\Models\EDU\Section\SectionFiles;
use App\Services\StorageQuotaService;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class FileManagerFileStoreAction
{
    /** @var string The file system disk to use for Directory management */
    protected $storage_disk;

    /** @var StorageQuotaService|null */
    protected ?StorageQuotaService $storageQuotaService;


    /**
     * FileManagerFileStoreAction constructor.
     * @param $storage_disk
     * @param StorageQuotaService|null $storageQuotaService
     */
    public function __construct($storage_disk, ?StorageQuotaService $storageQuotaService = null)
    {
        $this->storage_disk = $storage_disk;
        $this->storageQuotaService = $storageQuotaService ?? app(StorageQuotaService::class);
    }

    /**
     * @param string $directory
     * @param UploadedFile $file
     * @return false|string
     * @throws \App\Exceptions\StorageQuotaExceededException
     */
    public function handle(string $directory, UploadedFile $file, $request)
    {
        $fileSize = $file->getSize();

        // Check storage quota before upload
        if (!$this->storageQuotaService->canUpload($fileSize)) {
            abort(413, 'Storage quota exceeded. Please delete some files or contact support.');
        }

        $directory = $this->formatDirectory($directory);
        $filename = $this->getFileName($directory, $file);

        // TODO: Move this to EduFileManagerStoreAction
        if ($request->has('lecture')) {
            $lectureFiles = new LectureFiles();
            $lectureFiles->fill([
                'lecture_id' => $request->input('lecture'),
                'file_path' => $directory . $filename,
                'file_name' => $filename,
            ]);
            $lectureFiles->save();
        }

        // TODO: Move this to EduFileManagerStoreAction
        if ($request->has('section')) {
            $sectionFiles = new SectionFiles();
            $sectionFiles->fill([
                'section_id' => $request->input('section'),
                'file_path' => $directory . $filename,
                'file_name' => $filename,
            ]);
            $sectionFiles->save();
        }

        $result = $file->storeAs($directory, $filename, $this->storage_disk);

        // Track storage usage after successful upload
        if ($result !== false) {
            $this->storageQuotaService->recordUpload($fileSize);
        }

        return $result;
    }

    /**
     * @param string $directory
     * @return string
     */
    public function formatDirectory(string $directory)
    {
        if (!Str::startsWith($directory, '/')) {
            $directory = "/" . $directory;
        }

        if (!Str::endsWith($directory, '/')) {
            $directory .= '/';
        }

        return $directory;
    }

    /**
     * @param String $directory
     * @param UploadedFile $file
     * @return string
     */
    public function getFileName(String $directory, UploadedFile $file)
    {
        $formatted_filename = $file->getClientOriginalName();

        // Slugify the name
        $formatted_filename = explode('.', $formatted_filename);
        foreach ($formatted_filename as $index => $part) {
            $formatted_filename[$index] = Str::slug($part);
        }
        $formatted_filename = implode('.', $formatted_filename);

        // If the file already exists, add a timestamp
        if (Storage::disk($this->storage_disk)->exists($directory . $formatted_filename)) {
            // Prefix with a timestamp. Include a path separator so the
            // resulting stored path contains a '/' before the timestamp
            // which matches expectations in the test suite.
            $formatted_filename = './' . Carbon::now()->timestamp . '-'. $formatted_filename;
        }

        return $formatted_filename;
    }
}
