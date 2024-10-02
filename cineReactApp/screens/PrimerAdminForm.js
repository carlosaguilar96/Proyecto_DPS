import react, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Alert, Keyboard, TouchableHighlight, TouchableOpacity } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { API_URL } from '@env';

const PrimerAdminForm = (retornarLogin) => {

    const [titulo, setTitulo] = useState("Crear Primer Administrador");
    const [etapa, setEtapa] = useState(3);

    const [contra, setContra] = useState('');
    const [confirmContra, setConfirmContra] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dui, setDui] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [mssgError, setMssgError] = useState('');

    const [nombreCine, setNombreCine] = useState('');
    const [mision, setMision] = useState('');
    const [vision, setVision] = useState('');
    const [logo, setLogo] = useState('');

    const validarEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    
    const registrarAdmin = async () => {
        //Todas estas validaciones son en el lado del cliente
        if (email == "") {
            setMssgError("Ingresar correo electrónico.");
            return;
        }
        if (!validarEmail(email)) {
            setMssgError('El correo electrónico ingresado no es válido.');
            return;
        }

        if (nombre == "") {
            setMssgError("Ingresar un nombre.");
            return;
        }
        if (apellido == "") {
            setMssgError("Ingresar un apellido.");
            return;
        }
        if (dui == "") {
            setMssgError("Ingresar DUI.");
            return;
        }
        if (dui.length != 10) {
            setMssgError('Ingresar DUI válido.');
            return;
        }

        if (username == "") {
            setMssgError("Ingresar un nombre de usuario.");
            return;
        }

        if (contra == "") {
            setMssgError("Ingresar contraseña.");
            return;
        }
        if (contra.length < 8) {
            setMssgError('La contraseña debe tener al menos 8 caracteres.');
            return;
        }
        if (confirmContra == "") {
            setMssgError("Ingresar confirmación de contraseña.");
            return;
        }
        if (contra !== confirmContra) {
            setMssgError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/usuarios/crearAdministrador`, {
                nombreUsuario: username,
                contrasena: contra,
                DUI: dui,
                nombres: nombre,
                apellidos: apellido,
                correoE: email,
            });
            Alert.alert('Registro exitoso', 'Administrador creado correctamente');
            limpiarAdmin();
            setEtapa(2); // Se continúa a la siguiente etapa

        } catch (error) {
            if (error.response) {
                const errores = error.response.data.errors;
                let mensaje = "";
                for (const campo in errores) {
                    mensaje += `Error en ${campo}: ${errores[campo].join(', ')}`;
                }
                setMssgError(mensaje);
                return;
            } else if (error.request) {
                Alert.alert('Error', 'No hubo respuesta del servidor');
                return;
            } else {
                Alert.alert('Error', 'Error al hacer la solicitud ' + error);
                return;
            }
        }
    };

    const limpiarAdmin = () => {
        setEmail("");
        setNombre("");
        setApellido("");
        setDui("");
        setContra("");
        setConfirmContra("");
        setMssgError('');
        Keyboard.dismiss();
        setTitulo("Crear Cine");
    }


    // Sirve para seleccionar la imagen del logo del Cine
    const abrirGaleria = async () => {
        let resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 1,
        });

        if (!resultado.canceled) {
            setLogo(resultado.assets[0]);
        }
        
    }

    // Creación del cine
    const registrarCine = async () => {
        if (nombreCine == "") {
            setMssgError("Ingresar un nombre para el cine.");
            return;
        }
        if (mision == "") {
            setMssgError("Ingresar la misión del cine.");
            return;
        }
        if (vision == "") {
            setMssgError("Ingresar la visión del cine.");
            return;
        }
        if (!logo) {
            setMssgError("Selecciona una imagen para el logo");
            return;
        }

        const formData = new FormData(); // Objeto que se enviará a la API que incluirá el logo
        
        formData.append('logo', {
            uri: logo.uri,
            type: logo.mimeType,
            name: logo.fileName || foto.jpg
        });     

        formData.append('nombreCine', nombreCine);
        formData.append('mision', mision);
        formData.append('vision', vision);
        formData.append('firstAdmin', username);

        try{
            const response = await axios.post(`${API_URL}/api/cines/crearCine`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Alert.alert('Registro exitoso', 'Cine creado correctamente');
            limpiarCine();
            setEtapa(2); // Se continúa a la siguiente etapa
        }catch (error) {
            if (error.response) {
                const errores = error.response.data.errors;
                let mensaje = "";
                for (const campo in errores) {
                    mensaje += `Error en ${campo}: ${errores[campo].join(', ')}`;
                }
                setMssgError(mensaje);
                return;
            } else if (error.request) {
                Alert.alert('Error', 'No hubo respuesta del servidor ');
                console.log(error.message);
                return;
            } else {
                Alert.alert('Error', 'Error al hacer la solicitud ' + error);
                return;
            }
        }
    }

    const limpiarCine = () =>{
        setNombreCine('');
        setMision('');
        setVision('');
        setLogo(null);
        Keyboard.dismiss();
        setTitulo('Añadir Sucursales');
        setMssgError('');
    }

    return (
        <View style={styles.center}>
            <Text>{titulo}</Text>
            <Text>{mssgError}</Text>

            {
                etapa == 1 ? (
                    <View>
                        <TextInput
                            placeholder="Correo electrónico"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Nombre"
                            value={nombre}
                            onChangeText={setNombre}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Apellido"
                            value={apellido}
                            onChangeText={setApellido}
                            style={styles.input}
                        />
                        <TextInputMask
                            type={'custom'}
                            options={{
                                mask: '99999999-9',
                            }}
                            value={dui}
                            onChangeText={text => setDui(text)}
                            style={styles.input}
                            placeholder="DUI"
                            keyboardType="numeric"
                        />
                        <TextInput
                            placeholder="Usuario"
                            value={username}
                            onChangeText={setUsername}
                            style={styles.input}
                            autoCapitalize="none"
                        />
                        <TextInput
                            placeholder="Contraseña"
                            value={contra}
                            onChangeText={setContra}
                            style={styles.input}
                            secureTextEntry
                        />
                        <TextInput
                            placeholder="Confirmar Contraseña"
                            value={confirmContra}
                            onChangeText={setConfirmContra}
                            style={styles.input}
                            secureTextEntry
                        />

                        <TouchableOpacity style={styles.button} onPress={registrarAdmin}>
                            <Text style={styles.buttonText}>Registrate</Text>
                        </TouchableOpacity>
                    </View>
                ) : etapa == 2 ? (
                    <View>
                        <TextInput
                            placeholder="Nombre del cine"
                            value={nombreCine}
                            onChangeText={setNombreCine}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Misión"
                            value={mision}
                            onChangeText={setMision}
                            style={styles.input}
                            multiline={true}
                            numberOfLines={4}
                        />
                        <TextInput
                            placeholder="Visión"
                            value={vision}
                            onChangeText={setVision}
                            style={styles.input}
                            multiline={true}
                            numberOfLines={4}
                        />

                        <TouchableOpacity onPress={abrirGaleria}>
                            <Text style={styles.buttonText}>Seleccionar logo</Text>
                        </TouchableOpacity>
                        <Text>Archivo seleccionado: {logo ? logo.fileName : 'Ninguno'}</Text>
                        <TouchableOpacity style={styles.button} onPress={registrarCine}>
                            <Text style={styles.buttonText}>Crear Cine</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View></View>
                )
            }
        </View>

    )
}

export default PrimerAdminForm;

const styles = StyleSheet.create({
    center: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});