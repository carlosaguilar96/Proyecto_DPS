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

    public function index(){
        $peliculas = Pelicula::all();
        $data = [
            'peliculas' => $peliculas,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    public function show($id){
        $pelicula = Pelicula::find($id);
        if(!$pelicula){
            $data = [
                'message' => 'Película no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $data = [
            'pelicula' => $pelicula,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    public function destroy($id){
        $pelicula = Pelicula::find($id);
        if(!$pelicula){
            $data = [
                'message' => 'Película no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        try{
            $pelicula->delete();
        }catch(\Exception $error){
            $data = [
                'message' => 'Error al eliminar la película: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }
        $data = [
            'message' => "Película de código $id eliminada",
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
