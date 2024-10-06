<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Confirmar compra</title>
</head>
<body>
    <h1>Recibo de compra</h1>
    <h2>¡Hola {{ $nombre}}!<br> Aquí está el recibo de tu compra:</h2>
    <h4>Fecha de compra: {{ $fecha }}<br>
    Últimos dígitos de tarjeta: {{ $tarjeta }}<br>
    Película: {{ $pelicula }}<br>
    Detalles función: {{ $sala }}<br>
    Boletos comprado: @foreach($boletosN as $b) {{ $b }} @endforeach<br>
    Total boletos comprados: {{ $boletos }}<br>
    Total de la compra: ${{ $total }}<br></h4>
    <h3>Gracias por tu preferencia, disfruta tu función.</h3>
</body>
</html>