#!/bin/bash

composer install #Se vuelve a instalar composer 
php artisan serve --host=0.0.0.0 --port=8000 #Se ejecuta el server dentro del contenedor en el puerto 8000

php-fpm
