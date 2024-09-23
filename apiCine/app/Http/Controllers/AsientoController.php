<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Asiento;
use Illuminate\Support\Facades\Validator;

class AsientoController extends Controller
{
    public function store(Request $request){

        $validator = Validator::make($request->all() , [
            "numButaca" => 'required',
            "codCompra" => 'required'
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
            $asiento = Asiento::create([
                "numButaca" => $request->numButaca,
                "codCompra" => $request->codCompra

            ]);
        } catch(\Exception $error){
            $data = [
                'message' => 'Error al crear la instancia de asiento: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'asiento' => $asiento,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    public function index(){
        $asientos = Asiento::all();
        $data = [
            'asientos' => $asientos,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    public function show($id){
        $asiento = Asiento::find($id);
        if(!$asiento){
            $data = [
                'message' => 'Asiento no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $data = [
            'asiento' => $asiento,
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
