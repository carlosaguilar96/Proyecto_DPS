import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsientosSeleccionados from '../assets/components/AsientoSeleccionados';
import InformacionEntradas from '../assets/components/InformacionEntradas';
import PagoTarjeta from '../assets/components/PagoTarjeta';

const VistaPagos = ({ navigation }) => {
  const [asientos, setAsientos] = useState(['A1', 'B4', 'D3']);
  const cantidadEntradas = asientos.length;
  const precioPorEntrada = 12.50; 

  const handleRealizarPago = (datosPago) => {
    console.log('Pago realizado:', datosPago);
  };

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
        <View style={styles.poster} />
        <View style={styles.movieDetails}>
          <Text style={styles.movieTitle}>Nombre de la Película</Text>
          <Text style={styles.movieDetailsText}>Cine ABC - 5:00 PM</Text>
          <Text style={styles.movieDetailsText}>Español</Text>
        </View>
      </View>

      {/* Asientos Seleccionados */}
      <AsientosSeleccionados asientos={asientos} />

      {/* Información de Entradas */}
      <InformacionEntradas cantidad={cantidadEntradas} precioIndividual={precioPorEntrada} />

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
    backgroundColor: '#d32f2f',
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

export default VistaPagos;