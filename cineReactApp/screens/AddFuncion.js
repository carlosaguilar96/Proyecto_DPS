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
  const [horario, setHorario] = useState('');
  const [precios, setPrecios] = useState({ ninos: 0, adultos: 0, terceraEdad: 0 });

  const manejarAñadirFuncion = () => {
    if (!sucursal || !pelicula || !sala || !horario) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }
    console.log({ sucursal, pelicula, sala, fecha, horario, precios });
  };

  const actualizarPrecio = (tipo, valor) => {
    setPrecios((prevPrecios) => ({
      ...prevPrecios,
      [tipo]: Math.max(0, prevPrecios[tipo] + valor),
    }));
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
        <Picker
          selectedValue={horario}
          style={estilos.entrada}
          onValueChange={(itemValue) => setHorario(itemValue)}
        >
          <Picker.Item label="Seleccione un horario" value="" />
          <Picker.Item label="10:00 AM" value="10:00 AM" />
          <Picker.Item label="1:00 PM" value="1:00 PM" />
        </Picker>

        <Text>Precio de las entradas:</Text>
        <PrecioInput label="Niños" valor={precios.ninos} actualizarPrecio={(valor) => actualizarPrecio('ninos', valor)} />
        <PrecioInput label="Adultos" valor={precios.adultos} actualizarPrecio={(valor) => actualizarPrecio('adultos', valor)} />
        <PrecioInput label="3ra Edad" valor={precios.terceraEdad} actualizarPrecio={(valor) => actualizarPrecio('terceraEdad', valor)} />

        <TouchableOpacity style={estilos.botonAñadir} onPress={manejarAñadirFuncion}>
          <Text style={estilos.textoBotonAñadir}>Añadir Función</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const PrecioInput = ({ label, valor, actualizarPrecio }) => (
  <View style={estilos.precioContainer}>
    <Text>{label}:</Text>
    <View style={estilos.precioInputContainer}>
      <Button title="-" onPress={() => actualizarPrecio(-1)} />
      <TextInput
        style={estilos.precioInput}
        value={String(valor)}
        onChangeText={(value) => actualizarPrecio(Number(value) - valor)}
        keyboardType="numeric"
      />
      <Button title="+" onPress={() => actualizarPrecio(1)} />
    </View>
  </View>
);

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
    justifyContent: 'center',
    marginVertical: 10,
  },
  precioInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  precioInput: {
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

export default AñadirFuncion;