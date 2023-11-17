import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import appFirebase from '../Modelo/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { ScrollView } from 'react-native-web';
import DatosAlumnos from './DatosAlumnos';
import alumnos from '../Modelo/alumno';

const TuComponente = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const alumnosArray = Object.values(data);

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
      {alumnosArray.map((alumno, index) => (
        <View key={index} style={styles.elementoList}>
           <DatosAlumnos alumno={alumno} navigation={navigation} />
        </View>
      ))}
    </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  datos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  elementoList: {
    flexDirection: 'column',
    width:'50%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  }
});

export default TuComponente;
