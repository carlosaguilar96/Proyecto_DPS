import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ModificarAdministrador = () => {
  // Información de prueba
  const administrador = {
    nombre: 'Juan',
    apellido: 'Pérez',
    dui: '12345678-9',
    email: 'juan.perez@example.com',
    telefono: '1234-5678',
    contrasena: '********',
  };

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.cabecera}>
        <Text style={estilos.textoCabecera}>Modificar Administrador</Text>
      </View>
      <View style={estilos.tarjeta}>
        <Text style={estilos.textoTarjetaCabecera}>Admin 1</Text>
        <View style={estilos.detallesAdministrador}>
          <Text style={estilos.textoGrande}>Nombre: {administrador.nombre}</Text>
          <Text style={estilos.textoGrande}>Apellido: {administrador.apellido}</Text>
          <Text style={estilos.textoGrande}>DUI: {administrador.dui}</Text>
          <Text style={estilos.textoGrande}>Email: {administrador.email}</Text>
          <Text style={estilos.textoGrande}>Teléfono: {administrador.telefono}</Text>
          <Text style={estilos.textoGrande}>Contraseña: {administrador.contrasena}</Text>
          <View style={estilos.contenedorBotones}>
            <TouchableOpacity style={estilos.botonIcono} onPress={() => {}}>
              <FontAwesome name="edit" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={estilos.botonIcono} onPress={() => {}}>
              <FontAwesome name="trash" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cabecera: {
    backgroundColor: '#8B0000',
    padding: 15,
  },
  textoCabecera: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
  tarjeta: {
    padding: 15,
    margin: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  textoTarjetaCabecera: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detallesAdministrador: {
    justifyContent: 'center',
  },
  textoGrande: {
    fontSize: 18,
    marginBottom: 5,
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  botonIcono: {
    backgroundColor: '#8B0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
});

export default ModificarAdministrador;