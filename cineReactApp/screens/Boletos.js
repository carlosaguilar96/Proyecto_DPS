import React, { useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Funcion } from '../config/movieData';
import { useRoute } from '@react-navigation/native';

import Cartelera from './Cartelera';


export default function Cartelera() {
    const route = useRoute();
    const { title, idioma, horario,fecha } = route?.params || {};

    return(
        <View>
            <Text>{title} </Text>
            <Text>{idioma} </Text>
            <Text>{horario} </Text>
            <Text>{fecha} </Text>
        </View>

    );
} 