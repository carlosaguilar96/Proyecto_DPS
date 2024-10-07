import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from "react-native-gesture-handler";
import axios from 'axios';
import { API_URL } from '@env';

export default function CambiarContraAdmin() {
    const [username, setUsername] = useState(null);
    const [usuarioinfo, setUsuarioinfo] = useState(null);
    const [contrasenaAnterior, setContrasenaAnterior] = useState('');
    const [contrasenaNueva, setContrasenaNueva] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleCambio = () => {

        if (contrasenaAnterior == "") {
            Alert.alert("Mensaje", "Debe escribir la contraseña anterior");
            return;
        }

        if (contrasenaNueva == "") {
            Alert.alert("Mensaje", "Debe escribir la nueva contraseña");
            return;
        }

        if (confirmarContrasena == "") {
            Alert.alert("Mensaje", "Debe confirmar la nueva contraseña");
            return;
        }

        if (contrasenaNueva !== confirmarContrasena) {
            Alert.alert("Mensaje", "Las contraseñas no coinciden");
            return;
        }

        cambiarContra();
    };

    const imprimirUsuario = async () => {
        try {
            const infouser = await AsyncStorage.getItem('Nombreuser');

            if (infouser !== null) {
                const parsedUsuarioInfo = JSON.parse(infouser);
                console.log('Datos del usuario:', parsedUsuarioInfo);
                setUsername(parsedUsuarioInfo.nombreUsuario);
                obtenerInfoUsuario(parsedUsuarioInfo.nombreUsuario);


            } else {
                console.log('No hay información de usuario almacenada.');
            }
        } catch (error) {
            console.log('Error al obtener la información del usuario:', error);
        }
    };

    const obtenerInfoUsuario = async (user) => {
        try {
            const response = await axios.get(`${API_URL}/api/usuarios/show/${user}`);

            if (response.data.usuario.length != 0) {

                setUsuarioinfo(response.data.usuario);

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

    const cambiarContra = async () => {
        try {

            const response = await axios.put(`${API_URL}/api/usuarios/cambiarPassword/${username}`, {
                pwActual: contrasenaAnterior,
                pwNueva: contrasenaNueva,
                pwConfirmar: confirmarContrasena
            });

            Alert.alert('Mensaje', 'Cambio de contraseña exitoso');
            setShowModal(false);
            setConfirmarContrasena("");
            setContrasenaAnterior("");
            setContrasenaNueva("");

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

    useEffect(() => {
        imprimirUsuario();
    }, []);

    return (
        <ScrollView>
            {usuarioinfo ? (
                <View style={estilos.contenedor}>
                    <View style={estilos.tarjeta}>
                        <View style={estilos.detallesUser}>
                            <Text style={estilos.textoGrande}>Nombre: {usuarioinfo.nombreUsuario}</Text>
                            <Text style={estilos.textoGrande}>Nombre: {usuarioinfo.nombres}</Text>
                            <Text style={estilos.textoGrande}>Apellido: {usuarioinfo.apellidos}</Text>
                            <Text style={estilos.textoGrande}>DUI: {usuarioinfo.DUI}</Text>
                            <Text style={estilos.textoGrande}>Email: {usuarioinfo.correoE}</Text>
                        </View>
                        <TouchableOpacity style={estilos.Button} onPress={() => setShowModal(true)}>
                            <Text style={estilos.ButtonText}>Cambiar Contraseña</Text>
                        </TouchableOpacity>
                    </View>
                    {/*MODAL*/}
                    <Modal
                        visible={showModal}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setShowModal(false)}
                    >
                        <View style={estilos.modalContainer}>
                            <View style={estilos.modalContent}>
                                <Text style={estilos.titulo}>Cambiar Contraseña</Text>

                                <TextInput
                                    style={estilos.input}
                                    placeholder="Contraseña Anterior"
                                    secureTextEntry
                                    value={contrasenaAnterior}
                                    onChangeText={setContrasenaAnterior}
                                />

                                <TextInput
                                    style={estilos.input}
                                    placeholder="Contraseña Nueva"
                                    secureTextEntry
                                    value={contrasenaNueva}
                                    onChangeText={setContrasenaNueva}
                                />

                                <TextInput
                                    style={estilos.input}
                                    placeholder="Confirmar Contraseña"
                                    secureTextEntry
                                    value={confirmarContrasena}
                                    onChangeText={setConfirmarContrasena}
                                />

                                <View style={estilos.botonContainer}>
                                    <TouchableOpacity style={estilos.botonGuardar} onPress={() => handleCambio()}>
                                        <Text style={estilos.botonTexto}>Guardar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={estilos.botonCancelar} onPress={() => setShowModal(false)}>
                                        <Text style={estilos.botonTexto}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </Modal>
                </View>
            ) : (
                <Text style={estilos.textoGrande}>No hay información del usuario</Text>
            )}
        </ScrollView>
    );
}



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
    textoTarjetaCabecera: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detallesUser: {
        justifyContent: 'center',
    },
    textoGrande: {
        fontSize: 18,
        marginBottom: 5,
    },
    Button: {
        backgroundColor: '#b30000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonText: {
        color: 'white',
        fontSize: 16,

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    titulo: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    botonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    botonTexto: {
        color: 'white',
        textAlign: 'center',
    },
});
