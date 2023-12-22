import {React, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { actualizaProfesorAdmin, buscaProfesorId } from '../Controlador/profesores';
import { buscaProfesorNombre, actualizaProfesor } from '../Controlador/profesores';

const ModificarDatosProfesor = ({route, navigation}) => {
    const { nombreProf } = route.params;
    
    const [prof, setProfesor] = useState([]);
    //const [profesorData, setProfesorData] = useState(null); // Estado para almacenar los datos del profesor
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [aula, setAula] = useState('');
    //const [info, setInfo] = useState('');

    useEffect(() => {
      const profesor = async () => {
        try {
          const profe = await buscaProfesorNombre(nombreProf);
          const profes = profe[0];
          console.log("PROFESOR " + JSON.stringify(profes));
          setProfesor(profes);
          setNombre(profes.nombre);
          setApellidos(profes.apellidos);
          setContrasenia(profes.password);
          setAula(profes.aula);
        } catch (error) {
          console.log(error);
        }
      }; 
      profesor();
    }, []);

    // Utiliza el estado local para manejar la información del formulario

    const handleUpdateProfesor = async () => {
        // Llama a la función de la base de datos para actualizar el profesosr
        await actualizaProfesor(prof.id, nombre, apellidos, contrasenia, prof.foto, aula);
        // Puedes agregar lógica adicional después de la actualización si es necesario

        const profe = await buscaProfesorId(prof.id);

        navigation.navigate('pantallaDatosProfesor', {profesor: profe});
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

            <Text>Contraseña:</Text>
                <TextInput
                style={styles.input}
                value={contrasenia}
                secureTextEntry
                onChangeText={(text) => setContrasenia(text)}                
            />

            <Text>Aula:</Text>
                <TextInput
                style={styles.input}
                value={aula}
                onChangeText={(text) => setAula(text)}
            />
            
            <TouchableOpacity style={styles.button} onPress={handleUpdateProfesor}>
                <Text style={styles.buttonText}>Actualizar Profesor</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ModificarDatosProfesor;

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