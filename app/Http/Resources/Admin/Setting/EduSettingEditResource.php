<?php

namespace App\Http\Resources\Admin\Setting;

use Illuminate\Http\Resources\Json\JsonResource;

class EduSettingEditResource extends JsonResource
{
    public function toArray($request)
    {
       return [
           'course_checkout_success_url' => [
               'value' => $this->course_checkout_success_url,
               'type' => 'text',
               'label' => 'Course Checkout Success URL',
               'description' => 'The URL to redirect to after a successful course checkout.',
           ],
           'course_checkout_cancel_url' => [
               'value' => $this->course_checkout_cancel_url,
               'type' => 'text',
               'label' => 'Course Checkout Cancel URL',
               'description' => 'The URL to redirect to after a cancelled course checkout.',
           ],
           'course_use_refund_section' => [
               'value' => $this->course_use_refund_section,
               'type' => 'bool',
               'label' => 'Use Refund Section',
               'description' => 'Allow users to easily request refunds.',
           ],
       ];
    }
}
