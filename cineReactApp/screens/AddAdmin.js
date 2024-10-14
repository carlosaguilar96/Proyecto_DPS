import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity, Keyboard,ActivityIndicator, Modal } from 'react-native';
import { TextInputMask } from "react-native-masked-text";
import axios from 'axios';
import { API_URL } from '@env';

const AñadirAdministrador = ({navigation}) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dui, setDui] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [username, setUsername] = useState('');
  const [confirmContra, setConfirmContra] = useState('');
  const [loading, setLoading] = useState(false);

  const validarEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const manejarGuardarCambios = async () => {
    if (username == "") {
      Alert.alert('Mensaje', "Ingresar un nombre de usuario.");
      return;
    }
    if (nombre == "") {
      Alert.alert('Mensaje', "Ingresar un nombre.");
      return;
    }
    if (apellido == "") {
      Alert.alert('Mensaje', "Ingresar un apellido.");
      return;
    }
    if (dui == "") {
      Alert.alert('Mensaje', "Ingresar DUI.");
      return;
    }
    if (dui.length != 10) {
      Alert.alert('Mensaje', 'Ingresar DUI válido.');
      return;
    }
    if (email == "") {
      Alert.alert('Mensaje', "Ingresar correo electrónico.");
      return;
    }
    if (!validarEmail(email)) {
      Alert.alert('Mensaje', 'El correo electrónico ingresado no es válido.');
      return;
    }
    if (contrasena == "") {
      Alert.alert('Mensaje', "Ingresar contraseña.");
      return;
    }
    if (contrasena.length < 8) {
      Alert.alert('Mensaje', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (confirmContra == "") {
      Alert.alert('Mensaje', "Ingresar confirmación de contraseña.");
      return;
    }
    if (contrasena !== confirmContra) {
      Alert.alert('Mensaje', 'Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      console.log(API_URL);
      console.log(API_URL);
      const response = await axios.post(`${API_URL}/api/usuarios/crearAdministrador`, {
        nombreUsuario: username,
        contrasena: contrasena,
        DUI: dui,
        nombres: nombre,
        apellidos: apellido,
        correoE: email,
      });
      setLoading(false);
      Alert.alert('Registro exitoso', 'Administrador creado correctamente');
      limpiarAdmin();
      navigation.navigate("Menu Admin");

    } catch (error) {
      if (error.response) {
        const errores = error.response.data.errors;
        let mensaje = "";
        for (const campo in errores) {
          mensaje += `Error en ${campo}: ${errores[campo].join(', ')}`;
        }
        setLoading(false);
        Alert.alert("Error", mensaje);
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

  };

  const limpiarAdmin = () => {
    setEmail("");
    setNombre("");
    setApellido("");
    setDui("");
    setContrasena("");
    setConfirmContra("");
    Keyboard.dismiss();
  }

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
        <Text>Usuario:</Text>
        <TextInput
          style={estilos.entrada}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />

        <Text>Nombre:</Text>
        <TextInput
          style={estilos.entrada}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre"
        />

        <Text>Apellido:</Text>
        <TextInput
          style={estilos.entrada}
          value={apellido}
          onChangeText={setApellido}
          placeholder="Apellido"
        />

        <Text>DUI:</Text>
        <TextInputMask
          type={'custom'}
          options={{
            mask: '99999999-9',
          }}
          value={dui}
          onChangeText={text => setDui(text)}
          style={estilos.entrada}
          placeholder="DUI"
          keyboardType="numeric"
        />

        <Text>Email:</Text>
        <TextInput
          style={estilos.entrada}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />


        <Text>Contraseña:</Text>
        <TextInput
          style={estilos.entrada}
          value={contrasena}
          onChangeText={setContrasena}
          placeholder="Contraseña"
          secureTextEntry
        />

        <Text>Confirmar Contraseña:</Text>
        <TextInput
          style={estilos.entrada}
          value={confirmContra}
          onChangeText={setConfirmContra}
          placeholder="Contraseña"
          secureTextEntry
        />

        <TouchableOpacity style={estilos.botonGuardar} onPress={manejarGuardarCambios}>
          <Text style={estilos.textoBotonGuardar}>Guardar Cambios</Text>
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
  botonGuardar: {
    backgroundColor: '#8B0000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotonGuardar: {
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
  },
});

export default AñadirAdministrador;