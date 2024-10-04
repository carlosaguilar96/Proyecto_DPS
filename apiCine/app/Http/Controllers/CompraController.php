<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Compra;
use App\Models\Funcion;
use Exception;
use App\Models\Transaccion;
use Carbon\Carbon;
use App\Models\Asiento;

class CompraController extends Controller
{
    //Función para almacenar compra, asientos y transacción
    public function store(Request $request){

        $validator = Validator::make($request->all() , [
            "nombreUsuario" => 'required',
            "codFuncion" => 'required',
            "cantidadAdultos" => ["required",'numeric', 'min:0'],
            "cantidadNinos" => ["required",'numeric', 'min:0'],
            "cantidadTE" => ["required",'numeric', 'min:0'],
            "cardID" => ['required','regex:/^\d{4}-\d{4}-\d{4}-\d{4}$/'],
            "asientos" => ['required','array']
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
            //Creación de compra
            $compra = Compra::create([
                "nombreUsuario" => $request->nombreUsuario,
                "codFuncion" => $request->codFuncion,
                "cantidadAdultos" => $request->cantidadAdultos,
                "cantidadNinos" => $request->cantidadNinos,
                "cantidadTE" => $request->cantidadTE,
            ]);

            //Creación de asientos
            $asientos = $request->asientos;
            foreach($asientos as $asiento){
                Asiento::create([
                    "numButaca" => $asiento,
                    "codCompra" => $compra->codCompra
                ]);
            }

            //Creación de transacción
            $funcion = Funcion::find($request->codFuncion);
            $precioTotal = $funcion->precioAdulto * $compra->cantidadAdultos + 
                           $funcion->precioNino * $compra->cantidadNinos + 
                           $funcion->precioTE * $compra->cantidadTE;
            $lastDigits = substr($request->cardID, -4);
            $transaccion = Transaccion::create([
                "precioTotal" => $precioTotal,
                "fecha" => Carbon::now('America/El_Salvador'),
                "cardID" => $lastDigits,
                "codCompra" => $compra->codCompra
            ]);
        } catch(Exception $error){
            $data = [
                'message' => 'Error al crear la compra: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'compra' => $compra,
            'transaccion' => $transaccion,
            'asientos' => $asientos,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    //Función para ver todas las compras
    public function index(){
        $compras = Compra::all();
        $data = [
            'compras' => $compras,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para ver una compra específica
    public function show($id){
        $compra= Compra::find($id);
        if(!$compra){
            $data = [
                'message' => 'Compra no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $data = [
            'compra' => $compra,
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
