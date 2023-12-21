import React from 'react';
import { useEffect, useState,useCallback} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { CerrarSesion } from './cerrarSesion';
import { getTarea,AppFirebase, storage, getTareaId } from '../Modelo/firebase';
import { useFocusEffect } from '@react-navigation/native';
import { buscarTareaAlumno } from '../Controlador/tareas';

const manejoPresionarBoton = (tarea, navigation) => {
    
    const id = tarea.id;

    if (tarea.tipo == "comanda"){
        const id = tarea.id;
        navigation.navigate('seleccionAula', {id,navigation});
    } else if(tarea.tipo == "actividad"){
        navigation.navigate('verTarea',{id:tarea.id,navigation});
    }
}

// Componente que muestra los datos de las tareas
const DatosTareas = ({ tarea, usuario, navigation }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => manejoPresionarBoton(tarea,navigation)}>
                {/* Esto es muy importante mirarlo ya que aquí está cogiendo la ruta de una foto de internet no sé como hacer 
                 para que la ruta sea de una foto que tenemos en una carpeta no se me muestra por pantalla */}
                <Image style={styles.foto} source={{ uri: tarea.fotoURL }} />
                <Text style={styles.texto}> Nombre: {tarea.titulo} </Text>
            </TouchableOpacity>
        </View>
    )
}

const Tareas = ({ route, navigation }) => {

    const { usuario } = route.params; // obtenemos los datos del usuario pasados en la navegación
    
    const [tareas, setTareas] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const listaTareas = async () => {
                try {
                    const Tareas = await buscarTareaAlumno(usuario.id);
                    setTareas(Tareas);
                    console.log(tareas);
                } catch (error) {
                    console.log(error);
                }
            };
            listaTareas();
        }, [])
    );

    return (
        <View style={styles.container}>
            <CerrarSesion />
            <View style={styles.caja}>
                <Text style={styles.titulo}> TAREAS PENDIENTES:</Text>
            </View>
            <ScrollView contentContainerStyle={styles.datos}>
                {tareas.map((tarea, index) => (
                    <View key={index} style={styles.contenedor_tareas}>
                        <DatosTareas tarea={tarea} usuario={usuario} navigation={navigation} />
                    </View>
                ))}

            </ScrollView>
        </View>
    );
};

export default Tareas;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,    
    },
    datos: {
        flexDirection: 'row',
        flexWrap: 'wrap',    
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
        fontWeight: 'bold',
        marginBottom: 50,
        marginTop: 5,
        flexWrap: 'wrap',    

    },
    foto: {
        width: 150,
        height: 150,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'black',


    },
    contenedor_tareas: {
        flexDirection: 'column',
        width:'50%',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },

});