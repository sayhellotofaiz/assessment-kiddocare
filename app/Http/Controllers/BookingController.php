<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Store a new booking.
     */
    public function store(Request $request)
    {
        $request->validate([
            'booking_details' => 'required|string',
        ]);

        $booking = Booking::create([
            'booking_details' => $request->booking_details,
        ]);

        return response()->json($booking, 201);
    }

    /**
     * Get all bookings.
     */
    public function index()
    {
        return Booking::all();
    }
}
