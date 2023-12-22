import React from 'react';
import { Alert, View, Text, Image, StyleSheet, TouchableOpacity,Platform} from 'react-native';
import { useEffect, useState } from 'react';
import { descargaFotoPersona } from '../Controlador/multimedia';
import { borraAlumno } from '../Controlador/alumnos';
import BotonModificarAlumno from './botonModificarAlumno';
import Swal from 'sweetalert2';

const PantallaDatosAlumno = ({route, navigation}) => {
  const {alumno} = route.params;

  const [imagen, setImagen] = useState([]);

  // useEffect es un Hook de React que te permite sincronizar un componente con un sistema externo.
  useEffect(() => {
    const imagen = async () => {
      try {
        const imagen = await descargaFotoPersona(alumno.foto);
        setImagen(imagen);
        await console.log(imagen);
      } catch (error) {
        console.log(error);
      }
    };
    imagen();
  }, []);

  const showAlertStore = () => {
    if (Platform.OS ===   "web"){
      Swal.fire({
        title: "¿Quieres eliminar alumno?",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          borraAlumno(alumno.id);
          navigation.navigate('listaAlumnos');
        }
      });
    }else{
      Alert.alert(
        "¿Quiere eliminar el alumno?", // Título
        "Pulsa una opción", // Mensaje
        [
          { text: "Cancelar", onPress: () => console.log("Cancelar presionado"), style: "cancel" },
          { text: "Confirmar", onPress: () =>{
              borraAlumno(alumno.id);
              navigation.navigate('listaAlumnos');
            }
          }
        ],
        { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
      );
    }
  };

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}> Datos del alumno</Text>
            </View>
            <Text style={styles.input}> Nombre: {alumno.nombre} </Text>
            <Text style={styles.input}> Apellidos: {alumno.apellidos} </Text>
            <Text style={styles.input}> Visualización preferente: 
              {alumno.visualizacionPreferente.map((item, index) => (
                <Text key={index} style={styles.input}>
                  {index > 0 && ', '}{index == 0 && ' '}{item}
                </Text>
              ))}
            </Text>

            {/* <Text style={styles.input}> Visualización preferente: {alumno.visualizacionPreferente} </Text> */}
            <View style={styles.photoSection}>
              <TouchableOpacity>
                {imagen.uri!=null ? (
                  <Image source={{ uri: imagen.uri }} style={styles.userIcon} />
                ) : (
                  <View style={styles.userIconPlaceholder} > 
                    <Text> No hay foto </Text>
                  </View>
                )}
              </TouchableOpacity>
        
    
            </View>
          
        <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button}>
        <BotonModificarAlumno texto={"Modificar alumno"} alumno={alumno} navigation={navigation} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
        onPress={()=>{ showAlertStore()}}>
        <Text style={styles.buttonText}>Eliminar Alumno</Text>
      </TouchableOpacity>
        </View>


        </View>
    )
}

export default PantallaDatosAlumno;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      marginBottom: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    input: {
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    input2: {
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    photoSection: {
      alignItems: 'center',
      marginBottom: 20,
    },
    userIcon: {
      width: 100,
      height: 100,
      borderRadius: 10,
      // Otros estilos para la imagen
    },
    userIconPlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 10,
      backgroundColor: '#cccccc', // Un color de fondo para el placeholder
      // Otros estilos para el placeholder
    },
    buttonContainer: {
      flexDirection: 'row', // Alinea los elementos horizontalmente
      justifyContent: 'space-between', // Espacia los elementos uniformemente
      alignItems: 'center', // Alinea los elementos verticalmente
    },
    button: {
      backgroundColor: 'blue', // Color de los botones
      padding: 10,
      //width: '50%', // Ajustar si es necesario
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
});