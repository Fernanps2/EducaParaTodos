import React from 'react';
import { View, Text, StyleSheet, Button, FlatList,ScrollView } from 'react-native';
import alumnos from '../Modelo/alumno';
import DatosAlumnosLista from './datosListaAlumno';

export default function ListaAlumnos({ navigation }) {

  const datos = alumnos();  // Llamamos a la función para obtener los datos
  const alumnosArray = Object.values(datos);   // Convertimos los datos un array

  console.log(datos);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EducaParaTodos</Text>
      </View>

      <ScrollView contentContainerStyle={styles.datos}>
        {alumnosArray.map((alumno, index) => (
          <View key={index} style={styles.elementoList}>
            <DatosAlumnosLista alumno={alumno} navigation={navigation} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  datos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  elementoList: {
    flexDirection: 'column',
    width:'50%',
    alignItems: 'center',
  }
});