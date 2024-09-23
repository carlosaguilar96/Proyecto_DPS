<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cine;
use Illuminate\Support\Facades\Validator;
use Exception;

class CineController extends Controller
{
    //Función para almacenar cine
    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'nombreCine' => 'required',
            'logo'  => ['required', 'image'],
            'mision'  => 'required',
            'vision'  => 'required',
            'telefono'  => 'required',
            'firstAdmin'  => 'required'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación',
                'errors' => $validator->errors(),
                'status' => 400
            ];

            return response()->json($data, 400);
        }

        try {
            $fileName = time() . "." . $request->file('logo')->extension();
            $request->file('logo')->move(public_path("img"), $fileName);
            $cine = Cine::create([
                'nombreCine' => $request->nombreCine,
                'logo_path'  => $fileName,
                'mision'  => $request->mision,
                'vision'  => $request->vision,
                'telefono'  => $request->telefono,
                'firstAdmin'  => $request->firstAdmin
            ]);
        } catch (Exception $error) {
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

    //Función para mostrar cine específico
    public function show($id)
    {
        $cine = Cine::find($id);
        if(!$cine){
            $data = [
                'message' => 'Cine no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $data = [
            'cine' => $cine,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //función para modificar cine
    public function update(Request $request, $id)
    {
        $cine = Cine::find($id);
        if(!$cine){
            $data = [
                'message' => 'Cine no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'nombreCine' => 'required',
            'mision'  => 'required',
            'vision'  => 'required',
            'telefono'  => 'required'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación',
                'errors' => $validator->errors(),
                'status' => 400
            ];

            return response()->json($data, 400);
        }

        $cine->nombreCine = $request->nombreCine;
        $cine->mision = $request->mision;
        $cine->vision = $request->vision;
        $cine->telefono = $request->telefono;

        try {
            $cine->save();
        } catch (Exception $error) {
            $data = [
                'message' => 'Error al actualizar el cine: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'message' => 'Cine actualizado',
            'cine' => $cine,
            'status' => 201
        ];

        return response()->json($data, 201);
    }
}
