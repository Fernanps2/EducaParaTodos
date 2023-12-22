import React, { useEffect, useState, useRef } from 'react';
import  {View, Text, ScrollView, StyleSheet, TextInput,Image, Button, TouchableOpacity ,ActivityIndicator, Alert} from 'react-native';
import appFirebase, { deleteTareaId, getTareaIdTodas, getTareaIdCompletada } from '../Modelo/firebase';
import { buscarTareas, buscarPasos } from '../Controlador/tareas';
import tareas from '../Modelo/tareas';
import { RFValue } from 'react-native-responsive-fontsize';
//import { getFirestore, doc, getDoc } from 'firebase/firestore';

const SeguimientoAlumno = ({route}) => {
    
  const {idAlumno} = route.params;
  const [Tareas, setTareasNombres] = useState([]);
  const [Pasos, setPasos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // obtiene las tareas de la base de datos segun el id del alumno
  useEffect(() => {
    const fetchTareasNombres = async () => {
      try{
        const tareas = await getTareaIdTodas(idAlumno);
        setTareasNombres(tareas);
        console.log(tareas);
      } catch(error){
        console.error('Error al obtener los nombres de las tareas', error);
      }   
    };
    fetchTareasNombres();
  }, [idAlumno]);
/* 
  const mostrarpasos = async (Idtarea) => {
        try {
          const pasos = await buscarPasos(Idtarea);
          setPasos(pasos)
          console.log("se mete en mostrar pasos");
          console.log(pasos);
        } catch (error) {
          console.error('Error al obtener los documentos: ', error);
        } finally {
          setIsLoading(false);
        }
  };
*/


  return (
    
    <View>
  {isLoading ? (
    <ActivityIndicator size="large" color="black" />
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      {Tareas.length === 0 ? (
        <Text style={{fontSize: 20,}}>No hay tareas asignadas</Text>
      ) : (
        Tareas.map((tarea) => (
          <View key={tarea.id} style={styles.cardWithImage}>
            <Text style={styles.texto}>{tarea.titulo}</Text>
            <View style={styles.separador} />
            <View style={{margin: 20}}>
                <View style={styles.checkBox}>
                {JSON.parse(tarea.completado) ? (
                  <Text style={styles.check}>✔️</Text>
                ) : (
                <Text style={styles.emptyCheck}></Text> // Aquí podrías usar cualquier otro indicador visual
                )}
                </View>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  )}
</View>
  );
};

const styles = StyleSheet.create({
    cardWithImage: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 20,
      marginVertical: 8,
      marginLeft: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    container: {
      padding: 20,
      alignItems: 'flex-start', 
    },
    separador: {
        height: 5,
        width: 5,
      },
      check: {
        alignSelf: 'center',
        fontSize: RFValue(15)
    },
    checkBox: {
      width: RFValue(20),
      height: RFValue(20),
      borderWidth: RFValue(2),
      borderColor: 'green'
  },
  texto: {
    padding: 20,
    alignItems: 'flex-start',
    fontSize:20, 
  },
  });


export default SeguimientoAlumno;