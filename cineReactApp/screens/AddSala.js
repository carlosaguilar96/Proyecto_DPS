import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AñadirSala = () => {
  const [sucursal, setSucursal] = useState('');
  const [tipoSala, setTipoSala] = useState('');

  const manejarAñadirSala = () => {

    console.log({ sucursal, tipoSala });
  };

  return (
    <ScrollView style={estilos.contenedor}>
      
      <View style={estilos.formulario}>
        <Text>Sucursal:</Text>
        <Picker
          selectedValue={sucursal}
          style={estilos.entrada}
          onValueChange={(itemValue) => setSucursal(itemValue)}
        >
          <Picker.Item label="Elija la sucursal en la que añadirá la sala" value="" />
          <Picker.Item label="Sucursal 1" value="sucursal1" />
          <Picker.Item label="Sucursal 2" value="sucursal2" />
        </Picker>


        <Text>Tipo de Sala:</Text>
        <Picker
          selectedValue={tipoSala}
          style={estilos.entrada}
          onValueChange={(itemValue) => setTipoSala(itemValue)}
        >
          <Picker.Item label="Elija el tipo de sala" value="" />
          <Picker.Item label="Estandar" value="Estandar" />
        </Picker>

        <TouchableOpacity style={estilos.botonAñadir} onPress={manejarAñadirSala}>
          <Text style={estilos.textoBotonAñadir}>Añadir Sala</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  cabecera: {
    backgroundColor: '#8B0000',
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoCabecera: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  formulario: {
    padding: 20,
  },
  entrada: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  asientosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  entradaAsientos: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    width: 60,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  botonAñadir: {
    backgroundColor: '#8B0000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotonAñadir: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AñadirSala;