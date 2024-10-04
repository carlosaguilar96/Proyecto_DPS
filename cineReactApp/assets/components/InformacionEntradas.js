import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InformacionEntradas = ({ cantidad, childB, childP, adultoB, adultoP, abueB, abueP, total }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información de Entradas</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Cantidad de Entradas:</Text>
        <Text style={styles.value}>{cantidad}</Text>
      </View>

      <Text style={styles.subTitle}>Niños:</Text>
      <View style={styles.row}>
        <View style={styles.row}>
          <Text style={styles.label}>Cantidad: </Text>
          <Text style={styles.value}>{childB}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Precio: </Text>
          <Text style={styles.value}>${childP}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>SubTotal: </Text>
          <Text style={styles.value}>${(childP * childB).toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.subTitle}>Adultos:</Text>
      <View style={styles.row}>
        <View style={styles.row}>
          <Text style={styles.label}>Cantidad: </Text>
          <Text style={styles.value}>{adultoB}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Precio: </Text>
          <Text style={styles.value}>${adultoP}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>SubTotal: </Text>
          <Text style={styles.value}>${(adultoP * adultoB).toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.subTitle}>3ra Edad:</Text>
      <View style={styles.row}>
        <View style={styles.row}>
          <Text style={styles.label}>Cantidad: </Text>
          <Text style={styles.value}>{abueB}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Precio: </Text>
          <Text style={styles.value}>${abueP}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>SubTotal: </Text>
          <Text style={styles.value}>${(abueP * abueB).toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.value}>TOTAL:</Text>
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
    marginBottom: 8
  },
  subTitle: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 4,
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
