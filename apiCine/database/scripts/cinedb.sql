CREATE DATABASE cinedb

USE cinedb

CREATE TABLE usuarios(
    nombreUsuario varchar(20) PRIMARY KEY NOT NULL,
    contrasena text NOT NULL,
    DUI varchar(10) NOT NULL,
    nombres varchar(20) NOT NULL,
    apellidos varchar(20) NOT NULL,
    nivelAcceso varchar(10) NOT NULL,
    correoE varchar(20) NOT NULL    
)

CREATE TABLE cines(
    codCine int PRIMARY KEY AUTO_INCREMENT,
    nombreCine varchar(20) NOT NULL,
    logo_path varchar(100) NOT NULL,
    ubicacion JSON NOT NULL,
    mision text NOT NULL, 
    vision text NOT NULL,
    telefono varchar(10) NOT NULL,
    firstAdmin varchar(20) NOT NULL,

    FOREIGN KEY (firstAdmin) REFERENCES usuarios(nombreUsuario)
)

-- Cliente
-- Admin

 CREATE TABLE productos(
    codProducto int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(20) NOT NULL,
    precioRegular decimal(10,2) NOT NULL,
    miniatura varchar(100) NOT NULL
 )

 CREATE TABLE peliculas(
    codPelicula int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(50) NOT NULL,
    duracion int NOT NULL,
    clasificacion varchar(15) NOT NULL,
    director varchar(30) NOT NULL,
    genero varchar(15) NOT NULL,
    sinopsis text 
 )

CREATE TABLE salas(
    codSala int PRIMARY KEY AUTO_INCREMENT,
    capacidad int NOT NULL,
    sucursal varchar(15) NOT NULL,
    tipo varchar(10) NOT NULL
)

CREATE TABLE funciones(
    codFuncion int PRIMARY KEY AUTO_INCREMENT,
    codPelicula int NOT NULL,
    codSala int NOT NULL,
    idioma varchar(10) NOT NULL,
    fechaHora datetime NOT NULL,
    precioAdulto decimal(10,2) NOT NULL,
    precioNino decimal(10,2) NOT NULL,
    precioTE decimal(10,2) NOT NULL,
    precioAdultoVIP decimal(10,2) NOT NULL,
    precioNinoVIP decimal(10,2) NOT NULL,
    precioTEVIP decimal(10,2) NOT NULL,

    FOREIGN KEY(codPelicula) REFERENCES peliculas(codPelicula),
    FOREIGN KEY(codSala) REFERENCES salas(codSala)

)


CREATE TABLE transacciones(
    codTransaccion int PRIMARY KEY AUTO_INCREMENT,
    precioTotal decimal(10,2) NOT NULL,
    fecha datetime,
    cardID varchar(6)
)


CREATE TABLE compras(
    codCompra int PRIMARY KEY AUTO_INCREMENT,
    nombreUsuario varchar(10) NOT NULL,
    codFuncion int NOT NULL,
    codTransaccion int NOT NULL,
    cantidadAdultos int NOT NULL,
    cantidadNinos int NOT NULL,
    cantidadTE int NOT NULL,
    cantidadAdultosVIP int NOT NULL,
    cantidadNinosVIP int NOT NULL,
    cantidadTEVIP int NOT NULL,
    asientos JSON,

    FOREIGN KEY(nombreUsuario) REFERENCES usuarios(nombreUsuario),
    FOREIGN KEY(codFuncion) REFERENCES funciones(codFuncion),
    FOREIGN KEY(codTransaccion) REFERENCES transacciones(codTransaccion)

)
