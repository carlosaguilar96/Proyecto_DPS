import React, { useState, useContext, useEffect} from 'react';
  import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Button } from 'react-native';
  import { Funcion } from '../config/movieData';
  import { useRoute } from '@react-navigation/native';
  import Cartelera from './Cartelera';
  import { Ionicons } from '@expo/vector-icons';
    import { useNavigation } from '@react-navigation/native';

 

  export default function Boletos() {
    const route = useRoute();
    const { title, idioma, hora,sucursal, fecha,image} = route?.params || {};
    const navigation = useNavigation();
    const [childTickets, setChildTickets] = useState(0);
    const [adultTickets, setAdultTickets] = useState(0);
    const [seniorTickets, setSeniorTickets] = useState(0);
  
    const ticketPrice = {
      child: 2,
      adult: 5,
      senior: 4,
    };
  
    const getTotalPrice = () => {
      return (childTickets * ticketPrice.child) + (adultTickets * ticketPrice.adult) + (seniorTickets * ticketPrice.senior);
    };
  
    return (
        <View style={styles.fullContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Entradas</Text>
          </View>
    
          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Row Buttons */}
            <View style={styles.rowContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.dayText}>E</Text>
              </TouchableOpacity>
    
              <TouchableOpacity style={styles.button}>
                <Text style={styles.dayText}>A</Text>
              </TouchableOpacity>
    
              <TouchableOpacity style={styles.button}>
                <Text style={styles.dayText}>P</Text>
              </TouchableOpacity>
            </View>
    
            {/* Movie Details */}
            <View style={styles.movieDetails}>
              <Image
                source={image}
                style={styles.moviePoster}
              />
              <View style={styles.movieInfo}>
                <Text style={styles.movieTitle}>Sucursal {sucursal}</Text>
                <Text>{title}</Text>
                <Text>{fecha} - {hora} </Text>
                <Text>{idioma}</Text>
              </View>
            </View>
    
            {/* Ticket Options */}
            <View style={styles.ticketOptions}>
              <Text style={styles.sectionTitle}>Escoja sus entradas</Text>
    
              <View style={styles.ticketRow}>
                <Text>Niños:                </Text>
                <View style={styles.counter}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setChildTickets(Math.max(0, childTickets - 1))}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{childTickets}</Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setChildTickets(childTickets + 1)}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text>${ticketPrice.child}.00</Text>
              </View>
    
              <View style={styles.ticketRow}>
                <Text>Adulto general:</Text>
                <View style={styles.counter}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setAdultTickets(Math.max(0, adultTickets - 1))}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{adultTickets}</Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setAdultTickets(adultTickets + 1)}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text>${ticketPrice.adult}.00</Text>
              </View>
    
              <View style={styles.ticketRow}>
                <Text>3ra edad:           </Text>
                <View style={styles.counter}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setSeniorTickets(Math.max(0, seniorTickets - 1))}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{seniorTickets}</Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setSeniorTickets(seniorTickets + 1)}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text>${ticketPrice.senior}.00</Text>
              </View>
            </View>
    
            {/* Total Price and Continue Button */}
            <View style={styles.footer}>
              <Text>Total US ${getTotalPrice()}</Text>
              <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      fullContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
      },
      header: {
        backgroundColor: '#8B0000',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 20,
        justifyContent: 'space-between',
      },
      title: {
        color: '#fff',
        fontSize: 21,
        textAlign: 'center',
        flex: 1,
      },
      mainContent: {
        flex: 1,
        paddingHorizontal: 0, // Remove padding for full width usage
        paddingVertical: 0,   // Remove vertical padding as well
      },
      rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 10,
      },
      button: {
        backgroundColor: '#c55c5c',
        paddingHorizontal: 67, // Adjust this for appropriate button width
        paddingVertical: 20,
        borderRadius: 0,
      },
      dayText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
      },
      movieDetails: {
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        elevation: 2,
      },
      moviePoster: {
        width: 80,
        height: 120,
        marginRight: 10,
      },
      movieInfo: {
        flex: 1,
      },
      movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      ticketOptions: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        elevation: 3,
        marginVertical: 10,
        marginHorizontal: 10, // Optional: Adjust for better padding
      },
      ticketRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      },
      counter: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      counterButton: {
        backgroundColor: '#007BFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 5,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      counterText: {
        fontSize: 18,
        marginHorizontal: 10,
      },
      footer: {
        marginTop: 20,
        alignItems: 'center',
        paddingBottom: 20,
      },
      continueButton: {
        backgroundColor: '#a00000',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginTop: 10,
      },
      continueButtonText: {
        color: '#fff',
        fontSize: 16,
      },
      sectionTitle: {
        fontSize: 18,
        marginBottom: 15,
      },
    });