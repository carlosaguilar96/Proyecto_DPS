import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert,ActivityIndicator, Modal } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Cabecera from '../assets/components/Cabecera';
import { API_URL } from '@env';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

export default function Boletos() {
  const route = useRoute();
  const { title, idioma, hora, sucursal, fecha, image, precioNino, precioAdulto, precioTE, codSala, codFuncion } = route?.params || {};
  const navigation = useNavigation();
  const [childB, setchildB] = useState(0);
  const [adultoB, setadultoB] = useState(0);
  const [abueB, setabueB] = useState(0);
  const [total, setTotal] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [asientosOcupados, setAsientosOcupados] = useState([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);



  const handleNavigation = (title, idioma, hora, sucursal, fecha, image, childB, adultoB, abueB, total, sala, cantidad, funcion, childP, adultoP, abueP) => {

    if (total == 0) {
      Alert.alert("Mensaje", "Debe seleccionar al menos 1 asiento");
      return;
    }

    let cantidadDisponible = 40 - asientosOcupados.length;

    if (cantidadDisponible == 0) {
      Alert.alert("Mensaje", "Lo sentimos, pero la función está llena. Pruebe con otro horario");
      navigation.navigate("Inicio");
      return;
    }

    if (cantidad > cantidadDisponible) {
      Alert.alert("Mensaje", `Actualmente solo hay ${cantidadDisponible} asientos disponibles para esta función`);
      return;
    }
    navigation.navigate('PantallaSeleccionAsientos', { title, idioma, hora, sucursal, fecha, image, childB, adultoB, abueB, total, sala, cantidad, codFuncion, childP, adultoP, abueP});
    limpiar();
  };

  const limpiar = () => {
    setchildB(0);
    setadultoB(0);
    setabueB(0);
  }

  const handleBack = () => {
    navigation.goBack();
  };

  const getTotal = () => {
    let valor = (childB * precioNino) + (adultoB * precioAdulto) + (abueB * precioTE);
    return Math.round(valor * 100) / 100;
  };

  const getCantidad = () => {
    let valor = childB + adultoB + abueB;
    return valor;
  }

  useEffect(() => {
    const TotalN = getTotal();
    setTotal(TotalN);

    const Cantidad = getCantidad();
    setCantidad(Cantidad);
  }, [childB, adultoB, abueB, precioNino, precioAdulto, precioTE]);

  const obtenerAsientosOcupados = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/funciones/devolverAsientos/${codFuncion}`);

      if (response.data.asientos.length != 0) {
        setAsientosOcupados(response.data.asientos);
      }
      else
        setAsientosOcupados([]);
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
      obtenerAsientosOcupados();
    }
  }, [isFocused]);


  return (
    <View style={styles.fullContainer}>
      <Modal
                transparent={true} // Hace que el fondo del modal sea transparente
                animationType="fade" // Tipo de animación al mostrar el modal
                visible={loading} // Modal visible mientras `loading` sea true
                onRequestClose={() => setLoading(false)} // Cierra el modal si se intenta cerrar
              >
                <View style={styles.modalBackground}>
                  <View style={styles.modalContainer}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={styles.loadingText}>Cargando...</Text>
                  </View>
                </View>
              </Modal>

      {/* Header */}
      <Cabecera titulo="Entradas" onBack={handleBack} />

      <View style={styles.progressBar}>
        <View style={[styles.progressItem, styles.progressItemActive]}>
          <Icon name="confirmation-number" size={28} color="#fff" />
        </View>
        <View style={styles.progressItem}>
          <Icon name="event-seat" size={28} color="#fff" />
        </View>
        <View style={styles.progressItem}>
          <Icon name="payment" size={28} color="#fff" />
        </View>
      </View>

      {/* Movie Details */}
      <View style={styles.movieDetails}>
        <Image
          source={{ uri: `${API_URL}/img/peliculas/${image}` }}
          style={styles.moviePoster}
        />
        <View style={styles.movieInfo}>
          <Text style={styles.subtituloo}>{title}</Text>
          <Text style={styles.subtitulo}>{fecha} | {hora}</Text>
          <Text style={styles.subtitulo}>Sala {codSala} | Sucursal {sucursal}</Text>
          <Text style={styles.subtitulo}>{idioma}</Text>
        </View>
      </View>

      {/* Ticket Options */}
      <View style={styles.ticketOptions}>
        <Text style={styles.sectionTitle}>Escoja sus entradas</Text>

        <View style={styles.ticketRow}>
          <Text style={styles.subtituloT}>Niños:                </Text>
          <View style={styles.counter}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setchildB(Math.max(0, childB - 1))}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>{childB}</Text>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setchildB(childB + 1)}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtituloT}>${precioNino}</Text>
        </View>

        <View style={styles.ticketRow}>
          <Text style={styles.subtituloT}>Adulto general: </Text>
          <View style={styles.counter}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setadultoB(Math.max(0, adultoB - 1))}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>{adultoB}</Text>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setadultoB(adultoB + 1)}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtituloT}>${precioAdulto}</Text>
        </View>

        <View style={styles.ticketRow}>
          <Text style={styles.subtituloT}>3ra edad:           </Text>
          <View style={styles.counter}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setabueB(Math.max(0, abueB - 1))}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>{abueB}</Text>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setabueB(abueB + 1)}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtituloT}>${precioTE}</Text>
        </View>
      </View>

      {/* Total Price and Continue Button */}
      <View style={styles.footer}>
        <Text style={styles.textoTotal}>Total US ${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.continueButton} onPress={() => handleNavigation(title, idioma, hora, sucursal, fecha, image, childB, adultoB, abueB, total,
          codSala, cantidad, codFuncion, precioNino, precioAdulto, precioTE)}>
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#c55c5c',
    paddingHorizontal: 67,
    paddingVertical: 20,
    borderRadius: 0,
  },
  titulo: {
    color: 'white',
    fontSize: 20,
    marginBottom: 8,
  },
  subtitulo: {
    color: '#aaa',
    fontSize: 16,
  },
  subtituloo: {
    color: '#fff',
    fontSize: 20,
  },
  subtituloT: {

    fontSize: 16,
  },
  dayText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  movieDetails: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#444',
    borderBottomWidth: 1,
    borderColor: '#666',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  moviePoster: {
    width: 80,
    height: 120,
    marginRight: 16,
  },
  movieInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  movieTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
  },
  ticketOptions: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  counterText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#848081',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  textoTotal: {
    color: 'black',
    fontSize: 18,
  },
  continueButton: {
    backgroundColor: '#b30000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 15,
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