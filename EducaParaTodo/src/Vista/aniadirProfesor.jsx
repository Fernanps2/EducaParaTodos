import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function AniadirProfesor ({navigate }) {
    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EducaParaTodos</Text>
      </View>

      <TextInput style={styles.input} placeholder="Nombre" />
      <TextInput style={styles.input} placeholder="Apellidos" />
      <TextInput style={styles.input} placeholder="Teléfono de contacto" />
      <TextInput style={styles.input} placeholder="Correo" />
      <TextInput style={styles.input} placeholder="Información Adicional" />

      <View style={styles.photoSection}>
        <Text>Foto del usuario:</Text>
        <View style={styles.userIcon} />
      </View>

      <TouchableOpacity style={styles.addButton}
                  onPress={() => navigation.navigate('HomeAdmin')}>
        <Text style={styles.addButtonText}>Añadir</Text>
      </TouchableOpacity>

    </View>
  );
}

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
  photoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});