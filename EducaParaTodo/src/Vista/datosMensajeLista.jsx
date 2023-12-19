import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
// import datosAlumnos from '../datosPruebas/datosAlumnos';
import { buscaProfesorId } from '../Controlador/profesores';
import { borraMensaje } from '../Controlador/mensajes';

const DatosMensajeLista = ({ mensaje, navigation }) => {

    const profesor = buscaProfesorId(mensaje.profesor);
    const nombreProfesor = "Carlos";

    return (
            <View style={styles.container}> 
                    <Text style={styles.input}> Nombre: {nombreProfesor} </Text>
                    <Text style={styles.input}> Aula: {mensaje.aula} </Text>
                    <Text style={styles.input}> Fecha Necesidad de Material: {mensaje.fecha} </Text>
                    <Text style={styles.input}> Hora Necesidad de Material: {mensaje.hora} </Text>
                    <Text style={styles.input}> Mensaje: {mensaje.mensaje} </Text>

                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} onPress={() => borraMensaje(mensaje.id)} title='Borrar Mensaje' />
                    </View>
            </View>
    )
}
export default DatosMensajeLista

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width - 40,
        maxHeight: height - 40,
        padding: 20,
        borderWidth: 5,
        borderRadius: 20,
        alignSelf: 'center',
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
      justifyContent: 'flex-end', // Espacia los elementos uniformemente
      alignItems: 'center', // Alinea los elementos verticalmente
    },
    button: {
      backgroundColor: 'blue', // Color de los botones
      padding: 10,
      //width: '50%', // Ajustar si es necesario
      borderRadius: 5,
      alignItems: 'right',
      marginBottom: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
});