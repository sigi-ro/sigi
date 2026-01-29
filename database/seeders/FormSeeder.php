<?php

namespace Database\Seeders;

use App\Interfaces\CRM\FormFieldInterface;
use App\Models\CRM\Form;
use Illuminate\Database\Seeder;

class FormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createGeneralEnquiryForm();
    }


    protected function createGeneralEnquiryForm()
    {
        $form = Form::firstOrCreate(
            ['slug' => 'general-enquiry'],
            [
                'name'              => 'General Enquiry',
                'email_recipients'  => [
                    'admin@example.com',
                    'super@example.com',
                ]
            ]
        );

        if (!$form->formFields()->where('slug', FormFieldInterface::TYPE_CRM_FIRST_NAME)->exists()) {
            $form->formFields()->create([
                'is_required'   => true,
                'name'          => 'First Name',
                'order'         => 0,
                'slug'          => FormFieldInterface::TYPE_CRM_FIRST_NAME,
                'type'          => FormFieldInterface::TYPE_CRM_FIRST_NAME,
            ]);
        }

        if (!$form->formFields()->where('slug', FormFieldInterface::TYPE_CRM_LAST_NAME)->exists()) {
            $form->formFields()->create([
                'is_required'   => false,
                'name'          => 'Last Name',
                'order'         => 1,
                'slug'          => FormFieldInterface::TYPE_CRM_LAST_NAME,
                'type'          => FormFieldInterface::TYPE_CRM_LAST_NAME,
            ]);
        }

        if (!$form->formFields()->where('slug', FormFieldInterface::TYPE_CRM_EMAIL)->exists()) {
            $form->formFields()->create([
                'is_required'   => true,
                'name'          => 'Email',
                'order'         => 2,
                'slug'          => FormFieldInterface::TYPE_CRM_EMAIL,
                'type'          => FormFieldInterface::TYPE_CRM_EMAIL,
            ]);
        }

        if (!$form->formFields()->where('slug', 'enquiry')->exists()) {
            $form->formFields()->create([
                'is_required'   => false,
                'name'          => 'Enquiry',
                'order'         => 3,
                'settings'      => [
                    'max_length'    => 250,
                    'rows'          => 5,
                ],
                'slug'          => 'enquiry',
                'type'          => FormFieldInterface::TYPE_TEXTAREA,
            ]);
        }
    }
}
