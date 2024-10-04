import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const SeleccionAsientos = ({ filas, columnas, asientosSeleccionados, onSeleccionarAsiento, asientosOcupados }) => {
  const toggleSeatSelection = (asiento) => {
    onSeleccionarAsiento(asiento);
  };
  const renderFila = (fila, indiceFila) => (
    <View key={indiceFila} style={styles.fila}>
      <Text style={styles.etiquetaFila}>{String.fromCharCode(65 + indiceFila)}</Text> {/* Letras laterales */}
      {fila.map((asiento, indiceAsiento) => (
        <TouchableOpacity
          key={indiceAsiento}
          style={[
            styles.asiento,
            asientosOcupados.includes(asiento) ? styles.asientoOcupado : (
              asientosSeleccionados.includes(asiento) ? styles.asientoSeleccionado : styles.asientoDisponible
            ),
          ]}
          onPress={() => toggleSeatSelection(asiento)}
          disabled={asientosOcupados.includes(asiento)}
        >
          <Text style={styles.textoAsiento}>{asiento}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.pantalla}>Pantalla</Text>
        <View style={styles.grid}>
        </View>
        {filas.map((fila, indiceFila) => (
          <View key={indiceFila} style={styles.fila}>
            {fila.map((asiento, indiceAsiento) => (
              <TouchableOpacity
                key={indiceAsiento}
                style={[
                  styles.asiento,
                  asientosOcupados.includes(asiento) ? styles.asientoOcupado : (
                    asientosSeleccionados.includes(asiento) ? styles.asientoSeleccionado : styles.asientoDisponible
                  ),
                ]}
                onPress={() => toggleSeatSelection(asiento)}
                disabled={asientosOcupados.includes(asiento)}

              >
                <Text style={styles.textoAsiento}>{asiento}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View style={styles.seleccionadosContainer}>
          <Text
            style={styles.tituloSeleccionados}>Asientos Seleccionados:
          </Text>
          <FlatList
            data={asientosSeleccionados}
            renderItem={({ item }) => <Text style={styles.asientoSeleccionadoTexto}>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />
        </View>
        {/* Tarjeta informativa */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Estado de los Asientos</Text>
          <View style={styles.estadoAsientos}>
            <View style={[styles.muestraAsiento, styles.asientoDisponible]} />
            <Text>Disponible </Text>
            <View style={[styles.muestraAsiento, styles.asientoOcupado]} />
            <Text>No Disponible </Text>
            <View style={[styles.muestraAsiento, styles.asientoSeleccionado]} />
            <Text>Seleccionado </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#f5f5f5',
  },
  pantalla: {
    textAlign: 'center',
    backgroundColor: '#ddd',
    padding: 6,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'column',
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  etiquetaFila: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  asiento: {
    width: 35,
    height: 35,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  asientoDisponible: {
    backgroundColor: 'white',
  },
  asientoOcupado: {
    backgroundColor: 'black',
  },
  asientoSeleccionado: {
    backgroundColor: '#b30000',
  },
  textoAsiento: {
    color: '#333',
  },
  seleccionadosContainer: {
    paddingHorizontal: 16,
  },
  tituloSeleccionados: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  asientoSeleccionadoTexto: {
    marginRight: 10,
    fontSize: 16,
    color: '#000000',
  },
  card: {
    backgroundColor: '#C1BEBF',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  estadoAsientos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  muestraAsiento: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});
export default SeleccionAsientos;
