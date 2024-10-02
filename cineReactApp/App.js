import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Inicio from './screens/Inicio'; // Tu pantalla de inicio o cualquier otra pantalla que desees añadir
import Login from './screens/Login';
import { AppProvider } from './assets/components/Context';
// Otras pantallas de ejemplo para el menú Drawer

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <AppProvider>
    <NavigationContainer>
    <Login/> 
    </NavigationContainer>
    </AppProvider> 
    
  );
}

const styles = StyleSheet.create({
  center: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
