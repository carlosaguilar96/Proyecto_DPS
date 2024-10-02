import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse } from "date-fns";

export default function PerfilUser() {
    const [usuarioInfo, setUsuarioInfo] = useState(null);

    const imprimirUsuario = async () => {
        
        // Obtener la información almacenada del AsyncStorage
    try {
        const infouser = await AsyncStorage.getItem('usuarioInfo');
        
        if (infouser !== null) {
          
          const parsedUsuarioInfo = JSON.parse(infouser);
          console.log('Datos del usuario:', parsedUsuarioInfo);
          setUsuarioInfo(parsedUsuarioInfo);
        } else {
          console.log('No hay información de usuario almacenada.');
        }
      } catch (error) {
        console.log('Error al obtener la información del usuario:', error);
      }
    }

    useEffect(() => {
        imprimirUsuario();
      }, []);
    

    return(
        <View>
        {usuarioInfo ? (
          <View>
            <Text>Nombre de usuario: {usuarioInfo.nombreUsuario}</Text>
          </View>
        ) : (
          <Text>No hay información del usuario</Text>
        )}
      </View>
    );
}