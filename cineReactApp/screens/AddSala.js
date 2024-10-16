import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, TouchableOpacity,ActivityIndicator, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { API_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';

const AñadirSala = ({ navigation }) => {
  const [sucursal, setSucursal] = useState(-1);
  const [tipoSala, setTipoSala] = useState(-1);
  const [sucursales, setSucursales] = useState([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  const validar = () => {

    if (sucursal == -1) {
      Alert.alert("Mensaje", "Debe seleccionar una sucursal");
      return;
    }
    if (tipoSala == -1) {
      Alert.alert("Mensaje", "Debe seleccionar un tipo de sala");
      return;
    }

    guardarSala();

  };


  const guardarSala = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/salas/crearSala`, {
        sucursal: sucursal
      });
      setLoading(false);
      Alert.alert('Registro exitoso', 'Sala creada correctamente');
      setSucursal(-1);
      setTipoSala(-1);
      navigation.navigate("Menu Admin");

    } catch (error) {
      if (error.response) {
        const errores = error.response.data.errors;
        let mensaje = "";
        for (const campo in errores) {
          mensaje += `Error en ${campo}: ${errores[campo].join(', ')}`;
        }
        setLoading(false);
        setMssgError(mensaje);
        return;
      } else if (error.request) {
        setLoading(false);
        Alert.alert('Error', 'No hubo respuesta del servidor');
        return;
      } else {
        setLoading(false);
        Alert.alert('Error', 'Error al hacer la solicitud ' + error);
        return;
      }
    }
    setLoading(false);
  }

  const obtenerSucursales = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/sucursales/index`);
      
      if (response.data.sucursales.length != 0) {

        setSucursales(response.data.sucursales);

      }
      setLoading(false);

    } catch (error) {
      if (error.request) {
        setLoading(false);
        Alert.alert('Error', 'No hubo respuesta del servidor ');
        console.log(error);
        return;
      } else {
        setLoading(false);
        Alert.alert('Error', 'Error al hacer la solicitud');
        return;
      }
    }
  }

  useEffect(() => {
    if (isFocused) {
      obtenerSucursales();
    }
  }, [isFocused]);


  return (
    <ScrollView style={estilos.contenedor}>
      <Modal
                transparent={true} // Hace que el fondo del modal sea transparente
                animationType="fade" // Tipo de animación al mostrar el modal
                visible={loading} // Modal visible mientras `loading` sea true
                onRequestClose={() => setLoading(false)} // Cierra el modal si se intenta cerrar
              >
                <View style={estilos.modalBackground}>
                  <View style={estilos.modalContainer}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={estilos.loadingText}>Cargando...</Text>
                  </View>
                </View>
              </Modal>

      <View style={estilos.formulario}>
        <Text>Sucursal:</Text>
        <Picker
          selectedValue={sucursal}
          style={estilos.entrada}
          onValueChange={(itemValue) => setSucursal(itemValue)}
        >
          <Picker.Item label="Elija la sucursal en la que añadirá la sala" value={-1} />
          {sucursales.map((item) => (
            <Picker.Item label={item.sucursal} value={item.codSucursal} key={() => item.codSucursal} />
          ))}
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

        <TouchableOpacity style={estilos.botonAñadir} onPress={validar}>
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro y semi-transparente
  },
  modalContainer: {
    width: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b30000', // Fondo del modal
    borderRadius: 10,
  },
  loadingText: {
    marginTop: 10,
    color: '#ffffff', // Color del texto blanco
    fontSize: 16,
  }
});

export default AñadirSala;