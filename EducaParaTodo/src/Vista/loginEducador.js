import React, { useState } from 'react';
import { Text, View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
//import Emoji from 'react-native-emoji';
import useUser from '../Controlador/useUser'

const LoginScreen = ({ route, navigation} ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const tipo = route.params.tipo;
  const {login} = useUser();
  let logueado = false;

  const handleLogin = async () => {
    logueado = (await login(username, password, tipo));

    //console.log("logueado:",logueado);

    if (logueado && tipo == 'profesor')
      navigation.navigate('HomeEducador', username );
    else if (logueado && tipo == 'administrador')
      navigation.navigate('HomeAdmin', username);
    else
      alert('Usuario y contraseña inválidos');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EducaParaTodos</Text>
      <Text style={styles.title}>Inicio de {tipo}</Text>
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
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
                    {/*<Emoji emoji="check-mark" name="check-mark" style={{fontSize: 50}} />*/}
                    <Image tintColor="green" style={styles.image} source={{uri:"https://pluspng.com/img-png/enter-png-enter-icon-1600.png"}} />
                    <Text style={styles.texto}> {"ENTRAR"} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    {/*<Emoji emoji="cross-mark" name="cross-mark" style={{fontSize: 50}}/>*/}
                    <Image tintColor="red" style={styles.image} source={{uri:"https://cdn.icon-icons.com/icons2/1769/PNG/512/4115235-exit-logout-sign-out_114030.png"}} />
                    <Text style={styles.texto}> {"SALIR"} </Text>
          </TouchableOpacity>
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
    fontSize: 20
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  }
}
);

export default LoginScreen;