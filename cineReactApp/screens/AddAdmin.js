import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const AñadirAdministrador = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dui, setDui] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [username,setUsername] = useState('');
  const [confirmContra, setConfirmContra] = useState('');
  const [mssgError, setMssgError] = useState('');

  const validarEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const manejarGuardarCambios = async() => {
    if(username == ""){
      setMssgError("Ingresar un nombre de usuario.");
      return;
    }
    if(nombre == ""){
      setMssgError("Ingresar un nombre.");
      return;
    }
    if(apellido == ""){
      setMssgError("Ingresar un apellido.");
      return;
    }
    if(dui == ""){
      setMssgError("Ingresar DUI.");
      return;
    }
    if (dui.length != 10) {
      setMssgError('Ingresar DUI válido.');
      return;
    }
    if(email == ""){
      setMssgError("Ingresar correo electrónico.");
      return;
    }
    if (!validarEmail(email)) {
      setMssgError('El correo electrónico ingresado no es válido.');
      return;
    }
    if(contrasena == ""){
      setMssgError("Ingresar contraseña.");
      return;
    }
    if (contrasena.length < 8) {
      setMssgError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if(confirmContra == ""){
      setMssgError("Ingresar confirmación de contraseña.");
      return;
    }
    if (contrasena !== confirmContra) {
      setMssgError('Las contraseñas no coinciden.');
      return;
    }
    console.log({ nombre, apellido, dui, email, contrasena });
  };

  return (
    <ScrollView style={estilos.contenedor}>
      
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
        <TextInput 
          style={estilos.entrada}
          value={dui}
          onChangeText={setDui}
          placeholder="DUI"
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
});

export default AñadirAdministrador;