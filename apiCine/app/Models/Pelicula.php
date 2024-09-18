<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pelicula extends Model
{
    use HasFactory;
    protected $table = 'peliculas';
    public $timestamps = false;

    protected $primaryKey = 'codPelicula';

    protected $fillable = [
        "nombre",
        "duracion",
        "clasificacion",
        "director",
        "genero",
        "sinopsis"
    ];
}
