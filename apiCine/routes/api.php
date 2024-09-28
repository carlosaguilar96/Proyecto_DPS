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
// Ruta para mostrar todas las sucursales por cine
Route::get('/sucursales/index/{id}', [SucursalController::class, 'index']);
// Ruta para mostrar una sucursal
Route::get('/sucursales/show/{id}', [SucursalController::class, 'show']);
// Ruta para modificar una sucursal
Route::put('/sucursales/update/{id}', [SucursalController::class, 'update']);
// No se podrán eliminar sucursales

//RUTAS PARA PRODUCTOS
//Ruta para crear producto
Route::post('/productos/crearProducto', [ProductoController::class, 'store']);
//Ruta para mostrar todos los productos
Route::get('/productos/index', [ProductoController::class, 'index']);
//Ruta para mostrar un producto
Route::get('/productos/show/{id}', [ProductoController::class, 'show']);
//Rutas para reactivar y eliminar productos
Route::put('/productos/eliminarProducto/{id}', [ProductoController::class, 'destroy']);
Route::put('/productos/reactivarProducto/{id}', [ProductoController::class, 'reactivate']);
//Ruta para modificar producto
Route::put('/productos/update/{id}', [ProductoController::class, 'update']);

//RUTAS PARA PELÍCULAS
//Ruta para crear película
Route::post('/peliculas/crearPelicula', [PeliculaController::class, 'store']);
//Ruta para mostrar todas las películas
Route::get('/peliculas/index', [PeliculaController::class, 'index']);
//Ruta para mostar una película
Route::get('/peliculas/show/{id}', [PeliculaController::class, 'show']);
//Rutas para reactivar y eliminar peliculas
Route::put('/peliculas/eliminarPelicula/{id}', [PeliculaController::class, 'destroy']);
Route::put('/peliculas/reactivarPelicula/{id}', [PeliculaController::class, 'reactivate']);
//Rutas para quitar y poner película en cartelera
Route::put('/peliculas/ponerCartelera/{id}', [PeliculaController::class, 'ponerC']);
Route::put('/peliculas/quitarCartelera/{id}', [PeliculaController::class, 'quitarC']);
//Ruta para modificar película
Route::put('/peliculas/update/{id}', [PeliculaController::class, 'update']);

//RUTAS PARA SALAS
//Ruta para crear salas
Route::post('/salas/crearSala', [SalaController::class, 'store']);
//Ruta para mostrar todas las salas
Route::get('/salas/index', [SalaController::class, 'index']);
//Ruta para mostrar una sala
Route::get('/salas/show/{id}', [SalaController::class, 'show']);
//Rutas para reactivar y eliminar salas
Route::put('/salas/eliminarSala/{id}', [SalaController::class, 'destroy']);
Route::put('/salas/reactivarSala/{id}', [SalaController::class, 'reactivate']);
//Ruta para modificar sala
Route::put('/salas/update/{id}', [SalaController::class, 'update']);

//RUTAS PARA FUNCIONES
//Ruta para crear función
Route::post('/funciones/crearFuncion', [FuncionController::class, 'store']);
//Ruta para mostrar todas las funciones
Route::get('/funciones/index', [FuncionController::class, 'index']);
//Ruta para mostrar una función
Route::get('/funciones/show/{id}', [FuncionController::class, 'show']);
//Rutas para reactivar y eliminar funciones
Route::put('/funciones/eliminarFuncion/{id}', [FuncionController::class, 'destroy']);
Route::put('/funciones/reactivarFuncion/{id}', [FuncionController::class, 'reactivate']);
//Ruta para modificar función
Route::put('/funciones/update/{id}', [FuncionController::class, 'update']);

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
// Los asientos no se pueden eliminar
// Los asientos no se pueden modificar
