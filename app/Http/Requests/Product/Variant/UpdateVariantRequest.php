<?php

namespace App\Http\Requests\Product\Variant;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVariantRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'unique:variants,name'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama varian harus diisi',
            'name.unique' => 'Nama varian sudah ada',
        ];
    }
}
