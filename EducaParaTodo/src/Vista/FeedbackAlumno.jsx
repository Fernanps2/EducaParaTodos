import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput,Image, Button, TouchableOpacity, Alert, FlatList,Platform, ActivityIndicator  } from 'react-native';
import appFirebase, { descargarImagenes, getTareaId, getTareaIdCompletada } from '../Modelo/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import EliminarTareaAlumno from './EliminarTareaAlumno';
import { getTarea } from '../Modelo/firebase';
import { asignarFeedback, descargarEmoticono, } from '../Modelo/firebase';
import { cargaImagen, descargaEmoticonos, descargaImagenes, descargaImagen} from '../Controlador/multimedia';
import { buscaAlumnoId } from '../Controlador/alumnos';
import Swal from "sweetalert2";
//import DatosAlumnos from './DatosAlumnos';
//import alumnos from '../Modelo/alumno';

const FeedbackAlumno = ({route}) => {
  const {idAlumno} = route.params;
  const [nombreAlumno,setnombreAlumno] = useState('');
  const [tareas, setTareas] = useState([]);
  const [emoticonos, setEmoticonos] = useState([]);
  const [emoticonoSeleccionado, setEmoticonoSeleccionado] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


 // Carga las tareas completadas de un alumno en especifico
  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const tareasObtenidas = await getTareaIdCompletada(idAlumno);
        setTareas(tareasObtenidas);
        console.log(tareasObtenidas.id);
        const nombreAlumno = await buscaAlumnoId(idAlumno);
        setnombreAlumno(nombreAlumno);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };

    cargarTareas();
  }, [idAlumno]);

  // Descarga los emoticonos de la base de datos
  useEffect(() => {
    const descargaEmoticono = async() => {
      setIsLoading(true);
      try{
        const EmoticonosObtenidos = await descargaEmoticonos();
        setEmoticonos(EmoticonosObtenidos);
        console.log(EmoticonosObtenidos);
      } catch (error){
        console.log('Error al obtener los emoticonos', error);
      } finally {
        setIsLoading(false);
      }
    };

    descargaEmoticono();
  }, []);

  // Para seleccionar y deseleccionar un pictograma
  const toggleSelection = (imageId) => {
    if (emoticonoSeleccionado.length === 0) {
      const index = emoticonoSeleccionado.indexOf(imageId);
  
      if (index === -1) {
        setEmoticonoSeleccionado([...emoticonoSeleccionado, imageId]);
      } else {
        const updatedSelection = [...emoticonoSeleccionado];
        updatedSelection.splice(index, 1);
        setEmoticonoSeleccionado(updatedSelection);
      }
    } else {
      setEmoticonoSeleccionado([]);
      if (Platform.OS ===   "web"){
        Swal.fire({
          title: "Error",
          text: "No puedes seleccionar mas de un emoticono",
          icon: "error",
          confirmButtonText: "De acuerdo",
        })
      }else{
        Alert.alert('Listo', 'No puedes seleccionar mas de un emoticono');
      }
    }
  };
  
  //Renderizar el emoticono
  const renderEmoticono = ({item}) => {
    const isSelected = emoticonoSeleccionado.includes(item.nombre);
    //console.log(item.uri);

    return (
      <TouchableOpacity
        style={isSelected ? styles.selectedImage : styles.image}
        onPress={() => toggleSelection(item.nombre)}
      >
        <Image
          source={{uri: item.uri}}
          style={styles.imageStyle}
        />
      </TouchableOpacity>
    );
  };

