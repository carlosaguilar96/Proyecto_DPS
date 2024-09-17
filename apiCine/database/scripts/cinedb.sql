CREATE DATABASE cinedb

USE cinedb

CREATE TABLE cine(
    nombreCine varchar(20) NOT NULL,
    logo_path varchar(100) NOT NULL,
    ubicacion varchar(150) NOT NULL,
    mision text NOT NULL, 
    vision text NOT NULL,
    telefono varchar(10) NOT NULL,
    firstAdmin varchar(20) NOT NULL
)

CREATE TABLE usuario(
    nombreUsuario varchar(20) PRIMARY KEY NOT NULL,
    contrasena text NOT NULL,
    DUI varchar(10) NOT NULL,
    nombres varchar(20) NOT NULL,
    apellidos varchar(20) NOT NULL,
    nivelAcceso varchar(10) NOT NULL,
    correoE varchar(20) NOT NULL    
)

-- Cliente
-- Admin

 CREATE TABLE producto(
    codProducto int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(20) NOT NULL,
    precioRegular decimal(10,2) NOT NULL,
    miniatura varchar(100) NOT NULL
 )

 CREATE TABLE pelicula(
    codPelicula varchar(10) PRIMARY KEY NOT NULL,
    nombre varchar(50) NOT NULL,
    duracion int NOT NULL,
    clasificacion varchar(15) NOT NULL,
    director varchar(30) NOT NULL,
    genero varchar(15) NOT NULL,
    sinopsis text 
 )

CREATE TABLE sala(
    codSala varchar(10) PRIMARY KEY NOT NULL,
    capacidad int NOT NULL,
    sucursal varchar(15) NOT NULL,
    tipo varchar(10) NOT NULL
)

CREATE TABLE funcion(
    codFuncion varchar(10) PRIMARY KEY NOT NULL,
    codPelicula varchar(10) NOT NULL,
    codSala varchar(10) NOT NULL,
    idioma varchar(10) NOT NULL,
    fechaHora datetime NOT NULL,
    precioAdulto decimal(10,2) NOT NULL,
    precioNino decimal(10,2) NOT NULL,
    precioTE decimal(10,2) NOT NULL,
    precioAdultoVIP decimal(10,2) NOT NULL,
    precioNinoVIP decimal(10,2) NOT NULL,
    precioTEVIP decimal(10,2) NOT NULL,

    FOREIGN KEY(codPelicula) REFERENCES codPelicula(pelicula),
    FOREIGN KEY(codSala) REFERENCES codPSala(sala)

)

CREATE TABLE compra(
    codCompra varchar(10) PRIMARY KEY NOT NULL,
    codCliente varchar(10) NOT NULL,
    codFuncion varchar(10) NOT NULL,
    codTransaccion varchar(10) NOT NULL,
    cantidadAdultos int NOT NULL,
    cantidadNinos int NOT NULL,
    cantidadTE int NOT NULL,
    cantidadAdultosVIP int NOT NULL,
    cantidadNinosVIP int NOT NULL,
    cantidadTEVIP int NOT NULL,
    asientos JSON

    FOREIGN KEY(codCompra) REFERENCES codCompra(compra),
    FOREIGN KEY(codCliente) REFERENCES nombreUsuario(usuario)
)

CREATE TABLE transaccion(
    codTransaccion varchar(10) PRIMARY KEY NOT NULL,
    precioTotal decimal(10,2) NOT NULL,
    fecha datetime,
    cardID int
)
