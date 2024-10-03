import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,FlatList, Modal,Button} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { administrador } from '../config/movieData';

const ModificarAdministrador = () => {
  // Información de prueba
const [modalVisible,setModalVisible] = useState('');
const [id, setid] = useState(0);

const handleModalOpen = (id) =>{
  setModalVisible(true);
  setid(id);
}

const CambiarEstado = () => {
  //AQUI DEBERIA CAMBIARSE EL ESTADO, en id esta el id de admin
setModalVisible(false);
console.log(id);
};
  
  const renderItem = ({ item }) => {
    return (
      <View style={estilos.contenedor}>
      
      <View style={estilos.tarjeta}>
        
        <View style={estilos.detallesAdministrador}>
        <Text style={estilos.textoTarjetaCabecera}>Admin {item.id}</Text>
          <Text style={estilos.textoGrande}>Nombre: {item.nombre}</Text>
          <Text style={estilos.textoGrande}>Apellido: {item.apellido}</Text>
          <Text style={estilos.textoGrande}>DUI: {item.dui}</Text>
          <Text style={estilos.textoGrande}>Email: {item.email}</Text>
          
        </View>
        <View style={estilos.contenedorBotones}>
        {item.estadoE === 0  ? (
              <TouchableOpacity style={estilos.botonIcono} onPress={() => handleModalOpen(item.id)}>
              <FontAwesome name="ban" size={30} color="white" />
            </TouchableOpacity>
            ):(
              <TouchableOpacity style={estilos.botonIcono} onPress={() => handleModalOpen(item.id)}>
              <FontAwesome name="check" size={30} color="white" />
            </TouchableOpacity>
            )}
          </View>
      </View>
    </View>

    );}

  const FlatListAdmin = ({ Movie }) => {
    return (
      <FlatList
        data={Movie}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} 
        scrollEnabled={false} 
      />
    );
  };

 
  return (
    <ScrollView>
    <FlatListAdmin Movie={administrador} />
            <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={estilos.modalContainer}>
            <View style={estilos.modalContent}>
              <Text style={estilos.modalText}>
                Seguro que deseas cambiar el estado de la película?
              </Text>
              <View style={estilos.buttonContainer}>
                <TouchableOpacity
                  style={[estilos.botonModal, estilos.botonCancelar]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={estilos.textoBotonModal}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[estilos.botonModal, estilos.botonAceptar]}
                  onPress={() => CambiarEstado()}
                >
                  <Text style={estilos.textoBotonModal}>Aceptar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

    </ScrollView>
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
    flexDirection: 'row',
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
    marginTop: 20,
    justifyContent: 'center',
    marginLeft: 15,
    alignItems: 'center',
  },
  botonIcono: {
    backgroundColor: '#8B0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo transparente con efecto oscuro
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
 
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  botonModal: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  botonCancelar: {
    backgroundColor: '#d9534f', // Rojo para cancelar
  },
  botonAceptar: {
    backgroundColor: '#5cb85c', // Verde para aceptar
  },
  textoBotonModal: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModificarAdministrador;