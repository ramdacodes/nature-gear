<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rental extends Model
{
    protected $guarded = [];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($rental) {
            $rental->code = self::generateCode();
        });
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }

    public function rentalDetail()
    {
        return $this->hasMany(RentalDetail::class, 'rental_id', 'id');
    }

    public static function generateCode()
    {
        $today = date('Ymd');
        $lastRental = self::whereDate('created_at', today())->latest('id')->first();
        $nextNumber = $lastRental ? ((int) substr($lastRental->code, -5)) + 1 : 1;

        return "RENT-{$today}-" . str_pad($nextNumber, 5, '0', STR_PAD_LEFT);
    }
}
