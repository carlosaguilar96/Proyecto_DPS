import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { API_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';

const Dulceria = () => {
  const [id, setid] = useState(0);
  const [estado, setEstado] = useState(0);
  const [productos, setProductos] = useState('');
  const isFocused = useIsFocused();

  const obtenerProductos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/productos/index`);

      if (response.data.productos.length != 0)
        setProductos(response.data.productos);
      console.log(response.data.productos);
    } catch (error) {
      if (error.request) {
        Alert.alert('Error', 'No hubo respuesta del servidor');
        return;
      } else {
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
      <FlatList
        data={productos}
        renderItem={renderItem}
        keyExtractor={(item) => item.codProducto}
        scrollEnabled={false}
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


});

export default Dulceria;