import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InformacionEntradas = ({ cantidad, precioIndividual }) => {
  const total = cantidad * precioIndividual;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información de Entradas</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Cantidad de Entradas:</Text>
        <Text style={styles.value}>{cantidad}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Precio Individual:</Text>
        <Text style={styles.value}>${precioIndividual.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Total:</Text>
        <Text style={styles.value}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#757575',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InformacionEntradas;
