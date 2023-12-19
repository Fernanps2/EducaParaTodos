import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity, Platform } from 'react-native';
// import datosAlumnos from '../datosPruebas/datosAlumnos';
import Tareas from './tareas';
import alumnos from '../Modelo/alumno';

const BotonModificarProfesor = ({ texto, profesor, navigation }) => {
    return (
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('modificarProfesor', { profesor: profesor })}>
                 <Text style={styles.buttonText}>{texto}</Text>
                </TouchableOpacity>
                
            </View>
    )
}
export default BotonModificarProfesor


const styles = StyleSheet.create({
    objeto:{
        flexDirection: 'column',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'black',
    },
    texto: {
        fontWeight: 'bold',
        marginBottom: 50,
        marginTop: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
})