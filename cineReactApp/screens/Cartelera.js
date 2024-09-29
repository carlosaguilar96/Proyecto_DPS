//NO TOQUEN ESTO, NO ESTA TERMINADO :)

import React, { useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Funcion } from '../config/movieData';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { format, addDays,parseISO } from 'date-fns'; 
import { AppContext } from '../assets/components/Context';

// Función para agrupar las películas por título e idioma y combinar los horarios
const agruparTitle = (data) => {
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.title]) {
      acc[item.title] = { ...item, horarios: [] }; 
    }

    // Comprobar si ya existe un horario para el idioma actual
    const existingIdioma = acc[item.title].horarios.find(h => h.idioma === item.idioma);

    if (!existingIdioma) {
      // Añadir un nuevo objeto para el idioma si no existe
      acc[item.title].horarios.push({
        idioma: item.idioma,
        detalles: [{ fecha: item.fecha, hora: item.hora }], // Almacena los detalles en un array
      });
    } else {
      // Si el idioma ya existe, agregar el horario a los detalles
      existingIdioma.detalles.push({ fecha: item.fecha, hora: item.hora });
    }

    return acc;
  }, {});

  return Object.values(groupedData);
};


const renderItem = ({ item }) => (
  <View style={styles.card}>
    <Image source={item.image} style={styles.image} />
    <View style={styles.infoContainer}>
      <Text style={styles.sucursalTitle}>Sucursal {item.sucursal} </Text>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.horariosContainer}>
        {item.horarios && item.horarios.length > 0 ? (
          item.horarios.map((horario, index) => (
            <View key={index} style={styles.horarioRow}>
              <Text style={styles.horarioTitle}>{horario.idioma}</Text>
              {horario.detalles.map((detalle, indexDetalle) => (
                <TouchableOpacity key={indexDetalle} style={styles.horarioButton}>
                  <Text style={styles.horarioText}>{detalle.hora} </Text>
                </TouchableOpacity>
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

// Función para agrupar las películas por título e idioma y combinar los horarios
const agruparPeliculas = (peliculas) => {
  const groupedData = peliculas.reduce((acc, item) => {
    // Si no existe una entrada con el título de la película, se crea una nueva
    if (!acc[item.title]) {
      acc[item.title] = { ...item, horarios: [] };
    }

    // Buscar si ya existe un horario para el idioma actual
    const existingIdioma = acc[item.title].horarios.find(h => h.idioma === item.idioma);

    if (!existingIdioma) {
      // Añadir un nuevo objeto para el idioma si no existe
      acc[item.title].horarios.push({
        idioma: item.idioma,
        detalles: [{ fecha: item.fecha, hora: item.hora, sucursal: item.sucursal }], // Incluye la sucursal aquí
      });
    } else {
      // Si el idioma ya existe, agregar el horario a los detalles
      existingIdioma.detalles.push({ fecha: item.fecha, hora: item.hora, sucursal: item.sucursal }); // Incluye la sucursal aquí
    }

    return acc;
  }, {});

  // Convertir el objeto agrupado a un array
  return Object.values(groupedData);
};

// Componente para renderizar cada película
const renderItemInicio = ({ item }) => (
  <View style={styles.container}>
    <View style={styles.rowContainer}>
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />

        {/* Título de la película */}
        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.horariosContainer}>
          {item.horarios && item.horarios.length > 0 ? (
            item.horarios.map((horario, index) => (
              <View key={index} style={styles.horarioRow}>
                {/* Mostrar el idioma */}
                <Text style={styles.horarioTitle}>Idioma: {horario.idioma}</Text>
                
                {horario.detalles.map((detalle, indexDetalle) => (
                  <TouchableOpacity key={indexDetalle} style={styles.horarioButton}>
                    {/* Mostrar el horario y la sucursal */}
                    <Text style={styles.horarioText}>Hora: {detalle.hora} </Text>
                
                  
                  </TouchableOpacity>
                ))}
                 {horario.detalles.map((detalle, indexD) => (
                  <View key={indexD}>
                    {/* Mostrar el horario y la sucursal */}
                    
                    <Text>Fecha: {detalle.fecha}</Text>
                    <Text>Sucursal: {detalle.sucursal}</Text>
                  
                  </View>
                ))}
              </View>
            ))
          ) : (
            <Text>No hay horarios disponibles para esta película.</Text>
          )}
        </View>
      </View>
    </View>
  </View>
);

// Renderizar la lista de películas agrupadas
const renderFlatListInicio = (peliculasAgrupadas) => (
  <FlatList
    data={peliculasAgrupadas} // Utiliza los datos agrupados
    renderItem={renderItemInicio}
    keyExtractor={(item) => item.title} // Clave única, se puede ajustar
  />
);




// Utiliza la función para agrupar tus datos

export default function Cartelera() {
  const route = useRoute();
  const { title } = route?.params || {};
  const filteredData = agruparPeliculas(Funcion.filter(item => item.title === title)); 

  
  const { miVariable, setMiVariable } = useContext(AppContext); // Obtén la variable del contexto

  useFocusEffect(
      React.useCallback(() => {
        
          return () => {
              setMiVariable(1);
              console.log('miVariable', miVariable);
              
          };
      }, [])
  );




  const today = new Date();
  const localMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const [selectedData, setSelectedData] = useState([]); // Estado para la lista seleccionada
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState([]);
  const selectedDate = format(localMidnight, 'yyyy-MM-dd');
  const tomorrow = addDays(new Date(), 1);
  const selectedT = format(tomorrow, 'yyyy-MM-dd');
  const tomorrowP = addDays(new Date(), 2);
  const selectedP = format(tomorrowP, 'yyyy-MM-dd');
  

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

  const handlemovie = (day, data) => {
    setSelectedMovie(data); // Actualiza los datos seleccionados
  };
  
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
              
            renderFlatListInicio(filteredData)
            
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

  sucursalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b00',
    marginVertical: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
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
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  horariosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
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
    marginRight: 30,
    marginBottom: 5,
  },
  horarioText: {
    fontSize: 12,
    color: '#333',
  },
  
  button: {
    backgroundColor: '#c55c5c', // Color rojo claro similar para los botones
    paddingHorizontal: 45,
    paddingVertical: 25,
    marginHorizontal: 5,
    alignItems: 'center',
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
    marginVertical: 10, // Espaciado vertical (opcional)
  },
});
