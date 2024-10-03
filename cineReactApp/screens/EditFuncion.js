import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Modal, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Funcion } from '../config/movieData';
import DateTimePicker from '@react-native-community/datetimepicker';

const ModificarFuncion = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalDeny, setShowModalDeny] = useState(false);
  const [id, setid] = useState(0);
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); // Ocultar el picker de fecha
    setDate(currentDate);

    const { formattedDate: newFormattedDate } = formatDateTime(currentDate);
    setFormattedDate(newFormattedDate)
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShowTimePicker(false); // Ocultar el picker de hora
    setDate(currentTime);

    const { formattedTime: newFormattedTime } = formatDateTime(currentTime);
    setFormattedTime(newFormattedTime);
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
  

  const handleEditPress = (CodFuncion) => {
    setid(CodFuncion); // Establecer el item seleccionado
    setShowModal(true); // Mostrar el modal
  };

  const CambiarEstado = (CodFuncion) => {
    setid(CodFuncion); // Establecer el item seleccionado
    setShowModalDeny(true); // Mostrar el modal
  };

  const renderItem = ({ item }) => {
    return (
      <View style={estilos.contenedor}>
        <View style={estilos.tarjeta}>
          <View style={estilos.detallesFuncion}>
            <Text style={estilos.tituloSucursal}>Funcion {item.id}</Text>
            <Text style={estilos.textoGrande}>Sucursal: {item.sucursal}</Text>
            <Text style={estilos.textoGrande}>Película: {item.title}</Text>
            <Text style={estilos.textoGrande}>Sala: {item.sala}</Text>
            <Text style={estilos.textoGrande}>Fecha: {item.fecha}</Text>
            <Text style={estilos.textoGrande}>Horario: {item.hora}</Text>
            <Text style={estilos.textoGrande}>Precio Niños: ${item.precioNino}</Text>
            <Text style={estilos.textoGrande}>Precio Adultos: ${item.precioAdulto}</Text>
            <Text style={estilos.textoGrande}>Precio 3ra Edad: ${item.precioTE}</Text>
            <View style={estilos.contenedorBotones}>
              <TouchableOpacity style={estilos.botonIcono} onPress={() => handleEditPress(item.id)}>
                <FontAwesome name="edit" size={30} color="white" />
              </TouchableOpacity>
              {item.estadoE === 0 ? (
              <TouchableOpacity style={estilos.botonIcono} onPress={() => CambiarEstado(item.id)}>
              <FontAwesome name="ban" size={30} color="white" />
            </TouchableOpacity>
            ):(
              <TouchableOpacity style={estilos.botonIcono} onPress={() => CambiarEstado(item.id)}>
              <FontAwesome name="check" size={30} color="white" />
            </TouchableOpacity>
            )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const handleModalClose = () => {
    // Cerrar el modal y cambiar el estado 
    setShowModalDeny(false);
    console.log(id);
  };

  const handleModalCloseEdit = () => {
    // Cerrar el modal y cambiar estado
    setShowModal(false);
    console.log(formattedDate,formattedTime, id);
    //AQUI DEBERIA DE GUARDARSE EL CAMBIO DE EDICION las var son formattedDate y formattedTime
  };

  const FlatListMovie = ({ Movie }) => {
    return (
      <FlatList
        data={Movie}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    );
  };

  return (
    <ScrollView>
      <FlatListMovie Movie={Funcion} />

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
            {/* Botón para seleccionar la fecha */}
            <Button title="Seleccionar Fecha" onPress={() => setShowDatePicker(true)} />
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}

            {/* Botón para seleccionar la hora */}
            <Text style={estilos.textoGrande}>Ingrese la nueva hora:</Text>
            <Button title="Seleccionar Hora" onPress={() => setShowTimePicker(true)} />
            {showTimePicker && (
              <DateTimePicker
                value={date}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onTimeChange}
              />
            )}

            {/* Botones para aceptar o cancelar */}
            <View style={estilos.modalButtons}>
              <Button title="Guardar" onPress={() => handleModalCloseEdit()} />
              <Button title="Cancelar" onPress={() => setShowModal(false)} />
            </View>
          </View>
        </View>
      </Modal>
       {/* Modal para cambio de estado*/}
       <Modal
          animationType="slide"
          transparent={true}
          visible={showModalDeny}
          onRequestClose={() => setShowModalDeny(false)}
        >
          <View style={estilos.modalContainer}>
            <View style={estilos.modalContent}>
              <Text style={estilos.modalText}>Seguro que deseas cambiar el estado de la pelicula?</Text>
              <View style={estilos.buttonContainer}>
                <Button title="Cancelar" onPress={() => setShowModalDeny(false)} />
                <Button title="Aceptar" onPress={() => handleModalClose()} />
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
    padding: 15,
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
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
});

export default ModificarFuncion;
