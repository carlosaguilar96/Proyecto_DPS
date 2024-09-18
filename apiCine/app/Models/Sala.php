<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sala extends Model
{
    use HasFactory;
    protected $table = 'salas';
    public $timestamps = false;

    protected $primaryKey = 'codSala';

    protected $fillable = [
        "capacidad",
        "sucursal",
        "tipo",
    ];
}
