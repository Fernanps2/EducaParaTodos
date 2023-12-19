import React, { useEffect, useState } from 'react';
import { CheckBox,View, Text, ScrollView, StyleSheet, TextInput,Image, Button, TouchableOpacity ,ActivityIndicator, Alert} from 'react-native';
import appFirebase, { deleteTareaId, getTareaId, getTareaIdCompletada } from '../Modelo/firebase';
import { buscarTareas, buscarPasos } from '../Controlador/tareas';
import tareas from '../Modelo/tareas';
//import { getFirestore, doc, getDoc } from 'firebase/firestore';

const SeguimientoAlumno = ({route}) => {
    
  const {idAlumno} = route.params;
   const [Tareas, setTareasNombres] = useState([]);
//   const [Pasos, setPasos] = useState([]);

  useEffect(() => {
    const fetchTareasNombres = async () => {
      try{
        const tareas = await getTareaId(idAlumno);
        setTareasNombres(tareas);
        console.log(tareas);
      } catch(error){
        console.error('Error al obtener los nombres de las tareas', error);
      }   
    };
    fetchTareasNombres();
  }, [idAlumno]);
/*
  useEffect(() => {
    const mostrarpasos = async () => {
        try {
          const pasos = await buscarPasos("sY52BaClUOtrlCpTGYbb");
          setPasos(pasos)
          console.log("se mete en mostrar pasos");
          console.log(pasos);
        } catch (error) {
          console.error('Error al obtener los documentos: ', error);
        } finally {
          setIsLoading(false);
        }
      };
      mostrarpasos();
  }, ["sY52BaClUOtrlCpTGYbb"]);
 */

  const [isLoading, setIsLoading] = useState(false);



  return (
    
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        
        <ScrollView contentContainerStyle={styles.container}>
          {Tareas.map((tarea) => (
            <View key={tarea.id} style={styles.cardWithImage}>
                <Text >{tarea.titulo}</Text>
                <View style={styles.separador}/>
                <CheckBox value={JSON.parse(tarea.completado)}></CheckBox>
            </View>
          ))}
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
        height: 10,
        width: 10,
      },
  });


export default SeguimientoAlumno;