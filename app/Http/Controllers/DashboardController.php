<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Product;
use App\Models\Rental;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalRent = Rental::count();
        $totalProduct = Product::count();
        $totalCustomer = Customer::count();
        $totalIncomeMonth = Rental::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->whereNot('status', ['pending', 'canceled'])->sum('total');

        return inertia('dashboard/index', [
            'totalRent' => $totalRent,
            'totalProduct' => $totalProduct,
            'totalCustomer' => $totalCustomer,
            'totalIncomeMonth' => $totalIncomeMonth
        ]);
    }
}
