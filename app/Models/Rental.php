<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rental extends Model
{
    protected $guarded = [];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }

    public function rentalDetail()
    {
        return $this->hasMany(RentalDetail::class, 'rental_id', 'id');
    }
}
