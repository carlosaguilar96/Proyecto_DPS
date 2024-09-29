<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Funcion extends Model
{
    use HasFactory;
    protected $table = 'funciones';
    public $timestamps = false;

    protected $primaryKey = 'codFuncion';

    protected $fillable = [
        'codPelicula',
        'codSala',
        'idioma',
        'fecha',
        'hora',
        'precioAdulto',
        'precioNino',
        'precioTE'
    ];

}
