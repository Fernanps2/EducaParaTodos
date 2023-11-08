import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import useUser from '../Controlador/useUser'

const LoginScreen = ({ route, navigation} ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const tipo = route.params.tipo;
  const {login, isLogged} = useUser();

  const handleLogin = () => {
    login(username, password, tipo);

    if (isLogged && tipo == 'profesor')
      navigation.navigate('HomeEducador')
    else if (isLogged && tipo == 'administrador')
      navigation.navigate('HomeAdmin');
    else
      alert('Usuario y contraseña inválidos');
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
          <Button title="Entrar" onPress={() => {
            handleLogin();
          }
                                          } />
          <Button title="Salir" onPress={() => navigation.goBack()}/>
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
  texto: {
    alignItems: 'left',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
  }
});

export default LoginScreen;