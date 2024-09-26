<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pelicula;
use Illuminate\Support\Facades\Validator;
use Exception;

class PeliculaController extends Controller
{
    //Función para almacenar película
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            "nombre" => 'required',
            "duracion" => ['required','numeric', 'min:0'],
            "clasificacion" => 'required',
            "director" => 'required',
            "genero" => 'required',
            "sinopsis" => 'required',
            "imagen"  => ['required', 'image']
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
            $fileName = time() . "." . $request->file('imagen')->extension();
            $request->file('imagen')->move(public_path("img/peliculas"), $fileName);
            $pelicula = Pelicula::create([
                "nombre" => $request->nombre,
                "duracion" => $request->duracion,
                "clasificacion" => $request->clasificacion,
                "director" => $request->director,
                "genero" => $request->genero,
                "sinopsis" => $request->sinopsis,
                "imagen" => $fileName
            ]);
        } catch (Exception $error) {
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

    //Función para mostrar index de películas
    public function index()
    {
        $peliculas = Pelicula::all();
        $data = [
            'peliculas' => $peliculas,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para mostrar película específica
    public function show($id)
    {
        $pelicula = Pelicula::find($id);
        if (!$pelicula) {
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

    //Función para eliminar películas
    public function destroy($id)
    {
        $pelicula = Pelicula::find($id);
        if (!$pelicula) {
            $data = [
                'message' => 'Película no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        try{
            $pelicula->estadoEliminacion = 0;
            $pelicula->save();
        }catch(Exception $error){
            $data = [
                'message' => 'Error al eliminar la película: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }
        $data = [
            'message' => "Película de código $id eliminado",
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para reactivar producto eliminado
    public function reactivate($id)
    {
        $pelicula = Pelicula::find($id);
        if (!$pelicula) {
            $data = [
                'message' => 'Película no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        try{
            $pelicula->estadoEliminacion = 1;
            $pelicula->save();
        }catch(Exception $error){
            $data = [
                'message' => 'Error al reactivar la película: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }
        $data = [
            'message' => "Película de código $id reactivada",
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para poner película en cartelera
    public function ponerC($id)
    {
        $pelicula = Pelicula::find($id);
        if (!$pelicula) {
            $data = [
                'message' => 'Película no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        try{
            $pelicula->enCartelera = 1;
            $pelicula->save();
        }catch(Exception $error){
            $data = [
                'message' => 'Error al poner la película en cartelera: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }
        $data = [
            'message' => "Película de código $id en cartelera",
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para reactivar producto eliminado
    public function quitarC($id)
    {
        $pelicula = Pelicula::find($id);
        if (!$pelicula) {
            $data = [
                'message' => 'Película no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        try{
            $pelicula->enCartelera = 0;
            $pelicula->save();
        }catch(Exception $error){
            $data = [
                'message' => 'Error al quitar la película de cartelera: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }
        $data = [
            'message' => "Película de código $id removida de cartelera",
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para modificar película
    public function update(Request $request, $id)
    {
        $pelicula = Pelicula::find($id);
        if (!$pelicula) {
            $data = [
                'message' => 'Película no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $validator = Validator::make($request->all(), [
            "nombre" => 'required',
            "duracion" => ['required','numeric', 'min:0'],
            "clasificacion" => 'required',
            "director" => 'required',
            "genero" => 'required',
            "sinopsis" => 'required'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación',
                'errors' => $validator->errors(),
                'status' => 400
            ];

            return response()->json($data, 400);
        }

        $pelicula->nombre = $request->nombre;
        $pelicula->duracion = $request->duracion;
        $pelicula->clasificacion = $request->clasificacion;
        $pelicula->director = $request->director;
        $pelicula->genero = $request->genero;
        $pelicula->sinopsis = $request->sinopsis;

        try{
            $pelicula->save();
        }catch(Exception $error){
            $data = [
                'message' => 'Error al actualizar la película: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'message' => 'Película actualizada',
            'pelicula' => $pelicula,
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
