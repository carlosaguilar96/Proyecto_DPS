<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $table = 'usuarios';
    public $timestamps = false;

    protected $primaryKey = 'nombreUsuario';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'nombreUsuario',
        'contrasena',
        'DUI',
        'nombres',
        'apellidos',
        'nivelAcceso',
        'correoE'
    ];
}
