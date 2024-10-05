<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Funcion;
use App\Models\Pelicula;
use App\Models\Sucursal;
use App\Models\Sala;
use App\Models\Compra;
use App\Models\Asiento;
use Exception;

class FuncionController extends Controller
{
    //Función para almacenar función
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            "codPelicula" => "required",
            "codSala" => "required",
            "idioma" => "required",
            "fecha" => "required",
            "hora" => "required",
            "precioAdulto" => ["required",'numeric', 'min:0'],
            "precioNino" => ["required",'numeric', 'min:0'],
            "precioTE" => ["required",'numeric', 'min:0']
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
            $funcion = Funcion::create([
                "codPelicula" => $request->codPelicula,
                "codSala" => $request->codSala,
                "idioma" => $request->idioma,
                "fecha" => $request->fecha,
                "hora" => $request->hora,
                "precioAdulto" => $request->precioAdulto,
                "precioNino" => $request->precioNino,
                "precioTE" => $request->precioTE
            ]);

            $pelicula = Pelicula::find($request->codPelicula);

            $pelicula->enCartelera = 1;
            $pelicula->save();
            
        } catch (Exception $error) {
            $data = [
                'message' => 'Error al crear la función: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'funcion' => $funcion,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    //Función para mostrar todas las funciones
    public function index()
    {
        $funciones = Funcion::all();
        $data = [
            'funciones' => $funciones,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    // Un index que además de la información de las funciones muestra el nombre de la película, la imagen y la sucursal
    public function indexDetallado(){
        $funciones = [];

        foreach(Funcion::all() as $funcion){
            $pelicula = Pelicula::find($funcion->codPelicula);
            $funcion->titulo = $pelicula->nombre;
            $funcion->image = $pelicula->imagen;

            $sala = Sala::find($funcion->codSala);
            $sucursal = Sucursal::find($sala->codSucursal);
            $funcion->sucursal = $sucursal->sucursal;

            $funciones[] = $funcion;
        }

        $data = [
            'funciones' => $funciones,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    public function devolverAsientos($id)
    {

        $compras =  Compra::all()->where('codFuncion', $id);

        $funcion = Funcion::find($id);
        if (!$funcion) {
            $data = [
                'message' => 'Función no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        
        $asientos = [];

        foreach($compras as $compra){
            $asientosCompra = Asiento::all()->where('codCompra', $compra->codCompra);

            foreach($asientosCompra as $asiento){
                $asientos[] = $asiento->numButaca;
            }
        }

        $data = [
            'asientos' => $asientos,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para mostrar una función específica
    public function show($id)
    {
        $funcion = Funcion::find($id);
        if (!$funcion) {
            $data = [
                'message' => 'Función no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $data = [
            'funcion' => $funcion,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para eliminar una función
    public function destroy($id)
    {
        $funcion = Funcion::find($id);
        if (!$funcion) {
            $data = [
                'message' => 'Función no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        try {
            $funcion->estadoEliminacion = 0;
            $funcion->save();
        } catch (Exception $error) {
            $data = [
                'message' => 'Error al eliminar la función: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }
        $data = [
            'message' => "Función de código $id eliminada",
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para reactivar una función
    public function reactivate($id)
    {
        $funcion = Funcion::find($id);
        if (!$funcion) {
            $data = [
                'message' => 'Función no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        try {
            $funcion->estadoEliminacion = 1;
            $funcion->save();
        } catch (Exception $error) {
            $data = [
                'message' => 'Error al reactivar la función: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }
        $data = [
            'message' => "Función de código $id reactivada",
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para actualizar función
    public function update(Request $request, $id)
    {
        $funcion = Funcion::find($id);
        if (!$funcion) {
            $data = [
                'message' => 'Función no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $validator = Validator::make($request->all(), [
            "codPelicula" => "required",
            "codSala" => "required",
            "idioma" => "required",
            "fecha" => "required",
            "hora" => "required",
            "precioAdulto" => ["required",'numeric', 'min:0'],
            "precioNino" => ["required",'numeric', 'min:0'],
            "precioTE" => ["required",'numeric', 'min:0']
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación',
                'errors' => $validator->errors(),
                'status' => 400
            ];

            return response()->json($data, 400);
        }
        $funcion->codPelicula = $request->codPelicula;
        $funcion->codSala = $request->codSala;
        $funcion->idioma = $request->idioma;
        $funcion->fecha = $request->fecha;
        $funcion->hora = $request->hora;
        $funcion->precioAdulto = $request->precioAdulto;
        $funcion->precioNino = $request->precioNino;
        $funcion->precioTE = $request->precioTE;

        try{
            $funcion->save();
        }catch(Exception $error){
            $data = [
                'message' => 'Error al actualizar la función: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'message' => 'Función actualizada',
            'funcion' => $funcion,
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
