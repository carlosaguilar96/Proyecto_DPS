<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Validator;

class UsuarioController extends Controller
{
    public function store(Request $request){

        $validator = Validator::make($request->all() , [
            'nombreUsuario' => 'required',
            'contrasena'  => 'required',
            'DUI'  => 'required',
            'nombres'  => 'required',
            'apellidos'  => 'required',
            'nivelAcceso'  => 'required',
            'correoE'  => 'required'
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
            $usuario = Usuario::create([
                'nombreUsuario' => $request->nombreUsuario,
                'contrasena'  => $request->contrasena,
                'DUI'  => $request->DUI,
                'nombres'  => $request->nombres,
                'apellidos'  => $request->apellidos,
                'nivelAcceso'  => $request->nivelAcceso,
                'correoE'  => $request->correoE
            ]);
        } catch(\Exception $error){
            $data = [
                'message' => 'Error al crear el usuario: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'usuario' => $usuario,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    public function index(){
        $usuarios = Usuario::all();
        $data = [
            'usuarios' => $usuarios,
            'status' => 200
        ];
        return response()->json($data, 200);
    }


    public function show($id){
        $usuario = Usuario::find($id);
        if(!$usuario){
            $data = [
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $data = [
            'usuario' => $usuario,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    public function destroy($id){
        $usuario = Usuario::find($id);
        if(!$usuario){
            $data = [
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        try{
            $usuario->delete();
        }catch(\Exception $error){
            $data = [
                'message' => 'Error al eliminar el usuario: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }
        $data = [
            'message' => "Usuario de nombre $id eliminado",
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
