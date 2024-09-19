<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Transaccion;

class TransaccionController extends Controller
{
    public function store(Request $request){

        $validator = Validator::make($request->all() , [
            "precioTotal" => "required",
            "fecha" => "required",
            "cardID" => "required",
        ]);

        if($validator->fails()){
            $data = [
                'message' => 'Error en la validación',
                'errors' => $validator->errors(),
                'status' => 400
            ];

            return response()->json($data, 400);
        }

        try{
            $transaccion = Transaccion::create([
                "precioTotal" => $request->precioTotal,
                "fecha" => $request->fecha,
                "cardID" => $request->cardID
            ]);
        } catch(\Exception $error){
            $data = [
                'message' => 'Error al crear la transacción: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'transaccion'=>$transaccion,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    public function index(){
        $transacciones = Transaccion::all();
        $data = [
            'funciones' => $transacciones,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    public function show($id){
        $transaccion = Transaccion::find($id);
        if(!$transaccion){
            $data = [
                'message' => 'Transacción no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $data = [
            'transaccion' => $transaccion,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

}
