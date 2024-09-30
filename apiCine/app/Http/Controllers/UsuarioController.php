<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{
    //Función para almacenar administrador
    public function storeAdmin(Request $request){

        $validator = Validator::make($request->all() , [
            'nombreUsuario' => ['required', 'unique:usuarios'],
            'contrasena'  => ['required', 'min:8'],
            'DUI'  => ['required', 'unique:usuarios'],
            'nombres'  => 'required',
            'apellidos'  => 'required',
            'correoE'  => ['required', 'email', 'unique:usuarios'],
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
                'contrasena'  => Hash('SHA256', $request->contrasena),
                'DUI'  => $request->DUI,
                'nombres'  => $request->nombres,
                'apellidos'  => $request->apellidos,
                'nivelAcceso'  => 1,
                'correoE'  => $request->correoE
            ]);
        } catch(Exception $error){
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

    //Función para almacenar cliente
    public function storeCliente(Request $request){

        $validator = Validator::make($request->all() , [
            'nombreUsuario' => ['required', 'unique:usuarios'],
            'contrasena'  => ['required', 'min:8'],
            'DUI'  => ['required', 'unique:usuarios'],
            'nombres'  => 'required',
            'apellidos'  => 'required',
            'correoE'  => ['required', 'email', 'unique:usuarios'],
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
                'contrasena'  => Hash('SHA256', $request->contrasena),
                'DUI'  => $request->DUI,
                'nombres'  => $request->nombres,
                'apellidos'  => $request->apellidos,
                'nivelAcceso'  => 2,
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

    //Función para mostrar index de administradores
    public function indexAdmins(){
        $usuarios = Usuario::where('nivelAcceso', 1)->get();
        $data = [
            'usuarios' => $usuarios,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para mostrar index de clientes
    public function indexClientes(){
        $usuarios = Usuario::where('nivelAcceso', 2)->get();
        $data = [
            'usuarios' => $usuarios,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para mostrar usuario específico
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

    //Función para eliminar un usuario
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
            $usuario->estadoEliminacion = 0;
            $usuario->save();
        }catch(Exception $error){
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

    //Función para reactivar usuario eliminado
    public function reactivate($id){
        $usuario = Usuario::find($id);
        if(!$usuario){
            $data = [
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        try{
            $usuario->estadoEliminacion = 1;
            $usuario->save();
        }catch(Exception $error){
            $data = [
                'message' => 'Error al reactivar el usuario: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }
        $data = [
            'message' => "Usuario de nombre $id reactivado",
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para actualizar datos de usuario
    public function update(Request $request, $id){
        $usuario = Usuario::find($id);
        if(!$usuario){
            $data = [
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $validator = Validator::make($request->all() , [
            'nombreUsuario' => ['required','unique:usuarios,nombreUsuario,'.$id.',nombreUsuario'],
            'DUI'  => ['required', 'unique:usuarios,DUI,'.$id. ',nombreUsuario'],
            'nombres'  => 'required',
            'apellidos'  => 'required',
            'correoE'  => ['required', 'email', 'unique:usuarios,correoE,'.$id. ',nombreUsuario']
        ]);

        if($validator->fails()){
            $data = [
                'message' => 'Error en la validación',
                'errors' => $validator->errors(),
                'status' => 400
            ];

            return response()->json($data, 400);
        }

        $usuario->nombreUsuario = $request->nombreUsuario;
        $usuario->DUI  = $request->DUI;
        $usuario->nombres  = $request->nombres;
        $usuario->apellidos  = $request->apellidos;
        $usuario->correoE = $request->correoE;

        try{
            $usuario->save();
        }catch(Exception $error){
            $data = [
                'message' => 'Error al actualizar el usuario: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'message' => 'Usuario actualizado',
            'usuario' => $usuario,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para cambiar contraseña de usuario
    public function changePass(Request $request, $id){
        $usuario = Usuario::find($id);
        if(!$usuario){
            $data = [
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all() , [
            'pwActual' => 'required',
            'pwNueva'  => ['required', 'min:8'],
            'pwConfirmar'  => 'required'
        ]);

        $validator->after(function($validator) use($request, $usuario){
            if($usuario->contrasena != Hash('SHA256', $request->pwActual)){
                $validator->errors()->add('pwActual','La contraseña actual es incorrecta');
            }
            if($request->pwNueva != $request->pwConfirmar){
                $validator->errors()->add('pwConfirmar','La contraseña nueva no ha sido confirmada');
            }
        });

        if($validator->fails()){
            $data = [
                'message' => 'Error en la validación',
                'errors' => $validator->errors(),
                'status' => 400
            ];

            return response()->json($data, 400);
        }

        try{
            $usuario->contrasena = Hash('SHA256', $request->pwNueva);
            $usuario->save();
        }catch(Exception $error){
            $data = [
                'message' => 'Error al actualizar contraseña: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }

        $data = [
            'message' => 'Contraseña actualizada',
            'usuario' => $usuario,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    //Función para iniciar sesión
    public function login(Request $request){
        $validator = Validator::make($request->all() , [
            'user'  => 'required',
            'password'  => 'required'
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
            $userName = $request->input("user");
            $pass = $request->input("password");

            $usuario = Usuario::find($userName);
            if(!$usuario){
                $data = [
                    'message' => 'Usuario no encontrado',
                    'status' => 404
                ];
                return response()->json($data, 404);
            }
            if($usuario->contrasena == Hash('SHA256',$pass)){
                $data = [
                    'message' => 'Ingreso autorizado',
                    'usuario' => $usuario,
                    'status' => 200
                ];
                return response()->json($data, 200);
            } else{
                $data = [
                    'message' => 'Ingreso no autorizado',
                    'status' => 401
                ];
                return response()->json($data, 200);
            }
        } catch (Exception $error){
            $data = [
                'message' => 'Error al iniciar sesión: ' . $error->getMessage(),
                'status' => 500
            ];

            return response()->json($data, 500);
        }
    }
}
