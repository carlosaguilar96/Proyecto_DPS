import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format, addDays, parseISO, parse } from 'date-fns';
import { TextInputMask } from "react-native-masked-text";
import axios from 'axios';
import { API_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';

const AñadirFuncion = ({ navigation }) => {
  const [sucursal, setSucursal] = useState(-1);
  const [pelicula, setPelicula] = useState(-1);
  const [sala, setSala] = useState(-1);
  const [fecha, setFecha] = useState(new Date());
  const [idioma, setIdioma] = useState("");
  const [mostrarFechaPicker, setMostrarFechaPicker] = useState(false);
  const [horario, setHorario] = useState(new Date());
  const [mostrarHorarioPicker, setMostrarHorarioPicker] = useState(false);
  const [precios, setPrecios] = useState({ ninos: '', adultos: '', terceraEdad: '' });
  const [sucursales, setSucursales] = useState([]);
  const [peliculas, setPeliculas] = useState([]);
  const [salas, setSalas] = useState([]);
  const [salasEspecificas, setSalasEspecificas] = useState([]);
  const isFocused = useIsFocused();

  const manejarAñadirFuncion = () => {
    if (sucursal == -1 || pelicula == -1 || sala == -1 || !horario || !precios.ninos || !precios.adultos || !precios.terceraEdad || idioma == "") {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }
    else {
      guardarFuncion();
    }

  };

  const guardarFuncion = async () => {
    try {
      const parseFecha = format(fecha, 'yyyy-MM-dd');
      const parseHora = horario.toLocaleTimeString();

      const response = await axios.post(`${API_URL}/api/funciones/crearFuncion`, {
        codPelicula: pelicula,
        codSala: sala,
        idioma: idioma,
        fecha: parseFecha,
        hora: parseHora,
        precioAdulto: precios.adultos,
        precioNino: precios.ninos,
        precioTE: precios.terceraEdad
      });

      Alert.alert('Registro exitoso', 'Función agregada correctamente');

      limpiar();
      navigation.navigate("Menu Admin");

    } catch (error) {
      console.log(error);
      if (error.response) {
        const errores = error.response.data.errors;
        let mensaje = "";
        for (const campo in errores) {
          mensaje += `Error en ${campo}: ${errores[campo].join(', ')}`;
        }
        console.log(mensaje);
        Alert.alert("Error", mensaje);
        return;
      } else if (error.request) {
        Alert.alert('Error', 'No hubo respuesta del servidor');
        return;
      } else {
        Alert.alert('Error', 'Error al hacer la solicitud ' + error);
        return;
      }
    }
  }

  const limpiar = () => {
    setSucursal(-1);
    setPelicula(-1);
    setSala(-1);
    setIdioma("");
    setFecha(new Date());
    setHorario(new Date());
    setPrecios({ ninos: '', adultos: '', terceraEdad: '' })
  }

  const obtenerSucursales = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/sucursales/index`);

      if (response.data.sucursales.length != 0) {

        setSucursales(response.data.sucursales);

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

  const obtenerPeliculas = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/peliculas/indexD`);

      if (response.data.peliculas.length != 0) {
        setPeliculas(response.data.peliculas);
      }

    } catch (error) {
      if (error.request) {
        Alert.alert('Error', 'No hubo respuesta del servidor ');
        console.log(error);
        return;
      } else {
        Alert.alert('Error', 'Error al hacer la solicitud');
        console.log(error);
        return;
      }
    }
  }


  const obtenerSalas = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/salas/indexD`);

      if (response.data.salas.length != 0) {
        setSalas(response.data.salas);
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

  const obtenerSalasDetallado = () => {

    if (sucursal == -1) {
      setSalasEspecificas([]);
    } else {

      if (salas.length != 0) {

        let valor = salas.filter((item) => item.codSucursal == sucursal);
        setSalasEspecificas(valor);
      }
    }

  }

  useEffect(() => {
    if (isFocused) {
      obtenerSucursales();
      obtenerPeliculas();
      obtenerSalas();
      console.log("Cargado");
    }
  }, [isFocused]);

  useEffect(() => {
    obtenerSalasDetallado();

  }, [sucursal]);

  const confirmarFecha = (selectedDate) => {
    setMostrarFechaPicker(false);
    setFecha(selectedDate || fecha);
  }

  const confirmarHora = (selectedTime) => {
    setMostrarHorarioPicker(false);
    setHorario(selectedTime || horario);
  }
  return (
    <ScrollView style={estilos.contenedor}>

      <View style={estilos.formulario}>
        <Text>Sucursal:</Text>
        <Picker
          selectedValue={sucursal}
          style={estilos.entrada}
          onValueChange={(itemValue) => setSucursal(itemValue)}
        >
          <Picker.Item label="Seleccione una sucursal" value={-1} />
          {sucursales.map((item) => (
            <Picker.Item label={item.sucursal} value={item.codSucursal} key={() => item.codSucursal} />
          ))}
        </Picker>

        <Text>Película:</Text>
        <Picker
          selectedValue={pelicula}
          style={estilos.entrada}
          onValueChange={(itemValue) => setPelicula(itemValue)}
        >
          <Picker.Item label="Seleccione una película" value={-1} />
          {peliculas.map((item) => (
            <Picker.Item label={item.nombre} value={item.codPelicula} key={() => item.codPelicula} />
          ))}
        </Picker>

        <Text>Sala:</Text>
        <Picker
          selectedValue={sala}
          style={estilos.entrada}
          onValueChange={(itemValue) => setSala(itemValue)}
        >
          <Picker.Item label="Seleccione una sucursal primero" value={-1} />
          {salasEspecificas.map((item) => (
            <Picker.Item label={item.codSala} value={item.codSala} key={() => item.codSala} />
          ))}
        </Picker>

        <Text>Idioma:</Text>
        <Picker
          selectedValue={idioma}
          style={estilos.entrada}
          onValueChange={(itemValue) => setIdioma(itemValue)}
        >
          <Picker.Item label="Seleccione un idioma" value={""} />
          <Picker.Item label="Original Subtitulado" value={"Original Subtitulado"} />
          <Picker.Item label="Doblado al Español" value={"Doblado al Español"} />

        </Picker>

        <Text>Fecha:</Text>
        <TouchableOpacity onPress={() => { setMostrarFechaPicker(true); console.log("Hola"); }}>
          <Text style={estilos.entrada}>{format(fecha, 'yyyy-MM-dd')}</Text>
        </TouchableOpacity>

        <DateTimePickerModal

          isVisible={mostrarFechaPicker}
          mode="date"
          onConfirm={confirmarFecha}
          onCancel={() => setMostrarFechaPicker(false)}
          locale="es_ES"
          headerTextIOS="Elige la fecha"
          cancelTextIOS="Cancelar"
          confirmTextIOS="Confirmar"
          value={fecha}

        />

        <Text>Horario:</Text>
        <TouchableOpacity onPress={() => setMostrarHorarioPicker(true)}>
          <Text style={estilos.entrada}>{horario.toLocaleTimeString()}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={mostrarHorarioPicker}
          mode="time"
          onConfirm={confirmarHora}
          onCancel={() => setMostrarHorarioPicker(false)}
          locale="es_ES"
          headerTextIOS="Elige la hora"
          cancelTextIOS="Cancelar"
          confirmTextIOS="Confirmar"
          value={horario}
        />

        <Text>Precio de las entradas:</Text>
        <View style={estilos.precioContainer}>
          <Text>Niños:</Text>
          <TextInput
            style={estilos.precioInput}
            value={precios.ninos}
            onChangeText={(value) => setPrecios({ ...precios, ninos: value })}
            keyboardType="numeric"
          />
        </View>
        <View style={estilos.precioContainer}>
          <Text>Adultos:</Text>
          <TextInput
            style={estilos.precioInput}
            value={precios.adultos}
            onChangeText={(value) => setPrecios({ ...precios, adultos: value })}
            keyboardType="numeric"
          />
        </View>
        <View style={estilos.precioContainer}>
          <Text>3ra Edad:</Text>
          <TextInput
            style={estilos.precioInput}
            value={precios.terceraEdad}
            onChangeText={(value) => setPrecios({ ...precios, terceraEdad: value })}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={estilos.botonAñadir} onPress={manejarAñadirFuncion}>
          <Text style={estilos.textoBotonAñadir}>Añadir Función</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  cabecera: {
    backgroundColor: '#8B0000',
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoCabecera: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  formulario: {
    padding: 20,
  },
  entrada: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  precioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  precioInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    width: 100,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  botonAñadir: {
    backgroundColor: '#8B0000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotonAñadir: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AñadirFuncion;