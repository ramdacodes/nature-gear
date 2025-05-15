<?php

namespace App\Http\Requests\Transaction\Rental;

use Illuminate\Foundation\Http\FormRequest;

class CreateRentalRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product_id' => ['required', 'exists:products,id'],
            'customer_id' => ['required', 'exists:customers,id'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date'],
        ];
    }

    public function messages()
    {
        return [
            'product_id.required' => 'Produk harus diisi',
            'product_id.exists' => 'Produk tidak ditemukan',
            'customer_id.required' => 'Pelanggan harus diisi',
            'customer_id.exists' => 'Pelanggan tidak ditemukan',
            'start_date.required' => 'Tanggal mulai harus diisi',
            'start_date.date' => 'Tanggal mulai tidak valid',
            'end_date.required' => 'Tanggal selesai harus diisi',
            'end_date.date' => 'Tanggal selesai tidak valid',
        ];
    }
}
