import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
//import alumnos from '../Modelo/alumno';
//import { buscaAlumno } from '../Controlador/alumnos';
import { buscaProfesor } from '../Controlador/profesores';
import DatosListaProfesor from './datosListaProfesor';
// import { getProfesores } from '../Modelo/firebase';

export default function ListaProfesores({ navigation }) {

  //const datos = getAlumnos();  // Llamamos a la función para obtener los datos
  //const alumnosArray = Object.values(datos);   // Convertimos los datos un array
  const [lista, setLista] = useState([]);

  // useEffect es un Hook de React que te permite sincronizar un componente con un sistema externo.
  useEffect(() => {
    const ListaProfesores = async () => {
      try {
        const profesores = await buscaProfesor();
        console.log('profesores' + profesores);
        setLista(profesores);
        await console.log('lista' + lista);
      } catch (error) {
        console.log('error' + error);
      }
    };
    ListaProfesores();
  }, []);

  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EducaParaTodos</Text>
      </View>

      <ScrollView contentContainerStyle={styles.datos}>
        {lista && lista.map((profesor, index) => (
          <View key={index} style={styles.elementoList}>
            <DatosListaProfesor profesor={profesor} navigation={navigation} />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('aniadirProfesor')}>
        <Text style={styles.buttonText}>Añadir Profesor</Text>
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