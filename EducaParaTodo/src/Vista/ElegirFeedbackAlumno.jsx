import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import appFirebase, { getAlumnos } from '../Modelo/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
//import EliminarTareaAlumno from './EliminarTareaAlumno';
//import aniadirPictograma from './aniadirPictograma';
//import feedbackAlumno from './feedbackAlumno';
//import DatosAlumnos from './DatosAlumnos';
//import alumnos from '../Modelo/alumno';

const EliminarTarea = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  /*
  const handleItemPress = (item) =>  {
    console.log('Elemento presionado:', item);
    navigation.navigate('EliminarTareaAlumno', {item});
  };*/


  useEffect(() => {
    const mostrarAlumnos = async () => {
      setIsLoading(true); // Iniciar la carga
      try {
        const alumnos = await getAlumnos();
        setData(alumnos);
        console.log(alumnos);
      } catch (error) {
        console.error('Error al obtener los documentos: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    mostrarAlumnos();
  }, []);

  return (
    <View>
      {isLoading ? (
        <Text>Cargando...</Text>
      ) : (
        <ScrollView >
      {data.map((item, index) => (
        <View style={styles.container}>
    <View  >
        <Text style={{ fontSize: 18 }}>{item.nombre} {item.apellidos}</Text>
  </View>
  <View contentContainerStyle={styles.datos}>
    <TouchableOpacity
    key={index}
    onPress={() => navigation.navigate('FeedbackAlumno', {idAlumno: item.id})} 
    style={styles.cardWithImage}
  >
      <Text>Añadir Feedback</Text>
  </TouchableOpacity>
  <TouchableOpacity
  key={index}
  onPress={() => navigation.navigate('seguimientoAlumno', {idAlumno: item.id})} 
  style={styles.cardWithImage}
>
          <Text>Seguimiento Alumno</Text>
</TouchableOpacity>
    </View>
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
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
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
  separador: {
    height: 10,
  },
});

export default EliminarTarea;