import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Cabecera from '../assets/components/Cabecera';
import BarraProgreso from '../assets/components/BarraProgreso';
import InfoPelicula from '../assets/components/InfoPelicula';
import SeleccionAsientos from '../assets/components/SeleccionAsientos';
import TotalYContinuar from '../assets/components/TotalContinuar';

const PantallaSeleccionAsientos = ({ navigation }) => {
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  
  const filas = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'],
    ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'],
  ];
  
  const columnas = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const asientosOcupados = ['A2', 'C3', 'D4']; // PRUEBA XD

  const seleccionarAsiento = (asiento) => {
    if (asientosSeleccionados.includes(asiento)) {
      setAsientosSeleccionados(asientosSeleccionados.filter(s => s !== asiento));
    } else {
      setAsientosSeleccionados([...asientosSeleccionados, asiento]);
    }
  };

  const total = asientosSeleccionados.length * 10;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinuar = () => {
  };

  return (
    <View style={styles.container}>
      <Cabecera titulo="Entradas" onBack={handleBack} />
      <BarraProgreso />
      <InfoPelicula
        titulo="Nombre de la película"
        sucursal="Sucursal Cine"
        horario="20:00"
        idioma="Español"
        posterUri="https://via.placeholder.com/150"
      />
      <SeleccionAsientos
        filas={filas}
        columnas={columnas}
        asientosSeleccionados={asientosSeleccionados}
        asientosOcupados={asientosOcupados}
        onSeleccionarAsiento={seleccionarAsiento}
      />
      <TotalYContinuar total={total} onContinuar={handleContinuar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 64, 
  },
});

export default PantallaSeleccionAsientos;