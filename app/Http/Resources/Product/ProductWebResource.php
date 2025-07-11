<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProductWebResource extends JsonResource
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
            'name' => $this->name,
            'category' => $this->category ? $this->category->name : null,
            'variant' => $this->variant ? $this->variant->name : null,
            'price_per_day' => $this->price_per_day,
            'description' => $this->description,
            'image_1' => $this->image_1 ? asset('storage/images/products/' . $this->image_1) : null,
        ];
    }
}
