import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { API_URL } from '@env';

const AñadirPelicula = ({navigation}) => {
  const [nombre, setNombre] = useState('');
  const [duracion, setDuracion] = useState('');
  const [clasificacion, setClasificacion] = useState('');
  const [genero, setGenero] = useState('');
  const [director, setDirector] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [imagen, setImagen] = useState(null);

  const manejarAñadirPelicula = () => {

    if (nombre == "") {
      Alert.alert("Mensaje", "Debes ingresar un nombre para la película");
      return;
    }

    if (duracion == "") {
      Alert.alert("Mensaje", "Debes ingresar la duración en minutos");
      return;
    }

    if (clasificacion == "") {
      Alert.alert("Mensaje", "Debes seleccionar una clasificación");
      return;
    }

    if (genero == "") {
      Alert.alert("Mensaje", "Debes ingresar el género de la película");
      return;
    }

    if (director == "") {
      Alert.alert("Mensaje", "Debes ingresar el director de la película");
      return;
    }

    if (sinopsis == "") {
      Alert.alert("Mensaje", "Debes escribir una sinopsis");
      return;
    }

    if (!imagen) {
      Alert.alert("Mensaje", "Debes seleccionar una imagen");
      return;
    }

    Alert.alert("Mensaje", "¿Estás seguro? La imagen de la película no se podrá cambiar después", [
      {
        text: "Sí", onPress: registrarPelicula
      },
      { text: "No" }
    ])
  };


  const registrarPelicula = async () => {
    const formData = new FormData(); // Objeto que se enviará a la API que incluirá el logo

    formData.append('imagen', {
      uri: imagen.uri,
      type: imagen.mimeType,
      name: imagen.fileName || foto.jpg
    });

    formData.append('nombre', nombre);
    formData.append('duracion', duracion);
    formData.append('clasificacion', clasificacion);
    formData.append('director', director);
    formData.append('genero', genero);
    formData.append('sinopsis', sinopsis);

    try {
      const response = await axios.post(`${API_URL}/api/peliculas/crearPelicula`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Registro exitoso', 'Película agregada correctamente');
      limpiar();
      navigation.navigate("Menu Admin");


    } catch (error) {
      if (error.response) {
        const errores = error.response.data.errors;
        let mensaje = "";
        for (const campo in errores) {
          mensaje += `Error en ${campo}: ${errores[campo].join(', ')}`;
        }
        Alert.alert('Error', mensaje);
        return;
      } else if (error.request) {
        Alert.alert('Error', 'No hubo respuesta del servidor ');
        return;
      } else {
        Alert.alert('Error', 'Error al hacer la solicitud ' + error);
        return;
      }
    }
  }

  const seleccionarImagen = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagen(resultado.assets[0]);
    }
  };

  const limpiar = () =>{
    setNombre("");
    setDuracion("");
    setClasificacion(-1);
    setGenero("");
    setDirector("");
    setSinopsis("");
    setImagen(null);

  }
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
        <Picker
          selectedValue={clasificacion}
          style={estilos.entrada}
          onValueChange={(itemValue) => setClasificacion(itemValue)}
        >
          <Picker.Item label="Seleccione una clasificación" value="" />
          <Picker.Item label="A - Todo público" value="A" />
          <Picker.Item label="B - Mayores de 12 años" value="B" />
          <Picker.Item label="C - Mayores de 15 años" value="C" />
          <Picker.Item label="D - Mayores de 18 años" value="D" />
        </Picker>

        <Text>Género:</Text>
        <TextInput
          style={estilos.entrada}
          value={genero}
          onChangeText={setGenero}
          placeholder="Género"
        />

        <Text>Director:</Text>
        <TextInput
          style={estilos.entrada}
          value={director}
          onChangeText={setDirector}
          placeholder="Director"
        />

        <Text>Sinopsis:</Text>
        <TextInput
          style={[estilos.entrada, estilos.areaTexto]}
          value={sinopsis}
          onChangeText={setSinopsis}
          placeholder="Sinopsis"
          multiline
        />

        <Text>Imagen:</Text>
        <View style={estilos.tarjeta}>
          <Button title="Seleccionar Imagen" onPress={seleccionarImagen} />
          {imagen ? (<Image source={{ uri: imagen.uri }} style={estilos.logoImagen} />) : (<View />)}
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
  logoImagen: {
    width: 120,
    height: 120,

  },
});

export default AñadirPelicula;