// Asignar el feedback salta la notificacion para aceptar o negar
const añadirFeedback = async (Idtarea,emoticonoSeleccionado) =>{

  asignarFeedback(Idtarea,emoticonoSeleccionado);

  if (Platform.OS ===   "web"){
        Swal.fire({
          title: "Listo",
          text: "Feedback asignado correctamente",
          icon: "success",
          confirmButtonText: "De acuerdo",
        })
      }else{
        Alert.alert('Listo', 'Feedback asignado correctamente');
      }
};
// funcion notificacion para asegurarse de que quiere mandar el feedback
const showAlertStore = (id,emoticonoSeleccionado) =>{
  if (Platform.OS ===   "web"){
    Swal.fire({
      title: "¿Estás seguro de cambiar/Asignar feedback a la tarea?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        añadirFeedback(id,emoticonoSeleccionado);
      }
    });
  }else{
    Alert.alert(
      "¿Estas seguro de borrar la tarea?",
      "Pulsa una opcion",
      [
        {text: "Cancelar",},
        {text: "Confirmar", onPress: () => añadirFeedback(id,emoticonoSeleccionado) }
      ],
      { cancelable: true}
    );
  }
};


  return (    
  <ScrollView style={styles.datos}>
    <Text style={styles.texto}>{nombreAlumno.nombre} {nombreAlumno.apellidos}</Text>
    {tareas.length === 0 ? (
      <Text style={{fontSize: 20,}}>No hay tareas finalizadas</Text>
    ) : (tareas.map((tareas) => (
      <View key={tareas.id} style={styles.cardWithImage} > 
        <View style={styles.contentContainer}>
          <Text style={{ fontSize: 20,paddingRight: 10, }} >{tareas.titulo}</Text>

          <TouchableOpacity onPress={() => showAlertStore(tareas.id,emoticonoSeleccionado)}>
            
            <View style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5, marginTop: 10, marginLeft: 10, }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Enviar Feedback</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )))}
    <View>
      <Text>{emoticonos.nombre}</Text>
    </View>
    <View style={styles.container}>
    {isLoading ? (
      <ActivityIndicator size="large" color="black" />
    ) : (
    <ScrollView>
      <View style={styles.imageGrid}>
        {emoticonos.map((emoticono) => (
          <TouchableOpacity
            key={emoticono.nombre}
            style={emoticonoSeleccionado.includes(emoticono.nombre) ? styles.selectedImage : styles.image}
            onPress={() => toggleSelection(emoticono.nombre)}
          >
          <Image
            source={{ uri: emoticono.uri }}
            style={styles.imageStyle}
          />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
       )}
      <View style={styles.selectedImagesContainer}>
        <Text>Emoticono seleccionado:</Text>
        {emoticonoSeleccionado.map((selectedId) => (
          <Text key={selectedId}>{emoticonos.find(item => item.nombre == selectedId).nombre}</Text>
        ))}
      </View>
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardWithImage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },  
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#e0e0e0", // Un color gris claro para los botones
    padding: 10,
    marginVertical: 5,
    width: 100,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d0d0d0", // Un borde ligeramente más oscuro que el fondo del botón
    marginHorizontal: Platform.OS === "web" ? 10 : 3,
  },
  buttonAñadir: {
    backgroundColor: "#e0e0e0", // Un color gris claro para los botones
    padding: 5,
    marginVertical: 1,
    width: 250,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d0d0d0", // Un borde ligeramente más oscuro que el fondo del botón
    marginHorizontal: Platform.OS === "web" ? 10 : 3,
  },
  buttonDelete: {
    backgroundColor: "#FF0000", // Un color gris claro para los botones
    padding: 10,
    marginVertical: 5,
    width: 100,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d0d0d0", // Un borde ligeramente más oscuro que el fondo del botón
    marginHorizontal: Platform.OS === "web" ? 10 : 3,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "green",
    padding: 15,
    width: 100,
    position: "absolute", // Posicionar el botón en la parte inferior de la pantalla
    bottom: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
  },
  separador: {
    height: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    marginBottom: 10,
    width: 250,
    height: 30,
    padding: 5,
  },
  text: {
    fontSize: 15,
  },
  separador: {
    height: 10,
  },
  separador5: {
    height: 50,
  },
  textoSeleccionado: {
    color: "green"
  },
  image: {
    margin: 5,
    width: 100,
    height: 100,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'black',
},
  selectedImage: {
    margin: 5,
    width: 100,
    height: 100,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: 'green',
  },
  imageStyle: {
    width: '100%',
    height: 100,
  },
  selectedImagesContainer: {
    marginTop: 20,
  },
  imageGrid: {
    justifyContent: 'space-between', // Espacio entre las filas
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  texto: {
    fontSize: 24,
    fontWeight: 'bold',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default FeedbackAlumno;