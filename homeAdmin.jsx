import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { CerrarSesion } from './cerrarSesion';
import useUser from '../Controlador/useUser';

export default function HomeAdmin ({ route, navigation }) {
    const {jwt} = useUser();
    const { nombreAdm } = route.params;

    return (
      <ScrollView>

      <View style={styles.container}>
        <Text style={styles.title}>EducaParaTodos</Text>
        <CerrarSesion/>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'path_to_your_image' }} // Deberías reemplazar esto con la imagen real
            style={styles.profileImage}
          />
          <Text style={styles.roleText}>{ nombreAdm }</Text>
        </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('listaAlumnos')}>
            <Text style={styles.buttonText}>Gestionar Alumnos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('listaProfesores')}>
            <Text style={styles.buttonText}>Gestionar Profesores</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('gestionTareas')}>
            <Text style={styles.buttonText}>Gestionar Tareas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('gestionMateriales')}>
            <Text style={styles.buttonText}>Gestión Materiales</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('modDatosAdmin', { nombreAdm, navigation })}>
            <Text style={styles.buttonText}>Modificar mis datos</Text>
          </TouchableOpacity>

      </View>
      </ScrollView>


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