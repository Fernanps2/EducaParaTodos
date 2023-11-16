import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import DatosAlumnos from './DatosAlumnos';
import alumnos from '../Modelo/alumno';
import '../Modelo/modelo';
import { getAlumnos } from '../Modelo/modelo';


export default function PantallaPrincipal({ navigation }) {

  // const datos = alumnos();  // Llamamos a la función para obtener los datos
  // const alumnosArray = Object.values(datos);   // Convertimos los datos un array

  const [lista, setLista] = useState([]);

  // useEffect es un Hook de React que te permite sincronizar un componente con un sistema externo.
  useEffect(() => {
    const listaAlumnos = async () => {
      try {
        const alumnos = await getAlumnos();
        setLista(alumnos);
        console.log(alumnos);
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

      <View style={styles.barraBotones}>
        <Button title="Inicio profesor"
          onPress={() => navigation.navigate('LoginEducador', { tipo: 'profesor' })} />
        <Button title="Inicio admin"
          // onPress={() => navigation.navigate('LoginEducador', {tipo: 'administrador'})} />
          onPress={() => navigation.navigate('LoginEducador', { tipo: 'administrador' })} />

      </View>

      <ScrollView contentContainerStyle={styles.datos}>
        {/* {alumnosArray.map((alumno, index) => (
          <View key={index} style={styles.elementoList}>
            <DatosAlumnos alumno={alumno} navigation={navigation} />
          </View> */}

        {lista.map((alumno, index) => (
          <View key={index} style={styles.elementoList}>
            <DatosAlumnos alumno={alumno} navigation={navigation} />
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
  barraBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
  },
  datos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  elementoList: {
    flexDirection: 'column',
    width: '50%',
    alignItems: 'center',
  }
});