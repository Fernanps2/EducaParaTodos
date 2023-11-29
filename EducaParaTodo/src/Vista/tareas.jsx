import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { CerrarSesion } from './cerrarSesion';
import { getTarea,AppFirebase, storage, getTareaId } from '../Modelo/firebase';



// Componente que muestra los datos de las tareas
const DatosTareas = ({ tarea, navigation }) => {

    // const [imageUrl, setImageUrl] = useState('');

    // useEffect(() => {
    //     // Reemplaza 'tu/ruta/en/firebase.jpg' con la ruta real de tu imagen en Firebase Storage
    //     const storageRef = storage.ref('fotosAlumnos/Alumno2.jpeg');

    //     storageRef
    //         .getDownloadURL()
    //         .then(url => {
    //             setImageUrl(url);
    //         })
    //         .catch(error => {
    //             console.error('Error al obtener la URL de la imagen:', error);
    //         });
    // }, []);

    return (
        <View style={styles.contenedor_tarea}>
            <TouchableOpacity onPress={() => navigation.navigate('verTarea',  {id:tarea.id})}>
                {/* Esto es muy importante mirarlo ya que aquí está cogiendo la ruta de una foto de internet no sé como hacer
                 para que la ruta sea de una foto que tenemos en una carpeta no se me muestra por pantalla */}
                <Text style={styles.texto}> Nombre: {tarea.Nombre} </Text>
                <Image style={styles.foto} source={{ uri: tarea.fotoURL }} />
            </TouchableOpacity>
        </View>
    )
}

const Tareas = ({ route, navigation }) => {

    const { usuario } = route.params; // obtenemos los datos del usuario pasados en la navegación

    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        const listaTareas = async () => {
            try {
                const Tareas = await getTareaId(usuario.id);
                setTareas(Tareas);
                await console.log(Tareas);
            } catch (error) {
                console.log(error);
            }
        };
        listaTareas();
    }, []);

    return (
        <View style={styles.container}>
            <CerrarSesion />
            <View style={styles.caja}>
                <Text style={styles.titulo}> TAREAS PENDIENTES:</Text>
            </View>
            <ScrollView contentContainerStylestyle={styles.container}>

                {tareas.map((tarea, index) => (
                    <View style={styles.contenedor_tareas} key={index}>
                        <DatosTareas tarea={tarea} navigation={navigation} />
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
        margin: 20,
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
        marginLeft: 30,
        marginBottom: 20,
        fontSize: 20,
    },
    foto: {
        padding: 20,
        marginTop: 10,
        marginLeft: 30,
        marginRight: 10,
        marginBottom: 30,
        borderRadius: 15,
        width: 100,
        height: 100,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'black',

    },
    contenedor_tareas: {
        flex: 1,
        flexDirection: 'column',
    },
    contenedor_tarea: {
        flexDirection: 'row',
    },
    image: {
        width: 100,
        height: 100,
    },

});