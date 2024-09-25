<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use Illuminate\Support\Facades\Validator;
use Exception;

class ProductoController extends Controller
{
    //Función para almacenar producto
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            "nombre" => 'required',
            "precioRegular"  => ['required', 'numeric', 'min:0'],
            "miniatura"  => ['required', 'image'],
            "descripcion" => 'required',
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
            $fileName = time() . "." . $request->file('miniatura')->extension();
            $request->file('miniatura')->move(public_path("img/productos"), $fileName);
            $producto = Producto::create([
                'nombre' => $request->nombre,
                'precioRegular'  => $request->precioRegular,
                'miniatura'  => $fileName,
                'descripcion' => $request->descripcion
            ]);
        } catch (Exception $error) {
            $data = [
                'message' => 'Error al crear el producto: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'producto' => $producto,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    //Función para mostrar index de productos
    public function index()
    {
        $productos = Producto::all();
        $data = [
            'productos' => $productos,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para mostar un producto específico
    public function show($id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            $data = [
                'message' => 'Producto no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $data = [
            'producto' => $producto,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para eliminar producto
    public function destroy($id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            $data = [
                'message' => 'Producto no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        try{
            $producto->estadoEliminacion = 0;
            $producto->save();
        }catch(Exception $error){
            $data = [
                'message' => 'Error al eliminar el producto: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }
        $data = [
            'message' => "Producto de código $id eliminado",
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para reactivar producto eliminado
    public function reactivate($id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            $data = [
                'message' => 'Producto no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        try{
            $producto->estadoEliminacion = 1;
            $producto->save();
        }catch(Exception $error){
            $data = [
                'message' => 'Error al reactivar el producto: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }
        $data = [
            'message' => "Producto de código $id reactivado",
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para modificar producto
    public function update(Request $request, $id)
    {

        $producto = Producto::find($id);
        if (!$producto) {
            $data = [
                'message' => 'Producto no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            "nombre" => 'required',
            "precioRegular"  => ['required', 'numeric', 'min:0'],
            "descripcion" => 'required'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación',
                'errors' => $validator->errors(),
                'status' => 400
            ];

            return response()->json($data, 400);
        }

        $producto->nombre = $request->nombre;
        $producto->precioRegular = $request->precioRegular;
        $producto->descripcion  = $request->descripcion;

        try{
            $producto->save();
        }catch(Exception $error){
            $data = [
                'message' => 'Error al actualizar el producto: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'message' => 'Producto actualizado',
            'producto' => $producto,
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
