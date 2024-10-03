import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Inicio from './screens/Inicio'; // Tu pantalla de inicio o cualquier otra pantalla que desees añadir
import PrimerAdminForm from './screens/PrimerAdminForm';
import Login from './screens/Login';
import { AppProvider } from './assets/components/Context';
// Otras pantallas de ejemplo para el menú Drawer
import axios from 'axios';
import { API_URL } from '@env';
const Drawer = createDrawerNavigator();
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function App() {

  const [hayAdmin, setHayAdmin] = useState(true);

  let verificarAdmin = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/usuarios/indexAdmins`);

      console.log(response.data.usuarios.length);
      if (response.data.usuarios.length == 0) 
        setHayAdmin(false);

    } catch (error) {
      if (error.request) {
        Alert.alert('Error', 'No hubo respuesta del servidor');
        return;
      } else {
        Alert.alert('Error', 'Error al hacer la solicitud');
        return;
      }
    }
  }

  useEffect(() => {
    verificarAdmin();
  }, []);

  if (hayAdmin == true)
    return (
      <AppProvider>
        <NavigationContainer>
          <Login />
        </NavigationContainer>
      </AppProvider>

    );
  else // Se crea el primer administrador, el cine y las sucursales
    return (
      <PrimerAdminForm retornarLogin={setHayAdmin}/>
    );
}

const styles = StyleSheet.create({
  center: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
