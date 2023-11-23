import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import DatosList from './DatosAlumnos';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa el icono FontAwesome
import { CerrarSesion } from './cerrarSesion';

const Tareas = ({ route, navigation}) => {
    
    const { usuario } = route.params; // obtenemos los datos del usuario pasados en la navegación
    return (
        <ScrollView style={styles.container}>
            <CerrarSesion/>
            <Text>Tareas de {usuario.nombre}</Text>
            <View style={styles.caja}>
                <Text style={styles.titulo}> TAREAS PENDIENTES:</Text>
            </View>
            {usuario.tareasPendiente.map((tarea, index) => (
                <View style={styles.contenedor_tareas}>
                    <View style={styles.contenedor_tarea}>
                        <TouchableOpacity onPress={() => navigation.navigate('verTarea')} >
                            <Image style={styles.foto} source={{ uri: usuario.fotoTarea }} />
                        </TouchableOpacity>
                        <Text style={styles.texto} key={index}>{tarea}</Text>
                    </View>
                </View>
            ))}
           
        </ScrollView>
    );
};

export default Tareas;


const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    caja: {
        margin: 30,
        backgroundColor: 'lightblue',
        padding: 20,
        borderRadius: 10,
    },
    titulo: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 40,
    },
    texto: {
        marginLeft: 30,
        marginBottom: 30,
        fontSize: 30,
    },
    foto: {
        padding: 20,
        marginTop: 30,
        marginLeft: 30,
        marginRight: 10,
        borderRadius: 15,
        width: 100,
        height: 100,
    },
    contenedor_tareas: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    contenedor_tarea: {
        flexDirection: 'column',
    }
});

