import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Modal, Button} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { movieData } from '../config/movieData';
import { ScrollView } from 'react-native-gesture-handler';

const ModificarPelicula = () => {
const [modalVisible,setModalVisible] = useState('');
const [codPeli, setCodPeli] = useState(0);
    // Componente renderItem para el FlatList
    const renderItem = ({ item }) => {
      return (
        <View style={estilos.contenedor}>
          <View style={estilos.tarjeta}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }} 
              style={estilos.imagenPelicula}
            />
            <View style={estilos.detallesPelicula}>
              <Text style={estilos.tituloPelicula}>{item.Nombre}</Text>
              <Text>Duración: {item.Duracion}</Text>
              <Text>Clasificación: {item.Clasificacion}</Text>
              <Text>Género: {item.Genero}</Text>
              <Text style={estilos.sinopsis}>Sinopsis: {item.Sinopsis}</Text>
              
            </View>
            <View style={estilos.contenedorBotones}>
            {item.estadoE == "Inactivo" ? (
              <TouchableOpacity style={estilos.botonIcono} onPress={() => handleModalOpen(item.CodPelicula)}>
              <FontAwesome name="ban" size={30} color="white" />
            </TouchableOpacity>
            ):(
              <TouchableOpacity style={estilos.botonIcono} onPress={() => handleModalOpen(item.CodPelicula)}>
              <FontAwesome name="edit" size={30} color="white" />
            </TouchableOpacity>
            )}
                
              </View>
          </View>
        </View>
      );
    };
  
    const handleModalOpen = (CodPelicula) =>{
      setModalVisible(true);
      setCodPeli(CodPelicula);
    }

  const handleModalClose = () => {
    // Cerrar el modal y cambiar estado
    setModalVisible(false);
    console.log(codPeli);
  };

    // Componente FlatList para mostrar la lista de películas
    const FlatListMovie = ({ Movie }) => {
      return (
        <FlatList
          data={Movie}
          renderItem={renderItem}
          keyExtractor={(item) => item.CodPelicula} 
          scrollEnabled={false} 
        />
      );
    };
  
   
    return (
      <ScrollView>
      <FlatListMovie Movie={movieData} />
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
    elevation: 5,
   
  },
  imagenPelicula: {
    width: 80,
    height: 130,
    borderRadius: 10,
  },
  detallesPelicula: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
    
  },
  tituloPelicula: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sinopsis: {
    marginTop: 10,
    textAlign: 'justify'
  },
  contenedorBotones: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 15,
    alignItems: 'center',
  },
  botonIcono: {
    backgroundColor: '#8B0000',
    padding: 10,
    borderRadius: 5,
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

export default ModificarPelicula;