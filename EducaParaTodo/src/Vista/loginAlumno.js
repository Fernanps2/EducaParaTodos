 import React, { useState, useEffect } from 'react';
 import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
 import { descargaFotoPersona } from '../Controlador/multimedia';
 import useUser from '../Controlador/useUser';
 import Swal from "sweetalert2";


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
      if (Platform.OS === "web"){
        Swal.fire({
          title: "Cuidado",
          text: "La contraseña no es correcta, prueba con otra",
          icon: "warning",
          confirmButtonText: "De acuerdo",
        })
      }else{
        Alert.alert('Cuidado', 'La contraseña no es correcta, prueba con otra');
      }
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


/*import React, { useState } from 'react';
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
    const username = alumno.nombre;

    if (login(username, password, 'alumno')) {
      navigation.navigate('Tareas', { usuario: alumno });
    } else {
      alert('El usuario o contraseña es inválido');
    }
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
                  {/* Primera fila *//*}
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
                  {/* Segunda fila *//*}
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

export default LoginScreenAlumno;*/
