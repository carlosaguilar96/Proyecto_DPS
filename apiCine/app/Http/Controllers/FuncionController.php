<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Funcion;

class FuncionController extends Controller
{
    public function store(Request $request){

        $validator = Validator::make($request->all() , [
            "codPelicula" => "required",
            "codSala" => "required",
            "idioma" => "required",
            "fechaHora" => "required",
            "precioAdulto" => "required",
            "precioNino" => "required",
            "precioTE" => "required",
            "precioAdultoVIP" => "required",
            "precioNinoVIP" => "required",
            "precioTEVIP" => "required"
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
            $funcion = Funcion::create([
                "codPelicula" => $request->codPelicula,
                "codSala" => $request->codSala,
                "idioma" => $request->idioma,
                "fechaHora" => $request->fechaHora,
                "precioAdulto" => $request->precioAdulto,
                "precioNino" => $request->precioNino,
                "precioTE" => $request->precioTE,
                "precioAdultoVIP" => $request->precioAdultoVIP,
                "precioNinoVIP" => $request->precioNinoVIP,
                "precioTEVIP" => $request->precioTEVIP
            ]);
        } catch(\Exception $error){
            $data = [
                'message' => 'Error al crear la función: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'funcion' => $funcion,
            'status' => 201
        ];

        return response()->json($data, 201);
    }
}
