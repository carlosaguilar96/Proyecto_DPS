import React, { useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Funcion } from '../config/movieData';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { format, addDays,parseISO } from 'date-fns'; 
import { AppContext } from '../assets/components/Context';
import { useNavigation } from '@react-navigation/native';


const agruparTitle = (data) => {
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.title]) {
      acc[item.title] = { ...item, horarios: [] }; 
    }

    // Comprobar si ya existe un horario para la sucursal actual
    const existingSucursal = acc[item.title].horarios.find(h => h.sucursal === item.sucursal);

    if (!existingSucursal) {
      // Añadir un nuevo objeto para la sucursal si no existe
      acc[item.title].horarios.push({
        sucursal: item.sucursal,
        idiomas: [{ idioma: item.idioma, detalles: [{ fecha: item.fecha, hora: item.hora }] }],
      });
    } else {
      // Comprobar si el idioma ya existe para la sucursal
      const existingIdioma = existingSucursal.idiomas.find(i => i.idioma === item.idioma);

      if (!existingIdioma) {
        // Añadir un nuevo idioma si no existe
        existingSucursal.idiomas.push({
          idioma: item.idioma,
          detalles: [{ fecha: item.fecha, hora: item.hora }],
        });
      } else {
        // Si el idioma ya existe, agregar el horario a los detalles
        existingIdioma.detalles.push({ fecha: item.fecha, hora: item.hora });
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
    if (!acc[item.title]) {
      acc[item.title] = { ...item, horarios: [] };
    }

    // Buscar si ya existe un horario para la sucursal actual
    const existingSucursal = acc[item.title].horarios.find(h => h.sucursal === item.sucursal);

    if (!existingSucursal) {
      // Añadir un nuevo objeto para la sucursal si no existe
      acc[item.title].horarios.push({
        sucursal: item.sucursal,
        idiomas: [{ idioma: item.idioma, detalles: [{ fecha: item.fecha, hora: item.hora }] }],
      });
    } else {
      // Comprobar si el idioma ya existe para la sucursal
      const existingIdioma = existingSucursal.idiomas.find(i => i.idioma === item.idioma);

      if (!existingIdioma) {
        // Añadir un nuevo idioma si no existe
        existingSucursal.idiomas.push({
          idioma: item.idioma,
          detalles: [{ fecha: item.fecha, hora: item.hora }],
        });
      } else {
        // Si el idioma ya existe, agregar el horario a los detalles
        existingIdioma.detalles.push({ fecha: item.fecha, hora: item.hora });
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

  useFocusEffect(
      React.useCallback(() => {
        
          return () => {
              setMiVariable(1);
              console.log('miVariable', miVariable);
              
          };
      }, [])
  );

  const handleNavigation = (title, hora, idioma,sucursal,fecha, image) =>{
    navigation.navigate('Boletos', {title, hora, idioma,sucursal,fecha,image});
  }


  const today = new Date();
  const localMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const [selectedData, setSelectedData] = useState([]); // Estado para la lista seleccionada
  const [selectedButton, setSelectedButton] = useState(null);

  const selectedDate = format(localMidnight, 'yyyy-MM-dd');
  const tomorrow = addDays(new Date(), 1);
  const selectedT = format(tomorrow, 'yyyy-MM-dd');
  const tomorrowP = addDays(new Date(), 2);
  const selectedP = format(tomorrowP, 'yyyy-MM-dd');
  
  const MovieToday = agruparPeliculas(Funcion.filter(item => item.title === title && format(parseISO(item.fecha), 'yyyy-MM-dd') === selectedDate));
  const MovieTomorrow = agruparPeliculas(Funcion.filter(item => item.title === title && format(parseISO(item.fecha), 'yyyy-MM-dd') === selectedT)); 
  const MovieTomorrowP = agruparPeliculas(Funcion.filter(item => item.title === title && format(parseISO(item.fecha), 'yyyy-MM-dd') === selectedP));   
  const DataToday = agruparTitle(Funcion.filter(item => format(parseISO(item.fecha), 'yyyy-MM-dd') === selectedDate));
  const DataTomorrow = agruparTitle(Funcion.filter(item => format(parseISO(item.fecha), 'yyyy-MM-dd') === selectedT));
  const DataTomorrowP = agruparTitle(Funcion.filter(item => format(parseISO(item.fecha), 'yyyy-MM-dd') === selectedP));
  
  useEffect(() => {
    handleButtonPress('Hoy', DataToday);
     // Llama a la función por defecto
    
  }, []);
  const handleButtonPress = (day, data) => {
    setSelectedButton(day); // Actualiza el botón seleccionado
    setSelectedData(data); // Actualiza los datos seleccionados
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
  
        <Text style={styles.title}>{item.title}</Text>
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
                      <TouchableOpacity key={indexDetalle} style={styles.horarioButton} onPress={() => handleNavigation(item.title,detalle.hora, idioma.idioma, horario.sucursal, detalle.fecha, item.image)}>
                        <Text style={styles.horarioText}>{`${detalle.hora} `}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            ))
          ) : (
            <Text>No hay horarios disponibles.</Text>
          )}
        </View>
      </View>
    </View>
  );

  //render de cada pelicula
  const renderItemInicio = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
      <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
  
        <Text style={styles.title}>{item.title}</Text>
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
                      <TouchableOpacity key={indexDetalle} style={styles.horarioButton} onPress={() => handleNavigation(item.title,detalle.hora, idioma.idioma, horario.sucursal, detalle.fecha, item.image)}>
                        <Text style={styles.horarioText}>{`${detalle.hora} `}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            ))
          ) : (
            <Text>No hay horarios disponibles.</Text>
          )}
        </View>
      </View>
    </View>
      </View>
    </View>
  );


  return (
//si miVariable es diferente de 2, se ingresa a la vista desde el drawer, caso contrario se ha seleccionado una peli en especifico desde el inicio
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {miVariable !== 2 ? (<View style={styles.container}>
              <View style={styles.rowContainer}>
              <TouchableOpacity onPress={() => handleButtonPress('Hoy', DataToday)} style={[styles.button, selectedButton === 'Hoy' && styles.selectedButton]}>
              <Text style={styles.dayText}>Hoy</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleButtonPress('Mañana', DataTomorrow)} style={[styles.button, selectedButton === 'Mañana' && styles.selectedButton]}>
              <Text style={styles.dayText}>Mañana</Text>
              </TouchableOpacity>

              <TouchableOpacity  onPress={() => handleButtonPress('Pasado', DataTomorrowP)} style={[styles.button, selectedButton === 'Pasado' && styles.selectedButton]}>
              <Text style={styles.dayText}>Pasado</Text>
              </TouchableOpacity>
              </View>


              {selectedData.length > 0 && (
                <FlatList
                  data={selectedData}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.title}
                />
              )}

            </View>
            ) : 
            ( 
              <View>
              <Text style={styles.sucursalTitle}>Hoy</Text>
              <View style={styles.cardMovie}>
              {(
            <FlatList
              data={MovieToday}
              renderItem={renderItemInicio}
              keyExtractor={(item) => item.title}
              ListEmptyComponent={<Text style={styles.titleError}>No hay horarios disponibles</Text>} 
            />
              )}
              </View>
              <Text style={styles.sucursalTitle}>Mañana</Text>
              <View style={styles.cardMovie}>
              {(
                
            <FlatList
              data={MovieTomorrow}
              renderItem={renderItemInicio}
              keyExtractor={(item) => item.title}
              ListEmptyComponent={<Text style={styles.titleError}>No hay horarios disponibles</Text>} 
            />
              )}
              </View>
              <Text style={styles.daytitle}>Pasado</Text>
              {(
                
                <FlatList
                  data={MovieTomorrowP}
                  renderItem={renderItemInicio}
                  keyExtractor={(item) => item.title}
                  ListEmptyComponent={<Text style={styles.titleError}>No hay horarios disponibles</Text>} 
                />
                  )}
            </View>
           
            )}
          </View>
);
}

const styles = StyleSheet.create({
  containerMovie:{
    flexDirection: 'row', // Alinea el texto en fila
    justifyContent: 'space-around', // Espaciado entre los botones
    alignItems: 'center', // Centra verticalmente
    marginVertical: 10, // Esp
  },

  titleError:{
    margin:10,
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
    paddingTop:20,
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
    elevation:10,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  horariosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight:50,
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
  },
});
