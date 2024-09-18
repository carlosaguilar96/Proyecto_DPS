<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use Illuminate\Support\Facades\Validator;

class ProductoController extends Controller
{
    public function store(Request $request){

        $validator = Validator::make($request->all() , [
            "nombre" => 'required',
            "precioRegular"  => 'required',
            "miniatura"  => 'required',
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
            $producto = Producto::create([
                'nombre' => $request->nombre,
                'precioRegular'  => $request->precioRegular,
                'miniatura'  => $request->miniatura      
            ]);
        } catch(\Exception $error){
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
}
