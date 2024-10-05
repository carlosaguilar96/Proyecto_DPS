import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Cabecera from '../assets/components/Cabecera';
import BarraProgreso from '../assets/components/BarraProgreso';
import InfoPelicula from '../assets/components/InfoPelicula';
import SeleccionAsientos from '../assets/components/SeleccionAsientos';
import TotalYContinuar from '../assets/components/TotalContinuar';
import { API_URL } from '@env';
import axios from 'axios';

const PantallaSeleccionAsientos = ({ navigation, route }) => {
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const [asientosOcupados, setAsientosOcupados] = useState([]);
  const { params } = route;
  const {codFuncion} = params;

  const filas = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'],
    ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'],
  ];

  const columnas = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const imagenURI = `${API_URL}/img/peliculas/${params.image}`;

  const seleccionarAsiento = (asiento) => {
    if (asientosSeleccionados.includes(asiento)) {
      setAsientosSeleccionados(asientosSeleccionados.filter(s => s !== asiento));
    } else {
      if (asientosSeleccionados.length < params.cantidad)
        setAsientosSeleccionados([...asientosSeleccionados, asiento]);
      else {
        Alert.alert("Mensaje", "Ya seleccionó todos los asientos para su función");
      }
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinuar = () => {
    if (asientosSeleccionados.length == params.cantidad) {
      const {title, sucursal, fecha, hora, idioma, total, cantidad, image, childP, childB, adultoP, adultoB, abueP, abueB, codFuncion} = params;
      navigation.navigate("VistaPago", {title, sucursal, fecha, hora, idioma, total, cantidad, image, childP, childB, adultoP, adultoB, abueP, abueB, asientosSeleccionados, codFuncion} );

      limpiar();
    }
    else
      Alert.alert("Mensaje", `Faltan ${params.cantidad - asientosSeleccionados.length} asientos por seleccionar`);
  };

  const limpiar = () =>{
    setAsientosSeleccionados([]);
  }

  const obtenerAsientosOcupados = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/funciones/devolverAsientos/${codFuncion}`);

      if (response.data.asientos.length != 0) {
        setAsientosOcupados(response.data.asientos);
      }
      else
        setAsientosOcupados([]);

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
    obtenerAsientosOcupados();
  }, []);

  useEffect(() => {
    obtenerAsientosOcupados();
  }, [params]);

  return (
    <View style={styles.container}>

      <View style={styles.progressBar}>
        <View style={styles.progressItem}>
          <Icon name="confirmation-number" size={28} color="#fff" />
        </View>
        <View style={[styles.progressItem, styles.progressItemActive]}>
          <Icon name="event-seat" size={28} color="#fff" />
        </View>
        <View style={styles.progressItem}>
          <Icon name="payment" size={28} color="#fff" />
        </View>
      </View>
      
      <InfoPelicula
        titulo={params.title}
        sucursal={params.sucursal}
        horario={params.hora}
        dia={params.fecha}
        idioma={params.idioma}
        posterUri={imagenURI}
      />
      <SeleccionAsientos
        filas={filas}
        columnas={columnas}
        asientosSeleccionados={asientosSeleccionados}
        asientosOcupados={asientosOcupados}
        onSeleccionarAsiento={seleccionarAsiento}
      />
      <TotalYContinuar total={params.total.toFixed(2)} onContinuar={handleContinuar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 64,
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
});

export default PantallaSeleccionAsientos;