<?php

namespace App\Actions\EDU\Course\Student;

use App\Interfaces\EDU\Course\CoursePurchaseInterface;
use App\Models\EDU\Course\CoursePurchase;
use App\Models\EDU\Course\CourseRefund;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class RequestRefundAction
{
    public function handle($data, CoursePurchase $coursePurchase): void
    {
        /** @var User $user */
        $user = Auth::user();

        $this->requestRefund($user, $coursePurchase, $data);
    }

    protected function requestRefund(User $user, CoursePurchase $coursePurchase, $data): void
    {
        $refundRequest = new CourseRefund();

        $refundRequest->fill([
            'course_name' => $coursePurchase->course->name,
            'course_id' => $coursePurchase->course->id,
            'course_purchase_id' => $coursePurchase->id,
            'user_id' => $user->id,
            'status' => CoursePurchaseInterface::PAYMENT_STATUS_PENDING,
            'reason' => $data->reason,
            'reason_message' => $data->reason_message,
        ]);

        $refundRequest->save();
    }
}
