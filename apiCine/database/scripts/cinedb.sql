CREATE DATABASE cinedb

USE cinedb

CREATE TABLE usuarios(
    nombreUsuario varchar(20) PRIMARY KEY NOT NULL,
    contrasena text NOT NULL,
    DUI varchar(10) NOT NULL, -- incluri guión
    nombres varchar(25) NOT NULL,
    apellidos varchar(25) NOT NULL,
    nivelAcceso int NOT NULL, -- 1=admin, 2=cliente
    correoE varchar(50) NOT NULL,
    estadoEliminacion int DEFAULT "1" NOT NULL -- 1=activo, 0=eliminado
)

CREATE TABLE cines(
    codCine int PRIMARY KEY AUTO_INCREMENT,
    nombreCine varchar(20) NOT NULL,
    logo_path varchar(100) NOT NULL,
    mision text NOT NULL, 
    vision text NOT NULL,
    firstAdmin varchar(20) NOT NULL,

    FOREIGN KEY (firstAdmin) REFERENCES usuarios(nombreUsuario)
)

CREATE TABLE sucursales(
    codSucursal int PRIMARY KEY AUTO_INCREMENT,
    codCine int NOT NULL,
    sucursal varchar(20) NOT NULL, -- Soyapango
    ubicacion varchar(200) NOT NULL, -- Calle X Av X frente a ....
    telefono varchar(12) NOT NULL,

    FOREIGN KEY (codCine) REFERENCES cines(codCine)
)

CREATE TABLE peliculas(
    codPelicula int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(50) NOT NULL,
    duracion int NOT NULL, -- en minutos
    clasificacion varchar(15) NOT NULL, -- A=todo público, B=mayores de 12 años, C=mayores de 15 años, D=mayores de 18 años
    director varchar(30) NOT NULL,
    genero varchar(15) NOT NULL,
    sinopsis text,
    enCartelera int DEFAULT "0" NOT NULL, -- 1=en cartelera, 0=no en cartelera
    estadoEliminacion int DEFAULT "1" NOT NULL, -- 1=activa, 0=eliminada
    imagen varchar(100) NOT NULL,
    updated_at datetime,
    created_at datetime
 )

CREATE TABLE salas(
    codSala int PRIMARY KEY AUTO_INCREMENT,
    capacidad int NOT NULL,
    codSucursal int NOT NULL,
    estadoEliminacion int DEFAULT "1" NOT NULL, -- 1=activa, 0=eliminada

    FOREIGN KEY (codSucursal) REFERENCES sucursales(codSucursal)
)

CREATE TABLE funciones(
    codFuncion int PRIMARY KEY AUTO_INCREMENT,
    codPelicula int NOT NULL,
    codSala int NOT NULL,
    idioma varchar(25) NOT NULL,
    fecha date NOT NULL, -- AAAA-MM-DD
    hora time NOT NULL, -- HH-MM-SS
    precioAdulto decimal(10,2) NOT NULL,
    precioNino decimal(10,2) NOT NULL,
    precioTE decimal(10,2) NOT NULL,
    estadoEliminacion int DEFAULT "1" NOT NULL, -- 1=activa, 0=eliminada
    

    FOREIGN KEY(codPelicula) REFERENCES peliculas(codPelicula),
    FOREIGN KEY(codSala) REFERENCES salas(codSala)

)

CREATE TABLE compras(
    codCompra int PRIMARY KEY AUTO_INCREMENT,
    nombreUsuario varchar(10) NOT NULL,
    codFuncion int NOT NULL,
    cantidadAdultos int NOT NULL,
    cantidadNinos int NOT NULL,
    cantidadTE int NOT NULL,

    FOREIGN KEY(nombreUsuario) REFERENCES usuarios(nombreUsuario),
    FOREIGN KEY(codFuncion) REFERENCES funciones(codFuncion)

)

CREATE TABLE transacciones(
    codTransaccion int PRIMARY KEY AUTO_INCREMENT,
    codCompra int NOT NULL,
    precioTotal decimal(10,2) NOT NULL,
    fecha datetime,
    cardID varchar(6),

    FOREIGN KEY(codCompra) REFERENCES compras(codCompra)
)

CREATE TABLE asientos(
    codRelacion int PRIMARY KEY AUTO_INCREMENT,
    numButaca varchar(5) NOT NULL,
    codCompra int NOT NULL,

    FOREIGN KEY (codCompra) REFERENCES compras(codCompra)
)


 CREATE TABLE productos(
    codProducto int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(20) NOT NULL,
    descripcion text NOT NULL,
    precioRegular decimal(10,2) NOT NULL,
    miniatura varchar(100) NOT NULL,
    estadoEliminacion int DEFAULT "1" NOT NULL
 )