<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class CreateProductRequest extends FormRequest
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
            'category_id' => ['required', 'exists:categories,id'],
            'variant_id' => ['required', 'exists:variants,id'],
            'price_per_day' => ['required'],
            'description' => ['required'],
            // 'image_1' => ['required', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'image_1' => ['required'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama produk harus diisi',
            'category_id.required' => 'Kategori produk harus diisi',
            'category_id.exists' => 'Kategori produk tidak ditemukan',
            'variant_id.required' => 'Varian produk harus diisi',
            'variant_id.exists' => 'Varian produk tidak ditemukan',
            'price_per_day.required' => 'Harga per hari harus diisi',
            'description.required' => 'Deskripsi produk harus diisi',
            // 'image_1.required' => 'Gambar produk utama harus diisi',
        ];
    }
}
