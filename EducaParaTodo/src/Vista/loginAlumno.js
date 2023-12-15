
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
  const [imageStates, setImageStates] = useState(
    Array(4).fill({
      selected: false,
      status: null // tick, cross, etc.
    })
  );


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
       setImageStates(
         Array(4).fill({
           selected: false,
           status: null // tick, cross, etc.
         })
       );
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

        const updatedImageStates = Array(4).fill({
          selected: false,
          status: null
        });

        updatedImageStates[updatedCurrentOrder[incorrectIndex]] = {
          ...updatedImageStates[updatedCurrentOrder[incorrectIndex]],
          selected: true,
          status: 'cross'
        };

        setImageStates(updatedImageStates);

        setTimeout(() => {
          resetSelection();
        }, 1500);
      } else {
        const updatedImageStates = [...imageStates];
        updatedImageStates[index] = {
          ...updatedImageStates[index],
          selected: true,
          status: 'tick'
        };

        setImageStates(updatedImageStates);

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
                      imageStates[index * 2 + imgIndex].selected && styles.selectedImageContainer,
                      errorState && imageStates[index * 2 + imgIndex].selected && styles.errorImageContainer,
                    ]}
                  >
                    <Image
                      source={{ uri: imgSrc }}
                      style={styles.imageStyle}
                      onError={(error) => console.log(`Error al cargar la imagen img${imgIndex + 1}:`, error)}
                    />
                    {imageStates[index * 2 + imgIndex].status === 'tick' && (
                      <Text style={styles.tick}>✓</Text>
                    )}
                    {imageStates[index * 2 + imgIndex].status === 'cross' && (
                      <Text style={styles.cross}>✖</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.imageRow}>
                {[imagenData.img3, imagenData.img4].map((imgSrc, imgIndex) => (
                  <TouchableOpacity
                    key={imgIndex}
                    onPress={() => toggleImageSelection(index * 2 + imgIndex + 2)}
                    style={[
                      styles.imageWrapper,
                      imageStates[index * 2 + imgIndex + 2].selected && styles.selectedImageContainer,
                      errorState && imageStates[index * 2 + imgIndex + 2].selected && styles.errorImageContainer,
                    ]}
                  >
                    <Image
                      source={{ uri: imgSrc }}
                      style={styles.imageStyle}
                      onError={(error) => console.log(`Error al cargar la imagen img${imgIndex + 3}:`, error)}
                    />
                    {imageStates[index * 2 + imgIndex + 2].status === 'tick' && (
                      <Text style={styles.tick}>✓</Text>
                    )}
                    {imageStates[index * 2 + imgIndex + 2].status === 'cross' && (
                      <Text style={styles.cross}>✖</Text>
                    )}
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
    bottom: 10,
    right: 10,
    fontSize: 90,
    color: '#77EF13',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
  },
  cross: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 70,
    color: 'red',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
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
