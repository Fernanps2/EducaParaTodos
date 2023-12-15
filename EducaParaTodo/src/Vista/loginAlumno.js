 import React, { useState, useEffect } from 'react';
 import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
 import { descargaFotoPersona } from '../Controlador/multimedia';
 import useUser from '../Controlador/useUser';


 const LoginScreenAlumno = ({ route, navigation }) => {
   const { alumno } = route.params;
   const [password, setPassword] = useState('');
   const [imageUri, setImageUri] = useState([]);
   //const username = route.params.nombreAlumno;
   const {login} = useUser();
   let logueado = false;

   async function handleLogin() {
     //console.log(username);
     logueado = await login(alumno.nombre, password, 'alumno');
    if (logueado)
      navigation.navigate('Tareas', {usuario:alumno})
     else
       alert('No está identificado');
   };

   useEffect(() => {
    const loadData = async() => {
      try {
        setImageUri(await descargaFotoPersona(alumno.foto));
      } catch(error) {
        console.log(error);
      }
    }
    loadData();
  }, []);

   return (
     <View style={styles.container}>
       <Text style={styles.title}>EducaParaTodos</Text>

       <View style={[styles.box, styles.container]}>
        <View style={styles.spaceBetween}>
            <Image style={styles.image} source={{uri:imageUri.uri}} />
            <Text style={styles.usuario}>{alumno.nombre}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Introduzca aquí su contraseña"
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
        </View>
         <View style={[styles.box, styles.row]}>
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
   text: {
    fontSize: 18,
   },
   texto: {
     fontSize: 20,
   },
   usuario: {
     fontWeight: 'bold',
     fontSize: 26,
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
  },
  box: {
    marginBottom: 20,
  },
  spaceBetween: {
    marginBottom: 50,
  }
 });

 export default LoginScreenAlumno;
