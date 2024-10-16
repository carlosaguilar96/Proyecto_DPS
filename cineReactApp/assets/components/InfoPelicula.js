import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const InfoPelicula = ({ titulo, sucursal, horario, dia, idioma, posterUri, sala }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: posterUri }} style={styles.poster} />
      <View style={styles.detalles}>
          <Text style={styles.subtituloo}>{titulo}</Text>
          <Text style={styles.subtitulo}>{dia} | {horario}</Text>
          <Text style={styles.subtitulo}>Sala {sala} | Sucursal {sucursal}</Text>
          <Text style={styles.subtitulo}>{idioma}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#444',
    borderBottomWidth: 1,
    borderColor: '#666',
  },
  poster: {
    width: 80,
    height: 120,
    marginRight: 16,
  },
  detalles: {
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
  },
  subtitulo: {
    color: '#aaa',
    fontSize: 14,
  },
  subtituloo: {
    color: '#fff',
    fontSize: 20,
  },
});

export default InfoPelicula;