import React from 'react';
import { Alert, View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { aniadeProfesor } from '../Controlador/profesores';
import { openGallery } from '../Controlador/multimedia';

export default function AniadirProfesor ({navigation }) {
  const [datosProfesor, setDatosProfesor] = useState({
    nombre: "",
    apellidos: "",
    contrasenia: "",
    email: "",
  });

  const [imageUri, setImageUri] = useState("");

  const handeChangeText = (value, name) => {
    setDatosProfesor(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const showAlertStore = () => {
    Alert.alert(
      "¿Quiere guardar?", // Título
      "Pulsa una opción", // Mensaje
      [
        { text: "Cancelar", onPress: () => console.log("Cancelar presionado"), style: "cancel" },
        { text: "Confirmar", onPress: () =>{
            aniadeProfesor(datosProfesor.nombre, datosProfesor.apellidos, datosProfesor.contrasenia, "");
            navigation.navigate('pantallaProfesores');
          }
        }
      ],
      { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
    );
  };

    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EducaParaTodos</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={datosProfesor.nombre}
        onChangeText={(value)=>handeChangeText(value,'nombre')}
        />
      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        value={datosProfesor.apellidos}
        onChangeText={(value)=>handeChangeText(value,'apellidos')}
        />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={datosProfesor.contrasenia}
        onChangeText={(value)=>handeChangeText(value,'contrasenia')}
        />

      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={datosProfesor.email}
        onChangeText={(value)=>handeChangeText(value,'email')}
        />

      <View style={styles.photoSection}>
        <Text>Añadir foto del usuario:</Text>
        <TouchableOpacity>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.userIcon} />
          ) : (
            <View style={styles.userIconPlaceholder} />
          )}
        </TouchableOpacity>
        <Button
          onPress={() => setImageUri(openGallery())}
          title="Seleccionar una imagen"
        />
    
      </View>

      <TouchableOpacity style={styles.addButton}
                  onPress={showAlertStore}>
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