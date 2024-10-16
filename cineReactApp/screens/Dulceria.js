import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Alert,ActivityIndicator, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { API_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';

const Dulceria = () => {
  const [id, setid] = useState(0);
  const [estado, setEstado] = useState(0);
  const [productos, setProductos] = useState('');
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  const obtenerProductos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/productos/index`);

      if (response.data.productos.length != 0)
        setProductos(response.data.productos);
      setLoading(false);
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
      obtenerProductos();
    }
  }, [isFocused]);

  // Componente renderItem para el FlatList
  const renderItem = ({ item }) => {
    return (
      <View key={item.codProducto} style={estilos.contenedor}>
        <View style={estilos.tarjeta}>
          <Image
            source={{ uri: `${API_URL}/img/productos/${item.miniatura}` }}
            style={estilos.imagenProducto}
          />
          <View style={estilos.detallesProducto}>
            <Text style={estilos.tituloProducto}>{item.nombre}</Text>
            <Text>Precio: ${item.precioRegular}</Text>
            <Text style={estilos.descripcion}>Descripcion: {item.descripcion}</Text>
          </View>
        </View>
      </View>
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
                <View style={estilos.modalBackground}>
                  <View style={estilos.modalContainer}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={estilos.loadingText}>Cargando...</Text>
                  </View>
                </View>
              </Modal>
      <FlatList
        data={productos}
        renderItem={renderItem}
        keyExtractor={(item) => item.codProducto}
        scrollEnabled={false}
        listEmptyComponent={<Text>Sin productos agregados</Text>}
      />
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
  imagenProducto: {
    width: 80,
    height: 130,
    borderRadius: 10,
  },
  detallesProducto: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',

  },
  tituloProducto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descripcion: {
    marginTop: 10,
    textAlign: 'justify'
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro y semi-transparente
  },
  modalContainer: {
    width: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b30000', // Fondo del modal
    borderRadius: 10,
  },
  loadingText: {
    marginTop: 10,
    color: '#ffffff', // Color del texto blanco
    fontSize: 16,
  },


});

export default Dulceria;