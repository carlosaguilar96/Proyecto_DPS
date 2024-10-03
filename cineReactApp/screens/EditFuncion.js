import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Funcion } from '../config/movieData';
import DateTimePicker from '@react-native-community/datetimepicker';

const ModificarFuncion = () => {
  // Información de prueba
  
  const renderItem = ({ item }) => {
    return (
      <View style={estilos.contenedor}>
      
      <View style={estilos.tarjeta}>
        <View style={estilos.detallesFuncion}>
          <Text style={estilos.tituloSucursal}>{item.sucursal}</Text>
          <Text style={estilos.textoGrande}>Película: {item.title}</Text>
          <Text style={estilos.textoGrande}>Sala: {item.sala}</Text>
          <Text style={estilos.textoGrande}>Fecha: {item.fecha}</Text>
          <Text style={estilos.textoGrande}>Horario: {item.hora}</Text>
          <Text style={estilos.textoGrande}>Precio Niños: ${item.precioNino}</Text>
          <Text style={estilos.textoGrande}>Precio Adultos: ${item.precioAdulto}</Text>
          <Text style={estilos.textoGrande}>Precio 3ra Edad: ${item.precioTE}</Text>
          <View style={estilos.contenedorBotones}>
            <TouchableOpacity style={estilos.botonIcono} onPress={() => {}}>
              <FontAwesome name="edit" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={estilos.botonIcono} onPress={() => {}}>
              <FontAwesome name="ban" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    ); 
  }

  const FlatListMovie = ({ Movie }) => {
    return (
      <FlatList
        data={Movie}
        renderItem={renderItem}
        keyExtractor={(item) => item.CodFuncion} 
        scrollEnabled={false} 
      />
    );
  };

 
  return (
    <ScrollView>
    <FlatListMovie Movie={Funcion} />
    </ScrollView>
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
  detallesitem: {
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