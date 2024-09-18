<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cine;
use Illuminate\Support\Facades\Validator;

class CineController extends Controller
{
    
    public function store(Request $request){

        $validator = Validator::make($request->all() , [
            'nombreCine' => 'required',
            'logo_path'  => 'required',
            'ubicacion'  => 'required',
            'mision'  => 'required',
            'vision'  => 'required',
            'telefono'  => 'required',
            'firstAdmin'  => 'required'
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
            $cine = Cine::create([
                'nombreCine' => $request->nombreCine,
                'logo_path'  => $request->logo_path,
                'ubicacion'  => $request->ubicacion,
                'mision'  => $request->mision,
                'vision'  => $request->vision,
                'telefono'  => $request->telefono,
                'firstAdmin'  => $request->firstAdmin
            ]);
        } catch(\Exception $error){
            $data = [
                'message' => 'Error al crear el cine: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'cine' => $cine,
            'status' => 201
        ];

        return response()->json($data, 201);
    }
}
