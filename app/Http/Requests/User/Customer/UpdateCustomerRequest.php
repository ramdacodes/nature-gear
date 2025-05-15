<?php

namespace App\Http\Requests\User\Customer;

use Illuminate\Foundation\Http\FormRequest;

/** 
 * @method \Illuminate\Routing\Route|null route(string|null $key = null) 
 */
class UpdateCustomerRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:customers,email,' . $this->route('id')],
            'phone' => ['required'],
            'address' => ['required'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama harus diisi',
            'email.required' => 'Email harus diisi',
            'email.email' => 'Email tidak valid',
            'email.unique' => 'Email sudah terdaftar',
            'phone.required' => 'Nomor telepon harus diisi',
            'address.required' => 'Alamat harus diisi',
        ];
    }
}
