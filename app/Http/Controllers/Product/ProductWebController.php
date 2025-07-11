<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductWebResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductWebController extends Controller
{
    public function index(Request $request)
    {
        if ($request->expectsJson()) {
            $page = max(1, (int) $request->input('page', 1));

            $query = Product::with(['category', 'variant']);

            $products = $query->paginate(10, ['*'], 'page', $page);

            return response()->json([
                'products' => ProductWebResource::collection($products),
                'totalPages' => $products->lastPage()
            ]);
        }

        return inertia('web/page/product/index');
    }
}
