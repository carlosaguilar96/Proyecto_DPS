import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ModificarPelicula = () => {
  return (
    <View style={estilos.contenedor}>
      <View style={estilos.cabecera}>
        <Text style={estilos.textoCabecera}>Modificar Película</Text>
      </View>
      <View style={estilos.tarjeta}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} 
          style={estilos.imagenPelicula}
        />
        <View style={estilos.detallesPelicula}>
          <Text style={estilos.tituloPelicula}>Nombre de la Película</Text>
          <Text>Duración: 120 min</Text>
          <Text>Clasificación: PG-13</Text>
          <Text>Género: Acción</Text>
          <Text style={estilos.sinopsis}>Sinopsis: Esta es una breve descripción de la película.</Text>
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
    fontSize: 20,
    textAlign: 'center',
  },
  tarjeta: {
    flexDirection: 'row',
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
  imagenPelicula: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  detallesPelicula: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  tituloPelicula: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sinopsis: {
    marginTop: 10,
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

export default ModificarPelicula;