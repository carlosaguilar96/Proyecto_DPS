import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Inicio from './Inicio';
import { TextInputMask } from 'react-native-masked-text';
import Cartelera from './Cartelera';
import { AppContext } from '../assets/components/Context';
import { AppProvider } from '../assets/components/Context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Boletos from './Boletos';
import axios from 'axios';
import { API_URL } from '@env';
import { LogBox } from 'react-native';
import MenuAdmin from './MenuAdmin';
import ModificarPelicula from './EditPelicula';
import AñadirPelicula from './AddPelicula';
import PerfilUser from './PerfilUser';
import ModificarFuncion from './EditFuncion';
import ModificarSala from './EditSala';
import ModificarAdministrador from './EditAdmin';
import AñadirFuncion from './AddFuncion';
import AñadirSala from './AddSala';
import AñadirAdministrador from './AddAdmin';
import EditarCine from './EditarCine';
import PantallaSeleccionAsientos from './SelectAsientos';
import VistaPago from './VistaPago';

LogBox.ignoreLogs([
  'Found screens with the same name nested inside one another',
]);

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
  const [restContra, setRestContra] = useState(false);

  const [logo, setLogo] = useState("");

  const [indicarCine, setIndicadorCine] = useState(false);

  const obtenerLogoCine = async () => {

    try {
      const response = await axios.get(`${API_URL}/api/cines/index`);

      setLogo(response.data.cine.logo_path);
    } catch (error) {
      console.log("Error al traer el logo del cine: " + error);
    }
  }

  useEffect(() => {
    obtenerLogoCine()
  }, []);

  const validarEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const registrarCliente = async () => {
    //Todas estas validaciones son en el lado del cliente
    if (username == "") {
      setMssgError("Ingresar un nombre de usuario.");
      return;
    }
    if (nombre == "") {
      setMssgError("Ingresar un nombre.");
      return;
    }
    if (apellido == "") {
      setMssgError("Ingresar un apellido.");
      return;
    }
    if (dui == "") {
      setMssgError("Ingresar DUI.");
      return;
    }
    if (dui.length != 10) {
      setMssgError('Ingresar DUI válido.');
      return;
    }
    if (email == "") {
      setMssgError("Ingresar correo electrónico.");
      return;
    }
    if (!validarEmail(email)) {
      setMssgError('El correo electrónico ingresado no es válido.');
      return;
    }
    if (contra == "") {
      setMssgError("Ingresar contraseña.");
      return;
    }
    if (contra.length < 8) {
      setMssgError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (confirmContra == "") {
      setMssgError("Ingresar confirmación de contraseña.");
      return;
    }
    if (contra !== confirmContra) {
      setMssgError('Las contraseñas no coinciden.');
      return;
    }


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

      const Nombreuser = {
        nombreUsuario: username,
        sesion: 2,
      };

      // Almacenar la información del usuario en AsyncStorage
      try {
        await AsyncStorage.setItem('Nombreuser', JSON.stringify(Nombreuser));
        console.log('Información del usuario almacenada correctamente');
      } catch (error) {
        console.log('Error al almacenar información del usuario:', error);
      }

      setMiVariable2(2);
      //El MiVariable es una variable de Context que al cambiar se mantiene como tal independientemente de lo que haga  o a que ruta vaya en la app
      setIngreso(true);
      setMssgError('');
    } catch (error) {
      if (error.response) {
        const errores = error.response.data.errors;
        let mensaje = "";
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

  const EntrarInvitado = async () => {
    const Nombreuser = {
      sesion: 1,
    };
    try {
      await AsyncStorage.setItem('Nombreuser', JSON.stringify(Nombreuser));
      console.log('Información del usuario almacenada correctamente');
    } catch (error) {
      console.log('Error al almacenar información del usuario:', error);
    }
    setMiVariable2(1);
    setIngreso(true);
    setMssgError('');
  }



  const iniciarSesion = async () => {
    if (username == "") {
      setMssgError("Ingresar un nombre de usuario.");
      return;
    }
    if (contra == "") {
      setMssgError("Ingresar contraseña.");
      return;
    }

    const Nombreuser = {
      nombreUsuario: username,
      sesion: 2,
    };

    try {
      await AsyncStorage.setItem('Nombreuser', JSON.stringify(Nombreuser));
      console.log('Información del usuario almacenada correctamente');
    } catch (error) {
      console.log('Error al almacenar información del usuario:', error);
    }

    try {
      const response = await axios.post(`${API_URL}/api/iniciarSesion`, {
        user: username,
        password: contra,
      });
      if (response.data.usuario) {
        if (response.data.usuario.nivelAcceso == 1) {
          setMiVariable2(3);
        } else {
          setMiVariable2(2);
        }

        setIngreso(true);
        setMssgError('');

      } else {
        setMssgError('Credenciales incorrectas.');
        return;
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.status === 404) {
          setMssgError('Usuario no existe');
          return;
        }
        const errores = error.response.data.errors;
        let mensaje = "";
        for (const campo in errores) {
          mensaje += `Error en ${campo}: ${errores[campo].join(', ')}`;
        }
        setMssgError(mensaje);
        return;
      } else if (error.request) {
        setMssgError('');
        Alert.alert('Error', 'No hubo respuesta del servidor');
        return;
      } else {
        setMssgError('');
        Alert.alert('Error', 'Error al hacer la solicitud');
        return;
      }
    }

  };

  const validarCierre = async () => {
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

    try {
      await AsyncStorage.removeItem('usuarioInfo');
      console.log('Sesión cerrada y datos de usuario eliminados.');
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
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

  const cambioARestContra = () => {
    setRestContra(true);
    setMssgError("Restablecer contraseña");
    setUsername('');
  };

  const cambioPantalla2 = () => {
    setLogin(true);
    setUsername('');
    setMssgError('');
    setRestContra(false);
  };

  const restablecerContra = async () => {
    if (username == "") {
      setMssgError("Ingresar un nombre de usuario.");
      return;
    }
    try {
      const response = await axios.put(`${API_URL}/api/restablecerContra`, {
        user: username,
      });
      if (response.data.usuario) {
        Alert.alert('Restablecimiento de contraseña', 'Tu nueva contraseña ha sido enviada al correo. Recuerda cambiarla al ingresar.')
        cambioPantalla2();
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.status === 404) {
          setMssgError('Usuario no existe');
          return;
        }
        const errores = error.response.data.errors;
        let mensaje = "";
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

  if (ingreso) {
    return (
      <AppProvider>
        {/* Si miVariable2 === 1 Invitado, evalúa miVariable2 Usuario y si no es admin */}
        {miVariable2 === 1 ? (
          <Drawer.Navigator
            initialRouteName="Inicio"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#b30000',
              },
              headerTintColor: '#fff',
            }}
          >
            <Drawer.Screen name="Inicio" component={Inicio}
              options={{
                drawerIcon: ({ color }) => (<Icon name="home" size={20} color={color} />)
              }} />
            <Drawer.Screen name="Cartelera" component={Cartelera}
              options={{
                drawerIcon: ({ color }) => (<Icon name="movie" size={20} color={color} />)
              }} />
            <Drawer.Screen
              name="Inicio sesion"
              component={Login}
              options={{
                headerShown: false,
                drawerLockMode: 'locked-closed', // Bloquea el drawer en la pantalla de Login
                drawerIcon: ({ color }) => (<Icon name="login" size={20} color={color} />)
              }}
            />
          </Drawer.Navigator>
        ) : miVariable2 === 2 ? (
          <Drawer.Navigator
            initialRouteName="Inicio"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#b30000',
              },
              headerTintColor: '#fff',
            }}
          >
            <Drawer.Screen name="Inicio" component={Inicio}
              options={{
                drawerIcon: ({ color }) => (<Icon name="home" size={20} color={color} />)
              }} />
            <Drawer.Screen name="Mi Perfil" component={PerfilUser}
              options={{
                drawerIcon: ({ color }) => (<Icon name="person" size={20} color={color} />)
              }}
            />
            <Drawer.Screen name="Cartelera" component={Cartelera}
              options={{
                drawerIcon: ({ color }) => (<Icon name="movie" size={20} color={color} />)
              }} />

            <Drawer.Screen
              name="Boletos"
              component={Boletos}
              options={{
                drawerItemStyle: { display: 'none' }, // Oculta la opción de Boletos en el drawer
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="PantallaSeleccionAsientos"
              component={PantallaSeleccionAsientos}
              options={{
                drawerItemStyle: { display: 'none' }, 
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="VistaPago"
              component={VistaPago}
              options={{
                drawerItemStyle: { display: 'none' }, 
                headerShown: false,
              }}
            />
            <Drawer.Screen name="Cerrar Sesión" options={{
              drawerIcon: ({ color }) => (<Icon name="logout" size={20} color={color} />),
            }}>
              {() => (
                <TouchableOpacity>
                  <Text style={styles.textcaja}>¿Seguro que deseas cerrar sesión?</Text>
                  <Button title="Cerrar Sesión" onPress={validarCierre} />
                </TouchableOpacity>
              )}

            </Drawer.Screen>
          </Drawer.Navigator>
        ) : (//DRAWER ADMIN
          <Drawer.Navigator
            initialRouteName="MenuAdmin"

            screenOptions={{
              headerStyle: {
                backgroundColor: '#b30000',
              },
              headerTintColor: '#fff',
            }}
          >
            <Drawer.Screen name="Menu Admin" component={MenuAdmin} initialParams={{setIndicadorCine}}
              options={{
                drawerIcon: ({ color }) => (<Icon name="home" size={20} color={color} />)
              }}
            />
            <Drawer.Screen name="Añadir Pelicula" component={AñadirPelicula}
              options={{
                drawerIcon: ({ color }) => (<Icon name="add" size={20} color={color} />)
              }} />
            <Drawer.Screen name="Añadir Funcion" component={AñadirFuncion}
              options={{
                drawerIcon: ({ color }) => (<Icon name="add" size={20} color={color} />)
              }} />
            <Drawer.Screen name="Añadir Sala" component={AñadirSala}
              options={{
                drawerIcon: ({ color }) => (<Icon name="add" size={20} color={color} />)
              }} />
            <Drawer.Screen name="Añadir Administrador" component={AñadirAdministrador}
              options={{
                drawerIcon: ({ color }) => (<Icon name="add" size={20} color={color} />)
              }} />
            <Drawer.Screen name="Editar Pelicula" component={ModificarPelicula}
              options={{
                drawerIcon: ({ color }) => (<Icon name="edit" size={20} color={color} />)
              }} />
            <Drawer.Screen name="Editar Administrador" component={ModificarAdministrador}
              options={{
                drawerIcon: ({ color }) => (<Icon name="edit" size={20} color={color} />)
              }} />
            <Drawer.Screen name="Editar Funcion" component={ModificarFuncion}
              options={{
                drawerIcon: ({ color }) => (<Icon name="edit" size={20} color={color} />)
              }} />
            <Drawer.Screen name="Editar Sala" component={ModificarSala}
              options={{
                drawerIcon: ({ color }) => (<Icon name="edit" size={20} color={color} />)
              }} />

            {indicarCine == true ? (
              <Drawer.Screen name="Editar Cine" component={EditarCine}
                options={{
                  drawerIcon: ({ color }) => (<Icon name="edit" size={20} color={color} />)
                }} />
            ) : <></>}
            <Drawer.Screen name="Cerrar Sesión" options={{
              drawerIcon: ({ color }) => (<Icon name="logout" size={20} color={color} />),

            }}>
              {() => (
                <TouchableOpacity>
                  <Text>¿Seguro que deseas cerrar sesión?</Text>
                  <Button title="Cerrar Sesión" onPress={validarCierre} />
                </TouchableOpacity>
              )}
            </Drawer.Screen>
          </Drawer.Navigator>
        )}
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          {/* Contenedor para el contenido principal */}
          <View style={styles.mainContent}>
            {logo != "" ? (
              <Image source={{ uri: `${API_URL}/img/${logo}` }} style={styles.img} />
            ) : <View />}
            <View style={styles.caja}>
              <Text style={styles.textcaja}>{mssgError ? mssgError : login ? 'LOG IN' : 'Registrarse'}</Text>
              <View style={styles.separator} />
              {restContra ? (
                <>
                  <TextInput
                    placeholder="Usuario"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity style={styles.button} onPress={restablecerContra}>
                    <Text style={styles.buttonText}>Restablecer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={cambioPantalla2}>
                    <Text style={styles.buttonText}>Volver al Inicio de Sesión</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
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
                  )}</>)}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Footer fijo en la parte inferior */}
      <View style={styles.footerContainer}>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={cambioARestContra}>
            <Text style={styles.invitado}>    ¿Olvidaste tu Contraseña?</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
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
    width: 360,

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
  img: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    width: '80%',
    height: 200,
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
  textcaja: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  invitado: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B0000'
  },
  footerText: {
    fontSize: 12,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

