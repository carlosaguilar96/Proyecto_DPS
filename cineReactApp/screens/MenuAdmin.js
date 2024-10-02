import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const menuOptions = [
  { name: 'Añadir Sala', icon: 'add' },
  { name: 'Añadir Película', icon: 'add' },
  { name: 'Añadir Función', icon: 'add' },
  { name: 'Añadir Administrador', icon: 'add' },
  { name: 'Modificar Sala', icon: 'edit' },
  { name: 'Modificar Película', icon: 'edit' },
  { name: 'Modificar Función', icon: 'edit' },
  { name: 'Modificar Administrador', icon: 'edit' },
];

const MenuButton = ({ item }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Icon name={item.icon} size={40} color="#fff" />
      <Text style={styles.buttonText}>{item.name}</Text>
    </TouchableOpacity>
  );
};

// Pantalla principal con los botones
function MainScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={menuOptions}
        renderItem={({ item }) => <MenuButton item={item} />}
        keyExtractor={(item) => item.name}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

// Pantallas de añadir
function AddSalaScreen() {
  return (
    <View style={styles.screenContainer}>
      
      <Text style={styles.text}>Añadir Sala</Text>
    </View>
  );
}

function AddPeliculaScreen() {
  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity>
      <Text style={styles.text}>Añadir Película</Text>
      </TouchableOpacity>
    </View>
  );
}

function AddFuncionScreen() {
  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity>
      <Text style={styles.text}>Añadir Función</Text>
      </TouchableOpacity>
    </View>
  );
}

function AddAdministradorScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>Añadir Administrador</Text>
    </View>
  );
}

// Pantallas de modificar
function ModifySalaScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>Modificar Sala</Text>
    </View>
  );
}

function ModifyPeliculaScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity onPress={()=>navigation.navigate('EditPelicula')}>
      <Text style={styles.text}>Modificar Película</Text>
      </TouchableOpacity>
    </View>
  );
}

function ModifyFuncionScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>Modificar Función</Text>
    </View>
  );
}

function ModifyAdministradorScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>Modificar Administrador</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function MenuAdmin() {

  return (
      <Drawer.Navigator
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
        {/* Opciones de Añadir */}
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

        {/* Opciones de Modificar */}
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
      </Drawer.Navigator>
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