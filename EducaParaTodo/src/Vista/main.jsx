import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import PantallaPrincipal from './pantallaPrincipal';


 const Main = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../Imagenes/DiseñoEducaParaTodos.png')}
        style={styles.image}>
        <Text style={styles.text}>EducaParaTodos</Text>
        <Button style={styles.button} title="inicio"
        onPress={() => navigation.navigate('pantallaPrincipal')} />
      </ImageBackground>
      {/* <View style={styles.buttonContainer}>
        <Button title="Añadir alumno" 
          onPress={() => navigation.navigate('aniadirAlumno')} />
        <Button title="Crear Tarea" 
          onPress={() => navigation.navigate('crearTarea')} />
      </View> */}
    </View>
  );
}

export default Main;

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    alignItems: 'bottom'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'black',
  },
  text: {
    fontSize: 50,
    paddingTop: 30,
    alignItems: 'center',
    fontWeight: 'bold',
  },
});