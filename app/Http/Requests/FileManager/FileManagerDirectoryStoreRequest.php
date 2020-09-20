<?php

namespace App\Http\Requests\FileManager;

use Illuminate\Foundation\Http\FormRequest;

class FileManagerDirectoryStoreRequest extends FormRequest
{

    /**
     * Define the rules for the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'directory' => 'required',
        ];
    }

}
