<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name
            ] ?? null,
            'variant' => [
                'id' => $this->variant->id,
                'name' => $this->variant->name
            ] ?? null,
            'price_per_day' => $this->price_per_day,
            'description' => $this->description,
            'image_1' => $this->image_1,
            'image_2' => $this->image_2,
            'image_3' => $this->image_3,
            'image_4' => $this->image_4,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
