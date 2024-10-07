<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pelicula;
use App\Models\Sucursal;
use App\Models\Sala;
use App\Models\Funcion;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Exception;
date_default_timezone_set('America/El_Salvador');

class PeliculaController extends Controller
{
    //Función para almacenar película
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            "nombre" => 'required',
            "duracion" => ['required', 'numeric', 'min:0'],
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

    // Muestra todas las películas siempre y cuando no estén eliminadas
    public function indexD()
    {
        $peliculasA = Pelicula::all();

        $peliculas = [];

        foreach ($peliculasA as $peli) {
            if ($peli->estadoEliminacion == 1)
                $peliculas[] = $peli;
        }

        if (count($peliculas) == 0) {

            $data = [
                'message' => 'Todas las películas han sido eliminadas',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $data = [
            'peliculas' => $peliculas,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    // Función para mostrar películas en cartelera
    public function mostrarCartelera($id)
    {

        $peliculas = [];
        $fechaHoy = date('Y-m-d H:i:s');
        $funciones = [];

        if ($id == -1) {
            $salas = Sala::all()->where('estadoEliminacion', 1);
        } else {
            $salas = Sala::all()->where('codSucursal', $id)->where('estadoEliminacion', 1);
        }

        if (count($salas) == 0) {
            $data = [
                'message' => 'No hay salas en la sucursal',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        foreach ($salas as $sala) {
            $codigosSala[] = $sala->codSala;
        }

        $funciones = Funcion::all()->whereIn('codSala', $codigosSala)->where('estadoEliminacion', 1);

        if (count($funciones) == 0) {
            $data = [
                'message' => 'No hay funciones en la sucursal',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $codigosPeliculas = [];

        foreach ($funciones as $funcion) {

            // Revisa que la función no haya ocurrido ya
            $fechaPelicula = Carbon::parse($funcion->fecha)->format('Y-m-d');
            $horaPelicula = Carbon::parse($funcion->hora)->format('H:i:s');

            $fechaCombinada = Carbon::createFromFormat('Y-m-d H:i:s', "$fechaPelicula $horaPelicula");
            $resta = $fechaCombinada->diffInMinutes($fechaHoy);
            if ($resta < 0)
                $codigosPeliculas[] = $funcion->codPelicula;
        }
        $codigosPeliculas = array_unique($codigosPeliculas); // Se filtran los repetidos

        $peliculasA = Pelicula::all()->where('enCartelera', 1)->whereIn('codPelicula', $codigosPeliculas);

        foreach ($peliculasA as $peli) {
            if ($peli->estadoEliminacion == 1)
                $peliculas[] = $peli;
        }

        if (count($peliculas) == 0) {
            $data = [
                'message' => 'No hay películas en cartelera',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'peliculas' => $peliculas,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function mostrarEstrenos($id)
    {
        $peliculas = [];
        $fechaHoy = date('Y-m-d H:i:s');
        $funciones = [];
        $estrenos = [];

        if ($id == -1) {
            $salas = Sala::all()->where('estadoEliminacion', 1);
        } else {
            $salas = Sala::all()->where('codSucursal', $id)->where('estadoEliminacion', 1);
        }

        if (count($salas) == 0) {
            $data = [
                'message' => 'No hay salas en la sucursal',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        foreach ($salas as $sala) {
            $codigosSala[] = $sala->codSala;
        }

        $funciones = Funcion::all()->whereIn('codSala', $codigosSala)->where('estadoEliminacion', 1);

        if (count($funciones) == 0) {
            $data = [
                'message' => 'No hay funciones en la sucursal',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $codigosPeliculas = [];
        foreach ($funciones as $funcion) {

            // Revisa que la función no haya ocurrido ya
            $fechaPelicula = Carbon::parse($funcion->fecha)->format('Y-m-d');
            $horaPelicula = Carbon::parse($funcion->hora)->format('H:i:s');

            $fechaCombinada = Carbon::createFromFormat('Y-m-d H:i:s', "$fechaPelicula $horaPelicula");
            $resta = $fechaCombinada->diffInMinutes($fechaHoy);

            if ($resta < 0)
                $codigosPeliculas[] = $funcion->codPelicula;
        }
        $codigosPeliculas = array_unique($codigosPeliculas); // Se filtran los repetidos

        $peliculasA = Pelicula::all()->where('enCartelera', 1)->whereIn('codPelicula', $codigosPeliculas);

        foreach ($peliculasA as $peli) {
            if ($peli->estadoEliminacion == 1)
                $peliculas[] = $peli;
        }

        if (count($peliculas) == 0) {
            $data = [
                'message' => 'No hay películas en cartelera',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        foreach ($peliculas as $pelicula) {
            $fechaPelicula = Carbon::parse($pelicula->created_at);
            $resta = $fechaPelicula->diffInDays($fechaHoy);

            if ($resta <= 2) // Menor a d 2 días
                $estrenos[] = $pelicula;
        }

        $data = [
            'peliculas' => $estrenos,
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

        if ($pelicula->estadoEliminacion == 0) {
            $data = [
                'message' => 'Película eliminada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $data = [
            'pelicula' => $pelicula,
            'otro' => date_default_timezone_get(),
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
        try {
            $pelicula->estadoEliminacion = 0;
            $pelicula->enCartelera = 1;
            $pelicula->save();
        } catch (Exception $error) {
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
        try {
            $pelicula->estadoEliminacion = 1;
            $pelicula->enCartelera = 1;
            $pelicula->save();
        } catch (Exception $error) {
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
        try {
            $pelicula->enCartelera = 1;
            $pelicula->save();
        } catch (Exception $error) {
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
        try {
            $pelicula->enCartelera = 0;
            $pelicula->save();
        } catch (Exception $error) {
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
            "duracion" => ['required', 'numeric', 'min:0'],
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

        try {
            $pelicula->save();
        } catch (Exception $error) {
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
