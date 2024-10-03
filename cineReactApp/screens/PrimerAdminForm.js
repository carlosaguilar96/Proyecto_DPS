import react, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Alert, Keyboard, FlatList, TouchableOpacity, Image } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { API_URL } from '@env';

const PrimerAdminForm = ({ retornarLogin }) => {

    const [titulo, setTitulo] = useState("Crear Primer Administrador");
    const [etapa, setEtapa] = useState(1);

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

    const [nombreSucursal, setNombreSucursal] = useState('');
    const [ubicacionS, setUbicacionS] = useState('');
    const [telefono, setTelefono] = useState('');

    const [codCine, setCodCine] = useState();
    const [sucursales, setSucursales] = useState([]);
    const [bandera, setBandera] = useState(true);

    const validarEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    // Validación de la información del admin y registro en la BD
    const registrarAdmin = async () => {
        //Todas estas validaciones son en el lado del cliente
        Keyboard.dismiss();
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
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });

        if (!resultado.canceled) {
            setLogo(resultado.assets[0]);
        }

    }

    // Validación de la información del cine
    const validarCine = () => {
        Keyboard.dismiss();
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

        Alert.alert("Mensaje", "¿Estás seguro? El logo del Cine no se podrá cambiar después", [
            {
                text: "Sí", onPress: registrarCine
            },
            { text: "No" }
        ])

    }

    // Registro del cine
    const registrarCine = async () => {
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

        try {
            const response = await axios.post(`${API_URL}/api/cines/crearCine`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setCodCine(response.data.cine.codCine);
            Alert.alert('Registro exitoso', 'Cine creado correctamente');
            limpiarCine();
            setEtapa(3); // Se continúa a la siguiente etapa
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
                Alert.alert('Error', 'No hubo respuesta del servidor ');
                console.log(error.message);
                return;
            } else {
                Alert.alert('Error', 'Error al hacer la solicitud ' + error);
                return;
            }
        }
    }
    const limpiarCine = () => {
        setNombreCine('');
        setMision('');
        setVision('');
        setLogo(null);
        Keyboard.dismiss();
        setTitulo('Añadir Sucursales');
        setMssgError('');
    }

    // Validación de la información de la sucursal
    const guardarSucursal = () => {
        Keyboard.dismiss();
        if (nombreSucursal == "") {
            setMssgError("Ingresar un nombre para la sucursal.");
            return;
        }
        if (ubicacionS == "") {
            setMssgError("Ingresar la ubicación de la sucursal.");
            return;
        }
        if (telefono == "") {
            setMssgError("Ingresar un teléfono para la sucursal.");
            return;
        }
        if (telefono.length != 9) {
            setMssgError('Ingresar un teléfono válido.');
            return;
        }

        Alert.alert("Mensaje", "¿Estás seguro? Las sucursales ya no se podrán eliminar", [
            {
                text: "Sí",
                onPress: () => {
                    const miSucursal =
                    {
                        nombre: nombreSucursal,
                        ubicacion: ubicacionS,
                        telefono: telefono
                    };

                    const arreglo = [...sucursales, miSucursal];

                    registrarSucursal(miSucursal);
                    setSucursales(arreglo);
                    limpiarSucursal();
                }
            },
            { text: "No" }
        ])


    }

    // Registro de la sucursal en la BD
    const registrarSucursal = async (sucursal) => {

        try {
            const response = await axios.post(`${API_URL}/api/sucursales/crearSucursal`, {
                codCine: codCine,
                sucursal: sucursal.nombre,
                ubicacion: sucursal.ubicacion,
                telefono: sucursal.telefono
            });

            Alert.alert('Registro exitoso', 'Sucursal añadida exitosamente');

        } catch (error) {
            setBandera(false);
            console.log(codCine);
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

        };
    }

    // Render Item de la sucursal
    const renderSucursal = ({ item }) => {
        return (
            <View style={{ marginTop: 10 }}>
                <Text>{item.nombre}: {item.ubicacion}</Text>
                <View style={styles.separator} /> 
            </View>
        )
    }

    const limpiarSucursal = () => {
        setNombreSucursal("");
        setUbicacionS("");
        setTelefono("");
        setMssgError("");
        Keyboard.dismiss();
    }
    return (
        <View style={styles.center}>

            <View style={styles.caja}>
                <Text style={styles.textCaja}>{titulo}</Text>
                <Text style={styles.error}>{mssgError}</Text>
                {
                    etapa == 1 ? ( // Creación del ADMIN
                        <View>
                            <TextInput
                                placeholder="Correo electrónico"
                                value={email}
                                onChangeText={setEmail}
                                style={styles.input}
                                keyboardType="email-address"
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
                                <Text style={styles.buttonText}>Registrarse</Text>
                            </TouchableOpacity>
                        </View>
                    ) : etapa == 2 ? ( // Creación del Cine
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
                                numberOfLines={2}
                            />
                            <TextInput
                                placeholder="Visión"
                                value={vision}
                                onChangeText={setVision}
                                style={styles.input}
                                multiline={true}
                                numberOfLines={2}
                            />
                            <View style={styles.imagenContainer}>
                                <TouchableOpacity onPress={abrirGaleria} style={styles.buttonGaleria}>
                                    <Text style={styles.buttonText}>Seleccionar logo</Text>
                                </TouchableOpacity>
                                {logo ? (<Image source={{ uri: logo.uri }} style={styles.logoImagen} />) : (<View />)}
                            </View>
                            <TouchableOpacity style={styles.button} onPress={validarCine}>
                                <Text style={styles.buttonText}>Crear Cine</Text>
                            </TouchableOpacity>
                        </View>
                    ) : ( // Creación de las sucursales
                        <View>
                            <TextInput
                                placeholder="Nombre de la sucursal"
                                value={nombreSucursal}
                                onChangeText={setNombreSucursal}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Ubicación"
                                value={ubicacionS}
                                onChangeText={setUbicacionS}
                                style={styles.input}
                                multiline={true}
                                numberOfLines={2}
                            />
                            <TextInputMask
                                type={'custom'}
                                options={{
                                    mask: '9999-9999',
                                }}
                                value={telefono}
                                onChangeText={text => setTelefono(text)}
                                style={styles.input}
                                placeholder="Teléfono"
                                keyboardType="numeric"
                            />

                            <TouchableOpacity style={styles.button} onPress={guardarSucursal}>
                                <Text style={styles.buttonText}>Añadir Sucursal</Text>
                            </TouchableOpacity>


                            <FlatList
                                data={sucursales}
                                renderItem={renderSucursal}
                                ListEmptyComponent={<View />}
                                style={{ flexGrow: 0 }}
                            />

                            {sucursales.length != 0 ? (
                                <TouchableOpacity style={styles.button} onPress={() =>
                                    Alert.alert("Mensaje", "Ya no podrás añadir más sucursales, ¿estás seguro?", [
                                        { text: "Sí", onPress: () => retornarLogin(true) },
                                        { text: "No" }
                                    ])}>
                                    <Text style={styles.buttonText}>Finalizar</Text>
                                </TouchableOpacity>
                            ) : (<View />)}

                        </View>
                    )
                }
            </View>

        </View>

    )
}

export default PrimerAdminForm;

const styles = StyleSheet.create({
    center: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8B0000',

    },
    caja: {
        backgroundColor: '#f6f6f6',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textCaja: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width: 360,
        borderColor: '#383232',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#383232',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width: 360,

    },
    buttonGaleria: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width: 200,
        height: 50,
        backgroundColor: '#7a7a7a',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        fontSize: 18,
        textDecorationLine: 'underline',
        marginTop: 15,
        marginBottom: 15,
    },
    logoImagen: {
        width: 120,
        height: 120,

    },
    imagenContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    separator: {
        height: 2,
        width: '100%',
        backgroundColor: '#ccc',
        borderRadius: 1,
        marginVertical: 10,
        marginBottom: 5,
        shadowColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 1,
    },
});