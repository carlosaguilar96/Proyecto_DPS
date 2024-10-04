<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sala;
use Illuminate\Support\Facades\Validator;
use Exception;

class SalaController extends Controller
{
    //Función para almacenar sala
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            "sucursal" => 'required'
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
                "capacidad" => 40,
                "codSucursal" => $request->sucursal
            ]);
        } catch (Exception $error) {
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

    //Función para mostrar salas
    public function index()
    {
        $salas = Sala::all();
        $data = [
            'salas' => $salas,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para mostrar sala específica
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

    //Función para eliminar sala
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
            $sala->estadoEliminacion = 0;
            $sala->save();
        } catch (Exception $error) {
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

    //Función para reactivar sala
    public function reactivate($id)
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
            $sala->estadoEliminacion = 1;
            $sala->save();
        } catch (Exception $error) {
            $data = [
                'message' => 'Error al reactivar la sala: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }
        $data = [
            'message' => "Sala de código $id reactivada",
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para modificar sala
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
            "capacidad" => ['required','numeric', 'min:0'],
            "sucursal" => 'required'
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
        $sala->codSucursal = $request->sucursal;

        try{
            $sala->save();
        }catch(Exception $error){
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
