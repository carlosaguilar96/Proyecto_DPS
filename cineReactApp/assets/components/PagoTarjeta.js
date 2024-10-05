import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const PagoTarjeta = ({ onRealizarPago }) => {
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const [nombreTitular, setNombreTitular] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('MM/');
  const [cvv, setCvv] = useState('');

  const manejarCambioFecha = (texto) => {
    let nuevoTexto = texto;

    // Validar el mes
    if (texto.length === 1 && texto !== '0' && texto !== '1') {
      nuevoTexto = '0' + texto + '/';
    } else if (texto.length === 2 && texto[1] !== '/') {
      nuevoTexto = texto + '/';
    } else if (texto.length === 5) {
      const mes = parseInt(texto.slice(0, 2), 10);
      const año = parseInt(texto.slice(3, 5), 10);
      if (año < 24 || año > 34) {
        Alert.alert("Mensaje", "Ingrese un año válido (entre 24 y 34)");
        return; // No permitir años menores que 24 o mayores que 34
      }
    }

    setFechaVencimiento(nuevoTexto);
  };

  const realizarPago = () => {
    if (nombreTitular && numeroTarjeta && fechaVencimiento && cvv) {
      if (numeroTarjeta.length !== 19) {
        Alert.alert("Mensaje", "Ingrese un número de tarjeta válido");
        return;
      }
      if (fechaVencimiento.length !== 5) {
        Alert.alert("Mensaje", "Ingrese una fecha de vencimiento válida");
        return;
      }
      if (cvv.length !== 3) {
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

      setNombreTitular("");
      setNumeroTarjeta("");
      setFechaVencimiento("MM/");
      setCvv("");
    } else {
      Alert.alert("Mensaje", 'Por favor, complete todos los campos.');
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Realizar Pago</Text>

      {metodoPago === 'tarjeta' && (
        <View style={estilos.formulario}>
          <Text style={estilos.label}>Nombre del titular</Text>
          <TextInput
            style={estilos.input}
            placeholder="Nombre como aparece en la tarjeta"
            value={nombreTitular}
            onChangeText={setNombreTitular}
          />

          <Text style={estilos.label}>Número de tarjeta</Text>
          <TextInputMask
            style={estilos.input}
            placeholder="0000-0000-0000-0000"
            value={numeroTarjeta}
            keyboardType="numeric"
            onChangeText={setNumeroTarjeta}
            type={'custom'}
            options={{
              mask: '9999-9999-9999-9999',
            }}
          />

          <View style={estilos.row}>
            <View style={estilos.column}>
              <Text style={estilos.label}>Fecha de vencimiento</Text>
              <TextInputMask
                style={estilos.input}
                placeholder="MM/AA"
                value={fechaVencimiento}
                keyboardType="numeric"
                onChangeText={manejarCambioFecha}
                type={'custom'}
                options={{
                  mask: '99/99',
                }}
              />
            </View>

            <View style={estilos.column}>
              <Text style={estilos.label}>CVV</Text>
              <TextInputMask
                style={estilos.input}
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

          <TouchableOpacity style={estilos.botonPagar} onPress={realizarPago}>
            <Text style={estilos.textoBotonPagar}>Pagar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const estilos = StyleSheet.create({
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
