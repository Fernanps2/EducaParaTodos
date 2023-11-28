import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
// import datosAlumnos from '../datosPruebas/datosAlumnos';


const PantallaDatosProfesor = ({route, navigation}) => {

    const {profesor} =route.params;
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}> Datos del alumno</Text>
            </View>
            <Text style={styles.input}> Nombre: {profesor.nombre} </Text>
            <Text style={styles.input}> Apellidos: {profesor.apellidos} </Text>
            <Text style={styles.input}> Correo:  </Text>

          
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Modificar Profesor</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Eliminar Profesor</Text>
      </TouchableOpacity>
        </View>


        </View>
    )
}

export default PantallaDatosProfesor;

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
    buttonContainer: {
      flexDirection: 'row', // Alinea los elementos horizontalmente
      justifyContent: 'space-between', // Espacia los elementos uniformemente
      alignItems: 'center', // Alinea los elementos verticalmente
    },
    button: {
      backgroundColor: 'blue', // Color de los botones
      padding: 10,
      //width: '50%', // Ajustar si es necesario
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
});