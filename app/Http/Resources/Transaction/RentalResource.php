<?php

namespace App\Http\Resources\Transaction;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RentalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'customer' => $this->customer->name ?? null,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'total' => $this->total,
            'status' => $this->status,
            'payment_status' => $this->payment_status,
            'items' => $this->rentalDetail->map(function ($item) {
                return [
                    'id' => $item->id,
                    'product' => $item->product ? [
                        'id' => $item->product->id,
                        'name' => $item->product->name,
                        'category' => $item->product->category ? [
                            'id' => $item->product->category->id,
                            'name' => $item->product->category->name,
                        ] : null,
                        'variant' => $item->product->variant ? [
                            'id' => $item->product->variant->id,
                            'name' => $item->product->variant->name,
                        ] : null,
                        'price_per_day' => $item->product->price_per_day,
                    ] : null,
                    'duration' => $item->duration,
                    'total' => $item->sub_total,
                ];
            })->toArray(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
