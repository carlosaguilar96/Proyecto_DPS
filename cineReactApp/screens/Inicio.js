import React, { useEffect, useRef, useState, useContext} from 'react';
import { ScrollView ,View, Text, Image,Dimensions, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { movieData, EstrenosData } from '../config/movieData'; // Importa los datos locales
import MainContainer from '../assets/components/MainContainer';
import Cartelera from './Cartelera';
import { Picker } from '@react-native-picker/picker';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../assets/components/Context';


const { width } = Dimensions.get('window');
const Inicio = () => {
  const navigation = useNavigation();
  const [selectedCinema, setSelectedCinema] = useState('');

  // Referencias y estados para cada FlatList
  const flatListRef1 = useRef(null);
  const flatListRef2 = useRef(null);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);

  const { miVariable, setMiVariable } = useContext(AppContext); // Obtén la variable del contexto

 const HandleEffect = (item) =>{
        setMiVariable(2); // Cambia el valor de miVariable al hacer clic en la card
        navigation.navigate('Cartelera', { title: item.title});
 }


  // Función para hacer scroll automático en la primera lista
  const scrollToNextCard1 = () => {
    const nextIndex = (currentIndex1 + 1) % movieData.length; // Ciclar al siguiente índice
    setCurrentIndex1(nextIndex); // Actualizar el índice actual

    if (flatListRef1.current) {
      flatListRef1.current.scrollToIndex({ 
        animated: true, 
        index: nextIndex 
      });
    }
  };

  // Función para hacer scroll automático en la segunda lista
  const scrollToNextCard2 = () => {
    const nextIndex = (currentIndex2 + 1) % EstrenosData.length; // Ciclar al siguiente índice
    setCurrentIndex2(nextIndex); // Actualizar el índice actual

    if (flatListRef2.current) {
      flatListRef2.current.scrollToIndex({ 
        animated: true, 
        index: nextIndex 
      });
    }
  };

  // Efectos para iniciar el scroll automático
  useEffect(() => {
    const interval1 = setInterval(scrollToNextCard1, 3000); // Cambia 3000 por el intervalo deseado
    return () => clearInterval(interval1);
  }, [currentIndex1]);

  useEffect(() => {
    const interval2 = setInterval(scrollToNextCard2, 3000); // Cambia 3000 por el intervalo deseado
    return () => clearInterval(interval2);
  }, [currentIndex2]);

  // Renderiza cada item en la lista
  const renderItem = ({ item, isEstreno }) => 
    (
    <MainContainer>
      <TouchableOpacity style={styles.cards} onPress={() => HandleEffect(item)}> 
        <View style={styles.Lista}>
          {/* Mostrar la franja "Estreno" solo si isEstreno es true */}
          {isEstreno ? (
            <>
              <View style={styles.estrenoBanner}>
                <Text style={styles.estrenoText}>Estreno</Text>
              </View>
              <Image source={item.image} style={styles.imagenE} />
              <Text style={styles.cardsE}>Ver horarios</Text>
            </>
          ) : (
            <>
              <Image source={item.image} style={styles.imagen} />
              <Text style={styles.cardstext}>Ver horarios</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </MainContainer>
  );
  

  // Función para renderizar cada FlatList
  const renderFlatList = (data, flatListRef, isEstreno = false) => (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={(item) => renderItem({ ...item, isEstreno })} 
      keyExtractor={(item) => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.flatListContainer}
      getItemLayout={(index) => (
        { length: 150, offset: 150 * index, index } // Ajusta 150 según el ancho de tu tarjeta
      )}
    />
  );

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
    <View style={styles.container}>
      {/* Sección de Selección de Cine */}
      <View style={styles.cinemaSelectionContainer}>
        <Text style={styles.cinemaSelectionText}>Selecciona tu sucursal</Text>
        <Picker
          selectedValue={selectedCinema}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCinema(itemValue)}
        >
          <Picker.Item label="Sucursal X" value="cine1" />
          <Picker.Item label="Sucursal Y" value="cine2" />

        </Picker>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ver disponibilidad</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.encabezados}>CARTELERA</Text>
      <View style={styles.separator} />
      {/* Usar la referencia y estado para el primer FlatList */}
      <View style={styles.flatListWrapper}>
        {renderFlatList(movieData, flatListRef1,)}
      </View>
      {/* Estrenos */}
      <Text style={styles.encabezados}>LO MÁS RECIENTE</Text>
      <View style={styles.separator} />
      {/* Usar la referencia y estado para el segundo FlatList */}
      <View style={styles.flatListWrapper}>
        {renderFlatList(EstrenosData, flatListRef2,true) }
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
        data={movieData}
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
        <View style={styles.column}>
          <Text style={styles.header}>Quienes Somos</Text>
          <Text style={styles.text}>Misión</Text>
          <Text style={styles.text}>Visión</Text>
          <Text style={styles.text}>Políticas y Condiciones</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.header}>Contáctanos</Text>
          <Text style={styles.text}>Escríbenos</Text>
          <Text style={styles.text}>Trabaja con nosotros</Text>
        </View>
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
    backgroundColor: '#383232',
    padding: 10,
    borderRadius: 0,
    margin: 0,
  },
  cinemaSelectionText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'serif',
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  picker: {
    backgroundColor: '#f0f0f0',
    height: 50,
    width: 430,
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
  estrenoText:{
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
  containerCarousel:{
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
  
  
});

export default Inicio;
