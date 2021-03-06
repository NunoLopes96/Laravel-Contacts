<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveContactRequest extends FormRequest
{
    /**
     * The rules() method will return an array containing
     * all the rules to be validated by the Request object.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name'   => 'required|min:3|max:255',
            'last_name'    => 'max:255',
            'email'        => 'nullable|regex:/\S+@\S+\.\S+/i|max:255',
            'phone_number' => 'nullable|string|max:255',
        ];
    }
}
