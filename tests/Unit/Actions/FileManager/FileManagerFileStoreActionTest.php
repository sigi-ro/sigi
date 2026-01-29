<?php

namespace Tests\Unit\Actions\FileManager;

use App\Actions\FileManager\FileManagerFileStoreAction;
use App\Services\StorageQuotaService;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Mockery;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * Unit tests for FileManagerFileStoreAction with mocked dependencies
 * @group unit
 * @group filemanager
 * @group storage
 */
class FileManagerFileStoreActionTest extends TestCase
{
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    /** @test */
    public function it_checks_quota_before_upload()
    {
        // Arrange
        $mockFile = Mockery::mock(UploadedFile::class);
        $mockFile->shouldReceive('getSize')->andReturn(1048576); // 1 MB
        $mockFile->shouldReceive('getClientOriginalName')->andReturn('test.txt');
        $mockFile->shouldReceive('storeAs')->andReturn('/test/test.txt');

        $mockRequest = Mockery::mock(Request::class);
        $mockRequest->shouldReceive('has')->with('lecture')->andReturn(false);
        $mockRequest->shouldReceive('has')->with('section')->andReturn(false);

        $mockStorageService = Mockery::mock(StorageQuotaService::class);
        $mockStorageService->shouldReceive('canUpload')
            ->with(1048576)
            ->once()
            ->andReturn(true);
        $mockStorageService->shouldReceive('recordUpload')
            ->with(1048576)
            ->once()
            ->andReturn(true);

        // Mock Storage facade for file existence check
        Storage::shouldReceive('disk')
            ->with('file_manager')
            ->andReturnSelf();
        Storage::shouldReceive('exists')
            ->andReturn(false);

        $action = new FileManagerFileStoreAction('file_manager', $mockStorageService);

        // Act
        $result = $action->handle('/', $mockFile, $mockRequest);

        // Assert
        $this->assertNotFalse($result);
    }

    /** @test */
    public function it_aborts_when_quota_exceeded()
    {
        // Arrange
        $mockFile = Mockery::mock(UploadedFile::class);
        $mockFile->shouldReceive('getSize')->andReturn(1073741824); // 1 GB

        $mockRequest = Mockery::mock(Request::class);

        $mockStorageService = Mockery::mock(StorageQuotaService::class);
        $mockStorageService->shouldReceive('canUpload')
            ->with(1073741824)
            ->once()
            ->andReturn(false);

        $action = new FileManagerFileStoreAction('file_manager', $mockStorageService);

        // Act & Assert
        $this->expectException(HttpException::class);
        $this->expectExceptionMessage('Storage quota exceeded');

        $action->handle('/', $mockFile, $mockRequest);
    }

    /** @test */
    public function it_records_storage_usage_after_successful_upload()
    {
        // Arrange
        $fileSize = 2097152; // 2 MB

        $mockFile = Mockery::mock(UploadedFile::class);
        $mockFile->shouldReceive('getSize')->andReturn($fileSize);
        $mockFile->shouldReceive('getClientOriginalName')->andReturn('document.pdf');
        $mockFile->shouldReceive('storeAs')
            ->once()
            ->andReturn('/uploads/document.pdf');

        $mockRequest = Mockery::mock(Request::class);
        $mockRequest->shouldReceive('has')->with('lecture')->andReturn(false);
        $mockRequest->shouldReceive('has')->with('section')->andReturn(false);

        $mockStorageService = Mockery::mock(StorageQuotaService::class);
        $mockStorageService->shouldReceive('canUpload')
            ->with($fileSize)
            ->once()
            ->andReturn(true);
        $mockStorageService->shouldReceive('recordUpload')
            ->with($fileSize)
            ->once()
            ->andReturn(true);

        Storage::shouldReceive('disk')
            ->with('file_manager')
            ->andReturnSelf();
        Storage::shouldReceive('exists')
            ->andReturn(false);

        $action = new FileManagerFileStoreAction('file_manager', $mockStorageService);

        // Act
        $result = $action->handle('/uploads', $mockFile, $mockRequest);

        // Assert
        $this->assertEquals('/uploads/document.pdf', $result);
    }

    /** @test */
    public function it_does_not_record_usage_if_upload_fails()
    {
        // Arrange
        $fileSize = 1048576;

        $mockFile = Mockery::mock(UploadedFile::class);
        $mockFile->shouldReceive('getSize')->andReturn($fileSize);
        $mockFile->shouldReceive('getClientOriginalName')->andReturn('file.txt');
        $mockFile->shouldReceive('storeAs')
            ->once()
            ->andReturn(false); // Upload failed

        $mockRequest = Mockery::mock(Request::class);
        $mockRequest->shouldReceive('has')->with('lecture')->andReturn(false);
        $mockRequest->shouldReceive('has')->with('section')->andReturn(false);

        $mockStorageService = Mockery::mock(StorageQuotaService::class);
        $mockStorageService->shouldReceive('canUpload')
            ->with($fileSize)
            ->once()
            ->andReturn(true);
        // recordUpload should NOT be called if upload fails
        $mockStorageService->shouldNotReceive('recordUpload');

        Storage::shouldReceive('disk')
            ->with('file_manager')
            ->andReturnSelf();
        Storage::shouldReceive('exists')
            ->andReturn(false);

        $action = new FileManagerFileStoreAction('file_manager', $mockStorageService);

        // Act
        $result = $action->handle('/', $mockFile, $mockRequest);

        // Assert
        $this->assertFalse($result);
    }

    /** @test */
    public function it_formats_directory_correctly()
    {
        $mockStorageService = Mockery::mock(StorageQuotaService::class);
        $action = new FileManagerFileStoreAction('file_manager', $mockStorageService);

        // Test various directory formats
        $this->assertEquals('/uploads/', $action->formatDirectory('uploads'));
        $this->assertEquals('/uploads/', $action->formatDirectory('/uploads'));
        $this->assertEquals('/uploads/', $action->formatDirectory('uploads/'));
        $this->assertEquals('/uploads/', $action->formatDirectory('/uploads/'));
        $this->assertEquals('/path/to/dir/', $action->formatDirectory('path/to/dir'));
    }
}
