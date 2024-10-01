import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert, ScrollView,Platform ,KeyboardAvoidingView  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Inicio from './Inicio';
import { TextInputMask } from 'react-native-masked-text';
import Cartelera from './Cartelera';
import { AppContext } from '../assets/components/Context';
import { AppProvider } from '../assets/components/Context';

import Boletos from './Boletos';
import axios from 'axios';
import { API_URL } from '@env';

const Drawer = createDrawerNavigator();


export default function Login() {
  const [contra, setContra] = useState('');
  const [confirmContra, setConfirmContra] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dui, setDui] = useState('');
  const [email, setEmail] = useState('');
  const [ingreso, setIngreso] = useState(false);
  const [login, setLogin] = useState(true);
  const [mssgError, setMssgError] = useState('');
  const [username, setUsername] = useState('');
  const { miVariable2, setMiVariable2 } = useContext(AppContext);


  const validarEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const registrarCliente = async () => {
    //Todas estas validaciones son en el lado del cliente
    if(username == ""){
      setMssgError("Ingresar un nombre de usuario.");
      return;
    }
    if(nombre == ""){
      setMssgError("Ingresar un nombre.");
      return;
    }
    if(apellido == ""){
      setMssgError("Ingresar un apellido.");
      return;
    }
    if(dui == ""){
      setMssgError("Ingresar DUI.");
      return;
    }
    if (dui.length != 10) {
      setMssgError('Ingresar DUI válido.');
      return;
    }
    if(email == ""){
      setMssgError("Ingresar correo electrónico.");
      return;
    }
    if (!validarEmail(email)) {
      setMssgError('El correo electrónico ingresado no es válido.');
      return;
    }
    if(contra == ""){
      setMssgError("Ingresar contraseña.");
      return;
    }
    if (contra.length < 8) {
      setMssgError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if(confirmContra == ""){
      setMssgError("Ingresar confirmación de contraseña.");
      return;
    }
    if (contra !== confirmContra) {
      setMssgError('Las contraseñas no coinciden.');
      return;
    }

    //Esta validación ya no se hace en el cliente, la hace el servidor
    /*const usuarioExistente = Usuarios.find(usuario => usuario.email === email);
    if (usuarioExistente) {
      setMssgError('El correo electrónico ya está registrado.');
      return;
    }*/

    //Ingreso del cliente a la BD
    try { 
      const response = await axios.post(`${API_URL}/api/usuarios/crearCliente`, {
        nombreUsuario: username,
        contrasena: contra,
        DUI: dui,
        nombres: nombre,
        apellidos: apellido,
        correoE: email,
      });
      Alert.alert('Registro exitoso', 'Usuario creado correctamente');
      setMiVariable2(2);
      //El MiVariable es una variable de Context que al cambiar se mantiene como tal independientemente de lo que haga  o a que ruta vaya en la app
      setIngreso(true);
      setMssgError('');
    } catch (error) {
      if (error.response) {
        const errores = error.response.data.errors;
        let mensaje ="";
        for (const campo in errores) {
          mensaje += `Error en ${campo}: ${errores[campo].join(', ')}`;
        }
        setMssgError(mensaje);
        return;
      } else if (error.request) {
        Alert.alert('Error', 'No hubo respuesta del servidor');
        return;
      } else {
        Alert.alert('Error', 'Error al hacer la solicitud');
        return;
      }
    }
  };

  const EntrarInvitado = () =>{
    setMiVariable2(2);
    setIngreso(true);
    setMssgError('');
  }

 

  const iniciarSesion = async () => {
    if(username == ""){
      setMssgError("Ingresar un nombre de usuario.");
      return;
    }
    if(contra == ""){
      setMssgError("Ingresar contraseña.");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/api/iniciarSesion`, {
        user: username,
        password: contra,
      });
      if(response.data.usuario){
        if(response.data.usuario.nivelAcceso == 1){
          setMiVariable2(3);
        } else{
          setMiVariable2(2);
        }
        setIngreso(true);
        setMssgError('');
      } else{
        setMssgError('Credenciales incorrectas.');
        return;
      }
    } catch (error) {
      if (error.response) {
        const errores = error.response.data.errors;
        let mensaje ="";
        for (const campo in errores) {
          mensaje += `Error en ${campo}: ${errores[campo].join(', ')}`;
        }
        setMssgError(mensaje);
        return;
      } else if (error.request) {
        Alert.alert('Error', 'No hubo respuesta del servidor');
        return;
      } else {
        Alert.alert('Error', 'Error al hacer la solicitud');
        return;
      }
    }
    /*const usuario = Usuarios.find(usuario => usuario.email === email && usuario.contra === contra);
    if (!validarEmail(email)) {
      setMssgError('El correo electrónico ingresado no es válido.');
      return;
    }
    if (usuario) {

      if (usuario.rol === "admin") {
      setMiVariable2(3);    
    }
    else{
      setMiVariable2(2);    
    }

      setIngreso(true);
      setMssgError(''); 
    } else {
      setMssgError('Credenciales incorrectas.');
    }*/
  };

  const validarCierre = () => {
    setIngreso(false);
    setLogin(true);
    setUsername('');
    setNombre('');
    setApellido('');
    setDui('');
    setEmail('');
    setContra('');
    setConfirmContra('');
    setMssgError('');
  };


  const cambioPantalla = () => {
    setLogin(!login);
    setUsername('');
    setNombre('');
    setApellido('');
    setDui('');
    setEmail('');
    setContra('');
    setConfirmContra('');
    setMssgError('');
  };


  if (ingreso) {
    return (
      <AppProvider>
        <NavigationContainer>
          {miVariable2 === 2 ? (
            <Drawer.Navigator
              initialRouteName="Inicio"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#b30000', 
                },
                headerTintColor: '#fff',
              }}
            >
              <Drawer.Screen name="Inicio" component={Inicio} />
              <Drawer.Screen name="Cartelera" component={Cartelera} />
              <Drawer.Screen
          name="Boletos"
          component={Boletos}
          options={{
            drawerItemStyle: { display: 'none' }, // Oculta la opción de Boletos en el drawer
            headerShown: false,
          }}
        />
              <Drawer.Screen name="Cerrar Sesión">
                {() => (
                  <TouchableOpacity>
                    <Text>¿Seguro que deseas cerrar sesión?</Text>
                    <Button title="Cerrar Sesión" onPress={validarCierre} />
                  </TouchableOpacity>
                )}
              </Drawer.Screen>
            </Drawer.Navigator>
          ) : (
            
            <Drawer.Navigator
              initialRouteName="Inicio"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#b30000', 
                },
                headerTintColor: '#fff',
              }}
            >
              <Drawer.Screen name="Inicio" component={Inicio} />
              <Drawer.Screen name="Cerrar Sesión">
                {() => (
                  <TouchableOpacity>
                    <Text>¿Seguro que deseas cerrar sesión?</Text>
                    <Button title="Cerrar Sesión" onPress={validarCierre} />
                  </TouchableOpacity>
                )}
              </Drawer.Screen>
            </Drawer.Navigator>
          )}
        
        </NavigationContainer>
      </AppProvider>
    );
  }
  

  return (
    <View style={{ flex: 1, backgroundColor: '#8B0000' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 20 })}
      >
        <ScrollView  contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          {/* Contenedor para el contenido principal */}
          <View style={styles.mainContent}>
            <Image source={require('../assets/img/FilmLogo.png')} style={styles.img} />
            <View style={styles.caja}>
              <Text style={styles.textcaja}>{mssgError ? mssgError : login ? 'LOG IN' : 'Registrarse'}</Text>
              <View style={styles.separator} />
              {!login && (
                <View>
                  <TextInput
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Nombre"
                    value={nombre}
                    onChangeText={setNombre}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Apellido"
                    value={apellido}
                    onChangeText={setApellido}
                    style={styles.input}
                  />
                  <TextInputMask
                    type={'custom'}
                    options={{
                      mask: '99999999-9',
                    }}
                    value={dui}
                    onChangeText={text => setDui(text)}
                    style={styles.input}
                    placeholder="DUI"
                    keyboardType="numeric"
                  />
                </View>
              )}
              <TextInput
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                autoCapitalize="none"
              />
              <TextInput
                placeholder="Contraseña"
                value={contra}
                onChangeText={setContra}
                style={styles.input}
                secureTextEntry
              />
              {!login && (
                <TextInput
                  placeholder="Confirmar Contraseña"
                  value={confirmContra}
                  onChangeText={setConfirmContra}
                  style={styles.input}
                  secureTextEntry
                />
              )}
              {login ? (
                <>
                  <TouchableOpacity style={styles.button} onPress={iniciarSesion}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={cambioPantalla}>
                    <Text style={styles.buttonText}>Registrate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => EntrarInvitado()}>
                    <Text style={styles.buttonText}>Entrar como invitado</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Acceder con Google</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity style={styles.button} onPress={registrarCliente}>
                    <Text style={styles.buttonText}>Registrate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={cambioPantalla}>
                    <Text style={styles.buttonText}>Volver al Inicio de Sesión</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Footer fijo en la parte inferior */}
      <View style={styles.footerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.footerText}>© 2024 FilmApp - Todos los derechos reservados</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  footerContainer: {
    backgroundColor: '#E0E0E0', 
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems:'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#8B0000',
  },
  input: {
    height: 40,
    width: 360,
    borderColor: '#383232',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#383232',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: 350,
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  img:{
    width: 350,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginTop:-80,
  },
  caja: {
    backgroundColor: '#f6f6f6',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 2,
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 1,
    marginVertical: 10,
    marginBottom: 5,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  textcaja:{
    fontSize: 22,
    fontWeight: 'bold',
  },
  invitado:{
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B0000'
  },
  footerText:{
    fontSize: 12,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

