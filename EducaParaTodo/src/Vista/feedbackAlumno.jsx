import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput,Image, Button, TouchableOpacity } from 'react-native';
import appFirebase, { getTareaId } from '../Modelo/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import EliminarTareaAlumno from './EliminarTareaAlumno';
import { getTarea } from '../Modelo/firebase';
import { asignarFeedback } from '../Modelo/firebase';
//import DatosAlumnos from './DatosAlumnos';
//import alumnos from '../Modelo/alumno';

const feedbackAlumno = ({route}) => {
  const {idAlumno} = route.params;
  const [tareas, setTareas] = useState([]);
  const [feedback, setFeedback] = useState('');


  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const tareasObtenidas = await getTareaId(idAlumno);
        setTareas(tareasObtenidas);
        //console.log(tareasObtenidas.id);
        
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };

    cargarTareas();
  }, [idAlumno]);
/*
  useEffect(() => {
    const actualizarFeedback = async (idTarea, mensaje) => {
    
      try {
  
        console.log('ID de tarea:', idTarea);
        console.log('Mensaje a asignar FeedBack', mensaje);
    
        await asignarFeedback('P9kEFuZP5t3sUde8ffXQ', mensaje);
        console.log('Feedback actualizado correctamente');
      } catch (error) {
        console.error('Error al actualizar el feedback:', error);
      }
    };
    actualizarFeedback(idTarea, mensaje);
  }, []);
*/


  return (
    <ScrollView style={styles.datos}>
  {tareas.map((tareas) => (
    <View key={tareas.id} style={styles.datos} > 
      <View style={styles.cardWithImage}>
      <Text style={{ fontSize: 20,paddingRight: 10, }} >{tareas.titulo}</Text>
      <TextInput
        style={{ height: 40, borderColor: 'black', borderWidth: 2 , alignSelf: 'center',}}
        onChangeText={(text) => setFeedback(text)}
        value={feedback}
        placeholder=" Escribe tu feedback aquí"
      />
      <TouchableOpacity onPress={() => asignarFeedback(tareas.id, feedback)}>
          <View style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5, marginTop: 10, marginLeft: 10, }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Enviar Feedback</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
    </View>
     

    </View>
  ))}
</ScrollView>

  );
};

const styles = StyleSheet.create({
  cardWithImage: {
    flexDirection: 'row',
    alignItems: 'center',
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
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  datos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    padding: 20,
  },
});

export default feedbackAlumno;
