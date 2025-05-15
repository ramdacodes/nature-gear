<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\Variant\CreateVariantRequest;
use App\Http\Requests\Product\Variant\UpdateVariantRequest;
use App\Http\Resources\Product\VariantResource;
use App\Models\Variant;
use Exception;
use Illuminate\Http\Request;

class VariantController extends Controller
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

            $query = Variant::query();

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

            $variants = $query->paginate($size, ['*'], 'page', $page + 1);

            return response()->json([
                'variants' => VariantResource::collection($variants),
                'rowCount' => $variants->total(),
                'nextPage' => $variants->hasMorePages() ? $variants->currentPage() : null,
                'prevPage' => $variants->currentPage() > 1 ? $variants->currentPage() - 2 : null,
            ]);
        }

        return inertia('product/variant/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateVariantRequest $request)
    {
        try {
            Variant::create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Varian berhasil ditambahkan',
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
    public function update(UpdateVariantRequest $request, string $id)
    {
        try {
            $variant = Variant::findOrFail($id);

            $variant->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Varian berhasil diperbarui',
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
            $variant = Variant::findOrFail($id);

            $variant->delete();

            return response()->json([
                'success' => true,
                'message' => 'Varian berhasil dihapus',
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

            Variant::whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Varian terpilih berhasil dihapus',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
