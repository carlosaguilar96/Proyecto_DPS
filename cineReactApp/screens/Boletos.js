import React, { useState, useContext, useEffect} from 'react';
  import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Button } from 'react-native';
  import { useRoute } from '@react-navigation/native';
  import { useNavigation } from '@react-navigation/native';
  import Cabecera from './Cabecera';
 

  export default function Boletos() {
    const route = useRoute();
    const { title, idioma, hora,sucursal, fecha,image, item} = route?.params || {};
    const navigation = useNavigation();
    const [childB, setchildB] = useState(0);
    const [adultoB, setadultoB] = useState(0);
    const [abueB, setabueB] = useState(0);
    const [total, setTotal] = useState(0);
  
    const handleNavigation =(title, idioma, hora,sucursal, fecha,image, childB, adultoB,abueB, total)=>{
      navigation.navigate('PantallaSeleccionAsientos',{title, idioma, hora,sucursal, fecha,image, childB, adultoB,abueB, total});
      console.log(title, idioma, hora,sucursal, fecha,image, childB, adultoB,abueB, total);
    };

    const handleBack = () => {
      navigation.goBack();
    };
  
    const getTotal = () => {
      return (childB * item.precioNino) + (adultoB * item.precioAdulto) + (abueB * item.precioTE);
    };

    useEffect(() => {
      const TotalN = getTotal();
      setTotal(TotalN);
    }, [childB, adultoB, abueB, item.precioNino, item.precioAdulto, item.precioTE]);
  
    return (
        <View style={styles.fullContainer}>
          {/* Header */}
          <Cabecera titulo="Entradas" onBack={handleBack} />
            {/* Movie Details */}
            <View style={styles.movieDetails}>
              <Image
                source={image}
                style={styles.moviePoster}
              />
              <View style={styles.movieInfo}>
              <Text style={styles.titulo}>{title}</Text>
              <Text style={styles.subtitulo}>Fecha: {fecha}</Text>
              <Text style={styles.subtitulo}>Sucursal {sucursal} | {hora} | {idioma}</Text>
              </View>
            </View>
    
            {/* Ticket Options */}
            <View style={styles.ticketOptions}>
              <Text style={styles.sectionTitle}>Escoja sus entradas</Text>
    
              <View style={styles.ticketRow}>
                <Text style={styles.subtituloT}>Niños:                </Text>
                <View style={styles.counter}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setchildB(Math.max(0, childB - 1))}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{childB}</Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setchildB(childB + 1)}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.subtituloT}>${item.precioNino}.00</Text>
              </View>
    
              <View style={styles.ticketRow}>
              <Text style={styles.subtituloT}>Adulto general:</Text>
                <View style={styles.counter}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setadultoB(Math.max(0, adultoB - 1))}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{adultoB}</Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setadultoB(adultoB + 1)}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.subtituloT}>${item.precioAdulto}.00</Text>
              </View>
    
              <View style={styles.ticketRow}>
              <Text style={styles.subtituloT}>3ra edad:           </Text>
                <View style={styles.counter}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setabueB(Math.max(0, abueB - 1))}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{abueB}</Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setabueB(abueB + 1)}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.subtituloT}>${item.precioTE}.00</Text>
              </View>
            </View>
    
            {/* Total Price and Continue Button */}
            <View style={styles.footer}>
              <Text style={styles.textoTotal}>Total US ${total}</Text>
              <TouchableOpacity style={styles.continueButton} onPress={() => handleNavigation(title, idioma, hora,sucursal, fecha,image, childB, adultoB,abueB, total)}>
                <Text style={styles.continueButtonText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </View>
     
      );
    }
    
    const styles = StyleSheet.create({
      fullContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
      },
      mainContent: {
        flex: 1,
        paddingHorizontal: 0, 
        paddingVertical: 0,   
      },
      rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 10,
      },
      button: {
        backgroundColor: '#c55c5c',
        paddingHorizontal: 67,
        paddingVertical: 20,
        borderRadius: 0,
      },
      titulo: {
        color: 'white',
        fontSize: 20,
        marginBottom: 8,
      },
      subtitulo: {
        color: '#aaa',
        fontSize: 16,
      },
      subtituloT: {
       
        fontSize: 16,
      },
      dayText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
      },
      movieDetails: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#444',
        borderBottomWidth: 1,
        borderColor: '#666',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation:10,
      },
      moviePoster: {
        width: 80,
        height: 120,
        marginRight: 16,
      },
      movieInfo: {
        flex: 1,
        justifyContent: 'center',
      },
      movieTitle: {
        color: 'white',
        fontSize: 18,
        marginBottom: 8,
      },
      ticketOptions: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        elevation: 3,
        marginVertical: 10,
        marginHorizontal: 10, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation:10,
      },
      ticketRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
      },
      counter: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      counterButton: {
        backgroundColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
        marginHorizontal: 5,
      },
      buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
      },
      counterText: {
        fontSize: 18,
        marginHorizontal: 10,
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#848081',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
      textoTotal: {
        color: 'black',
        fontSize: 18,
      },
      continueButton: {
        backgroundColor: '#b30000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation:5,
      },
      continueButtonText: {
        color: 'white',
        fontSize: 16,
      },
      sectionTitle: {
        fontSize: 18,
        marginBottom: 15,
      },
    });