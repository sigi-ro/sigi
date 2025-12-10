<?php

namespace Tests\Feature\Admin\CRM;

use App\Interfaces\PermissionInterface;
use App\Models\CRM\Form;
use App\Models\CRM\FormField;
use App\Models\CRM\FormSubmission;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Feature\Admin\AbstractAdminTestCase;

class FormSubmissionTest extends AbstractAdminTestCase
{
    use RefreshDatabase;

    /** @test */
    public function authorised_users_can_view_form_submissions()
    {
        $form = Form::factory()->create();
        FormSubmission::factory()->count(3)->create(['form_id' => $form->id]);

        $response = $this
            ->signInWithPermissions([
                PermissionInterface::VIEW_CRM_FORM_SUBMISSIONS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->get(route('admin.crm.form-submissions.index'));

        $response->assertStatus(200);
    }

    /** @test */
    public function authorised_users_can_view_single_form_submission()
    {
        $form = Form::factory()->create();
        $submission = FormSubmission::factory()->create(['form_id' => $form->id]);

        $response = $this
            ->signInWithPermissions([
                PermissionInterface::VIEW_CRM_FORM_SUBMISSIONS,
                PermissionInterface::VIEW_ADMIN
            ])
            ->get(route('admin.crm.form-submissions.show', $submission));

        $response->assertStatus(200);
    }

    /** @test */
    public function unauthorised_users_cannot_view_form_submissions()
    {
        $this->assertIsPermissionAuthenticatedRoute(route('admin.crm.form-submissions.index'));
    }
}

