<?php

namespace Database\Factories\EDU\Course;

use App\Interfaces\EDU\Course\CoursePurchaseInterface;
use App\Interfaces\EDU\Course\CourseRefundInterface;
use App\Models\EDU\Course\Course;
use App\Models\EDU\Course\CoursePurchase;
use App\Models\EDU\Course\CourseRefund;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseRefundFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = CourseRefund::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $status = $this->faker->randomElement(CourseRefundInterface::STATUSES_FOR_REFUNDS);
        $coursePurchase = CoursePurchase::factory();
        $course = Course::find($coursePurchase->course_id);

        return [
            'course_id' => $coursePurchase->course_id,
            'course_name' => $course->name,
            'status' => $status,
            'course_purchase_id' => CoursePurchaseInterface::PURCHASE_TYPE_FULL,
            'user_id' => User::factory(),
            'full_refund_issued_at' => null,
            'refunded' => false,
            'reason' => $this->faker->randomElement(CourseRefundInterface::STATUSES_FOR_REFUNDS),
            'reason_message' => $this->faker->text,
            'notes' => $this->faker->realText,
        ];
    }
}
