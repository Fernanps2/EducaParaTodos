import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';

export default function HomeAdmin ({ navigation }) {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>EducaParaTodos</Text>

      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'path_to_your_image' }} // Deberías reemplazar esto con la imagen real
          style={styles.profileImage}
        />
        <Text style={styles.roleText}>Administrador</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('crearTarea')}>
        <Text style={styles.buttonText}>Crear Tarea</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('pantallaAlumnos')}>
        <Text style={styles.buttonText}>Ver datos de alumnos</Text>
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