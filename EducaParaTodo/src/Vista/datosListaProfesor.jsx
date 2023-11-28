import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
// import datosAlumnos from '../datosPruebas/datosAlumnos';

const DatosListaProfesor = ({ profesor, navigation }) => {
    console.log(profesor);
    return (
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('pantallaDatosProfesor', { profesor: profesor })}>
                    {/* Esto es muy importante mirarlo ya que aquí está cogiendo la ruta de una foto de internet no sé como hacer 
                 para que la ruta sea de una foto que tenemos en una carpeta no se me muestra por pantalla */}
                    <Image style={styles.image} source={{uri:profesor.foto}} />
                    <Text style={styles.texto}> Nombre: {profesor.nombre} </Text>
                </TouchableOpacity>
            </View>
    )
}
export default DatosListaProfesor


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