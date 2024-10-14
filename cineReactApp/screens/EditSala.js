import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList,Button,Modal,Alert,ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Salas as Salass } from '../config/movieData';
import axios from 'axios';
import { API_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';


const agruparPorSucursal = (salas) => { 
  const salasAgrupadas = salas.reduce((acc, item) => {
    // Verificar si ya existe una entrada para la sucursal
    const existingSucursal = acc.find(h => h.sucursal === item.sucursal);

    if (!existingSucursal) {
      // Si no existe, se crea una nueva entrada para la sucursal con los detalles de la película
      acc.push({
        sucursal: item.sucursal,
        salas: [{
          id: item.codSala,
          capacidad: item.capacidad, 
          codsucursal: item.codSucursal,
          estadoE: item.estadoEliminacion,
        }]
      });
    } else {
      // Si ya existe la sucursal, añadir los detalles de la película
      existingSucursal.salas.push({
          id: item.codSala,
          capacidad: item.capacidad, 
          codsucursal: item.codsucursal,
          estadoE: item.estadoEliminacion,
      });
    }

    return acc;
  }, []);

  return salasAgrupadas;
};


const ModificarSala = () => {
  const [Salas, setSalas] = useState([]);
  const isFocused = useIsFocused();
  const obtenerSalas = async () => {
    setLoading(true);
    try {
      console.log(API_URL);
      console.log(API_URL);
      const response = await axios.get(`${API_URL}/api/salas/index`);
      setLoading(false);
      if (response.data.salas.length != 0)
        setSalas(response.data.salas);
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
      obtenerSalas();
    }
  }, [isFocused]);
  const salas = agruparPorSucursal(Salas);
  const [modalVisible,setModalVisible] = useState('');
  const [id, setid] = useState(0);
  const [estado, setEstado] = useState(0);
  const [loading, setLoading] = useState(false);

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
        console.log(API_URL);
        const response = await axios.put(`${API_URL}/api/salas/eliminarSala/${id}`);
        setLoading(false);
        Alert.alert('Sala eliminada', 'La sala ha sido eliminada con éxito');
        setModalVisible(false);
        obtenerSalas();
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
        const response = await axios.put(`${API_URL}/api/salas/reactivarSala/${id}`);
        setLoading(false);
        Alert.alert('Sala reactivada', 'La sala ha sido reactivada con éxito');
        setModalVisible(false);
        obtenerSalas();
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

  const renderItem = ({ item }) => {
    return (
      <View style={estilos.contenedor}>
        <Text style={estilos.tituloSucursal}>Sucursal {item.sucursal}</Text>
        
            {item.salas.map((sala, index) => (
              <View key={sala.id} style={estilos.tarjeta}>
            <View key={index}>
            <Text style={estilos.textoGrande}>{`Sala: ${sala.id}`}</Text>
            <Text style={estilos.textoGrande}>{`Número de Asientos: ${sala.capacidad}`}</Text>
            </View>
            <View style={estilos.contenedorBotones}>
            {sala.estadoE === 0 ? (
              <TouchableOpacity style={estilos.botonIcono} onPress={() => handleModalOpen(sala.id, sala.estadoE)}>
              <FontAwesome name="ban" size={30} color="white" />
            </TouchableOpacity>
            ):(
              <TouchableOpacity style={estilos.botonIcono} onPress={() => handleModalOpen(sala.id, sala.estadoE)}>
              <FontAwesome name="check" size={30} color="white" />
            </TouchableOpacity>
            )}
                
              
        </View>
      </View>
    ))}
          
          
            {/* <TouchableOpacity style={estilos.botonIcono} onPress={() => {}}>
                <FontAwesome name="edit" size={30} color="white" />
              </TouchableOpacity>*/} 
               
      </View>
    );
  }
  

  const FlatListSala = ({ Salas }) => {
    return (
      <FlatList
        data={Salas}
        renderItem={renderItem}
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
    <FlatListSala Salas={salas} />
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={estilos.modalContainer}>
          <View style={estilos.modalContent}>
            <Text style={estilos.modalText}>
              ¿Seguro que desea {estado === 0  ? ('reactivar'):('eliminar')} la sala?
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
    paddingTop:10,
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
  
  tituloSucursal: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 20
  },
  textoGrande: {
    fontSize: 18,
    marginBottom: 5,
    paddingRight:60,
  },
  contenedorBotones: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',

    alignItems: 'center',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente
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

export default ModificarSala;