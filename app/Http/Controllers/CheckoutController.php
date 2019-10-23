<?php

namespace App\Http\Controllers;

use App\Payment\Cashier;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    //

    public function index() {
        return response()->json([
            'public_key' => env('CHECKOUT_PUBLIC_KEY'),
            'private_key' => env('CHECKOUT_PRIVATE_KEY')
        ]);
    }

    public function create() {

    }

    public function pay(Request $request) {

        $address = $request->address;

        $info = [
            "sellerId" => env('CHECKOUT_SELLER_ID'),
            "merchantOrderId" => rand(1000, 100000),
            "token" => $request->token,
            "currency" => 'USD',
            "total" => $request->amount,
            "billingAddr" => $address,
            "shippingAddr" => $address,
        ];

        // return response()->json($info);
        $res = Cashier::pay($info);

        return response()->json($res);
    }
}
