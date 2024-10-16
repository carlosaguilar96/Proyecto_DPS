import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Modal, Button,ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { format, addDays, parseISO, isAfter } from 'date-fns';
import { AppContext } from '../assets/components/Context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

//Esto agrupa las fuciones que vienen del DRAWER por sucursal,idioma y titulo, es para que no se renderizen varias cards con la misma peli
const agruparTitle = (data) => {
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.titulo]) {
      acc[item.titulo] = { ...item, horarios: [] };
    }

    // Comprobar si ya existe un horario para la sucursal actual
    const existingSucursal = acc[item.titulo].horarios.find(h => h.sucursal === item.sucursal);

    if (!existingSucursal) {
      // Añadir un nuevo objeto para la sucursal si no existe
      acc[item.titulo].horarios.push({
        sucursal: item.sucursal,
        idiomas: [{ idioma: item.idioma, detalles: [{ fecha: item.fecha, hora: item.hora, precioNino: item.precioNino, precioAdulto: item.precioAdulto, precioTE: item.precioTE, codSala: item.codSala, codFuncion: item.codFuncion }] }],
      });
    } else {
      // Comprobar si el idioma ya existe para la sucursal
      const existingIdioma = existingSucursal.idiomas.find(i => i.idioma === item.idioma);

      if (!existingIdioma) {
        // Añadir un nuevo idioma si no existe
        existingSucursal.idiomas.push({
          idioma: item.idioma,
          detalles: [{ fecha: item.fecha, hora: item.hora, precioNino: item.precioNino, precioAdulto: item.precioAdulto, precioTE: item.precioTE, codSala: item.codSala, codFuncion: item.codFuncion }],
        });
      } else {
        // Si el idioma ya existe, agregar el horario a los detalles
        existingIdioma.detalles.push({ fecha: item.fecha, hora: item.hora, precioNino: item.precioNino, precioAdulto: item.precioAdulto, precioTE: item.precioTE, codSala: item.codSala, codFuncion: item.codFuncion });
      }
    }

    return acc;
  }, {});

  return Object.values(groupedData);
};


// Función para agrupar las películas por título e idioma y combinar los horarios
const agruparPeliculas = (peliculas) => {
  const groupedData = peliculas.reduce((acc, item) => {
    // Si no existe una entrada con el título de la película, se crea una nueva
    if (!acc[item.titulo]) {
      acc[item.titulo] = { ...item, horarios: [] };
    }

    // Buscar si ya existe un horario para la sucursal actual
    const existingSucursal = acc[item.titulo].horarios.find(h => h.sucursal === item.sucursal);

    if (!existingSucursal) {
      // Añadir un nuevo objeto para la sucursal si no existe
      acc[item.titulo].horarios.push({
        sucursal: item.sucursal,
        idiomas: [{ idioma: item.idioma, detalles: [{ fecha: item.fecha, hora: item.hora, precioNino: item.precioNino, precioAdulto: item.precioAdulto, precioTE: item.precioTE, codSala: item.codSala, codFuncion: item.codFuncion }] }],
      });
    } else {
      // Comprobar si el idioma ya existe para la sucursal
      const existingIdioma = existingSucursal.idiomas.find(i => i.idioma === item.idioma);

      if (!existingIdioma) {
        // Añadir un nuevo idioma si no existe
        existingSucursal.idiomas.push({
          idioma: item.idioma,
          detalles: [{ fecha: item.fecha, hora: item.hora, precioNino: item.precioNino, precioAdulto: item.precioAdulto, precioTE: item.precioTE, codSala: item.codSala, codFuncion: item.codFuncion }],
        });
      } else {
        // Si el idioma ya existe, agregar el horario a los detalles
        existingIdioma.detalles.push({ fecha: item.fecha, hora: item.hora, precioNino: item.precioNino, precioAdulto: item.precioAdulto, precioTE: item.precioTE, codSala: item.codSala, codFuncion: item.codFuncion });
      }
    }

    return acc;
  }, {});

  // Convertir el objeto agrupado a un array
  return Object.values(groupedData);
};


