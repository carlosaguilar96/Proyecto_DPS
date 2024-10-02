import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TotalYContinuar = ({ total, onContinuar }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textoTotal}>Total: ${total}</Text>
      <TouchableOpacity style={styles.botonContinuar} onPress={onContinuar}>
        <Text style={styles.textoBoton}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  botonContinuar: {
    backgroundColor: '#b30000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
  },
});

export default TotalContinuar;