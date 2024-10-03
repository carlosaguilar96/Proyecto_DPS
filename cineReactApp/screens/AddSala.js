import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AñadirSala = () => {
  const [sucursal, setSucursal] = useState('');
  const [numAsientos, setNumAsientos] = useState(0);
  const [tipoSala, setTipoSala] = useState('');

  const manejarAñadirSala = () => {
    console.log({ sucursal, numAsientos, tipoSala });
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

        <Text>Número de Asientos:</Text>
        <View style={estilos.asientosContainer}>
          <Button title="-" onPress={() => setNumAsientos(Math.max(0, numAsientos - 1))} />
          <TextInput
            style={estilos.entradaAsientos}
            value={String(numAsientos)}
            onChangeText={(value) => setNumAsientos(Number(value))}
            keyboardType="numeric"
          />
          <Button title="+" onPress={() => setNumAsientos(numAsientos + 1)} />
        </View>

        <Text>Tipo de Sala:</Text>
        <Picker
          selectedValue={tipoSala}
          style={estilos.entrada}
          onValueChange={(itemValue) => setTipoSala(itemValue)}
        >
          <Picker.Item label="Elija el tipo de sala" value="" />
          <Picker.Item label="2D" value="2D" />
          <Picker.Item label="3D" value="3D" />
          <Picker.Item label="IMAX" value="IMAX" />
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