

import React, { useState } from 'react';
import { Alert, View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Button, Image } from 'react-native';
import {almacenaFotoMenu, almacenaFotoPersona, openGallery} from '../Controlador/multimedia' 
import { aniadeMenu } from '../Controlador/tareas';

export default function AniadirMenu ({ navigation }) {
  
  const [datosMenu, setDatosMenu] = useState({
    nombre: "",
    Imagen: "",
  });

  const handeChangeText = (value, name) => {
    setDatosMenu(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const [imageUri, setImageUri] = useState(null);

  const showAlertStore = () => {
    Alert.alert(
      "¿Quiere guardar?", // Título
      "Pulsa una opción", // Mensaje
      [
        { text: "Cancelar", onPress: () => console.log("Cancelar presionado"), style: "cancel" },
        { text: "Confirmar", onPress: () =>{
            almacenaFotoMenu(imageUri, "Menu"+datosMenu.nombre);
            aniadeMenu(datosMenu.nombre,"Menu"+datosMenu.nombre);
            navigation.navigate('gestionMenus',{navigation});
          }
        }
      ],
      { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
    );
  };

  const handleImage = async() => {
    setImageUri(await openGallery());
  }

    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EducaParaTodos</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={datosMenu.nombre}
        onChangeText={(value)=>handeChangeText(value,'nombre')}
        />

      <View style={styles.photoSection}>
        <Text>Añadir foto del menú:</Text>
        <TouchableOpacity>
          {imageUri!=null ? (
            <Image source={{ uri: imageUri }} style={styles.userIcon} />
          ) : (
            <View style={styles.userIconPlaceholder} > 
              <Text> No hay foto </Text>
            </View>
          )}
        </TouchableOpacity>
        <Button
          onPress={() =>handleImage()}
          title="Seleccionar una imagen"
        />
    
      </View>

      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.addButton}
                  onPress={()=>{ showAlertStore()}}>
            <Text style={styles.addButtonText}>Añadir</Text>
      </TouchableOpacity>
      </View>

    </View>
  )
};

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
  dropdownContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  dropdownItem: {
    padding: 15,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    // Ajusta el espacio como sea necesario
    marginBottom: 50,
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