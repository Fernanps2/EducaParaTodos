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


import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import useUser from '../Controlador/useUser';
import { getAlumnoImagenesLogin, getAlumnoIdPorNombre } from '../Modelo/firebase';



const LoginScreenAlumno = ({ route, navigation }) => {


  const [alumnoImagenes, setAlumnoImagenes] = useState([]);
  const [selectedImages, setSelectedImages] = useState(Array(4).fill(false));
  const [expectedOrder, setExpectedOrder] = useState([0, 1, 2, 3]); // Orden requerido de las imágenes
  const [currentOrder, setCurrentOrder] = useState([]); // Orden actual en el que el usuario presiona las imágenes
  const [password, setPassword] = useState('');
  const { alumno } = route.params;
  const { login } = useUser();


    useEffect(() => {
      const obtenerImagenesAlumno = async () => {
        try {
          console.log("Buscando ID del alumno...");
          const alumnoId = await getAlumnoIdPorNombre(alumno.nombre);
          console.log("ID del alumno encontrado:", alumnoId);

          console.log("Obteniendo imágenes para el alumno con ID:", alumnoId);
          const imagenes = await getAlumnoImagenesLogin(alumnoId);
          console.log("Imágenes obtenidas:", imagenes);

          setAlumnoImagenes(imagenes);
        } catch (error) {
          console.log("Error al obtener imágenes o ID del alumno:", error);
        }
      };

      obtenerImagenesAlumno();
    }, [alumno.nombre]);


  const handleLogin = () => {
    const username = alumno.username;

    if (login(username, password, 'alumno')) {
      navigation.navigate('Tareas', { usuario: alumno });
    } else {
      alert('El usuario o contraseña es inválido');
    }
  };




  // cambio de estado al pulsar sobre una imagen y orden de pulsación
  const toggleImageSelection = (index) => {

    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages[index] = !updatedSelectedImages[index];
    setSelectedImages(updatedSelectedImages);

    const updatedCurrentOrder = [...currentOrder, index];
    setCurrentOrder(updatedCurrentOrder);

    // Comprobar si el usuario ha pulsado las imágenes en el orden correcto
    if (JSON.stringify(updatedCurrentOrder) === JSON.stringify(expectedOrder)) {
      handleLogin(); // Esto se ejecutará si el orden es correcto
    } else if (updatedCurrentOrder.length === expectedOrder.length) {
      // Si el orden es incorrecto y el usuario ha presionado todas las imágenes, reiniciar el orden
      setSelectedImages(Array(4).fill(false));
      setCurrentOrder([]);
    }
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
          {alumnoImagenes.map((imagenData, index) => (
            <View key={index} style={styles.imageGroup}>
              <View style={styles.imageRow}>
                {[imagenData.img1, imagenData.img2].map((imgSrc, imgIndex) => (
                  <TouchableOpacity key={imgIndex} onPress={() => toggleImageSelection(index * 2 + imgIndex)}>
                    <Image
                      source={{ uri: imgSrc }}
                      style={[styles.imageStyle, selectedImages[index * 2 + imgIndex] && styles.selectedImage]}
                      onError={(error) => console.log(`Error al cargar la imagen img${imgIndex + 1}:`, error)}
                    />
                    {selectedImages[index * 2 + imgIndex] && <Text style={styles.tick}>✓</Text>}
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.imageRow}>
                {[imagenData.img3, imagenData.img4].map((imgSrc, imgIndex) => (
                  <TouchableOpacity key={imgIndex + 2} onPress={() => toggleImageSelection(index * 2 + imgIndex + 2)}>
                    <Image
                      source={{ uri: imgSrc }}
                      style={[styles.imageStyle, selectedImages[index * 2 + imgIndex + 2] && styles.selectedImage]}
                      onError={(error) => console.log(`Error al cargar la imagen img${imgIndex + 3}:`, error)}
                    />
                    {selectedImages[index * 2 + imgIndex + 2] && <Text style={styles.tick}>✓</Text>}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 150,
    height: 150,
    margin: 5,
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tick: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    fontSize: 50,
    color: '#77EF13',
  },
});

export default LoginScreenAlumno;