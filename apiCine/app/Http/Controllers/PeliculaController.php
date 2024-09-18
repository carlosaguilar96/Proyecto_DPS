<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pelicula;
use Illuminate\Support\Facades\Validator;

class PeliculaController extends Controller
{
    public function store(Request $request){

        $validator = Validator::make($request->all() , [
            "nombre" => 'required',
            "duracion" => 'required',
            "clasificacion" => 'required',
            "director" => 'required',
            "genero" => 'required',
            "sinopsis" => 'required'
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
            $pelicula = Pelicula::create([
                "nombre" => $request->nombre,
                "duracion" => $request->duracion,
                "clasificacion" => $request->clasificacion,
                "director" => $request->director,
                "genero" => $request->genero,
                "sinopsis" => $request->sinopsis
            ]);
        } catch(\Exception $error){
            $data = [
                'message' => 'Error al crear la película: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'pelicula' => $pelicula,
            'status' => 201
        ];

        return response()->json($data, 201);
    }
}
