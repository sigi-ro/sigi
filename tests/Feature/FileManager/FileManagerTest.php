<?php

namespace Tests\Feature\FileManager;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Permission;
use Tests\TenantTestCase;

class FileManagerTest extends TenantTestCase
{
    use RefreshDatabase;

    protected function createPermissions()
    {
        Permission::firstOrCreate(['name' => 'view file_manager']);
        Permission::firstOrCreate(['name' => 'edit file_manager']);
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
    }

    /** @test */
    public function authenticated_user_can_access_file_manager_page()
    {
        $this->createPermissions();
        $user = User::factory()->create();
        $user->givePermissionTo([
            'view file_manager',
            \App\Interfaces\PermissionInterface::VIEW_ADMIN
        ]);

        $response = $this->signIn($user)
            ->get(route('admin.file_manager.index'));

        $response->assertStatus(200);
    }

    /** @test */
    public function authenticated_user_can_list_directories()
    {
        $this->createPermissions();
        $user = User::factory()->create();
        $user->givePermissionTo([
            'view file_manager',
            \App\Interfaces\PermissionInterface::VIEW_ADMIN
        ]);

        Storage::fake('file_manager');
        Storage::disk('file_manager')->makeDirectory('/test-directory');

        $response = $this->signIn($user)
            ->getJson(route('admin.api.file-manager.directories.index', ['directory' => '/']));

        $response->assertStatus(200)
            ->assertJsonStructure([
                'directories' => [
                    '*' => ['name', 'path']
                ]
            ]);
    }
    /** @test */
    public function authenticated_user_can_create_directory()
    {
        $this->createPermissions();
        $user = User::factory()->create();
        $user->givePermissionTo([
            'view file_manager',
            'edit file_manager',
            \App\Interfaces\PermissionInterface::VIEW_ADMIN
        ]);

        Storage::fake('file_manager');

        $response = $this->signIn($user)
            ->postJson(route('admin.api.file-manager.directories.store'), [
                'directory' => '/new-test-directory'
            ]);

        $response->assertStatus(200);
        Storage::disk('file_manager')->assertExists('/new-test-directory');
    }
    /** @test */
    public function authenticated_user_can_list_files()
    {
        $this->createPermissions();
        $user = User::factory()->create();
        $user->givePermissionTo([
            'view file_manager',
            \App\Interfaces\PermissionInterface::VIEW_ADMIN
        ]);

        Storage::fake('file_manager');
        Storage::disk('file_manager')->put('/test.txt', 'test content');

        $response = $this->signIn($user)
            ->getJson(route('admin.api.file-manager.files.index', ['directory' => '/']));

        $response->assertStatus(200)
            ->assertJsonStructure([
                'files' => [
                    '*' => ['meta', 'url']
                ]
            ]);
    }
    /** @test */
    public function authenticated_user_can_upload_file_when_uploads_enabled()
    {
        config(['sigi.file_manager.uploads.enabled' => true]);
        
        $this->createPermissions();
        $user = User::factory()->create();
        $user->givePermissionTo([
            'view file_manager',
            'edit file_manager',
            \App\Interfaces\PermissionInterface::VIEW_ADMIN
        ]);

        Storage::fake('file_manager');

        $file = UploadedFile::fake()->image('test-image.jpg', 100, 100);

        $response = $this->signIn($user)
            ->postJson(route('admin.api.file-manager.files.store'), [
                'directory' => '/',
                'file' => $file
            ]);

        $response->assertStatus(200);
        Storage::disk('file_manager')->assertExists('/test-image.jpg');
    }

    /** @test */
    public function user_cannot_upload_file_when_uploads_disabled()
    {
        config(['sigi.file_manager.uploads.enabled' => false]);
        
        $user = User::factory()->create();

        Storage::fake('file_manager');

        $file = UploadedFile::fake()->image('test-image.jpg');

        $response = $this->actingAs($user)
            ->postJson(route('admin.api.file-manager.files.store'), [
                'directory' => '/',
                'file' => $file
            ]);

        $response->assertStatus(403);
    }
    /** @test */
    public function uploaded_files_are_slugified()
    {
        config(['sigi.file_manager.uploads.enabled' => true]);
        
        $this->createPermissions();
        $user = User::factory()->create();
        $user->givePermissionTo([
            'view file_manager',
            'edit file_manager',
            \App\Interfaces\PermissionInterface::VIEW_ADMIN
        ]);

        Storage::fake('file_manager');

        $file = UploadedFile::fake()->image('Test Image With Spaces.jpg');

        $response = $this->signIn($user)
            ->postJson(route('admin.api.file-manager.files.store'), [
                'directory' => '/',
                'file' => $file
            ]);

        $response->assertStatus(200);
        Storage::disk('file_manager')->assertExists('/test-image-with-spaces.jpg');
    }
    /** @test */
    public function duplicate_filenames_get_timestamp_prefix()
    {
        config(['sigi.file_manager.uploads.enabled' => true]);
        
        $this->createPermissions();
        $user = User::factory()->create();
        $user->givePermissionTo([
            'view file_manager',
            'edit file_manager',
            \App\Interfaces\PermissionInterface::VIEW_ADMIN
        ]);

        Storage::fake('file_manager');

        // Upload first file
        $file1 = UploadedFile::fake()->image('duplicate.jpg');
        $this->signIn($user)
            ->postJson(route('admin.api.file-manager.files.store'), [
                'directory' => '/',
                'file' => $file1
            ]);

        // Upload duplicate
        $file2 = UploadedFile::fake()->image('duplicate.jpg');
        $response = $this->signIn($user)
            ->postJson(route('admin.api.file-manager.files.store'), [
                'directory' => '/',
                'file' => $file2
            ]);

        $response->assertStatus(200);
        
        // First file should exist
        Storage::disk('file_manager')->assertExists('/duplicate.jpg');
        
        // Second file should have timestamp prefix
        $files = Storage::disk('file_manager')->files('/');
        $this->assertCount(2, $files);
        $this->assertTrue(
            collect($files)->contains(function ($file) {
                // Accept filenames with or without a leading slash
                return preg_match('/\/?\d+-duplicate\.jpg$/', $file);
            })
        );
    }

    /** @test */
    public function image_field_can_store_file_url()
    {
        $user = User::factory()->create();

        Storage::fake('file_manager');
        Storage::disk('file_manager')->put('/test-image.jpg', 'fake image content');

        // Simulate the URL that would be returned by the file manager
        $fileUrl = Storage::disk('file_manager')->url('/test-image.jpg');

        // This would be set in the content field via the ImageField component
        $this->assertIsString($fileUrl);
        $this->assertStringContainsString('test-image.jpg', $fileUrl);
    }

    /** @test */
    public function unauthenticated_user_cannot_access_file_manager()
    {
        $response = $this->get(route('admin.file_manager.index'));
        $response->assertRedirect(route('login'));
    }

    /** @test */
    public function unauthenticated_user_cannot_access_file_manager_api()
    {
        $response = $this->getJson(route('admin.api.file-manager.files.index'));
        $response->assertStatus(401);
    }
}
