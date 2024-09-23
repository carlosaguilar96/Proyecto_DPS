<?php

use App\Http\Controllers\AsientoController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CineController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\FuncionController;
use App\Http\Controllers\PeliculaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\SalaController;
use App\Http\Controllers\SucursalController;
use App\Http\Controllers\TransaccionController;
use App\Http\Controllers\UsuarioController;

//RUTAS PARA USUARIOS
//Rutas para crear usuarios de tipo Administrador o Cliente
Route::post('/usuarios/crearAdministrador', [UsuarioController::class, 'storeAdmin']);
Route::post('/usuarios/crearCliente', [UsuarioController::class, 'storeCliente']);
//Rutas para mostrar todos los usuarios de tipo administrador
Route::get('/usuarios/indexAdmins', [UsuarioController::class, 'indexAdmins']);
//Rutas para mostrar todos los usuarios de tipo cliente
Route::get('/usuarios/indexClientes', [UsuarioController::class, 'indexClientes']);
//Ruta para mostrar un usuario específico
Route::get('/usuarios/show/{id}', [UsuarioController::class, 'show']);
//Rutas para eliminar y reactivar usuario
Route::put('/usuarios/eliminarUsuario/{id}', [UsuarioController::class, 'destroy']);
Route::put('/usuarios/reactivarUsuario/{id}', [UsuarioController::class, 'reactivate']);
//Ruta para modificar usuario
Route::put('/usuarios/modificarUsuario/{id}', [UsuarioController::class, 'update']);
//Ruta para cambiar contraseña
Route::put('/usuarios/cambiarPassword/{id}', [UsuarioController::class, 'changePass']);

//RUTAS PARA CINES
//Ruta para crear cine
Route::post('/cines/crearCine', [CineController::class, 'store']);
//Ruta para mostrar cine
Route::get('/cines/show/{id}', [CineController::class, 'show']);
//Ruta para modificar cine
Route::put('/cines/update/{id}', [CineController::class, 'update']);
// Solo hay un cine por base de datos
// El cine nunca se borrará


// RUTAS PARA SUCURSALES
// Ruta para crear la sucursal
Route::post('/sucursales/crearSucursal', [SucursalController::class, 'store']);
// Ruta para mostrar todas las sucursales
Route::get('/sucursales/index', [SucursalController::class, 'index']);
// Ruta para mostrar una sucursal
Route::get('/sucursales/index/{id}', [SucursalController::class, 'show']);
// Ruta para modificar una sucursal
Route::put('/sucursales/update/{id}', [SucursalController::class, 'update']);
// Ruta para eliminar una sucursal
Route::delete('/sucursales/eliminar/{id}', [SucursalController::class, 'destroy']);


Route::post('/productos', [ProductoController::class, 'store']);
Route::get('/productos', [ProductoController::class, 'index']);
Route::get('/productos/{id}', [ProductoController::class, 'show']);
Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);
Route::put('/productos/{id}', [ProductoController::class, 'update']);

Route::post('/peliculas', [PeliculaController::class, 'store']);
Route::get('/peliculas', [PeliculaController::class, 'index']);
Route::get('/peliculas/{id}', [PeliculaController::class, 'show']);
Route::delete('/peliculas/{id}', [PeliculaController::class, 'destroy']);
Route::put('/peliculas/{id}', [PeliculaController::class, 'update']);

Route::post('/salas', [SalaController::class, 'store']);
Route::get('/salas', [SalaController::class, 'index']);
Route::get('/salas/{id}', [SalaController::class, 'show']);
Route::delete('/salas/{id}', [SalaController::class, 'destroy']);
Route::put('/salas/{id}', [SalaController::class, 'update']);

Route::post('/funciones', [FuncionController::class, 'store']);
Route::get('/funciones', [FuncionController::class, 'index']);
Route::get('/funciones/{id}', [FuncionController::class, 'show']);
Route::delete('/funciones/{id}', [FuncionController::class, 'destroy']);
Route::put('/funciones/{id}', [FuncionController::class, 'update']);

Route::post('/transacciones', [TransaccionController::class, 'store']);
Route::get('/transacciones', [TransaccionController::class, 'index']);
Route::get('/transacciones/{id}', [TransaccionController::class, 'show']);
// Las transacciones ya no se pueden regresar
// No se pueden modificar

Route::post('/compras', [CompraController::class, 'store']);
Route::get('/compras', [CompraController::class, 'index']);
Route::get('/compras/{id}', [CompraController::class, 'show']);
// No se ha planteado la devolución o la cancelación de la compra.
// No se pueden modificar

Route::post('/asientos', [AsientoController::class, 'store']);
Route::get('/asientos', [AsientoController::class, 'index']);
Route::get('/asientos/{id}', [AsientoController::class, 'show']);
