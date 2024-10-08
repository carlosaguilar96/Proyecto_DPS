export const Cupones = [
  {
    id: '1',
    image: require('../assets/img/cupon1.jpg'),
  },
  {
    id: '2',
    image: require('../assets/img/cupon2.jpg'),
  },
  {
    id: '3',
    image: require('../assets/img/cupon3.jpg'),
  },
  {
    id: '4',
    image: require('../assets/img/cupon4.jpg'),
  }
]

export const Funcion = [
  {
    id: 1,
    title: 'Película 1',
    image: require('../assets/img/02.jpg'), 
    sucursal: 'Y',
    sala: '1',
    idioma: 'Sub Español',
    fecha: '2024-09-30',
    hora: '2:00 pm',
    precioAdulto: 2,
    precioNino: 3,
    precioTE: 5,
    estadoE: 1,
  },
  {
    id: 2,
    title: 'Película 1',
    image: require('../assets/img/02.jpg'), 
    sucursal: 'X',
    idioma: 'Sub Español',
    sala: '2',
    fecha: '2024-10-02',
    hora: '3:00 pm',
    precioAdulto: 3,
    precioNino: 3,
    precioTE: 5,
    estadoE: 0,
  },
  {
    id: 3,
    title: 'Película 1',
    image: require('../assets/img/02.jpg'),
    fecha: '2024-09-30',
    idioma: 'dub',
    hora: '5:00 pm',
    sucursal: 'X',
    sala: '3',
    precioAdulto: 5,
    precioNino: 5,
    precioTE: 5,
    estadoE: 0,
  },
  {
    id: 4,
    title: 'Película 3',
    image: require('../assets/img/film.png'),
    fecha: '2024-09-30',
    idioma: 'Sub',
    hora: '2:00 pm',
    sala: '4',
    sucursal: 'X',
    precioAdulto: 3,
    precioNino: 3,
    precioTE: 5,
    estadoE: 1,
  },
  {
      id: 5,
      title: 'Película 4',
      image: require('../assets/img/film.png'),
      fecha: '2024-10-02',
      idioma: 'Dub',
      hora: '2:00 pm',
      sucursal: 'Y',
      sala: '3',
      precioAdulto: 2,
      precioNino: 4,
      precioTE: 5,
      estadoE: 0,
  },
  {
      id: 6,
      title: 'Película 4',
      image: require('../assets/img/film.png'),
      fecha: '2024-10-01',
      idioma: 'Sub español',
      hora: '5:00 pm',
      sucursal: 'Y',
      precioAdulto: 4,
      precioNino: 4,
      precioTE: 5,
      estadoE: 0,
  },
  {
      id: 9,
      title: 'Película 5',
      image: require('../assets/img/film.png'),
      fecha: '2024-10-01',
      idioma: 'Dub',
      hora: '2:00 pm',
      sucursal: 'Y',
      precioAdulto: 3,
      precioNino: 3,
      precioTE: 5,
      estadoE: 1,
  },
  {
    id: 7,
    title: 'Película 2',
    image: require('../assets/img/cupon1.jpg'), 
    sucursal: 'Y',
    sala: '1',
    idioma: 'Sub Español',
    fecha: '2024-09-30',
    hora: '2:00 pm',
    precioAdulto: 3,
    precioNino: 3,
    precioTE: 5,
    estadoE: 0,
  },
  {
    id: 8,
    title: 'Película 1',
    image: require('../assets/img/02.jpg'), 
    sucursal: 'X',
    idioma: 'Sub Español',
    fecha: '2024-10-01',
    hora: '3:30 pm',
    precioAdulto: 2,
    precioNino: 3,
    precioTE: 5,
    estadoE: 1,
  },

];

export const Salas = [
  {
    id: 1,
    capacidad: 40, 
    codsucursal: 25,
    tipo: 'Estandar',
    estadoE: 1,
    sucursal: 'X',
  },
  {
    id: 2,
    capacidad: 40, 
    codsucursal: 25,
    tipo: 'Estandar',
    estadoE: 1,
    sucursal: 'X',
  },
  {
    id: 3,
    capacidad: 40, 
    codsucursal: 25,
    tipo: 'Estandar',
    estadoE: 0,
    sucursal: 'Y',
  },
  {
    id: 4,
    capacidad: 40, 
    codsucursal: 25,
    tipo: 'Estandar',
    estadoE: 0,
    sucursal: 'Y',
  },
]

export const movieData = [
  {
    id: 1,
    Nombre: 'Pelicula 1',
    Duracion: 120,
    Clasificacion:'A',
    Director: 'Patroclo',
    Genero: 'Accion',
    estadoE: 1,
    Sinopsis:'Tras un naufragio, un robot inteligente llamado Roz queda varado en una isla deshabitada. Para sobrevivir al duro entorno, Roz establece vinculos con los animales de la isla y cuida de una cria de ganso huerfana.',
  },
  {
    id: 2,
    Nombre: 'Pelicula 2',
    Duracion: 120,
    Clasificacion:'B',
    Director: 'Patroclo',
    Genero: 'Accion',
    estadoE: 0,
    Sinopsis:'Concebida como un salvaje ejercicio de terror gore, The Substance construye una energica satira sobre la presion estetica a la que se ven sometidas las mujeres por parte de la industria del entretenimiento, y por la sociedad en su conjunto.',
  },
  {
    id: 3,
    Nombre: 'Pelicula 3',
    Duracion: 120,
    Clasificacion:'A',
    Director: 'Patroclo',
    Genero: 'Accion',
    estadoE: 1,
    Sinopsis:'Tras un naufragio, un robot inteligente llamado Roz queda varado en una isla deshabitada. Para sobrevivir al duro entorno, Roz establece vinculos con los animales de la isla y cuida de una cria de ganso huerfana.',
  },
  {
    id: 4,
    Nombre: 'Pelicula 4',
    Duracion: 120,
    Clasificacion:'A',
    Director: 'Patroclo',
    estadoE: 0,
    Genero: 'Accion',
    Sinopsis:'Esto es sinopsis'
  },
  {
    id: 5,
    Nombre: 'Pelicula 5',
    Duracion: 120,
    Clasificacion:'C',
    Director: 'Patroclo',
    Genero: 'Accion',
    estadoE: 1,
    Sinopsis:'Esto es sinopsis'
  },
  {
    id: 6,
    Nombre: 'Pelicula 6',
    Duracion: 120,
    Clasificacion:'A',
    Director: 'Patroclo',
    Genero: 'Accion',
    estadoE: 1,
    Sinopsis:'Esto es sinopsis'
  },
];

export const administrador = [{
  id: 1,
  nombre: 'Juan',
  apellido: 'Pérez',
  dui: '12345678-9',
  email: 'juan.perez@example.com',
  estadoE: 0,
},
{
  id: 2,
  nombre: 'Carlos',
  apellido: 'Aguilar',
  dui: '12345678-9',
  email: 'juan.perez@example.com',
  estadoE: 1,
},

];