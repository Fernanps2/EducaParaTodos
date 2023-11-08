import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import {CerrarSesion} from './cerrarSesion'
import useUser from '../Modelo/useUser';



const LoginScreenAlumno = ({ route, navigation }) => {
  const { alumno } = route.params;
  const [password, setPassword] = useState('');
  const username = route.params.nombreAlumno;
  const {login, isLogged} = useUser();

  const handleLogin = () => {
    console.log(username);
    login(username, password, 'alumno');

    if (isLogged)
      alert('Eres alumno');
    else
      alert('Quién sos?');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EducaParaTodos</Text>
      {<CerrarSesion/>
      }
      <View style={styles.container}>
        <Text style={styles.text}>Usuario</Text>
        <Text style={styles.usuario}>{alumno.username}</Text>
        <Text style={styles.text}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Introduzca aquí su contraseña"
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />
        <Button title="Entrar" onPress={() =>{
            // handleLogin();
            navigation.navigate('Tareas', {usuario:alumno})
        }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  texto: {
    alignItems: 'left',
  },
  usuario: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
  }
});

export default LoginScreenAlumno;