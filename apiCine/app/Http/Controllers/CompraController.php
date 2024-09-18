<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Compra;

class CompraController extends Controller
{
    public function store(Request $request){

        $validator = Validator::make($request->all() , [
            "nombreUsuario" => 'required',
            "codFuncion" => 'required',
            "codTransaccion" => 'required',
            "cantidadAdultos" => 'required',
            "cantidadNinos" => 'required',
            "cantidadTE" => 'required',
            "cantidadAdultosVIP" => 'required',
            "cantidadNinosVIP" => 'required',
            "cantidadTEVIP" => 'required',
            "asientos" => 'required'
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
            $compra = Compra::create([
                "nombreUsuario" => $request->nombreUsuario,
                "codFuncion" => $request->codFuncion,
                "codTransaccion" => $request->codTransaccion,
                "cantidadAdultos" => $request->cantidadAdultos,
                "cantidadNinos" => $request->cantidadNinos,
                "cantidadTE" => $request->cantidadTE,
                "cantidadAdultosVIP" => $request->cantidadAdultosVIP,
                "cantidadNinosVIP" => $request->cantidadNinosVIP,
                "cantidadTEVIP" => $request->cantidadTEVIP,
                "asientos" => $request->asientos
            ]);
        } catch(\Exception $error){
            $data = [
                'message' => 'Error al crear la compra: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'compra' => $compra,
            'status' => 201
        ];

        return response()->json($data, 201);
    }
}
