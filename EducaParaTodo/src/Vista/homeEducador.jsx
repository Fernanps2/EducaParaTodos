import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { CerrarSesion } from './cerrarSesion';
import useUser from '../Controlador/useUser';
import { buscaProfesorId } from '../Controlador/profesores';

export default function HomeEducador ({ route, navigation }) {

    const {nombreUsuario} = route.params;
    const {jwt} = useUser();
    const [profesor, setProfesor] = useState(null);

    useEffect(() => {
      const loadData = async() => {
        try {
          const profesorEntidad = await buscaProfesorId(jwt);
          setProfesor(profesorEntidad);
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
          source={{ uri: profesor.foto }} // Deberías reemplazar esto con la imagen real
          style={styles.profileImage}
        />
        <Text style={styles.roleText}>{nombreUsuario}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('crearTarea')}>
        <Text style={styles.buttonText}>Crear Tarea</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('pantallaDatosAlumnos')}>
        <Text style={styles.buttonText}>Ver datos de alumnos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('modDatosProfesor', { nombreUsuario, navigation })}>
        <Text style={styles.buttonText}>Modificar mis datos</Text>
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