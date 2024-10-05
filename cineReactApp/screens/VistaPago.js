import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsientosSeleccionados from '../assets/components/AsientoSeleccionados';
import InformacionEntradas from '../assets/components/InformacionEntradas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PagoTarjeta from '../assets/components/PagoTarjeta';
import { API_URL } from '@env';
import axios from 'axios';

const VistaPago = ({ navigation, route }) => {
  const { params } = route;
  const imagenURI = `${API_URL}/img/peliculas/${params.image}`;
  const [usuario, setUsuario] = useState("");

  const handleRealizarPago = (datosPago) => {
    realizarCompra(datosPago.numeroTarjeta);
  };

  const realizarCompra = async (cardID) =>{
    try {
      const response = await axios.post(`${API_URL}/api/compras/crearCompra`, {
        nombreUsuario: usuario,
        codFuncion: params.codFuncion,
        cantidadAdultos: params.adultoB,
        cantidadNinos: params.childB,
        cantidadTE: params.abueB,
        cardID: cardID,
        asientos: params.asientosSeleccionados
      });
      Alert.alert('Compra exitosa', 'Compra realizada correctamente');
      navigation.navigate("Inicio");
    } catch (error) {
      if (error.response) {
        const errores = error.response.data.errors;
        let mensaje = "";
        for (const campo in errores) {
          mensaje += `Error en ${campo}: ${errores[campo].join(', ')}`;
        }
        Alert.alert("Error",mensaje);
        return;
      } else if (error.request) {
        Alert.alert('Error', 'No hubo respuesta del servidor');
        return;
      } else {
        Alert.alert('Error', 'Error al hacer la solicitud' + error);
        return;
      }
    }
  }

  const obtenerUsuario = async () =>{
    const infouser = await AsyncStorage.getItem('Nombreuser');

    const parsedUsuarioInfo = JSON.parse(infouser);
    setUsuario(parsedUsuarioInfo.nombreUsuario);

  }

  useEffect(() => {
    obtenerUsuario();
    
  }, []);
  return (
    <ScrollView style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>ENTRADAS</Text>
      </View>

      {/* Barra de Progreso */}
      <View style={styles.progressBar}>
        <View style={styles.progressItem}>
          <Icon name="confirmation-number" size={28} color="#fff" />
        </View>
        <View style={styles.progressItem}>
          <Icon name="event-seat" size={28} color="#fff" />
        </View>
        <View style={[styles.progressItem, styles.progressItemActive]}>
          <Icon name="payment" size={28} color="#fff" />
        </View>
      </View>

      {/* Información de la Película */}
      <View style={styles.movieInfo}>
        <Image source={{ uri: imagenURI }} style={styles.poster} />
        <View style={styles.movieDetails}>
          <Text style={styles.movieTitle}>{params.title}</Text>
          <Text style={styles.movieDetailsText}>Sucursal: {params.sucursal}</Text>
          <Text style={styles.movieDetailsText}>{params.hora} | {params.fecha}</Text>
          <Text style={styles.movieDetailsText}>{params.idioma}</Text>
        </View>
      </View>

      {/* Asientos Seleccionados */}
      <AsientosSeleccionados asientos={params.asientosSeleccionados} />

      {/* Información de Entradas */}
      <InformacionEntradas cantidad={params.cantidad} childB={params.childB} childP={params.childP} adultoB={params.adultoB} 
      adultoP={params.adultoP} abueB={params.abueB} abueP={params.abueP} total={params.total} />

      {/* Pago con Tarjeta */}
      <PagoTarjeta onRealizarPago={handleRealizarPago} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: '#b71c1c',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#848180',
  },
  progressItem: {
    flex: 1,
    alignItems: 'center',
  },
  progressItemActive: {
    borderBottomWidth: 4,
    borderBottomColor: '#fff',
  },
  movieInfo: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  poster: {
    width: 100,
    height: 150,
    backgroundColor: '#ddd',
    marginRight: 16,
  },
  movieDetails: {
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  movieDetailsText: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
});

export default VistaPago;