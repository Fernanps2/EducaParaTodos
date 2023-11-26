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
        <ScrollView contentContainerStyle={styles.datos}>
      {data.map((item, index) => (
        <TouchableOpacity
      key={index}
      onPress={() => navigation.navigate('EliminarTareaAlumno', {idAlumno: item.id})} 
      style={styles.cardWithImage}
    >
      <Text style={{ fontSize: 18 }}>{item.nombre} {item.apellidos}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('feedbackAlumno',{idAlumno: item.id})} style={styles.cardWithImage}><Text>Añadir feedback</Text></TouchableOpacity>
    </TouchableOpacity>
      ))}
    </ScrollView>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('aniadirPictograma')} style={styles.cardWithImage}><Text>Añadir Pictograma</Text></TouchableOpacity>
    </View>
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

export default EliminarTarea;
