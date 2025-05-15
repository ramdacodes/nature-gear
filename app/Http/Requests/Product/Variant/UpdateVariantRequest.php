<?php

namespace App\Http\Requests\Product\Variant;

use Illuminate\Foundation\Http\FormRequest;

/** 
 * @method \Illuminate\Routing\Route|null route(string|null $key = null) 
 */
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
            'name' => ['required', 'unique:variants,name,' . $this->route('id')],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama varian harus diisi',
            'name.unique' => 'Nama varian sudah terdaftar',
        ];
    }
}
