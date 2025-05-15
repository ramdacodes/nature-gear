<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalProduct = Product::count();

        return inertia('dashboard/index', [
            'totalProduct' => $totalProduct
        ]);
    }
}
