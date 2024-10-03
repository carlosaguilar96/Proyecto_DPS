import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AñadirFuncion = () => {
  const [sucursal, setSucursal] = useState('');
  const [pelicula, setPelicula] = useState('');
  const [sala, setSala] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [mostrarFechaPicker, setMostrarFechaPicker] = useState(false);
  const [horario, setHorario] = useState(new Date());
  const [mostrarHorarioPicker, setMostrarHorarioPicker] = useState(false);
  const [precios, setPrecios] = useState({ ninos: '', adultos: '', terceraEdad: '' });

  const manejarAñadirFuncion = () => {
    if (!sucursal || !pelicula || !sala || !horario) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }
    console.log({ sucursal, pelicula, sala, fecha, horario, precios });
  };

  return (
    <ScrollView style={estilos.contenedor}>
      <View style={estilos.cabecera}>
        <Text style={estilos.textoCabecera}>Añadir Función</Text>
      </View>

      <View style={estilos.formulario}>
        <Text>Sucursal:</Text>
        <Picker
          selectedValue={sucursal}
          style={estilos.entrada}
          onValueChange={(itemValue) => setSucursal(itemValue)}
        >
          <Picker.Item label="Seleccione una sucursal" value="" />
          <Picker.Item label="Sucursal 1" value="sucursal1" />
          <Picker.Item label="Sucursal 2" value="sucursal2" />
        </Picker>

        <Text>Película:</Text>
        <Picker
          selectedValue={pelicula}
          style={estilos.entrada}
          onValueChange={(itemValue) => setPelicula(itemValue)}
        >
          <Picker.Item label="Seleccione una película" value="" />
          <Picker.Item label="Película 1" value="pelicula1" />
          <Picker.Item label="Película 2" value="pelicula2" />
        </Picker>

        <Text>Sala:</Text>
        <Picker
          selectedValue={sala}
          style={estilos.entrada}
          onValueChange={(itemValue) => setSala(itemValue)}
        >
          <Picker.Item label="Seleccione una sala" value="" />
          <Picker.Item label="Sala 1" value="sala1" />
          <Picker.Item label="Sala 2" value="sala2" />
        </Picker>

        <Text>Fecha:</Text>
        <TouchableOpacity onPress={() => setMostrarFechaPicker(true)}>
          <Text style={estilos.entrada}>{fecha.toDateString()}</Text>
        </TouchableOpacity>
        {mostrarFechaPicker && (
          <DateTimePicker
            value={fecha}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setMostrarFechaPicker(false);
              setFecha(selectedDate || fecha);
            }}
            style={estilos.entrada}
          />
        )}

        <Text>Horario:</Text>
        <TouchableOpacity onPress={() => setMostrarHorarioPicker(true)}>
          <Text style={estilos.entrada}>{horario.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {mostrarHorarioPicker && (
          <DateTimePicker
            value={horario}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setMostrarHorarioPicker(false);
              setHorario(selectedTime || horario);
            }}
            style={estilos.entrada}
          />
        )}

        <Text>Precio de las entradas:</Text>
        <View style={estilos.precioContainer}>
          <Text>Niños:</Text>
          <TextInput
            style={estilos.precioInput}
            value={precios.ninos}
            onChangeText={(value) => setPrecios({ ...precios, ninos: value })}
            keyboardType="numeric"
          />
        </View>
        <View style={estilos.precioContainer}>
          <Text>Adultos:</Text>
          <TextInput
            style={estilos.precioInput}
            value={precios.adultos}
            onChangeText={(value) => setPrecios({ ...precios, adultos: value })}
            keyboardType="numeric"
          />
        </View>
        <View style={estilos.precioContainer}>
          <Text>3ra Edad:</Text>
          <TextInput
            style={estilos.precioInput}
            value={precios.terceraEdad}
            onChangeText={(value) => setPrecios({ ...precios, terceraEdad: value })}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={estilos.botonAñadir} onPress={manejarAñadirFuncion}>
          <Text style={estilos.textoBotonAñadir}>Añadir Función</Text>
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
  precioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  precioInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    width: 100,
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

export default AñadirFuncion;