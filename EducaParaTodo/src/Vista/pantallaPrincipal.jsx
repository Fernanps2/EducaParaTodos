import React from 'react';
import { View, Text, StyleSheet, Button, FlatList,ScrollView } from 'react-native';
import datosAlumnos from '../datosPruebas/datosAlumnos';
import DatosAlumnos from './DatosAlumnos';

export default function PantallaPrincipal({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EducaParaTodos</Text>
      </View>

      <View style={styles.barraBotones}>
        <Button title="Inicio profesor"> </Button>
        <Button title="Inicio admin"> </Button>
      </View>

      <ScrollView contentContainerStyle={styles.datos}>
        {datosAlumnos.map((alumno, index) => (
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
    width:'50%',
    alignItems: 'center',
  }
});