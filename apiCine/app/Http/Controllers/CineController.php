<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cine;
use Illuminate\Support\Facades\Validator;

class CineController extends Controller
{

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'nombreCine' => 'required',
            'logo_path'  => 'required',
            'ubicacion'  => 'required',
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
            $cine = Cine::create([
                'nombreCine' => $request->nombreCine,
                'logo_path'  => $request->logo_path,
                'ubicacion'  => $request->ubicacion,
                'mision'  => $request->mision,
                'vision'  => $request->vision,
                'telefono'  => $request->telefono,
                'firstAdmin'  => $request->firstAdmin
            ]);
        } catch (\Exception $error) {
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

    public function index()
    {
        $cines = Cine::all();
        $data = [
            'cines' => $cines,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    public function update(Request $request)
    {
        $cine = Cine::find(1); // Solo hay un cine

        $validator = Validator::make($request->all(), [
            'nombreCine' => 'required',
            'logo_path'  => 'required',
            'ubicacion'  => 'required',
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

        $cine->nombreCine = $request->nombreCine;
        $cine->logo_path  = $request->logo_path;
        $cine->ubicacion = $request->ubicacion;
        $cine->mision = $request->mision;
        $cine->vision = $request->vision;
        $cine->telefono = $request->telefono;
        $cine->firstAdmin = $request->firstAdmin;

        try {
            $cine->save();
        } catch (\Exception $error) {
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
