<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sala;
use Illuminate\Support\Facades\Validator;

class SalaController extends Controller
{
    public function store(Request $request){

        $validator = Validator::make($request->all() , [
            "capacidad" => 'required',
            "sucursal" => 'required',
            "tipo" => 'required',
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
            $sala = Sala::create([
                "capacidad" => $request->capacidad,
                "sucursal" => $request->sucursal,
                "tipo" => $request->tipo,
            ]);
        } catch(\Exception $error){
            $data = [
                'message' => 'Error al crear la sala: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'sala' => $sala,
            'status' => 201
        ];

        return response()->json($data, 201);
    }
}
