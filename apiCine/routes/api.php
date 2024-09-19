<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CineController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\FuncionController;
use App\Http\Controllers\PeliculaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\SalaController;
use App\Http\Controllers\TransaccionController;
use App\Http\Controllers\UsuarioController;


Route::post('/usuarios', [UsuarioController::class, 'store']);
Route::get('/usuarios', [UsuarioController::class, 'index']);
Route::get( '/usuarios/{id}', [UsuarioController::class, 'show']);
Route::delete( '/usuarios/{id}', [UsuarioController::class, 'destroy']);

Route::post('/cines', [CineController::class, 'store']);
Route::get('/cines', [CineController::class, 'index']);
// Solo hay un cine por base de datos
// El cine nunca se borrará

Route::post('/productos', [ProductoController::class, 'store']);
Route::get('/productos', [ProductoController::class, 'index']);
Route::get('/productos/{id}', [ProductoController::class, 'show']);
Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);

Route::post('/peliculas', [PeliculaController::class, 'store']);
Route::get('/peliculas', [PeliculaController::class, 'index']);
Route::get('/peliculas/{id}', [PeliculaController::class, 'show']);
Route::delete('/peliculas/{id}', [PeliculaController::class, 'destroy']);

Route::post('/salas', [SalaController::class, 'store']);
Route::get('/salas', [SalaController::class, 'index']);
Route::get('/salas/{id}', [SalaController::class, 'show']);
Route::delete('/salas/{id}', [SalaController::class, 'destroy']);

Route::post('/funciones', [FuncionController::class, 'store']);
Route::get('/funciones', [FuncionController::class, 'index']);
Route::get('/funciones/{id}', [FuncionController::class, 'show']);
Route::delete('/funciones/{id}', [FuncionController::class, 'destroy']);

Route::post('/transacciones', [TransaccionController::class, 'store']);
Route::get('/transacciones', [TransaccionController::class, 'index']);
Route::get('/transacciones/{id}', [TransaccionController::class, 'show']);
// Las transacciones ya no se pueden regresar

Route::post('/compras', [CompraController::class, 'store']);
Route::get('/compras', [CompraController::class, 'index']);
Route::get('/compras/{id}', [CompraController::class, 'show']);
// No se ha planteado la devolución o la cancelación de la compra.
