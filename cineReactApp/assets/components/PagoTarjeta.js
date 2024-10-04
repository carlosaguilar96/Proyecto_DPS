import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const PagoTarjeta = ({ onRealizarPago }) => {
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const [nombreTitular, setNombreTitular] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [cvv, setCvv] = useState('');

  const realizarPago = () => {
    if (nombreTitular && numeroTarjeta && fechaVencimiento && cvv) {

      if(numeroTarjeta.length != 19){
        Alert.alert("Mensaje", "Ingrese un número de tarjeta válido");
        return;
      }
      if(fechaVencimiento.length != 7){
        Alert.alert("Mensaje", "Ingrese una fecha de vencimiento válida");
        return;
      }
      if(cvv.length != 3){
        Alert.alert("Mensaje", "Ingrese un CVV válido");
        return;
      }
      onRealizarPago({
        metodoPago,
        nombreTitular,
        numeroTarjeta,
        fechaVencimiento,
        cvv,
      });

    } else {
      Alert.alert("Mensaje",'Por favor, complete todos los campos.');
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
          <TextInputMask
            style={styles.input}
            placeholder="0000-0000-0000-0000"
            value={numeroTarjeta}
            keyboardType="numeric"
            onChangeText={setNumeroTarjeta}
            type={'custom'}
            options={{
              mask: '9999-9999-9999-9999',
            }}
          />

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Fecha de vencimiento</Text>
              <TextInputMask
                style={styles.input}
                placeholder="MM/AAAA"
                value={fechaVencimiento}
                keyboardType="numeric"
                onChangeText={setFechaVencimiento}
                type={'custom'}
                options={{
                  mask: '99/9999',
                }}
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>CVV</Text>
              <TextInputMask
                style={styles.input}
                placeholder="CVV"
                value={cvv}
                keyboardType="numeric"
                secureTextEntry
                onChangeText={setCvv}
                type={'custom'}
                options={{
                  mask: '999',
                }}
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