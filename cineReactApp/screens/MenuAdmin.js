import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';

const menuOptions = [
  { name: 'Añadir Sala', icon: 'add' },
  { name: 'Añadir Pelicula', icon: 'add' },
  { name: 'Añadir Funcion', icon: 'add' },
  { name: 'Añadir Administrador', icon: 'add' },
];

const menuOptionsMAX = [
  { name: 'Añadir Sala', icon: 'add' },
  { name: 'Añadir Pelicula', icon: 'add' },
  { name: 'Añadir Funcion', icon: 'add' },
  { name: 'Añadir Administrador', icon: 'add' },
  { name: "Editar Cine", icon: "edit" }
];

export default function MenuAdmin() {

  const navigation = useNavigation();
  const route = useRoute();
  const [admin, setAdmin] = useState("");
  const [firstAdmin, setFirstAdmin] = useState("");

  const { setIndicadorCine } = route.params;
  const [menuUsado, setMenuUsado] = useState(menuOptions);


  const MenuButton = ({ item }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => handleOnPress(item.name)}>
        <Icon name={item.icon} size={40} color="#fff" />
        <Text style={styles.buttonText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const handleOnPress = (name) => {
    if (name == "Añadir Sala") {
      navigation.navigate('Añadir Sala');
    }
    if (name == "Añadir Pelicula") {
      navigation.navigate('Añadir Pelicula');
    }
    if (name == "Añadir Funcion") {
      navigation.navigate('Añadir Funcion');
    }
    if (name == "Añadir Administrador") {
      navigation.navigate('Añadir Administrador');
    }
    if (name == "Editar Cine") {
      navigation.navigate("Editar Cine");
    }
  }

  const extraerAdmin = async () => {
    const infouser = await AsyncStorage.getItem('Nombreuser');

    const parsedUsuarioInfo = JSON.parse(infouser);
    setAdmin(parsedUsuarioInfo.nombreUsuario.toLowerCase());
  }

  const revisarAdmin = async () => {
    try {
      console.log(API_URL);
      console.log(API_URL);
      const response = await axios.get(`${API_URL}/api/cines/index`);

      let firstAdmin = response.data.cine.firstAdmin;
      firstAdmin = firstAdmin.toLowerCase();

      setFirstAdmin(firstAdmin);

    } catch (error) {
      console.log("Error al traer el logo del cine: " + error);
    }
  }

  const comparar = () => {
    extraerAdmin();
    revisarAdmin();

    if (firstAdmin != "" && admin != "") {

      if (firstAdmin === admin) {

        if (menuOptions.length == 4) {
          menuOptions.push();

          // Se añade la opción para editar cine en el drawer
          setMenuUsado(menuOptionsMAX);
          setIndicadorCine(true);
        }
      }
      else {
        setMenuUsado(menuOptions);
        setIndicadorCine(false);
      }
    }
  }
  const MainScreen = () => {

    useEffect(() => {
      comparar();
    }, []);


    return (
      <View style={styles.container}>
        <FlatList
          data={menuUsado}
          renderItem={({ item }) => <MenuButton item={item} />}
          keyExtractor={(item) => item.name}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    );
  }

  return (
    /* <Drawer.Navigator
       initialRouteName="Home"
       drawerContentOptions={{
         activeTintColor: '#fff',
         inactiveTintColor: '#bbb',
         itemStyle: { marginVertical: 5 },
         labelStyle: { fontSize: 18 },
         style: { backgroundColor: '#8B0000' },
       }}
     >
       <Drawer.Screen 
         name="Home" 
         component={MainScreen} 
         options={{
           title: 'Menú Principal',
           drawerIcon: ({ color }) => (<Icon name="home" size={20} color={color} />),
         }} 
       />
      
       <Drawer.Screen 
         name="Añadir Sala" 
         component={AddSalaScreen} 
         options={{
           drawerIcon: ({ color }) => (<Icon name="add" size={20} color={color} />)
         }} 
       />
       <Drawer.Screen 
         name="Añadir Película" 
         component={AddPeliculaScreen} 
         options={{
           drawerIcon: ({ color }) => (<Icon name="add" size={20} color={color} />)
         }} 
       />
       <Drawer.Screen 
         name="Añadir Función" 
         component={AddFuncionScreen} 
         options={{
           drawerIcon: ({ color }) => (<Icon name="add" size={20} color={color} />)
         }} 
       />
       <Drawer.Screen 
         name="Añadir Administrador" 
         component={AddAdministradorScreen} 
         options={{
           drawerIcon: ({ color }) => (<Icon name="add" size={20} color={color} />)
         }} 
       />

   
       <Drawer.Screen 
         name="Modificar Sala" 
         component={ModifySalaScreen} 
         options={{
           drawerIcon: ({ color }) => (<Icon name="edit" size={20} color={color} />)
         }} 
       />
       <Drawer.Screen 
         name="Modificar Película" 
         component={ModifyPeliculaScreen} 
         options={{
           drawerIcon: ({ color }) => (<Icon name="edit" size={20} color={color} />)
         }} 
       />
       <Drawer.Screen 
         name="Modificar Función" 
         component={ModifyFuncionScreen} 
         options={{
           drawerIcon: ({ color }) => (<Icon name="edit" size={20} color={color} />)
         }} 
       />
       <Drawer.Screen 
         name="Modificar Administrador" 
         component={ModifyAdministradorScreen} 
         options={{
           drawerIcon: ({ color }) => (<Icon name="edit" size={20} color={color} />)
         }} 
       />
     </Drawer.Navigator>*/
    <MainScreen />
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8B0000',
    width: '45%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    fontSize: 24,
  },
});