<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cine extends Model
{
    use HasFactory;

    protected $table = 'cines';
    public $timestamps = false;

    protected $primaryKey = 'codCine';

    protected $fillable = [
        'nombreCine',
        'logo_path',
        'mision',
        'vision',
        'firstAdmin'
    ];

}
