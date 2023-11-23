import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import appFirebase from '../Modelo/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import EliminarTareaAlumno from './EliminarTareaAlumno';
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
        const querydb = getFirestore(appFirebase);
        const queryCollection = collection(querydb, 'alumnos');
        const querySnapshot = await getDocs(queryCollection);

        if (!querySnapshot.empty) {
          const fetchedData = querySnapshot.docs.map(item => ({ id: item.id, ...item.data() }));
          setData(fetchedData);
        } else {
          console.log('No se encontraron documentos en la colección.');
        }
      } catch (error) {
        console.error('Error al obtener los documentos: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    mostrarAlumnos();
  }, []);

  return (
    <View contentContainerStyle = {styles.container}>
      {isLoading ? (
        <Text>Cargando...</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.datos}>
      {data.map((item, index) => (
        <TouchableOpacity
      key={index}
      onPress={() => console.log(item.id)} 
      style={styles.cardWithImage}
    >
      {item.Imagen ? (
        <Image source={{ uri: item.Imagen }} style={styles.image} />
      ) : (
        <View style={styles.image} />
      )}
      <Text style={{ fontSize: 18 }}>{item.nombre} {item.apellidos}</Text>
    </TouchableOpacity>
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
  }
});

export default EliminarTarea;
