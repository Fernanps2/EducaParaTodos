

import React, { useState } from 'react';
import { Alert, View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Button, Image } from 'react-native';
//import { Permissions, ImagePicker } from "expo";
import {openGallery} from '../Controlador/multimedia' 


// ESTA SECCIÓN DE CÓDIGO HAY QUE PONERLA EN TODAS LAS PAGINAS QUE VAYAIS A HACER USO DE LA BASE DE DATOS

import appFirebase from '../Modelo/firebase';
import {getFirestore,collection,addDoc} from 'firebase/firestore'
import { aniadeAlumno, actualizaAlumno, borraAlumno } from '../Controlador/alumnos';
const db = getFirestore(appFirebase);

export default function AniadirAlumno ({ navigation }) {

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const initialState = {
    nombre:'',
    apellidos:''
  }
  const [nombre, setNombre] = useState("empty");
  const [apellidos,setApellidos] = useState("empty");
  const[estado,setEstado] = useState(initialState);
  const [imageUri, setImageUri] = useState("");

  const options = ['video', 'pictogramas', 'audio', 'texto', 'imagenes'];

  const handleOptionPress = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    }
  };

  const showAlertStore = () => {
    Alert.alert(
      "¿Quiere guardar?", // Título
      "Pulsa una opción", // Mensaje
      [
        { text: "Cancelar", onPress: () => console.log("Cancelar presionado"), style: "cancel" },
        { text: "Confirmar", onPress: () =>{
            navigation.navigate('HomeAdmin');
          }
        }
      ],
      { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
    );
  };

  const handeChangeText = (value, name) =>{
    setEstado({...estado, [name]:value})
  }


  /*const almacenarAlumnoBD = async()=>{

    try{
      if(estado.nombre === '' || estado.apellidos === '')
        Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido')
      else{
        const alumno = {
          nombre: estado.nombre,
          apellidos: estado.apellidos,
          visualizacion: selectedOptions
        }
        console.log(alumno);

        await addDoc(collection(db,'alumnos'),{
          ...alumno
        })
        Alert.alert('Alumno guardado con éxito')
      }
    }catch(error){

    }
  }*/

    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EducaParaTodos</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={estado.nombre}
        onChangeText={(value)=>handeChangeText(value,'nombre')}
        />
      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        value={estado.apellidos}
        onChangeText={(value)=>handeChangeText(value,'apellidos')}
        />

      <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.input}>
        <Text>{selectedOptions.join(', ') || 'Visualización preferente'}</Text>
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdownContainer}>
          <FlatList
            horizontal
            data={options}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleOptionPress(item)} style={styles.dropdownItem}>
                <Text style={{ fontSize: 18, color: selectedOptions.includes(item) ? 'blue' : 'black' }}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setDropdownVisible(false)}>
            <Text style={{ color: 'white' }}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.photoSection}>
        <Text>Foto del usuario:</Text>
        <View style={styles.userIcon} >
          <Image source={{uri: imageUri}}/>
        </View>
        <Button
          onPress={() => setImageUri(openGallery())}
          title="Seleccionar una imagen"
        />
      </View>

      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.addButton}
                  onPress={()=>{
                    // showAlertStore
                    //borraAlumno("4HjvhR4iIDfWmxLKijMa");
                    //aniadeAlumno(estado.nombre, estado.apellidos, 'conejita', "", ['texto']);
                  }}>
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
    marginBottom: 10,
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