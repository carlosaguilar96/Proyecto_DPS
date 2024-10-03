import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList,Button,Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Salas } from '../config/movieData';

const ModificarSala = () => {
  const [modalVisible,setModalVisible] = useState('');
  const [codSala, setCodSala] = useState('');

  const handleModalOpen = (codSala) =>{
    setModalVisible(true);
    setCodSala(codSala);
  }
  
  const handleModalClose = () => {
  // Cerrar el modal y cambiar estado
  setModalVisible(false);
  console.log(codSala);
  };
  const renderItem = ({ item }) => {
    return (
      <View style={estilos.contenedor}>
        
        <View style={estilos.tarjeta}>
          <View style={estilos.detallesSala}>
            <Text style={estilos.tituloSucursal}>{item.codSala}</Text>
            <Text style={estilos.textoGrande}>Sucursal: {item.codsucursal}</Text>
            <Text style={estilos.textoGrande}>Número de Asientos: {item.capacidad}</Text>
            <Text style={estilos.textoGrande}>Tipo de Sala: {item.tipo}</Text>
            
          </View>
          
            {/* <TouchableOpacity style={estilos.botonIcono} onPress={() => {}}>
                <FontAwesome name="edit" size={30} color="white" />
              </TouchableOpacity>*/} 
               <View style={estilos.contenedorBotones}>
            {item.estadoE == "Inactivo" ? (
              <TouchableOpacity style={estilos.botonIcono} onPress={() => handleModalOpen(item.codSala)}>
              <FontAwesome name="ban" size={30} color="white" />
            </TouchableOpacity>
            ):(
              <TouchableOpacity style={estilos.botonIcono} onPress={() => handleModalOpen(item.codSala)}>
              <FontAwesome name="edit" size={30} color="white" />
            </TouchableOpacity>
            )}
                
              </View>

        </View>
      </View>
    );
  }
  

  const FlatListSala = ({ Movie }) => {
    return (
      <FlatList
        data={Movie}
        renderItem={renderItem}
        keyExtractor={(item) => item.CodSala} 
        scrollEnabled={false} 
      />
    );
  };

 
  return (
    <ScrollView>
    <FlatListSala Movie={Salas} />
     {/* Modal */}
     <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={estilos.modalContainer}>
            <View style={estilos.modalContent}>
              <Text style={estilos.modalText}>Seguro que deseas cambiar el estado de la pelicula?</Text>
              <View style={estilos.buttonContainer}>
                <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                <Button title="Aceptar" onPress={() => handleModalClose()} />
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
  detallesSala: {
    justifyContent: 'center',
  },
  tituloSucursal: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textoGrande: {
    fontSize: 18,
    marginBottom: 5,
    paddingRight:60,
  },
  contenedorBotones: {
    paddingLeft:20,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
 
  },
});

export default ModificarSala;