<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Sucursal;

class SucursalController extends Controller
{
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            "codCine" => 'required',
            "sucursal" => 'required',
            "ubicacion" => 'required',
            "telefono" => 'required'
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
            $sucursal = Sucursal::create([
                "codCine" => $request->codCine,
                "sucursal" => $request->sucursal,
                "ubicacion" => $request->ubicacion,
                "telefono" => $request->telefono
            ]);
        } catch (\Exception $error) {
            $data = [
                'message' => 'Error al crear la sucursal: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'sucursal' => $sucursal,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    public function index()
    {
        $sucursales = Sucursal::all();
        $data = [
            'sucursales' => $sucursales,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    public function show($id)
    {
        $sucursal = Sucursal::find($id);
        if (!$sucursal) {
            $data = [
                'message' => 'Sucursal no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $data = [
            'sucursal' => $sucursal,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    public function destroy($id)
    {
        $sucursal = Sucursal::find($id);
        if (!$sucursal) {
            $data = [
                'message' => 'Sucursal no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        try {
            $sucursal->delete();
        } catch (\Exception $error) {
            $data = [
                'message' => 'Error al eliminar la sucursal: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }
        $data = [
            'message' => "Sucursal de código $id eliminada",
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $sucursal = Sucursal::find($id);
        if (!$sucursal) {
            $data = [
                'message' => 'Sucursal no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $validator = Validator::make($request->all(), [
            "codCine" => 'required',
            "sucursal" => 'required',
            "ubicacion" => 'required',
            "telefono" => 'required'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación',
                'errors' => $validator->errors(),
                'status' => 400
            ];

            return response()->json($data, 400);
        }
        $sucursal->codCine = $request->codCine;
        $sucursal->sucursal = $request->sucursal;
        $sucursal->ubicacion = $request->ubicacion;
        $sucursal->telefono = $request->telefono;

        try {
            $sucursal->save();
        } catch (\Exception $error) {
            $data = [
                'message' => 'Error al actualizar la sucursal: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'message' => 'Sucursal actualizada',
            'sucursal' => $sucursal,
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
