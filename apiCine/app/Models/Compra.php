<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    use HasFactory;
    protected $table = 'compras';
    public $timestamps = false;

    protected $primaryKey = 'codCompra';

    protected $fillable = [
        "nombreUsuario",
        "codFuncion",
        "codTransaccion",
        "cantidadAdultos",
        "cantidadNinos",
        "cantidadTE",
        "cantidadAdultosVIP",
        "cantidadNinosVIP",
        "cantidadTEVIP",
        "asientos"
    ];
}
