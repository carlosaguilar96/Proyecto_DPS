import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ModificarSala = () => {
  // Información de prueba
  const sala = {
    sucursal: 'Sucursal Central',
    numAsientos: 100,
    tipoSala: 'IMAX',
  };

  return (
    <View style={estilos.contenedor}>
      
      <View style={estilos.tarjeta}>
        <View style={estilos.detallesSala}>
          <Text style={estilos.tituloSucursal}>{sala.sucursal}</Text>
          <Text style={estilos.textoGrande}>Número de Asientos: {sala.numAsientos}</Text>
          <Text style={estilos.textoGrande}>Tipo de Sala: {sala.tipoSala}</Text>
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
  detallesSala: {
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

export default ModificarSala;