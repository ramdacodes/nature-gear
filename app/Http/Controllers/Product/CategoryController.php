<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\Category\CreateCategoryRequest;
use App\Http\Requests\Product\Category\UpdateCategoryRequest;
use App\Http\Resources\Product\CategoryResource;
use App\Models\Category;
use Exception;
use Illuminate\Http\Request;

class CategoryController extends Controller
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

            $query = Category::query();

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
                $query->orderBy($column, $direction === 'desc' ? 'desc' : 'asc');
            }

            $categories = $query->paginate($size, ['*'], 'page', $page + 1);

            return response()->json([
                'categories' => CategoryResource::collection($categories),
                'rowCount' => $categories->total(),
                'nextPage' => $categories->hasMorePages() ? $categories->currentPage() : null,
                'prevPage' => $categories->currentPage() > 1 ? $categories->currentPage() - 2 : null,
            ]);
        }

        return inertia('product/category/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCategoryRequest $request)
    {
        try {
            Category::create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Kategori berhasil ditambahkan',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, string $id)
    {
        try {
            $category = Category::findOrFail($id);

            $category->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Kategori berhasil diperbarui',
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
            $category = Category::findOrFail($id);

            $category->delete();

            return response()->json([
                'success' => true,
                'message' => 'Kategori berhasil dihapus',
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

            Category::whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Kategori terpilih berhasil dihapus',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
