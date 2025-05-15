<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\CreateProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Http\Resources\Product\ProductResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\Variant;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->expectsJson()) {
            $page = max(0, (int) $request->input('page', 0));
            $size = max(1, (int) $request->input('size', 10));
            $globalFilter = $request->input('globalFilter', '');
            $filters = $request->input('filters', []);
            $sorting = $request->input('sorting', []);

            $query = Product::with(['category', 'variant']);

            if (!empty($globalFilter)) {
                $query->where(function ($q) use ($globalFilter) {
                    $q->where('name', 'like', "%$globalFilter%");
                });
            }

            foreach ($filters as $column => $value) {
                if (!empty($value)) {
                    $query->where($column, 'like', "%$value%");
                }
            }

            foreach ($sorting as $column => $direction) {
                if ($column === 'category') {
                    $query->addSelect([
                        'category_name' => Category::select('name')
                            ->whereColumn('categories.id', 'products.category_id')
                            ->limit(1)
                    ])->orderBy('category_name', $direction === 'desc' ? 'desc' : 'asc');
                } else if ($column === 'variant') {
                    $query->addSelect([
                        'variant_name' => Variant::select('name')
                            ->whereColumn('variants.id', 'products.variant_id')
                            ->limit(1)
                    ])->orderBy('variant_name', $direction === 'desc' ? 'desc' : 'asc');
                } else {
                    $query->orderBy($column, $direction === 'desc' ? 'desc' : 'asc');
                }
            }

            $products = $query->paginate($size, ['*'], 'page', $page + 1);

            return response()->json([
                'products' => ProductResource::collection($products),
                'rowCount' => $products->total(),
                'nextPage' => $products->hasMorePages() ? $products->currentPage() : null,
                'prevPage' => $products->currentPage() > 1 ? $products->currentPage() - 2 : null,
            ]);
        }

        $categories = Category::get();
        $variants = Variant::get();

        return inertia('product/index', [
            'categories' => $categories,
            'variants' => $variants
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * @param \App\Http\Requests\CreateProductRequest $request
     */
    public function store(CreateProductRequest $request)
    {
        try {
            $data = $request->validated();

            $imageName = null;

            if ($request->hasFile('image_1')) {
                $image = $request->file('image_1');

                $imageName = $image->hashName();

                $image->storeAs('images/products', $imageName, 'public');
            }

            Product::create([
                'name' => $data['name'],
                'category_id' => $data['category_id'],
                'variant_id' => $data['variant_id'],
                'price_per_day' => $data['price_per_day'],
                'description' => $data['description'],
                'image_1' => $imageName,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Produk berhasil ditambahkan',
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     * @param \App\Http\Requests\UpdateProductRequest $request
     */
    public function update(UpdateProductRequest $request, string $id)
    {
        try {
            $product = Product::findOrFail($id);

            $data = $request->validated();

            if ($request->hasFile('image_1')) {
                $image_1 = $product->getRawOriginal('image_1');
                $path = "images/products/brands/{$image_1}";

                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }

                $image_1 = $request->file('image');

                $image_1->storeAs('images/products', $image_1->hashName(), 'public');

                $product->image_1 = $image_1->hashName();
            }

            $product->update([
                'name' => $data['name'],
                'category_id' => $data['category_id'],
                'variant_id' => $data['variant_id'],
                'price_per_day' => $data['price_per_day'],
                'description' => $data['description'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Produk berhasil diperbarui',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $product = Product::findOrFail($id);

            $image_1 = $product->getRawOriginal('image_1');
            $path = "images/products/{$image_1}";

            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }

            $product->delete();

            return response()->json([
                'success' => true,
                'message' => 'Produk berhasil dihapus',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyMultiple(Request $request)
    {
        try {
            $ids = $request->input('ids');

            foreach ($ids as $id) {
                $product = Product::findOrFail($id);

                $image_1 = $product->getRawOriginal('image_1');
                $path = "images/products/{$image_1}";

                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }

            Product::whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Produk terpilih berhasil dihapus',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
