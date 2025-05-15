<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use App\Http\Requests\Transaction\Rental\CreateRentalRequest;
use App\Http\Resources\Transaction\RentalResource;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Rental;
use App\Models\RentalDetail;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RentalController extends Controller
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

            $query = Rental::query();

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

            $rentals = $query->paginate($size, ['*'], 'page', $page + 1);

            return response()->json([
                'rentals' => RentalResource::collection($rentals),
                'rowCount' => $rentals->total(),
                'nextPage' => $rentals->hasMorePages() ? $rentals->currentPage() : null,
                'prevPage' => $rentals->currentPage() > 1 ? $rentals->currentPage() - 2 : null,
            ]);
        }

        $products = Product::get();
        $customers = Customer::get();

        return inertia('transaction/rental/index', [
            'products' => $products,
            'customers' => $customers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateRentalRequest $request)
    {
        DB::beginTransaction();

        try {
            $data = $request->validated();

            $product = Product::findOrFail($data['product_id']);

            $startDate = Carbon::parse($data['start_date']);
            $endDate = Carbon::parse($data['end_date']);

            $duration = $endDate->diffInDays($startDate);

            $rental = Rental::create([
                'customer_id' => $data['customer_id'],
                'start_date' => $data['start_date'],
                'end_date' => $data['end_date'],
                'total' => $product->price_per_day * ($duration == 0 ? 1 : $duration),
                'status' => 'pending',
            ]);

            RentalDetail::create([
                'rental_id' => $rental->id,
                'product_id' => $data['product_id'],
                'duration' => $duration,
                'price' => $product->price_per_day,
                'sub_total' => $product->price_per_day * ($duration == 0 ? 1 : $duration)
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Penyewaan berhasil ditambahkan',
            ], 201);
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $rental = Rental::findOrFail($id);

            $rental->delete();

            return response()->json([
                'success' => true,
                'message' => 'Penyewaan berhasil dihapus',
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

            Rental::whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Penyewaan berhasil dihapus',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
