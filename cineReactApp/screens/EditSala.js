import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList,Button,Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Salas } from '../config/movieData';


const agruparPorSucursal = (salas) => { 
  const salasAgrupadas = salas.reduce((acc, item) => {
    // Verificar si ya existe una entrada para la sucursal
    const existingSucursal = acc.find(h => h.sucursal === item.sucursal);

    if (!existingSucursal) {
      // Si no existe, se crea una nueva entrada para la sucursal con los detalles de la película
      acc.push({
        sucursal: item.sucursal,
        salas: [{
          id: item.id,
          capacidad: item.capacidad, 
          codsucursal: item.codsucursal,
          tipo: item.tipo,
          estadoE: item.estadoE,
        }]
      });
    } else {
      // Si ya existe la sucursal, añadir los detalles de la película
      existingSucursal.salas.push({
          id: item.id,
          capacidad: item.capacidad, 
          codsucursal: item.codsucursal,
          tipo: item.tipo,
          estadoE: item.estadoE,
      });
    }

    return acc;
  }, []);

  return salasAgrupadas;
};


const ModificarSala = () => {
  const salas = agruparPorSucursal(Salas);
  const [modalVisible,setModalVisible] = useState('');
  const [id, setid] = useState(0);

  const handleModalOpen = (id) =>{
    setModalVisible(true);
    setid(id);
  }

  
  
  const CambiarEstado = () => {
    //AQUI DEBERIA CAMBIARSE EL ESTADO, en id esta el id de sala

  setModalVisible(false);
  console.log(id);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={estilos.contenedor}>
        <Text style={estilos.tituloSucursal}>Sucursal {item.sucursal}</Text>
        
            {item.salas.map((sala, index) => (
              <View style={estilos.tarjeta}>
            <View key={index}>
            <Text style={estilos.textoGrande}>{`Sala: ${sala.id}`}</Text>
            <Text style={estilos.textoGrande}>{`Número de Asientos: ${sala.capacidad}`}</Text>
            <Text style={estilos.textoGrande}>{`Tipo de Sala: ${sala.tipo}`}</Text>
            </View>
            <View style={estilos.contenedorBotones}>
            {sala.estadoE === 0 ? (
              <TouchableOpacity style={estilos.botonIcono} onPress={() => handleModalOpen(sala.id)}>
              <FontAwesome name="ban" size={30} color="white" />
            </TouchableOpacity>
            ):(
              <TouchableOpacity style={estilos.botonIcono} onPress={() => handleModalOpen(sala.id)}>
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
  
});

export default ModificarSala;