import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
//import alumnos from '../Modelo/alumno';
//import { buscaAlumno } from '../Controlador/alumnos';
import { getAlumnos } from '../Modelo/modelo';
import DatosAlumnosLista from './datosListaAlumno';

export default function ListaAlumnos({ navigation }) {

  //const datos = getAlumnos();  // Llamamos a la función para obtener los datos
  //const alumnosArray = Object.values(datos);   // Convertimos los datos un array
  const [lista, setLista] = useState([]);

  // useEffect es un Hook de React que te permite sincronizar un componente con un sistema externo.
  useEffect(() => {
    const listaAlumnos = async () => {
      try {
        const alumnos = await getAlumnos();
        setLista(alumnos);
        await console.log(alumnos);
      } catch (error) {
        console.log(error);
      }
    };
    listaAlumnos();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EducaParaTodos</Text>
      </View>

      <ScrollView contentContainerStyle={styles.datos}>
        {/* {alumnosArray.map((alumno, index) => (
          <View key={index} style={styles.elementoList}>
            <DatosAlumnos alumno={alumno} navigation={navigation} />
          </View> */}

        {lista.map((alumno, index) => (
          <View key={index} style={styles.elementoList}>
            <DatosAlumnosLista alumno={alumno} navigation={navigation} />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('aniadirAlumno')}>
        <Text style={styles.buttonText}>Añadir Alumno</Text>
      </TouchableOpacity>
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
  },
  button: {
    backgroundColor: 'blue', // Color de los botones
    padding: 15,
    width: '100%', // Ajustar si es necesario
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});