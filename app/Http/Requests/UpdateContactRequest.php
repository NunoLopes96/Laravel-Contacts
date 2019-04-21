<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContactRequest extends StoreContactRequest
{
    /**
     * The rules() method will return an array containing
     * all the rules to be validated by the Request object.
     *
     * @return array
     */
    public function rules()
    {
        return \array_merge(
            [
                'id' => 'required|integer|min:1',
            ],
            parent::rules()
        );
    }
}
