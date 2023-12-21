import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity, Platform } from 'react-native';
// import datosAlumnos from '../datosPruebas/datosAlumnos';
import Tareas from './tareas';
import alumnos from '../Modelo/alumno';

const DatosAlumnosLista = ({ alumno, navigation }) => {
    return (
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('pantallaDatosAlumno', { alumno: alumno })}>
                    {/* Esto es muy importante mirarlo ya que aquí está cogiendo la ruta de una foto de internet no sé como hacer
                 para que la ruta sea de una foto que tenemos en una carpeta no se me muestra por pantalla */}
                    <Image style={styles.image} source={{uri:alumno.foto}} />
                    <Text style={styles.texto}> Nombre: {alumno.nombre} </Text>
                </TouchableOpacity>
            </View>
    )
}
export default DatosAlumnosLista


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
    }
})