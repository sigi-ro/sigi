<?php

namespace App\Http\Requests\Admin\Profile;

use App\Http\Requests\BaseIndexRequest;

class CoursePurchaseRefundRequest extends BaseIndexRequest
{
    public function rules(): array
    {
        return array_merge(parent::rules(), [
            'reason' => 'required|string',
            'reason_message' => 'sometimes|string',
        ]);
    }
}
