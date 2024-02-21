<?php

namespace App\Models\EDU\Course;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $course_id
 * @property Course $course
 * @property string $status
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class CourseRefund extends Model
{
    use HasFactory;

    protected $table = 'edu_course_refunds';

    protected $guarded = [];

    protected $casts = [
        'full_refund_issued_at' => 'datetime',
        'refunded' => 'bool',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function purchasePayments(): HasMany
    {
        return $this->hasMany(CoursePurchasePayment::class, 'course_purchase_id');
    }
}
