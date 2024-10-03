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
  // Cerrar el modal y cambiar estado con lo de la API
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
        keyExtractor={(item) => item.id} 
        scrollEnabled={false} 
      />
    );
  };

 
  return (
    <ScrollView>
    <FlatListSala Salas={salas} />
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
                <Button title="Aceptar" onPress={() => CambiarEstado()} />
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