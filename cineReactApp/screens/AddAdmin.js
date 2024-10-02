import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const AñadirAdministrador = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dui, setDui] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarGuardarCambios = () => {
    console.log({ nombre, apellido, dui, email, telefono, contrasena });
  };

  return (
    <ScrollView style={estilos.contenedor}>

      <View style={estilos.formulario}>
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

        <Text>Teléfono:</Text>
        <TextInput 
          style={estilos.entrada}
          value={telefono}
          onChangeText={setTelefono}
          placeholder="Teléfono"
          keyboardType="phone-pad"
        />

        <Text>Contraseña:</Text>
        <TextInput 
          style={estilos.entrada}
          value={contrasena}
          onChangeText={setContrasena}
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