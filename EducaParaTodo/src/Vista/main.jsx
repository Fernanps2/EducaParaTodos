import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';


 const Main = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../Imagenes/DiseñoEducaParaTodos.png')}
        style={styles.image}>
        <Text style={styles.text}>EducaParaTodos</Text>
      </ImageBackground>

      <Button title="Añadir alumno" 
        onPress={() => navigation.navigate('aniadirAlumno')} />
    </View>
  );
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
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