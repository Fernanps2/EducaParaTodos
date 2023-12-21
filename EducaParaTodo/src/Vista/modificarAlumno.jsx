import {React, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { actualizaAlumno } from '../Controlador/alumnos';

const ModificarAlumno = ({route, navigation}) => {

  const { alumno } = route.params;

  // Utiliza el estado local para manejar la información del formulario
  const [nombre, setNombre] = useState(alumno.nombre);
  const [apellidos, setApellidos] = useState(alumno.apellidos);
  const [foto, setFoto] = useState(alumno.foto);
  const [visualizacionPreferente, setVisualizacionPreferente] = useState(alumno.visualizacionPreferente.join(', '));

  const handleUpdateAlumno = () => {
    // Llama a la función de la base de datos para actualizar el alumno
    actualizaAlumno(alumno.id, nombre, apellidos, foto, visualizacionPreferente);
    // Puedes agregar lógica adicional después de la actualización si es necesario
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Datos del alumno</Text>
      </View>
      <Text>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={(text) => setNombre(text)}
        />
      
      <Text>Apellidos:</Text>
        <TextInput
          style={styles.input}
          value={apellidos}
          onChangeText={(text) => setApellidos(text)}
        />

      <Text>Foto:</Text>
        <TextInput
          style={styles.input}
          value={foto}
          onChangeText={(text) => setFoto(text)}
        />

      <Text>Visualización preferente:</Text>
        <TextInput
          style={styles.input}
          value={visualizacionPreferente}
          onChangeText={(text) => setVisualizacionPreferente(text)}
        />
      
      <TouchableOpacity style={styles.button} onPress={handleUpdateAlumno}>
        <Text style={styles.buttonText}>Actualizar Alumno</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ModificarAlumno;

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