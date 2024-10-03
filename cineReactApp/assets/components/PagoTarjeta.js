import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Picker, TouchableOpacity } from 'react-native';

const PagoTarjeta = ({ onRealizarPago }) => {
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const [nombreTitular, setNombreTitular] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [cvv, setCvv] = useState('');

  const realizarPago = () => {
    if (nombreTitular && numeroTarjeta && fechaVencimiento && cvv) {
      onRealizarPago({
        metodoPago,
        nombreTitular,
        numeroTarjeta,
        fechaVencimiento,
        cvv,
      });
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Realizar Pago</Text>

      {metodoPago === 'tarjeta' && (
        <View style={styles.formulario}>
          <Text style={styles.label}>Nombre del titular</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre como aparece en la tarjeta"
            value={nombreTitular}
            onChangeText={setNombreTitular}
          />

          <Text style={styles.label}>Número de tarjeta</Text>
          <TextInput
            style={styles.input}
            placeholder="1234 5678 9012 3456"
            value={numeroTarjeta}
            keyboardType="numeric"
            onChangeText={setNumeroTarjeta}
          />

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Fecha de vencimiento</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/AA"
                value={fechaVencimiento}
                keyboardType="numeric"
                onChangeText={setFechaVencimiento}
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="CVV"
                value={cvv}
                keyboardType="numeric"
                secureTextEntry
                onChangeText={setCvv}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.botonPagar} onPress={realizarPago}>
            <Text style={styles.textoBotonPagar}>Pagar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginTop: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  selectContainer: {
    marginBottom: 16,
  },
  select: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
  },
  formulario: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginRight: 8,
  },
  botonPagar: {
    backgroundColor: '#ff6666',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  textoBotonPagar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PagoTarjeta;