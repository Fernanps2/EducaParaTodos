import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import HomeEducador from './homeEducador';

const LoginScreen = ({ route, navigation} ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const tipo = route.params.tipo;

  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación, como hacer una solicitud a un servidor, validar el usuario y contraseña, etc.
    if (username && password) {
      // Realizar la autenticación aquí
      console.log('Usuario:', username);
      console.log('Contraseña:', password);
    } else {
      console.log('Por favor, ingrese usuario y contraseña');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EducaParaTodos</Text>
      <View style={styles.container}>
        <Text style={styles.text}>Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Introduzca aquí su nombre de usuario"
          onChangeText={text => setUsername(text)}
        />
        <Text style={styles.text}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Introduzca aquí su contraseña"
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />
        <View style={styles.containerButton}>
          <Button style={styles.boton} title="Entrar" onPress={() => {
                                                  if (tipo == 'profesor'){
                                                    // return alert('Eres profesor');
                                                    navigation.navigate('HomeEducador');
                                                  }
                                                  else if (tipo == 'administrador')
                                                    return alert('Eres administrador');
                                                  else  
                                                    return alert('El tipo es ', tipo);
                                                }
                                          } />
          <Button style={styles.boton} title="Salir" onPress={() => navigation.goBack()}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerButton: {
    //flex: 2,
    flexDirection: 'row',
    //flexWrap: 'wrap',
    //justifyContent: 'space-between',
    padding: 60,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  boton:{
    marginHorizontal: 10,
  },
  texto: {
    alignItems: 'left',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
  }
});

export default LoginScreen;