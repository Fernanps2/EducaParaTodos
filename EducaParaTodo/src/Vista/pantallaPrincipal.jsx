
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList,ScrollView } from 'react-native';
import DatosAlumnos from './DatosAlumnos';
//import alumnos from '../Modelo/alumno';
import { buscaAlumno } from '../Controlador/alumnos';

export default function PantallaPrincipal({ navigation }) {

  const [alumnosArray, setAlumnosArray] = useState([]);

  useEffect(() => {
    const loadData = async() => {
      try {
        const alumnos = await buscaAlumno();
        setAlumnosArray(Object.values(alumnos)); //Convertimos los datos a un array
      } catch(error) {
        console.log(error);
      }
    }
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EducaParaTodos</Text>
      </View>

      <View style={styles.barraBotones}>
        <Button title="Inicio profesor"
          onPress={() => navigation.navigate('LoginEducador', {tipo: 'profesor'})} />
        <Button title="Inicio admin"
          // onPress={() => navigation.navigate('LoginEducador', {tipo: 'administrador'})} />
          onPress={() => navigation.navigate('LoginEducador', {tipo: 'administrador'})} />
      </View>

      <ScrollView contentContainerStyle={styles.datos}>
        {alumnosArray.map((alumno, index) => (
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
    width:'30%',
    alignItems: 'center',
  }
});


/*
import React, { useEffect, useState, TouchableOpacity } from 'react';
import { View, Text, StyleSheet, Button, FlatList,ScrollView } from 'react-native';
import DatosAlumnos from './DatosAlumnos';
//import alumnos from '../Modelo/alumno';
import { buscaAlumno } from '../Controlador/alumnos';

export default function PantallaPrincipal({ navigation }) {

  const [alumnosArray, setAlumnosArray] = useState([]);

  useEffect(() => {
    const loadData = async() => {
      try {
        const alumnos = await buscaAlumno();
        setAlumnosArray(Object.values(alumnos)); //Convertimos los datos a un array
      } catch(error) {
        console.log(error);
      }
    }
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EducaParaTodos</Text>
      </View>

      <View style={styles.barraBotones}>
        <Button title="Inicio profesor"
          onPress={() => navigation.navigate('LoginEducador', {tipo: 'profesor'})} />
        <Button title="Inicio admin"
          // onPress={() => navigation.navigate('LoginEducador', {tipo: 'administrador'})} />
          onPress={() => navigation.navigate('LoginEducador', {tipo: 'administrador'})} />
      </View>

      <ScrollView contentContainerStyle={styles.datos}>
        {alumnosArray.map((alumno, index) => (
          <View key={index} style={styles.elementoList}>
            <TouchableOpacity onPress={() => {
              const tipoLogin = alumno.tipoLogin; // Suponiendo que el alumno tiene un campo 'tipoLogin' que indica el tipo de inicio de sesión

              if (tipoLogin === 'texto') {
                navigation.navigate('LoginAlumno', { alumno });
              } else if (tipoLogin === 'imagenes') {
                navigation.navigate('LoginAlumnoImagenes', { alumno });
              }
            }}>
              <DatosAlumnos alumno={alumno} navigation={navigation} />
            </TouchableOpacity>
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
    width:'30%',
    alignItems: 'center',
  }
});*/
