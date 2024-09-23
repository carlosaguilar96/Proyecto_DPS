<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asiento extends Model
{
    use HasFactory;
    protected $table = 'asientos';
    public $timestamps = false;

    protected $primaryKey = 'codRelacion';

    protected $fillable = [
        'numButaca',
        'codCompra'
    ];
}
