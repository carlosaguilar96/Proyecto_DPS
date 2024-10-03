import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,TouchableOpacity, Modal,TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from "react-native-gesture-handler";


export default function PerfilUser() {
  const [username, setUsername] = useState(null);
  const [usuarioinfo, setUsuarioinfo] = useState(null);
  const [contrasenaAnterior, setContrasenaAnterior] = useState('');
  const [contrasenaNueva, setContrasenaNueva] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [showModal,setShowModal] = useState(false);

  const handleCambio = () => {
    setShowModal(false);
     //Aqui se hace el cambio de contra
  };

  const imprimirUsuario = async () => {
    try {
      const infouser = await AsyncStorage.getItem('Nombreuser');

      if (infouser !== null) {
        const parsedUsuarioInfo = JSON.parse(infouser);
        console.log('Datos del usuario:', parsedUsuarioInfo);
        setUsername(parsedUsuarioInfo.nombreUsuario);
      } else {
        console.log('No hay información de usuario almacenada.');
      }
    } catch (error) {
      console.log('Error al obtener la información del usuario:', error);
    }
  };

  useEffect(() => {
    imprimirUsuario();
  }, []);
  
  return (
    <ScrollView>
      {usuarioinfo  ? (
        <View style={estilos.contenedor}>
          <View style={estilos.tarjeta}>
            <View style={estilos.detallesUser}>
              <Text style={estilos.textoGrande}>Nombre: {usuarioinfo.nombreUsuario}</Text>
              <Text style={estilos.textoGrande}>Nombre: {usuarioinfo.nombre}</Text>
              <Text style={estilos.textoGrande}>Apellido: {usuarioinfo.apellido}</Text>
              <Text style={estilos.textoGrande}>DUI:{usuarioinfo.dui}</Text>
              <Text style={estilos.textoGrande}>Email: {usuarioinfo.email}</Text>   
            </View>
            <TouchableOpacity style={estilos.Button} onPress={() => setShowModal(true)}>
                <Text style={estilos.ButtonText}>Cambiar Contraseña</Text>
              </TouchableOpacity>
          </View>
          {/*MODAL*/}
          <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
         <View style={estilos.modalContainer}>
          <View style={estilos.modalContent}>
          <Text style={estilos.titulo}>Cambiar Contraseña</Text>
          
          <TextInput
            style={estilos.input}
            placeholder="Contraseña Anterior"
            secureTextEntry
            value={contrasenaAnterior}
            onChangeText={setContrasenaAnterior}
          />
          
          <TextInput
            style={estilos.input}
            placeholder="Contraseña Nueva"
            secureTextEntry
            value={contrasenaNueva}
            onChangeText={setContrasenaNueva}
          />
          
          <TextInput
            style={estilos.input}
            placeholder="Confirmar Contraseña"
            secureTextEntry
            value={confirmarContrasena}
            onChangeText={setConfirmarContrasena}
          />

          <View style={estilos.botonContainer}>
            <TouchableOpacity style={estilos.botonGuardar} onPress={() => handleCambio()}>
              <Text style={estilos.botonTexto}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.botonCancelar} onPress={() =>setShowModal(false)}>
              <Text style={estilos.botonTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      </Modal>
        </View>
      ) : (
        <Text style={estilos.textoGrande}>No hay información del usuario</Text>
      )}
    </ScrollView>
  );
}

         

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
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
  detallesUser: {
    justifyContent: 'center',
  },
  textoGrande: {
    fontSize: 18,
    marginBottom: 5,
  },
  Button: {
    backgroundColor: '#b30000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation:5,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonText: {
    color: 'white',
    fontSize: 16,
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  titulo: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  botonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonGuardar: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  botonCancelar: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  botonTexto: {
    color: 'white',
    textAlign: 'center',
  },
});
