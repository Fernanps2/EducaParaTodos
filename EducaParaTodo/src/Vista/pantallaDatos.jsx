import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity, Platform } from 'react-native';
// import datosAlumnos from '../datosPruebas/datosAlumnos';
import Tareas from './tareas';
import alumnos from '../Modelo/alumno';

const PantallaDatos = ({route, navigation}) => {

    const {alumno} =route.params;
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}> Datos del alumno</Text>
            </View>
            <Text style={styles.input}> Nombre: {alumno.nombre} </Text>
            <Text style={styles.input}> Apellidos: {alumno.nombre} </Text>
            <Text style={styles.input}> Teléfono de contacto: </Text>
            <Text style={styles.input}> Visualización preferente: </Text>
        </View>
    )
}

export default PantallaDatos;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      marginBottom: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    input: {
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
});