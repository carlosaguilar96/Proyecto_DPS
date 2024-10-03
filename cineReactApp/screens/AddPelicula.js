import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AñadirPelicula = () => {
  const [nombre, setNombre] = useState('');
  const [duracion, setDuracion] = useState('');
  const [clasificacion, setClasificacion] = useState('');
  const [genero, setGenero] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [imagen, setImagen] = useState(null);

  const manejarAñadirPelicula = () => {
    
    console.log({ nombre, duracion, clasificacion, genero, sinopsis, imagen });
  };

  const seleccionarImagen = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagen(resultado.uri);
    }
  };

  return (
    <ScrollView style={estilos.contenedor}>
      

      <View style={estilos.formulario}>
        <Text>Nombre:</Text>
        <TextInput 
          style={estilos.entrada}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre de la película"
        />

        <Text>Duración:</Text>
        <TextInput 
          style={estilos.entrada}
          value={duracion}
          onChangeText={setDuracion}
          placeholder="Duración (min)"
          keyboardType="numeric"
        />

        <Text>Clasificación:</Text>
        <TextInput 
          style={estilos.entrada}
          value={clasificacion}
          onChangeText={setClasificacion}
          placeholder="Clasificación (Ej: PG-13)"
        />

        <Text>Género:</Text>
        <TextInput 
          style={estilos.entrada}
          value={genero}
          onChangeText={setGenero}
          placeholder="Género"
        />

        <Text>Sinopsis:</Text>
        <TextInput 
          style={[estilos.entrada, estilos.areaTexto]}
          value={sinopsis}
          onChangeText={setSinopsis}
          placeholder="Sinopsis"
          multiline
        />

        <View style={estilos.tarjeta}>
          <Text>Imagen:</Text>
          <Button title="Seleccionar Imagen" onPress={seleccionarImagen} />
          {imagen && <Text>Imagen seleccionada</Text>}
        </View>

        <TouchableOpacity style={estilos.botonAñadir} onPress={manejarAñadirPelicula}>
          <Text style={estilos.textoBotonAñadir}>Añadir Película</Text>
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
  areaTexto: {
    height: 100,
  },
  tarjeta: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
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

export default AñadirPelicula;