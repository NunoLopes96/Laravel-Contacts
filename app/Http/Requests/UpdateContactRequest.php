<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id'           => 'int|min:1',
            'first_name'   => 'required|min:3|max:255',
            'last_name'    => 'max:255',
            'email'        => 'nullable|regex:/\S+@\S+\.\S+/i|max:255',
            'phone_number' => 'nullable|string|max:255',
        ];
    }
}
