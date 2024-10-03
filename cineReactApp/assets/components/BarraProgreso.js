import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

const BarraProgreso = () => {
  return (
    <View style={styles.container}>
      <View style={styles.paso}>
        <FontAwesome5 name="ticket-alt" size={24} color="white" /> 
      </View>
      <View style={styles.paso}>
        <MaterialCommunityIcons name="seat" size={24} color="white" />
      </View>
      <View style={styles.paso}>
        <Ionicons name="card" size={24} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24, 
    paddingVertical: 24,
    backgroundColor: '#555',
  },
  paso: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BarraProgreso;