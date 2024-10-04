import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';

const EditarCine = () => {
  const [nombreCine, setNombreCine] = useState("");
  const [vision, setVision] = useState("");
  const [mision, setMision] = useState("");
  const navigation = useNavigation();
  
  const obtenerInfoCine = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/cines/index`);

      setMision(response.data.cine.mision);
      setVision(response.data.cine.vision);
      setNombreCine(response.data.cine.nombreCine);

    } catch (error) {
      console.log("Error al traer la info del cine: " + error);
    }
  }

  const actualizarInfo = async () => {
    Keyboard.dismiss();
    if (!nombreCine || !mision || !vision) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }
    else {
      try {
        const response = await axios.put(`${API_URL}/api/cines/update`, {
          nombreCine: nombreCine,
          mision: mision,
          vision: vision
        });

        Alert.alert("Mensaje", "Actualizado correctamente");
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
          Alert.alert('Error', 'No hubo respuesta del servidor');
          return;
        } else {
          Alert.alert('Error', 'Error al hacer la solicitud ' + error);
          return;
        }
      }
    }

  };

  useEffect(() => {
    obtenerInfoCine();
  }, []);

  return (
    <ScrollView style={estilos.contenedor}>

      <View style={estilos.formulario}>
        <Text>Nombre del Cine:</Text>
        <TextInput
          style={estilos.entrada}
          value={nombreCine}
          onChangeText={setNombreCine}
        />

        <Text>Visión del Cine:</Text>
        <TextInput
          style={estilos.entrada}
          value={vision}
          onChangeText={setVision}
          multiline={true}
          numberOfLines={2}
        />
        <Text>Misión del Cine:</Text>
        <TextInput
          style={estilos.entrada}
          value={mision}
          onChangeText={setMision}
          multiline={true}
          numberOfLines={2}
        />

        <TouchableOpacity style={estilos.botonAñadir} onPress={actualizarInfo}>
          <Text style={estilos.textoBotonAñadir}>Actualizar Cine</Text>
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

export default EditarCine;