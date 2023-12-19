import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity, Platform } from 'react-native';
import { buscarTComandas } from '../Controlador/tareas';
import { buscaAlumnoId } from '../Controlador/alumnos';
import { RFValue } from 'react-native-responsive-fontsize';



// Esta página se usa en gestionTareas de homeAdmin para que el admin
// vea todas las tareas comandas que hay elija la que quiera y después
// se muestren los datos recogidos en esa tarea

const DatosComanda = ({ comanda,navigation}) => {

    // Obtenemos el nombre del alumno a través del idAlumno que está en comanda
    const [alumno, setAlumno ] = useState([]);

    useEffect(() => {
        const getAlumno = async() => {
            try{
                const datosAlumno = await buscaAlumnoId(comanda.idAlumno);
                setAlumno(datosAlumno);
            }catch(error){
                console.log("error: " + error);
            }
        }
        getAlumno();
        // POner aqui comanda.idAlumno hace que cada vez que cambie el idAlumno del objeto comanda
        // se vuelva a ejecutar la función getAlumno. Si no pusieramos esto solo se ejecutaría la primera vez
        // que se entre en la función
    }, [comanda.idAlumno]);

    const id = comanda.id;


    return(
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('datosComandas', { id})}>
                {/* Esto es muy importante mirarlo ya que aquí está cogiendo la ruta de una foto de internet no sé como hacer 
            para que la ruta sea de una foto que tenemos en una carpeta no se me muestra por pantalla */}
                <Text style={styles.texto}> Tarea: {comanda.titulo} </Text>
                <Text style={styles.texto}> Fecha: {comanda.fechaInicio} </Text>
                <Text style={styles.texto}> Alumno: {alumno.nombre} tipo: {comanda.tipo} </Text>
            </TouchableOpacity>
        </View>
    )
}


const ComandasCreadas = ({navigation}) => {

    const [comandasArray, setComandasArray] = useState([]);

    useEffect(() => {
        const getComandas = async () => {
            try {
                const comandas = await buscarTComandas();
                setComandasArray(comandas);
                console.log(comandas);
            } catch (error) {
                console.log("error: " + error);
            }
        }
        getComandas();
    }, []);

    return (
        <View>
            <View>
                <Text> TAREAS COMANDAS </Text>
            </View>

            <ScrollView contentContainerStyle={styles.datos}>
                {comandasArray.map((comanda, index) => (
                    <View key={index} style={styles.contenedor_tareas}>
                        <DatosComanda comanda={comanda} navigation={navigation} />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default ComandasCreadas;



const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
        flexDirection: 'row', // Alinea los elementos en fila (horizontal)
        alignItems: 'center', // Alinea los elementos verticalmente en el centro
        justifyContent: 'center'
    },
    datos: {
      flexDirection: 'row',
      flexWrap: 'wrap',    
      marginTop:50,
  },
    title: {
      fontWeight: 'bold',
      marginBottom:20,
      flexWrap: 'wrap',  
      fontSize: RFValue(16),
    },
  texto: {
      fontWeight: 'bold',
      marginTop: 5,
      flexWrap: 'wrap',  
      fontSize: RFValue(16),
  },
  foto: {
      width: RFValue(100),
      height: RFValue(100),
      borderRadius: 20,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: 'black',


  },
  contenedor_tareas: {
      flexDirection: 'column',
      width:'33%',
      alignItems: 'center',
  },

});