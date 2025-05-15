<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\Customer\CreateCustomerRequest;
use App\Http\Requests\User\Customer\UpdateCustomerRequest;
use App\Http\Resources\User\CustomerResource;
use App\Models\Customer;
use Exception;
use Illuminate\Http\Request;

class CustomerController extends Controller
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

            $query = Customer::query();

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

            $customers = $query->paginate($size, ['*'], 'page', $page + 1);

            return response()->json([
                'customers' => CustomerResource::collection($customers),
                'rowCount' => $customers->total(),
                'nextPage' => $customers->hasMorePages() ? $customers->currentPage() : null,
                'prevPage' => $customers->currentPage() > 1 ? $customers->currentPage() - 2 : null,
            ]);
        }

        return inertia('user/customer/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCustomerRequest $request)
    {
        try {
            Customer::create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Pelanggan berhasil ditambahkan',
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
     */
    public function update(UpdateCustomerRequest $request, string $id)
    {
        try {
            $customer = Customer::findOrFail($id);

            $customer->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Pelanggan berhasil diperbarui',
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
            $customer = Customer::findOrFail($id);

            $customer->delete();

            return response()->json([
                'success' => true,
                'message' => 'Pelanggan berhasil dihapus',
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

            Customer::whereIn('id', $ids)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Pelanggan berhasil dihapus',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
