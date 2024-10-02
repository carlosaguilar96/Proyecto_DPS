import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ModificarFuncion = () => {
  // Información de prueba
  const funcion = {
    sucursal: 'Sucursal Central',
    pelicula: 'Película de Prueba',
    sala: 'Sala 1',
    fecha: '2024-10-01',
    horario: '10:00 AM',
    precioNinos: 5,
    precioAdultos: 10,
    precioTerceraEdad: 7,
  };

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.cabecera}>
        <Text style={estilos.textoCabecera}>Modificar Función</Text>
      </View>
      <View style={estilos.tarjeta}>
        <View style={estilos.detallesFuncion}>
          <Text style={estilos.tituloSucursal}>{funcion.sucursal}</Text>
          <Text style={estilos.textoGrande}>Película: {funcion.pelicula}</Text>
          <Text style={estilos.textoGrande}>Sala: {funcion.sala}</Text>
          <Text style={estilos.textoGrande}>Fecha: {funcion.fecha}</Text>
          <Text style={estilos.textoGrande}>Horario: {funcion.horario}</Text>
          <Text style={estilos.textoGrande}>Precio Niños: ${funcion.precioNinos}</Text>
          <Text style={estilos.textoGrande}>Precio Adultos: ${funcion.precioAdultos}</Text>
          <Text style={estilos.textoGrande}>Precio 3ra Edad: ${funcion.precioTerceraEdad}</Text>
          <View style={estilos.contenedorBotones}>
            <TouchableOpacity style={estilos.botonIcono} onPress={() => {}}>
              <FontAwesome name="edit" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={estilos.botonIcono} onPress={() => {}}>
              <FontAwesome name="trash" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cabecera: {
    backgroundColor: '#8B0000',
    padding: 15,
  },
  textoCabecera: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
  tarjeta: {
    padding: 15,
    margin: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  detallesFuncion: {
    justifyContent: 'center',
  },
  tituloSucursal: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textoGrande: {
    fontSize: 18,
    marginBottom: 5,
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  botonIcono: {
    backgroundColor: '#8B0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
});

export default ModificarFuncion;