<?php

namespace App\Interfaces\EDU\Course;

class CourseRefundInterface
{

    public const PAYMENT_STATUS_REJECTED = 'REJECTED';
    public const PAYMENT_STATUS_FAILED = 'FAILED';
    public const PAYMENT_NOT_DUE = 'NOT_DUE';
    public const PAYMENT_OVERDUE = 'OVERDUE';
    public const PAYMENT_STATUS_PAID = 'PAID';
    public const PAYMENT_STATUS_PARTIALLY_PAID = 'PARTIALLY_PAID';
    public const PAYMENT_STATUS_PENDING = 'PENDING';
    public const PAYMENT_STATUS_REFUNDED = 'REFUNDED';

    // All Statuses, with labels
    public const PAYMENT_STATUSES = [
        self::PAYMENT_STATUS_FAILED => 'Failed',
        self::PAYMENT_NOT_DUE => 'Not Due',
        self::PAYMENT_OVERDUE => 'Overdue',
        self::PAYMENT_STATUS_PAID => 'Paid',
        self::PAYMENT_STATUS_PARTIALLY_PAID => 'Partially paid',
        self::PAYMENT_STATUS_PENDING => 'Pending',
        self::PAYMENT_STATUS_REFUNDED => 'Refunded',
    ];

    // STATUSES for COURSE PURCHASES
    public const STATUSES_FOR_REFUNDS = [
        self::PAYMENT_STATUS_REJECTED,
        self::PAYMENT_STATUS_PAID,
        self::PAYMENT_STATUS_PARTIALLY_PAID,
        self::PAYMENT_STATUS_PENDING,
        self::PAYMENT_STATUS_REFUNDED
    ];

    // Statuses for COURSE PAYMENTS
    public const PAYMENT_STATUSES_FOR_PAYMENTS = [
        self::PAYMENT_STATUS_FAILED,
        self::PAYMENT_NOT_DUE,
        self::PAYMENT_OVERDUE,
        self::PAYMENT_STATUS_PAID,
        self::PAYMENT_STATUS_PENDING,
        self::PAYMENT_STATUS_REFUNDED,
    ];
}
