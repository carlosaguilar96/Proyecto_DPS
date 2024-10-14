import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Modal, Button, Alert,ActivityIndicator} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { movieData } from '../config/movieData';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { API_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';

const ModificarPelicula = () => {
const [modalVisible,setModalVisible] = useState('');
const [id, setid] = useState(0);
const [estado, setEstado] = useState(0);
const [peliculas, setPeliculas] = useState('');
const isFocused = useIsFocused();
const [loading, setLoading] = useState(false);


const obtenerPeliculas = async () => {
  setLoading(true);
  try {
    console.log(API_URL);
    console.log(API_URL);
    const response = await axios.get(`${API_URL}/api/peliculas/index`);
    setLoading(false);
    if (response.data.peliculas.length != 0)
      setPeliculas(response.data.peliculas);

    } catch (error) {
      if (error.request) {
        setLoading(false);
        Alert.alert('Error', 'No hubo respuesta del servidor');
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
    obtenerPeliculas();
  }
}, [isFocused]);

    // Componente renderItem para el FlatList
    const renderItem = ({ item }) => {
      return (
        <View key={item.codPelicula} style={estilos.contenedor}>
          <View  style={estilos.tarjeta}>
            <Image
              source={{ uri: `${API_URL}/img/peliculas/${item.imagen}` }} 
              style={estilos.imagenPelicula}
            />
            <View style={estilos.detallesPelicula}>
              <Text style={estilos.tituloPelicula}>{item.nombre}</Text>
              <Text>Duración: {item.duracion} minutos</Text>
              <Text>Clasificación: {item.clasificacion}</Text>
              <Text>Género: {item.genero}</Text>
              <Text style={estilos.sinopsis}>Sinopsis: {item.sinopsis}</Text>
              
            </View>
            <View style={estilos.contenedorBotones}>
            {item.estadoEliminacion === 0 ? (
              <TouchableOpacity style={estilos.botonIcono} onPress={() => handleModalOpen(item.codPelicula, item.estadoEliminacion)}>
              <FontAwesome name="ban" size={30} color="white" />
            </TouchableOpacity>
            ):(
              <TouchableOpacity style={estilos.botonIcono} onPress={() => handleModalOpen(item.codPelicula, item.estadoEliminacion)}>
              <FontAwesome name="check" size={30} color="white" />
            </TouchableOpacity>
            )}
                
              </View>
          </View>
        </View>
      );
    };
  
    const handleModalOpen = (id, estado) =>{
      setModalVisible(true);
      setid(id);
      setEstado(estado);
    }

    const CambiarEstado = async () => {
      if(estado==1){
        setLoading(true);
        try {
          console.log(API_URL);
          const response = await axios.put(`${API_URL}/api/peliculas/eliminarPelicula/${id}`);
          setLoading(false);
          Alert.alert('Pelicula eliminada', 'La pelicula ha sido eliminada con éxito');
          setModalVisible(false);
          obtenerPeliculas();
        } catch (error) {
          if (error.request) {
            setLoading(false);
            Alert.alert('Error', 'No hubo respuesta del servidor');
            return;
          } else {
            setLoading(false);
            Alert.alert('Error', 'Error al hacer la solicitud');
            return;
          }
        }
      }
      if(estado==0){
        setLoading(true);
        try {
          console.log(API_URL);
          console.log(API_URL);
          const response = await axios.put(`${API_URL}/api/peliculas/reactivarPelicula/${id}`);
          setLoading(false);
          Alert.alert('Pelicula reactivada', 'La pelicula ha sido reactivada con éxito');
          setModalVisible(false);
          obtenerPeliculas();
        } catch (error) {
          if (error.request) {
            setLoading(false);
            Alert.alert('Error', 'No hubo respuesta del servidor');
            return;
          } else {
            setLoading(false);
            Alert.alert('Error', 'Error al hacer la solicitud');
            return;
          }
        }
      }
    };

    // Componente FlatList para mostrar la lista de películas
    const FlatListMovie = ({ Movie }) => {
      return (
        <FlatList
          data={Movie}
          renderItem={renderItem}
          keyExtractor={(item) => item.codPelicula} 
          scrollEnabled={false} 
        />
      );
    };
  
   
    return (
      <ScrollView>
        <Modal
                transparent={true} // Hace que el fondo del modal sea transparente
                animationType="fade" // Tipo de animación al mostrar el modal
                visible={loading} // Modal visible mientras `loading` sea true
                onRequestClose={() => setLoading(false)} // Cierra el modal si se intenta cerrar
              >
                <View style={estilos.modalBackgroundd}>
                  <View style={estilos.modalContainerr}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={estilos.loadingTextt}>Cargando...</Text>
                  </View>
                </View>
              </Modal>
      <FlatListMovie Movie={peliculas} />
              {/* Modal */}
              <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={estilos.modalContainer}>
        <View style={estilos.modalContent}>
          <Text style={estilos.modalText}>¿Seguro que desea {estado === 0  ? ('reactivar'):('eliminar')} la película?</Text>
          
          <View style={estilos.buttonContainer}>
            <TouchableOpacity style={estilos.botonCancelar} onPress={() => setModalVisible(false)}>
              <Text style={estilos.botonTexto}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.botonAceptar} onPress={() => CambiarEstado()}>
              <Text style={estilos.botonTexto}>Aceptar</Text>
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
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonAceptar: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  botonCancelar: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  botonTexto: {
    color: 'white',
    textAlign: 'center',
  },
  modalBackgroundd: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro y semi-transparente
  },
  modalContainerr: {
    width: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b30000', // Fondo del modal
    borderRadius: 10,
  },
  loadingTextt: {
    marginTop: 10,
    color: '#ffffff', // Color del texto blanco
    fontSize: 16,
  },
});

export default ModificarPelicula;