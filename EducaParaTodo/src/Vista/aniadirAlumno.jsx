import React, { useState } from 'react';
import { Alert, View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// Uso base de datos
import appFirebase from '../Modelo/firebase';
const db = getFirestore(appFirebase);
import {getFirestore,collection,addDoc, getDocs} from 'firebase/firestore'
import {almacenarAlumno} from '../Modelo/modelo';

//Tratado de imagenes
import { Permission, ImagePicker } from 'expo';


export default function AniadirAlumno ({ navigation }) {

  const options = ['video', 'pictogramas', 'audio', 'texto', 'imagenes'];

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const [datosAlumno, setDatosAlumno] = useState({
    nombre: "",
    apellidos: "",
    opcionesSeleccionadas: []
  });


  const handeChangeText = (value, name) => {
    setDatosAlumno(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleOptionPress = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    }
  };
  
  const showAlertStore = async () => {
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

  //Tratado de la imagen

/*
  openGallery = async () => {
    const resultPermission = await Permission.askAsync(
      Permission.CAMERA_ROLL
    );
    
    if (resultPermission) {
      const resultImagePicker = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (resultImagePicker.cancelled === false) {
        const imageUri = resultImagePicker.uri;

        console.log(imageUri);
      }
    }
  };
*/
  const almacenarAlumnoBD = async()=>{
    try{
        const mensaje = await almacenarAlumno(datosAlumno.nombre, datosAlumno.apellidos, selectedOptions);

    }catch(error){
      Alert.alert(`Error: ${error.message}`);
    }
  }


    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EducaParaTodos</Text>
      </View>

      <TextInput 
        style={styles.input} 
        placeholder="Nombre" 
        value={datosAlumno.nombre}
        onChangeText={(value)=>handeChangeText(value,'nombre')}
        />

      <TextInput 
        style={styles.input} 
        placeholder="Apellidos" 
        value={datosAlumno.apellidos}
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
      {/*
      <View style={styles.photoSection}>
        <Text>Añadir foto del usuario:</Text>
        <TouchableOpacity onPress={() => this.openGallery()}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.userIcon} />
          ) : (
            <View style={styles.userIconPlaceholder} />
          )}
        </TouchableOpacity>
      </View>
          */}
  

      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.addButton}
                  onPress={()=>{
                    // showAlertStore();
                    almacenarAlumnoBD();

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