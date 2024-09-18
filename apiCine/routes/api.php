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

Route::post('/cines', [CineController::class, 'store']);

Route::post('/usuarios', [UsuarioController::class, 'store']);

Route::post('/productos', [ProductoController::class, 'store']);

Route::post('/peliculas', [PeliculaController::class, 'store']);

Route::post('/salas', [SalaController::class, 'store']);

Route::post('/funciones', [FuncionController::class, 'store']);

Route::post('/transacciones', [TransaccionController::class, 'store']);

Route::post('/compras', [CompraController::class, 'store']);
