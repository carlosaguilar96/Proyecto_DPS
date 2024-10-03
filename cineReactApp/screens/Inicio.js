import React, { useEffect, useRef, useState, useContext } from 'react';
import { ScrollView, View, Text, Image, Dimensions, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MainContainer from '../assets/components/MainContainer';
import { Picker } from '@react-native-picker/picker';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppContext } from '../assets/components/Context';
import { Cupones } from '../config/movieData';
import axios from 'axios';
import { API_URL } from '@env';

const { width } = Dimensions.get('window');
const Inicio = () => {
  const navigation = useNavigation();
  const [selectedCinema, setSelectedCinema] = useState(-1);
  const [sucursales, setSucursales] = useState([]);

  // Referencias y estados para cada FlatList
  const flatListRef1 = useRef(null);
  const flatListRef2 = useRef(null);

  const { miVariable, setMiVariable } = useContext(AppContext); // Obtén la variable del contexto

  const [movieData, setMovieData] = useState([]);
  const [EstrenosData, setEstrenosData] = useState([]);

  const [mensajeCargando, setMensaje] = useState("Cargando...");
  const [mensajeCargando2, setMensaje2] = useState("Cargando...");

  const [mision, setMision] = useState("Cargando ...");
  const [vision, setVision] = useState("Cargando ... ");

  const [telefonos, setTelefonos] = useState("Cargando ... ");

  const HandleEffect = (item) => {
    setMiVariable(2); // Cambia el valor de miVariable al hacer clic en la card
    navigation.navigate('Cartelera', { title: item.nombre });
  }

  const obtenerCartelera = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/peliculas/cartelera/${selectedCinema}`);
      
      if (response.data.peliculas.length != 0)
        setMovieData(response.data.peliculas);
      else
        setMensaje("Sin películas añadidas");
    } catch (error) {
      if (error.request) {
        Alert.alert('Error', 'No hay películas disponibles');
        setSelectedCinema(-1);
        return;
      } else {
        Alert.alert('Error', 'Error al hacer la solicitud');
        return;
      }
    }
  }

  const obtenerEstrenos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/peliculas/estrenos/${selectedCinema}`);

      if (response.data.peliculas.length != 0)
        setEstrenosData(response.data.peliculas);
      else
        setMensaje2("Sin estrenos añadidos");

    } catch (error) {
      if (error.request) {
        Alert.alert('Error', 'No hay estrenos disponibles');
        return;
      } else {
        Alert.alert('Error', 'Error al hacer la solicitud');
        return;
      }
    }
  }

  const obtenerMisionVision = async () =>{
    try {
      const response = await axios.get(`${API_URL}/api/cines/index`);

      setMision(response.data.cine.mision);
      setVision(response.data.cine.vision);

    } catch (error) {
      console.log("Error al traer el logo del cine: " + error);
    }
  }
  // Renderiza cada item en la lista
  const renderItem = ({ item, isEstreno }) => {

    return (
      <MainContainer>
        <TouchableOpacity style={styles.cards} onPress={() => HandleEffect(item)}>
          <View style={styles.Lista}>
            {/* Mostrar la franja "Estreno" solo si isEstreno es true */}
            {isEstreno ? (
              <>
                <View style={styles.estrenoBanner}>
                  <Text style={styles.estrenoText}>Estreno</Text>
                </View>
                <Image source={{ uri: `${API_URL}/img/peliculas/${item.imagen}` }} style={styles.imagenE} />
                <Text style={styles.cardsE}>Ver horarios</Text>
              </>
            ) : (
              <>
                <Image source={{ uri: `${API_URL}/img/peliculas/${item.imagen}` }} style={styles.imagen} />
                <Text style={styles.cardstext}>Ver horarios</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </MainContainer>
    )
  };


  // Función para renderizar cada FlatList
  const renderFlatList = (data, flatListRef, isEstreno = false) => (

    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={(item) => renderItem({ ...item, isEstreno })}
      keyExtractor={(item) => item.codPelicula}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.flatListContainer}
      getItemLayout={(index) => (
        { length: 150, offset: 150 * index, index } // Ajusta 150 según el ancho de tu tarjeta
      )}
    />
  );

  const obtenerSucursales = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/sucursales/index`);

      if (response.data.sucursales.length != 0){

        let arregloT = response.data.sucursales;
        setSucursales(response.data.sucursales);

        let telefonos = "Teléfonos:\n\n";
        arregloT.forEach(element => {
          telefonos += `${element.sucursal} : ${element.telefono}\n`;
        });

        setTelefonos(telefonos);
      }

    } catch (error) {
      if (error.request) {
        Alert.alert('Error', 'No hubo respuesta del servidor ');
        console.log(error);
        return;
      } else {
        Alert.alert('Error', 'Error al hacer la solicitud');
        return;
      }
    }
  }

  // Al presionar el botón de ver disponibilidad, se actualizan los listados de estrenos y películas.
  const filtarPeliculas = () => {
    obtenerCartelera();
    obtenerEstrenos();
  }

  useEffect(() => {
    obtenerCartelera();
    obtenerMisionVision();
    obtenerSucursales();
    obtenerEstrenos();
  }, []);

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        {/* Sección de Selección de Cine */}
        <View style={styles.cinemaSelectionContainer}>
          <Text style={styles.cinemaSelectionText}>Selecciona tu sucursal</Text>
          <View style={styles.centerElements}>
            <Picker
              selectedValue={selectedCinema}
              style={styles.picker}
              onValueChange={(itemValue) => {setSelectedCinema(itemValue)}}
            >
              <Picker.Item label="Todas las sucursales" value={-1} />
              {sucursales.map((item) => (
                <Picker.Item label={item.sucursal} value={item.codSucursal} key={() => item.codSucursal} />
              ))}
            </Picker>

            <TouchableOpacity style={styles.button} onPress={filtarPeliculas}>
              <Text style={styles.buttonText}>Ver disponibilidad</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.encabezados}>CARTELERA</Text>
        <View style={styles.separator} />
        {/* Usar la referencia y estado para el primer FlatList */}
        <View style={styles.flatListWrapper}>
          {movieData.length > 0 ? renderFlatList(movieData, flatListRef1,) : (<Text style={styles.cargando}>{mensajeCargando}</Text>)}
        </View>
        {/* Estrenos */}
        <Text style={styles.encabezados}>LO MÁS RECIENTE</Text>
        <View style={styles.separator} />
        {/* Usar la referencia y estado para el segundo FlatList */}
        <View style={styles.flatListWrapper}>
          {EstrenosData.length > 0 ? renderFlatList(EstrenosData, flatListRef2, true) : (<Text style={styles.cargando}>{mensajeCargando2}</Text>)}
        </View>
        {/* Carrusel automático con 3 imágenes visibles */}
        <Text style={styles.encabezados}>CUPONES</Text>
        <View style={styles.separator} />
        <View style={styles.containerCarousel}>

          <Carousel
            loop
            width={width}
            height={250}  // Ajustamos el alto
            autoPlay={true}
            autoPlayInterval={1000}  // Cambiar cada 3 segundos
            data={Cupones}
            scrollAnimationDuration={1000}  // Duración de la animación de desplazamiento
            mode="horizontal-stack"  // Modo de carrusel en pila horizontal
            modeConfig={{
              snapDirection: 'left',  // Desplazamiento hacia la izquierda
              stackInterval: 150,  // Intervalo entre imágenes en el stack
            }}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],  // Sensibilidad de desplazamiento
            }}
            customConfig={{
              type: 'slider',  // Tipo de carrusel
            }}
            renderItem={({ item }) => (
              <View style={styles.cuponCard}>
                <Image source={item.image} style={styles.cuponImage} resizeMode="cover" />

              </View>
            )}

          />
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.textContainer}>
            <TouchableOpacity style={styles.column} onPress={() => Alert.alert("Quiénes somos", `Misión\n${mision}\n\nVisión:\n${vision}`)}>
              <Text style={styles.header}>Quienes Somos</Text>
              <Text style={styles.text}>Misión</Text>
              <Text style={styles.text}>Visión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column} onPress={() => Alert.alert("Contáctanos", telefonos)}>
              <Text style={styles.header}>Contáctanos</Text>
              <Text style={styles.text}>Escríbenos</Text>
              <Text style={styles.text}>Trabaja con nosotros</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconsContainer}>
            <Icon name="facebook" size={30} color="#000" style={styles.icon} />
            <Icon name="instagram" size={30} color="#000" style={styles.icon} />
            <Icon name="twitter" size={30} color="#000" style={styles.icon} />
            <Icon name="linkedin" size={30} color="#000" style={styles.icon} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cards: {
    padding: 0,
    marginTop: 0,
  },
  separator: {
    height: 2,
    width: '95%',
    backgroundColor: '#ccc',
    borderRadius: 1,
    marginVertical: 10,
    marginLeft: 10,
    marginBottom: -15,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  Lista: {
    height: 200,
    width: 150,
    borderRadius: 25,
    marginRight: 20,
    backgroundColor: '#B50C0C',
    margin: 0,

  },
  imagen: {
    marginTop: 0,
    width: 150,
    height: 160,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  imagenE: {
    marginTop: 0,
    width: 150,
    height: 125,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  cinemaSelectionContainer: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 0,
    margin: 0,

    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowRadius: 50,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    elevation: 10,
  },
  cinemaSelectionText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowRadius: 50,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    elevation: 20,
    textAlign: 'left',
  },
  centerElements: {
    alignItems: 'center',
  },
  picker: {
    backgroundColor: '#f0f0f0',
    height: 45,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowRadius: 50,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    elevation: 20,
    width: 390,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#863333',
    padding: 5,
    width: 200,
    borderRadius: 5,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  encabezados: {
    color: '#B50C0C',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    paddingLeft: 15,
    marginTop: 10,
    marginBottom: -7,
  },
  cardstext: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 9,
    marginLeft: 22,
  },
  cardsE: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
    marginLeft: 24,
  },
  flatListContainer: {
    paddingLeft: 25,
    paddingTop: 25,
  },
  flatListWrapper: {
    flexDirection: 'row', // Asegura que el contenido se alinee horizontalmente
    overflow: 'hidden', // Evita el desbordamiento
    marginVertical: 10, // Espaciado vertical adicional
  },
  estrenoText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    marginLeft: 48,
  },
  estrenoBanner: {
    backgroundColor: 'black',

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  containerCarousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cuponCard: {
    width: width / 3,  // Ajustamos para que entren tres imágenes en pantalla
    marginHorizontal: 20,  // Añadimos más espacio entre las tarjetas de películas
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: 'center',
    paddingVertical: 30,
  },
  cuponImage: {
    width: '100%',
    height: 200,
    borderRadius: 0,
  },
  footerContainer: {
    marginTop: 20,
    backgroundColor: '#E0E0E0', // Color de fondo similar al de tu ejemplo
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    width: '45%',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 14,
    marginBottom: 3,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    marginHorizontal: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cargando: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 15,
    marginTop: 10,
  }

});

export default Inicio;
