// import React, { useState } from 'react';
// import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
// import {CerrarSesion} from './cerrarSesion'
// import useUser from '../Modelo/useUser';



// const LoginScreenAlumno = ({ route, navigation }) => {
//   const { alumno } = route.params;
//   const [password, setPassword] = useState('');
//   const username = route.params.nombreAlumno;
//   const {login, isLogged} = useUser();

//   const handleLogin = () => {
//     console.log(username);
//     login(username, password, 'alumno');

//     if (isLogged)
//       alert('Eres alumno');
//     else
//       alert('Quién sos?');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>EducaParaTodos</Text>
//       {<CerrarSesion/>
//       }
//       <View style={styles.container}>
//         <Text style={styles.text}>Usuario</Text>
//         <Text style={styles.usuario}>{alumno.username}</Text>
//         <Text style={styles.text}>Contraseña</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Introduzca aquí su contraseña"
//           secureTextEntry
//           onChangeText={text => setPassword(text)}
//         />
//         <Button title="Entrar" onPress={() =>{
//             // handleLogin();
//             navigation.navigate('Tareas', {usuario:alumno})
//         }} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     width: 300,
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingLeft: 10,
//   },
//   texto: {
//     alignItems: 'left',
//   },
//   usuario: {
//     fontWeight: 'bold',
//     fontSize: 26,
//   },
//   title: {
//     fontSize: 26,
//     textAlign: 'center',
//   }
// });

// export default LoginScreenAlumno;


import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import useUser from '../Controlador/useUser';



const LoginScreenAlumno = ({ route, navigation }) => {
  const [password, setPassword] = useState('');
  const {alumno} = route.params;
  const {login} = useUser();
  

  const handleLogin = () => {
    const username = alumno.nombre;

    if (login(username, password, "alumno"))
      navigation.navigate('Tareas', {usuario:alumno});
    else
      alert('El usuario o contraseña es inválido');
  };

  // Estado para mantener el orden de pulsación de las imágenes
  const [imagePressOrder, setImagePressOrder] = useState([]);

  // Manejador de pulsaciones en las imágenes
  const handleImagePress = (number) => {
    const order = [...imagePressOrder]; // Copiar el orden actual
    order.push(number); // Añadir el número de la imagen pulsada al orden
    setImagePressOrder(order); // Actualizar el estado con el nuevo orden
  };

  return (
    <View style={styles.containerTitle}>
      <Text style={styles.title}>EducaParaTodos</Text>
      <View style={styles.container}>
        <Text style={styles.text}>Usuario</Text>
        <Text style={styles.usuario}>{alumno.nombre}</Text>
        <Text style={styles.text}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Introduzca aquí su contraseña"
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />

        <View style={styles.imageContainer}>
                  {/* Primera fila */}
            <View style={styles.row}>
              <TouchableOpacity style={styles.image} onPress={() => handleImagePress(1)}>
                <Text style={styles.number}>{imagePressOrder.includes(1) ? imagePressOrder.indexOf(4) + 1 : ''}</Text>
                <Image source={require('../../Imagenes/DiseñoEducaParaTodos.png')} style={styles.imageStyle} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.image} onPress={() => handleImagePress(2)}>
                <Text style={styles.number}>{imagePressOrder.includes(2) ? imagePressOrder.indexOf(1) + 1 : ''}</Text>
                <Image source={require('../../Imagenes/DiseñoEducaParaTodos.png')} style={styles.imageStyle} />
              </TouchableOpacity>
            </View>
                  {/* Segunda fila */}
            <View style={styles.row}>
              <TouchableOpacity style={styles.image} onPress={() => handleImagePress(3)}>
                <Text style={styles.number}>{imagePressOrder.includes(3) ? imagePressOrder.indexOf(3) + 1 : ''}</Text>
                <Image source={require('../../Imagenes/DiseñoEducaParaTodos.png')} style={styles.imageStyle} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.image} onPress={() => handleImagePress(4)}>
                <Text style={styles.number}>{imagePressOrder.includes(4) ? imagePressOrder.indexOf(2) + 1 : ''}</Text>
                <Image source={require('../../Imagenes/DiseñoEducaParaTodos.png')} style={styles.imageStyle} />
              </TouchableOpacity>
            </View>
        </View>

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
    //marginTop: 10,
  },
  containerTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 40,
    paddingLeft: 10,
  },
  text: {
    alignItems: 'left',
    fontSize: 20,
    marginBottom: 20,
  },
  usuario: {
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 80,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginTop: 50,
  },
  imageContainer: {
      // Ajusta los estilos del contenedor de las imágenes
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    image: {
      width: 100,
      height: 100,
      borderWidth: 1,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },
    number: {
      fontSize: 20,
      fontWeight: 'bold',
    },
});

export default LoginScreenAlumno;