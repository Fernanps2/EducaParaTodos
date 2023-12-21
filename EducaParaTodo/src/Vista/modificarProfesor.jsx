import {React, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { actualizaProfesorAdmin } from '../Controlador/profesores';
import { buscaProfesorNombre } from '../Controlador/profesores';

// No se usa
const ModificarProfesor = ({route, navigation}) => {
    const { nombreUsuario } = route.params;

    const [profesor, setProfesor] = useState([]);
    const [profesorData, setProfesorData] = useState(null); // Estado para almacenar los datos del profesor
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [email, setEmail] = useState('');
    const [info, setInfo] = useState('');


    // Tenemos que traer los datos del profesor
    useEffect(() => {
      const datosProf = async () => {
          try {
              const prof = await buscaProfesorNombre(nombreUsuario);
              setProfesorData(prof);
              console.log(prof);

              if (profesorData) {
                setNombre(datosProfesor.nombre);
                setApellidos(datosProfesor.apellidos);
                setContrasenia(datosProfesor.password);
                setEmail(datosProfesor.email);
                setInfo(datosProfesor.info);
              }
    
          } catch (error) {
              console.log(error);
          }
      };
      datosProf();
  }, []);




    // Utiliza el estado local para manejar la información del formulario

    const handleUpdateProfesor = () => {
        // Llama a la función de la base de datos para actualizar el profesosr
        actualizaProfesorAdmin(profesor.id, nombre, apellidos, foto);
        // Puedes agregar lógica adicional después de la actualización si es necesario
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Datos del profesor</Text>
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
            
            <TouchableOpacity style={styles.button} onPress={handleUpdateProfesor}>
                <Text style={styles.buttonText}>Actualizar Profesor</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ModificarProfesor;

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