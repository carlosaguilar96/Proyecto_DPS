import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Modal, Button, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Funcion } from '../config/movieData';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { API_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';

const ModificarFuncion = () => {
  const [showModal, setShowModal] = useState(false);
  const [ShowModalEstado, setShowModalEstado] = useState(false);
  const [id, setid] = useState(0);
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [estado, setEstado] = useState(0);
  const [fechaHora, setFechaHora] = useState('');
  const [funciones, setFunciones] = useState('');
  const isFocused = useIsFocused();

  const obtenerFunciones = async () => {
    try {
      
      const response = await axios.get(`${API_URL}/api/funciones/indexEditar`);
  
      if (response.data.funciones.length != 0)
        setFunciones(response.data.funciones);
  
    } catch (error) {
      if (error.request) {
        Alert.alert('Error', 'No hubo respuesta del servidor');
        return;
      } else {
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

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); // Ocultar el picker de fecha
    setDate(currentDate);

    const { formattedDate: newFormattedDate } = formatDateTime(currentDate);
    setFormattedDate(newFormattedDate);
    const [anio, mes, dia] = newFormattedDate.split("-").map(Number);
    const [horas, minutos] = formattedTime.split(":").map(Number);
    const fechaHora = new Date(anio, mes - 1, dia, horas, minutos);
    setFechaHora(fechaHora);
  };

  const onTimeChange = (event, selectedTime) => {
    const chosenTime = selectedTime || date;
    setShowTimePicker(false);
    const currentTime = new Date();
    if (fechaHora.getFullYear() === currentTime.getFullYear() && fechaHora.getMonth() === currentTime.getMonth() && fechaHora.getDay() === currentTime.getDay()){
      if (
        chosenTime.getHours() < currentTime.getHours() ||
        (chosenTime.getHours() === currentTime.getHours() && chosenTime.getMinutes() < currentTime.getMinutes())
      ) {
        Alert.alert("Hora no válida", "La hora no puede ser menor que la hora actual");
      }  else {
        setDate(chosenTime);
  
        const { formattedTime: newFormattedTime } = formatDateTime(chosenTime);
        setFormattedTime(newFormattedTime);
      }
    }
     else {
      setDate(chosenTime);

      const { formattedTime: newFormattedTime } = formatDateTime(chosenTime);
      setFormattedTime(newFormattedTime);
    }
  };

  const formatDateTime = (date) => {
    // Convertir la fecha a la zona horaria de El Salvador
    const localDate = new Date(date);
  
    // Formatear la fecha como 'YYYY-MM-DD'
    const formattedDate = localDate.toLocaleDateString('en-CA');
  
    // Formatear la hora como 'HH:MM'
    const formattedTime = localDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Hora en formato de 24 horas
      timeZone: 'America/El_Salvador', // Zona horaria de El Salvador
    });
  
    return { formattedDate, formattedTime };
  };
  

  const handleEditPress = (CodFuncion, fecha, hora) => {
    setid(CodFuncion); // Establecer el item seleccionado
    const [anio, mes, dia] = fecha.split("-").map(Number);
    const [horas, minutos] = hora.split(":").map(Number);
    const fechaHora = new Date(anio, mes - 1, dia, horas, minutos);
    setFechaHora(fechaHora);
    setFormattedDate(fecha);
    setFormattedTime(hora);
    setShowModal(true); // Mostrar el modal
  };

  const handleEstado = (CodFuncion, estado) => {
    setShowModalEstado(true); // Mostrar el modal
    setid(CodFuncion); // Establecer el item seleccionado
    setEstado(estado);
  };

  const CambiarEstado = async () => {
    if(estado==1){
      try {
        const response = await axios.put(`${API_URL}/api/funciones/eliminarFuncion/${id}`);
        Alert.alert('Función eliminada', 'La función ha sido eliminada con éxito');
        setShowModalEstado(false);
        obtenerFunciones();
      } catch (error) {
        if (error.request) {
          Alert.alert('Error', 'No hubo respuesta del servidor');
          return;
        } else {
          Alert.alert('Error', 'Error al hacer la solicitud');
          return;
        }
      }
    }
    if(estado==0){
      try {
        const response = await axios.put(`${API_URL}/api/funciones/reactivarFuncion/${id}`);
        Alert.alert('Función reactivada', 'La función ha sido reactivada con éxito');
        setShowModalEstado(false);
        obtenerFunciones();
      } catch (error) {
        if (error.request) {
          Alert.alert('Error', 'No hubo respuesta del servidor');
          return;
        } else {
          Alert.alert('Error', 'Error al hacer la solicitud');
          return;
        }
      }
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={estilos.contenedor}>
        <View style={estilos.tarjeta}>
          <View style={estilos.detallesFuncion}>
            <Text style={estilos.tituloSucursal}>Función {item.codFuncion}</Text>
            <Text style={estilos.textoGrande}>Sucursal: {item.sucursal}</Text>
            <Text style={estilos.textoGrande}>Película: {item.nombre}</Text>
            <Text style={estilos.textoGrande}>Sala: {item.codSala}</Text>
            <Text style={estilos.textoGrande}>Fecha: {item.fecha}</Text>
            <Text style={estilos.textoGrande}>Hora: {item.hora}</Text>
            
          </View>
          <View style={estilos.contenedorBotones}>
              <TouchableOpacity style={estilos.botonIcono} onPress={() => handleEditPress(item.codFuncion, item.fecha, item.hora)}>
                <FontAwesome name="edit" size={30} color="white" />
              </TouchableOpacity>
              {item.estadoEliminacion === 0 ? (
              <TouchableOpacity style={estilos.botonIcono} onPress={() => handleEstado(item.codFuncion, item.estadoEliminacion)}>
              <FontAwesome name="ban" size={30} color="white" />
            </TouchableOpacity>
            ):(
              <TouchableOpacity style={estilos.botonIcono} onPress={() => handleEstado(item.codFuncion, item.estadoEliminacion)}>
              <FontAwesome name="check" size={30} color="white" />
            </TouchableOpacity>
            )}
            </View>
        </View>
      </View>
    );
  };

  const editFuncion = async () => {
    //AQUI DEBERIA DE GUARDARSE EL CAMBIO DE EDICION las var son formattedDate y formattedTime
    try {
      const response = await axios.put(`${API_URL}/api/funciones/update/${id}`, {
        fecha: formattedDate,
        hora: formattedTime,
      });
      Alert.alert('Función actualizada', 'La función ha sido actualizada con éxito');
      setShowModal(false);
      obtenerFunciones();
    } catch (error) {
      if (error.request) {
        Alert.alert('Error', 'No hubo respuesta del servidor');
        return;
      } else {
        Alert.alert('Error', 'Error al hacer la solicitud');
        return;
      }
    }
  };

  const FlatListMovie = ({ Movie }) => {
    return (
      <FlatList
        data={Movie}
        renderItem={renderItem}
        keyExtractor={(item) => item.codFuncion}
        scrollEnabled={false}
      />
    );
  };

  return (
    <ScrollView>
      <FlatListMovie Movie={funciones} />

      {/* Modal para seleccionar fecha y hora */}
      <Modal
      visible={showModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowModal(false)}
    >
      <View style={estilos.modalContainer}>
        <View style={estilos.modalContent}>
          <Text style={estilos.modalTitle}>Modificar Función</Text>
          
          <Text style={estilos.textoGrande}>Ingrese la nueva fecha:</Text>
          <TouchableOpacity style={estilos.botonSeleccionar} onPress={() => setShowDatePicker(true)}>
            <Text style={estilos.botonTexto}>Seleccionar Fecha</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={fechaHora}
              mode="date"
              display="default"
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}

          <Text style={estilos.textoGrande}>Ingrese la nueva hora:</Text>
          <TouchableOpacity style={estilos.botonSeleccionar} onPress={() => setShowTimePicker(true)}>
            <Text style={estilos.botonTexto}>Seleccionar Hora</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={fechaHora}
              mode="time"
              is24Hour={true}
              display="spinner"
              onChange={onTimeChange}
            />
          )}

          <View style={estilos.modalButtons}>
            <TouchableOpacity style={estilos.botonGuardar} onPress={editFuncion}>
              <Text style={estilos.botonTexto}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.botonCancelar} onPress={() => setShowModal(false)}>
              <Text style={estilos.botonTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
       {/* Modal para cambio de estado*/}
       <Modal
      animationType="slide"
      transparent={true}
      visible={ShowModalEstado}
      onRequestClose={() => setShowModalEstado(false)}
    >
      <View style={estilos.modalContainer}>
        <View style={estilos.modalContent}>
          <Text style={estilos.modalText}>¿Seguro que desea {estado === 0  ? ('reactivar'):('eliminar')} la función?</Text>
          <View style={estilos.modalButtons}>
            <TouchableOpacity style={estilos.botonCancelar} onPress={() => setShowModalEstado(false)}>
              <Text style={estilos.botonTexto}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.botonAceptar} onPress={() => CambiarEstado()}>
              <Text style={estilos.botonTexto}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    </ScrollView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tarjeta: {
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 5,
    paddingTop: 0,
    margin: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  detallesFuncion: {
    justifyContent: 'center',
    width:'65%',
  },
  tituloSucursal: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textoGrande: {
    fontSize: 18,
    marginBottom: 5,
  },
  contenedorBotones: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
    gap: 20,
  },
  botonIcono: {
    backgroundColor: '#8B0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    
  },
  modalTitle: {
    
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop:10,
  },
  modalText: {
    fontSize: 18,
 
    textAlign: 'center',
    marginBottom: 20,
  },
  botonGuardar: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  botonCancelar: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  botonAceptar: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  botonTexto: {
    color: 'white',
    textAlign: 'center',
  },
  botonSeleccionar: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ModificarFuncion;
