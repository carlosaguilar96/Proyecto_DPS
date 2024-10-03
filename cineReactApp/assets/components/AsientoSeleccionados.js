import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AsientosSeleccionados = ({ asientos }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asientos Seleccionados</Text>
      <Text style={styles.asientosText}>
        {asientos.length > 0 ? asientos.join(', ') : 'No has seleccionado asientos aún.'}
      </Text>
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
  asientosText: {
    fontSize: 16,
    color: '#757575',
  },
});

export default AsientosSeleccionados;