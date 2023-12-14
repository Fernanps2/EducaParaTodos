 /*import React, { useState } from 'react';
 import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
 import useUser from '../Controlador/useUser';


 const LoginScreenAlumno = ({ route, navigation }) => {
   const { alumno } = route.params;
   const [password, setPassword] = useState('');
   //const username = route.params.nombreAlumno;
   const {login} = useUser();
   let logueado = false;

   async function handleLogin(username, password) {
     //console.log(username);
     logueado = await login(username, password, 'alumno');
    if (logueado)
      navigation.navigate('Tareas', {usuario:alumno})
     else
       alert('No está identificado');
   };
   return (
     <View style={styles.container}>
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
         <Button title="Entrar" onPress={() =>{
             handleLogin(alumno.nombre, password);
             //navigation.navigate('Tareas', {usuario:alumno})
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

 export default LoginScreenAlumno;*/


import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import useUser from '../Controlador/useUser';
import { buscaAlumnoNombre } from '../Controlador/alumnos.js';
import { getAlumnoImagenesLogin, getAlumnoIdPorNombre } from '../Modelo/firebase';



const LoginScreenAlumno = ({ route, navigation }) => {


  const [alumnoImagenes, setAlumnoImagenes] = useState([]);
  const [selectedImages, setSelectedImages] = useState(Array(4).fill(false));
  const [expectedOrder, setExpectedOrder] = useState([0, 1, 2, 3]); // Orden requerido de las imágenes
  const [currentOrder, setCurrentOrder] = useState([]); // Orden actual en el que el usuario presiona las imágenes
  const [password, setPassword] = useState('');
  const { alumno } = route.params;
  const { login } = useUser();
  const [errorState, setErrorState] = useState(false);


    /*useEffect(() => {
      
      const obtenerImagenesAlumno = async () => {
        try {
          const alumnoNombre = await buscaAlumnoNombre(alumno.nombre);

          if(alumnoNombre){

            const alumnoID = await getAlumnoIdPorNombre(alumnoNombre);
            const imagenes = await getAlumnoImagenesLogin(alumnoID);
            setAlumnoImagenes(imagenes);
          }

        } catch (error) {
          console.log("Error al obtener imágenes o ID del alumno:", error);
        }
      };

      obtenerImagenesAlumno();
    }, [alumno.nombre]);*/

       useEffect(() => {
         const obtenerImagenesAlumno = async () => {
           try {
             const alumnoId = await getAlumnoIdPorNombre(alumno.nombre);
             const imagenes = await getAlumnoImagenesLogin(alumnoId);
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


     const resetSelection = () => {
       setSelectedImages(Array(4).fill(false));
       setCurrentOrder([]);
       setErrorState(false);
     };

    // cambio de estado al pulsar sobre una imagen y orden de pulsación
    const toggleImageSelection = (index) => {
      const updatedCurrentOrder = [...currentOrder, index];

      let incorrectIndex = -1;

      for (let i = 0; i < updatedCurrentOrder.length; i++) {
        if (expectedOrder[i] !== updatedCurrentOrder[i]) {
          incorrectIndex = i;
          break;
        }
      }

      if (incorrectIndex !== -1) {
        setErrorState(true);

        const updatedSelectedImages = Array(4).fill(false);
        updatedSelectedImages[updatedCurrentOrder[incorrectIndex]] = 'red';

        setSelectedImages(updatedSelectedImages);

        setTimeout(() => {
          resetSelection();
        }, 1500);
      } else {
        const updatedSelectedImages = Array(4).fill(false);
        updatedSelectedImages[index] = 'green';

        setSelectedImages(updatedSelectedImages);

        setCurrentOrder(updatedCurrentOrder);

        if (updatedCurrentOrder.length === expectedOrder.length) {
          handleLogin();
        }
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
                  <TouchableOpacity
                    key={imgIndex}
                    onPress={() => toggleImageSelection(index * 2 + imgIndex)}
                    style={[
                      styles.imageWrapper,
                      selectedImages[index * 2 + imgIndex] && styles.selectedImageContainer,
                      errorState && selectedImages[index * 2 + imgIndex] && styles.errorImageContainer,
                    ]}
                  >
                    <Image
                      source={{ uri: imgSrc }}
                      style={styles.imageStyle}
                      onError={(error) => console.log(`Error al cargar la imagen img${imgIndex + 1}:`, error)}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.imageRow}>
                {[imagenData.img3, imagenData.img4].map((imgSrc, imgIndex) => (
                  <TouchableOpacity
                    key={imgIndex + 2}
                    onPress={() => toggleImageSelection(index * 2 + imgIndex + 2)}
                    style={[
                      styles.imageWrapper,
                      selectedImages[index * 2 + imgIndex + 2] && styles.selectedImageContainer,
                      errorState && selectedImages[index * 2 + imgIndex + 2] && styles.errorImageContainer,
                    ]}
                  >
                    <Image
                      source={{ uri: imgSrc }}
                      style={styles.imageStyle}
                      onError={(error) => console.log(`Error al cargar la imagen img${imgIndex + 3}:`, error)}
                    />
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
  selectedImageContainer: {
    borderWidth: 3,
    borderColor: '#77EF13',
  },
  imageWrapper: {
    margin: 5,
  },
  errorImageContainer: {
    borderColor: 'red',
    borderWidth: 3,
  },
});

export default LoginScreenAlumno;
