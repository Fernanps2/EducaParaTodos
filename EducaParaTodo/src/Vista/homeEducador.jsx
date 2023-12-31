import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { CerrarSesion } from './cerrarSesion';
import useUser from '../Controlador/useUser';
import { buscaProfesorId } from '../Controlador/profesores';
import { descargaFotoPersona } from '../Controlador/multimedia';

export default function HomeEducador ({ route, navigation }) {

    const {nombreProf} = route.params;
    const {jwt} = useUser();
    const [profesor, setProfesor] = useState('');
    const [imagen, setImagen] = useState([]);

    useEffect(() => {
      const loadData = async() => {
        try {
          const profesorEntidad = await buscaProfesorId(jwt);
          setProfesor(profesorEntidad); 
          const imagenUri = await descargaFotoPersona(profesorEntidad.foto);
          setImagen(imagenUri);
        } catch(error) {
          console.log(error);
        }
      }
      loadData();
    }, []);


    return (
      <View style={styles.container}>
      <Text style={styles.title}>EducaParaTodos</Text>
      <CerrarSesion/>

      <View style={styles.profileContainer}>
        <Image
          source={{ uri: imagen.uri }} // Deberías reemplazar esto con la imagen real
          style={styles.profileImage}
        />
        <Text style={styles.roleText}>{nombreProf}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('listaAlumnos')}>
        <Text style={styles.buttonText}>Ver datos de alumnos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('modDatosProfesor', { nombreProf, navigation })}>
        <Text style={styles.buttonText}>Modificar mis datos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('avisarMaterial')}>
        <Text style={styles.buttonText}>Mandar Aviso Material</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ElegirFeedbackAlumno')}>
        <Text style={styles.buttonText}>Elegir alumno para feedback o seguimiento de tareas</Text>
      </TouchableOpacity>

      

      </View>

    )};

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white' // Cambiar si es necesario
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
      },
      profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
      },
      profileImage: {
        width: 100, // Ajustar según tus necesidades
        height: 100, // Ajustar según tus necesidades
        borderRadius: 50, // Esto hará que la imagen sea redonda
        marginBottom: 10,
        backgroundColor: 'grey' // Color temporal para simular la imagen
      },
      roleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      button: {
        backgroundColor: 'blue', // Color de los botones
        padding: 15,
        width: '100%', // Ajustar si es necesario
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
      },
    });