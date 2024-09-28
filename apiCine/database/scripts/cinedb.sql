CREATE DATABASE cinedb

USE cinedb

CREATE TABLE usuarios(
    nombreUsuario varchar(20) PRIMARY KEY NOT NULL,
    contrasena text NOT NULL,
    DUI varchar(10) NOT NULL,
    nombres varchar(20) NOT NULL,
    apellidos varchar(20) NOT NULL,
    nivelAcceso int NOT NULL,
    correoE varchar(20) NOT NULL,
    estadoEliminacion int DEFAULT "1" NOT NULL
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

-- Cliente
-- Admin

 CREATE TABLE productos(
    codProducto int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(20) NOT NULL,
    descripcion text NOT NULL,
    precioRegular decimal(10,2) NOT NULL,
    miniatura varchar(100) NOT NULL,
    estadoEliminacion int DEFAULT "1" NOT NULL
 )

 CREATE TABLE peliculas(
    codPelicula int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(50) NOT NULL,
    duracion int NOT NULL,
    clasificacion varchar(15) NOT NULL,
    director varchar(30) NOT NULL,
    genero varchar(15) NOT NULL,
    sinopsis text,
    enCartelera int DEFAULT "1" NOT NULL,
    estadoEliminacion int DEFAULT "1" NOT NULL,
    imagen varchar(100) NOT NULL
 )

CREATE TABLE salas(
    codSala int PRIMARY KEY AUTO_INCREMENT,
    capacidad int NOT NULL,
    codSucursal int NOT NULL,
    estadoEliminacion int DEFAULT "1" NOT NULL,

    FOREIGN KEY (codSucursal) REFERENCES sucursales(codSucursal)
)

CREATE TABLE funciones(
    codFuncion int PRIMARY KEY AUTO_INCREMENT,
    codPelicula int NOT NULL,
    codSala int NOT NULL,
    idioma varchar(10) NOT NULL,
    fecha date NOT NULL,
    hora time NOT NULL,
    precioAdulto decimal(10,2) NOT NULL,
    precioNino decimal(10,2) NOT NULL,
    precioTE decimal(10,2) NOT NULL,
    estadoEliminacion int DEFAULT "1" NOT NULL,
    

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

    FOREIGN KEY(nombreUsuario) REFERENCES usuarios(nombreUsuario),
    FOREIGN KEY(codFuncion) REFERENCES funciones(codFuncion),
    FOREIGN KEY(codTransaccion) REFERENCES transacciones(codTransaccion)

)

CREATE TABLE asientos(
    codRelacion int PRIMARY KEY AUTO_INCREMENT,
    numButaca varchar(5) NOT NULL,
    codCompra int NOT NULL,

    FOREIGN KEY (codCompra) REFERENCES compras(codCompra)
)