<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sala;
use Illuminate\Support\Facades\Validator;

class SalaController extends Controller
{
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            "capacidad" => 'required',
            "sucursal" => 'required',
            "tipo" => 'required',
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
            $sala = Sala::create([
                "capacidad" => $request->capacidad,
                "sucursal" => $request->sucursal,
                "tipo" => $request->tipo,
            ]);
        } catch (\Exception $error) {
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

    public function index()
    {
        $salas = Sala::all();
        $data = [
            'salas' => $salas,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    public function show($id)
    {
        $sala = Sala::find($id);
        if (!$sala) {
            $data = [
                'message' => 'Sala no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $data = [
            'sala' => $sala,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    public function destroy($id)
    {
        $sala = Sala::find($id);
        if (!$sala) {
            $data = [
                'message' => 'Sala no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        try {
            $sala->delete();
        } catch (\Exception $error) {
            $data = [
                'message' => 'Error al eliminar la sala: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }
        $data = [
            'message' => "Sala de código $id eliminada",
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $sala = Sala::find($id);
        if (!$sala) {
            $data = [
                'message' => 'Sala no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $validator = Validator::make($request->all(), [
            "capacidad" => 'required',
            "sucursal" => 'required',
            "tipo" => 'required',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación',
                'errors' => $validator->errors(),
                'status' => 400
            ];

            return response()->json($data, 400);
        }

        $sala->capacidad = $request->capacidad;
        $sala->sucursal = $request->sucursal;
        $sala->tipo = $request->tipo;

        try{
            $sala->save();
        }catch(\Exception $error){
            $data = [
                'message' => 'Error al actualizar la sala: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'message' => 'Sala actualizada',
            'sala' => $sala,
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