export default function Cartelera() {
  const navigation = useNavigation();
  const route = useRoute();
  const { title } = route?.params || {};
  const { miVariable, setMiVariable } = useContext(AppContext); // Obtén la variable del contexto
  const { miVariable2, setMiVariable2 } = useContext(AppContext);
  const [Funcion, setFunciones] = useState([]);
  const [mensajeDra, setMensajeDra] = useState("Cargando ...");
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  const obtenerFunciones = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/funciones/funcionesDetalladas`);

      if (response.data.funciones.length != 0)
        setFunciones(response.data.funciones);
      setLoading(false);

    } catch (error) {
      if (error.request) {
        setLoading(false);
        Alert.alert('Error', 'No hubo respuesta del servidor');
        return;
      } else {
        setLoading(false);
        Alert.alert('Error', 'Error al hacer la solicitud');
        return;
      }
    }
  }

  useEffect(() => {
    if (isFocused) {
      obtenerFunciones();
    }
  }, [isFocused]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setMiVariable(1);
      };
    }, [])
  );

  const handleNavigation = async (title, hora, idioma, sucursal, fecha, image, precioNino, precioAdulto, precioTE, codSala, codFuncion) => {
    const infouser = await AsyncStorage.getItem('Nombreuser');

    const parsedUsuarioInfo = JSON.parse(infouser);
    if (parsedUsuarioInfo.sesion === 1) {
      setModalVisible(true);
    }
    else {
      navigation.navigate('Boletos', { title, hora, idioma, sucursal, fecha, image, precioNino, precioAdulto, precioTE, codSala, codFuncion });
      console.log(title);
    }

  }

  const handleModalClose = () => {
    // Cerrar el modal y redirigir a 'Inicio Sesion'
    setModalVisible(false);
    navigation.navigate('Inicio sesion');
  };
  //Esto toma la fecha del dia actual, el dia de mañana y pasado y lo pone en formato yyyy-MM-dd
  const now = new Date();
  const elSalvadorOffset = -6 * 60; // El Salvador está en UTC-6
  const localTimeInElSalvador = new Date(now.getTime() + elSalvadorOffset * 60000);
  const localTimeString = localTimeInElSalvador.toISOString(); 
  const trimmedLocalTime = localTimeString.slice(0, 19); // Recortar la hora local
  const dateTimeToCompare = parseISO(trimmedLocalTime);
  const selectedDate = format(dateTimeToCompare, 'yyyy-MM-dd');
  //se añade un dia
  const tomorrow = addDays(dateTimeToCompare, 1);
  const selectedT = format(tomorrow, 'yyyy-MM-dd');
  //se añaden dos dias
  const tomorrowP = addDays(dateTimeToCompare, 2);
  const selectedP = format(tomorrowP, 'yyyy-MM-dd');


  const [selectedData, setSelectedData] = useState([]); // Estado para la lista seleccionada
  const [selectedButton, setSelectedButton] = useState(null);//cambia que dia esta seleccionado


  //Todos estos son del INICIO
  const MovieToday = agruparPeliculas(Funcion.filter(item => item.titulo === title && format(parseISO(item.fecha), 'yyyy-MM-dd') === selectedDate && isAfter(parseISO(`${item.fecha}T${item.hora}`), dateTimeToCompare)));
  const MovieTomorrow = agruparPeliculas(Funcion.filter(item => item.titulo === title && format(parseISO(item.fecha), 'yyyy-MM-dd') === selectedT));
  const MovieTomorrowP = agruparPeliculas(Funcion.filter(item => item.titulo === title && format(parseISO(item.fecha), 'yyyy-MM-dd') === selectedP));

  //Todos estos son del DRAWER
  const DataToday = agruparTitle(Funcion.filter(item => format(parseISO(item.fecha), 'yyyy-MM-dd') === selectedDate && isAfter(parseISO(`${item.fecha}T${item.hora}`), dateTimeToCompare)));
  const DataTomorrow = agruparTitle(Funcion.filter(item => format(parseISO(item.fecha), 'yyyy-MM-dd') === selectedT));
  const DataTomorrowP = agruparTitle(Funcion.filter(item => format(parseISO(item.fecha), 'yyyy-MM-dd') === selectedP));

  useEffect(() => {
    handleButtonPress('Hoy', DataToday);// Llama a la función por defecto
    //Se carga cartelera desde el DRAWER

  }, [Funcion.length > 0]);
  const handleButtonPress = (day, data) => {
    setSelectedButton(day); // Actualiza el botón seleccionado
    setSelectedData(data); // Actualiza los datos seleccionados desde DRAWER

    if (Funcion.length == 0) {
      setMensajeDra("No hay funciones disponibles");
    } else if (Funcion.length > 0 && data.length == 0) {
      setMensajeDra("No hay funciones disponibles " + day);
    }
  };

  //Render de peliculas desde el DRAWER
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: `${API_URL}/img/peliculas/${item.image}` }} style={styles.image} />
      <View style={styles.infoContainer}>

        <Text style={styles.title}>{item.titulo}</Text>
        <View style={styles.horariosContainer}>
          {item.horarios && item.horarios.length > 0 ? (
            item.horarios.map((horario, index) => (
              <View key={index} style={styles.horarioRow}>
                {/* Mostrar sucursal */}
                <Text style={styles.sucursalTitle}>Sucursal {horario.sucursal}</Text>

                {/* Renderizar los detalles de horarios, agrupados por idioma en la misma línea */}
                {horario.idiomas.map((idioma, indexIdioma) => (
                  <View key={indexIdioma} style={styles.idiomaContainer}>
                    <Text style={styles.horarioTitle}>{`${idioma.idioma} `}</Text>
                    {idioma.detalles.map((detalle, indexDetalle) => (
                      <TouchableOpacity key={indexDetalle} style={styles.horarioButton} onPress={() => handleNavigation(item.title,detalle.hora, idioma.idioma, horario.sucursal, detalle.fecha, item.image, detalle.precioNino, detalle.precioAdulto, detalle.precioTE, detalle.codSala, detalle.codFuncion)}>
                      <Text style={styles.horarioText}>{`${detalle.hora} `}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            ))
          ) : (
            <Text style={styles.titleError}>No hay horarios disponibles.</Text>
          )}
        </View>
      </View>
    </View>
  );

  //render de cada pelicula desde INICIO
  const renderItemInicio = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.card}>
          <Image source={{ uri: `${API_URL}/img/peliculas/${item.image}` }} style={styles.image} />
          <View style={styles.infoContainer}>

            <Text style={styles.title}>{item.titulo}</Text>
            <View style={styles.horariosContainer}>
              {item.horarios && item.horarios.length > 0 ? (
                item.horarios.map((horario, index) => (
                  <View key={index} style={styles.horarioRow}>
                    {/* Mostrar sucursal */}
                    <Text style={styles.sucursalTitle}>Sucursal {horario.sucursal}</Text>

                    {/* Renderizar los detalles de horarios, agrupados por idioma en la misma línea */}
                    {horario.idiomas.map((idioma, indexIdioma) => (
                      <View key={indexIdioma} style={styles.idiomaContainer}>
                        <Text style={styles.horarioTitle}>{`${idioma.idioma} `}</Text>
                        {idioma.detalles.map((detalle, indexDetalle) => (
                          <TouchableOpacity key={indexDetalle} style={styles.horarioButton} onPress={() => handleNavigation(item.titulo, detalle.hora, idioma.idioma, horario.sucursal, detalle.fecha, item.image, detalle.precioNino, detalle.precioAdulto, detalle.precioTE, detalle.codSala, detalle.codFuncion)}>
                            <Text style={styles.horarioText}>{`${detalle.hora} `}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    ))}
                  </View>
                ))
              ) : (
                <Text style={styles.titleError}>No hay horarios disponibles.</Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  //Flatlist peliculas desde INICIO
  const FlatListInicio = ({ Movie, Dia }) => {
    return (
      <FlatList
        data={Movie}
        renderItem={renderItemInicio}
        keyExtractor={(item) => item.titulo}
        ListEmptyComponent={<Text style={styles.titleError}>{Funcion.length > 0 ? `No hay funciones disponibles ${Dia}` : "Sin funciones"}</Text>}
        scrollEnabled={false}
      />
    );
  };

  return (
    //si miVariable es diferente de 2, se ingresa a la vista desde el drawer, caso contrario se ha seleccionado una peli en especifico desde el inicio

    <View style={{ flex: 1 }}>
      {miVariable !== 2 ? (
        <View style={styles.container}>
          <Modal
                transparent={true} // Hace que el fondo del modal sea transparente
                animationType="fade" // Tipo de animación al mostrar el modal
                visible={loading} // Modal visible mientras `loading` sea true
                onRequestClose={() => setLoading(false)} // Cierra el modal si se intenta cerrar
              >
                <View style={styles.modalBackgroundd}>
                  <View style={styles.modalContainerr}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={styles.loadingTextt}>Cargando...</Text>
                  </View>
                </View>
              </Modal>

          {/*Vista desde DRAWER*/}
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={() => handleButtonPress('Hoy', DataToday)} style={[styles.button, selectedButton === 'Hoy' && styles.selectedButton]}>
              <Text style={styles.dayText}>Hoy</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleButtonPress('Mañana', DataTomorrow)} style={[styles.button, selectedButton === 'Mañana' && styles.selectedButton]}>
              <Text style={styles.dayText}>Mañana</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleButtonPress('Pasado', DataTomorrowP)} style={[styles.button, selectedButton === 'Pasado' && styles.selectedButton]}>
              <Text style={styles.dayText}>Pasado</Text>
            </TouchableOpacity>
          </View>

          {/*Flatlist desde DRAWER*/}
          {selectedData.length > 0 ? (
            <FlatList
              data={selectedData}
              renderItem={renderItem}
              keyExtractor={(item) => item.titulo}
              ListEmptyComponent={<Text style={styles.titleError}>No hay horarios disponibles</Text>}
            />
          ) : (
            <Text style={styles.titleError}>{mensajeDra}</Text>
          )}

        </View>
      )
        :
        (
          //vista principal desde el INICIO
          <ScrollView>
            <Modal
                transparent={true} // Hace que el fondo del modal sea transparente
                animationType="fade" // Tipo de animación al mostrar el modal
                visible={loading} // Modal visible mientras `loading` sea true
                onRequestClose={() => setLoading(false)} // Cierra el modal si se intenta cerrar
              >
                <View style={styles.modalBackground}>
                  <View style={styles.modalContainer}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={styles.loadingText}>Cargando...</Text>
                  </View>
                </View>
              </Modal>

            <Text style={styles.sucursalTitle}>Hoy</Text>
            <View style={styles.cardMovie}>
              <FlatListInicio Movie={MovieToday} Dia="Hoy" />
            </View>
            <Text style={styles.sucursalTitle}>Mañana</Text>
            <View style={styles.cardMovie}>
              <FlatListInicio Movie={MovieTomorrow} Dia="Mañana" />
            </View>
            <Text style={styles.daytitle}>Pasado</Text>
            <FlatListInicio Movie={MovieTomorrowP} Dia="Pasado" />
          </ScrollView>

        )}
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Debes iniciar sesión o registrarte para comprar boletos.</Text>
            <Button title="Aceptar" onPress={handleModalClose} />
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  containerMovie: {
    flexDirection: 'row', // Alinea el texto en fila
    justifyContent: 'space-around', // Espaciado entre los botones
    alignItems: 'center', // Centra verticalmente
    marginVertical: 10, // Esp
  },

  titleError: {
    margin: 10,
    fontSize: 20,
  },

  sucursalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b00',
    marginVertical: 10,

  },
  daytitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b00',
    marginVertical: 10,
    paddingTop: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  cardMovie: {
    flexDirection: 'row',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  selectedButton: {
    backgroundColor: '#7A7A7A', // Color de fondo cuando está seleccionado
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 8,
    margin: 20,
  },
  infoContainer: {
    flex: 1,
    padding: 15,
    marginRight: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  horariosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 50,
  },
  horarioTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,

  },
  horarioButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginRight: 20,
    marginBottom: 5,
  },
  horarioText: {
    fontSize: 14,
    color: '#333',
  },

  button: {
    backgroundColor: '#b30000', // Color rojo claro similar para los botones
    paddingHorizontal: 40,
    paddingVertical: 25,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.5)', // Color de sombra más oscuro
    shadowRadius: 50, // Radio más pequeño para una sombra más definida
    shadowOffset: { width: 0, height: 50 }, // Offset vertical para más profundidad
    shadowOpacity: 0.8, // Sombra más opaca
    elevation: 10,
  },
  dayText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    flexDirection: 'row', // Alinea los elementos en fila
    justifyContent: 'space-between', // Espacio entre los elementos (opcional)
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row', // Alinea el texto en fila
    justifyContent: 'space-around', // Espaciado entre los botones
    alignItems: 'center', // Centra verticalmente
  }, modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalBackgroundd: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro y semi-transparente
  },
  modalContainerr: {
    width: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b30000', // Fondo del modal
    borderRadius: 10,
  },
  loadingTextt: {
    marginTop: 10,
    color: '#ffffff', // Color del texto blanco
    fontSize: 16,
  },

});
