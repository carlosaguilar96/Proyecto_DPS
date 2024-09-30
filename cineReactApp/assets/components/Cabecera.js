import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Cabecera = ({ titulo, onBack }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <AntDesign name="arrowleft" size={20} color="white" />
      </TouchableOpacity>
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b30000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  titulo: {
    color: '#fff',
    fontSize: 21,
    flex: 1,
    paddingLeft:20,
  },
  
});

export default Cabecera;