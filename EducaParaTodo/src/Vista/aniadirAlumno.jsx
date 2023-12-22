

import React, { useState } from 'react';
import { Alert, View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Button, Image, ScrollView,Platform } from 'react-native';
import {almacenaFotoPersona, almacenaImagenLogin, openGallery} from '../Controlador/multimedia'
import Swal from 'sweetalert2';


// ESTA SECCIÓN DE CÓDIGO HAY QUE PONERLA EN TODAS LAS PAGINAS QUE VAYAIS A HACER USO DE LA BASE DE DATOS

import { aniadeAlumno } from '../Controlador/alumnos';

export default function AniadirAlumno ({ navigation }) {

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [tipoContrasenia, setTipoContrasenia] = useState('texto'); // 'texto' o 'imagen'
  
  const [imageUri, setImageUri] = useState(null); //Imagen del alumno

  //Vector con uris de las imagenes para la contraseña
  const [imagenesContrasenia, setImagenesContrasenia] = useState({
    imagen1: null,
    imagen2: null,
    imagen3: null,
    imagen4: null,
  });


  //Vector con datos del alumno
  const [datosAlumno, setDatosAlumno] = useState({
    nombre: "",
    apellidos: "",
    contrasenia: "",
  });

  ////////////////////////////////////////////////////////////////////
  // Funciones para modificar los datos
  ///////////////////////////////////////////////////////////////////

  const handeChangeText = (value, name) => {
    setDatosAlumno(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleChangeImagenUriLogin = (value, name) => {
    setImagenesContrasenia(prevState => ({
      ...prevState,
      [name]: value
    }));
  }


  const handleImage = async() => {
    setImageUri(await openGallery());
  }

  const handleImageLogin = async(name) => {
    handleChangeImagenUriLogin(await openGallery(), name);
  }

  const options = ['texto', 'imagenes', 'pictogramas', 'video', 'audio'];

  const handleOptionPress = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    }
  };

  const showAlertStore = () => {
    if (Platform.OS ===   "web"){
      Swal.fire({
        title: "¿Quieres guardar?",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          almacenaFotoPersona(imageUri, "Alumno"+datosAlumno.nombre+datosAlumno.apellidos);
              if (tipoContrasenia == 'imagen') { //Si el tipo es imagen añadimos las contraseñas a la BD
                
                //Asociamos los nombres a las imagenes y la contraseña
                //Almacenamos las imagenes
                almacenaImagenLogin(imagenesContrasenia.imagen1, "Imagen1"+datosAlumno.nombre+datosAlumno.apellidos);
                almacenaImagenLogin(imagenesContrasenia.imagen2, "Imagen2"+datosAlumno.nombre+datosAlumno.apellidos);
                almacenaImagenLogin(imagenesContrasenia.imagen3, "Imagen3"+datosAlumno.nombre+datosAlumno.apellidos);
                almacenaImagenLogin(imagenesContrasenia.imagen4, "Imagen4"+datosAlumno.nombre+datosAlumno.apellidos);
                
                //Añadimos alumno
                aniadeAlumno(datosAlumno.nombre, datosAlumno.apellidos, 
                  `Imagen1${datosAlumno.nombre}${datosAlumno.apellidos},Imagen2${datosAlumno.nombre}${datosAlumno.apellidos},Imagen3${datosAlumno.nombre}${datosAlumno.apellidos},Imagen4${datosAlumno.nombre}${datosAlumno.apellidos}`, 
                "Alumno"+datosAlumno.nombre+datosAlumno.apellidos, selectedOptions, tipoContrasenia);
              

              }
              else { //Añadimos alumno
                aniadeAlumno(datosAlumno.nombre, datosAlumno.apellidos, datosAlumno.contrasenia, 
                  "Alumno"+datosAlumno.nombre+datosAlumno.apellidos, selectedOptions, tipoContrasenia);
              }
              
                navigation.navigate('listaAlumnos');
        }
      });
    }else{
      Alert.alert(
        "¿Quiere guardar?", // Título
        "Pulsa una opción", // Mensaje
        [
          { text: "Cancelar", onPress: () => console.log("Cancelar presionado"), style: "cancel" },
          { text: "Confirmar", onPress: () =>{
              almacenaFotoPersona(imageUri, "Alumno"+datosAlumno.nombre+datosAlumno.apellidos);
              if (tipoContrasenia == 'imagen') { //Si el tipo es imagen añadimos las contraseñas a la BD
                
                //Asociamos los nombres a las imagenes y la contraseña
                //Almacenamos las imagenes
                almacenaImagenLogin(imagenesContrasenia.imagen1, "Imagen1"+datosAlumno.nombre+datosAlumno.apellidos);
                almacenaImagenLogin(imagenesContrasenia.imagen2, "Imagen2"+datosAlumno.nombre+datosAlumno.apellidos);
                almacenaImagenLogin(imagenesContrasenia.imagen3, "Imagen3"+datosAlumno.nombre+datosAlumno.apellidos);
                almacenaImagenLogin(imagenesContrasenia.imagen4, "Imagen4"+datosAlumno.nombre+datosAlumno.apellidos);
                
                //Añadimos alumno
                aniadeAlumno(datosAlumno.nombre, datosAlumno.apellidos, 
                  `Imagen1${datosAlumno.nombre}${datosAlumno.apellidos},Imagen2${datosAlumno.nombre}${datosAlumno.apellidos},Imagen3${datosAlumno.nombre}${datosAlumno.apellidos},Imagen4${datosAlumno.nombre}${datosAlumno.apellidos}`, 
                "Alumno"+datosAlumno.nombre+datosAlumno.apellidos, selectedOptions, tipoContrasenia);
              

              }
              else { //Añadimos alumno
                aniadeAlumno(datosAlumno.nombre, datosAlumno.apellidos, datosAlumno.contrasenia, 
                  "Alumno"+datosAlumno.nombre+datosAlumno.apellidos, selectedOptions, tipoContrasenia);
              }
              
                navigation.navigate('listaAlumnos');
            }
          }
        ],
        { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
      );
    }
  };

    return (
      <ScrollView style={styles.container}>
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

       {/* Botones para seleccionar el tipo de contraseña */}
      <View style={styles.botonesContrasenia}>
        <Button
          title="Contraseña Texto"
          onPress={() => setTipoContrasenia('texto')}
        />
        <Button
          title="Contraseña Imagen"
          onPress={() => setTipoContrasenia('imagen')}
        />
      </View>

      {/* Campo de contraseña según la selección */}
      {
        tipoContrasenia === 'texto' ? (
          <TextInput
            style={styles.input}
            placeholder="Contraseña Formato Texto"
            secureTextEntry
            value={datosAlumno.contrasenia}
            onChangeText={(value) => handeChangeText(value, 'contrasenia')}
          />
        ) : (
          // Componente personalizado para seleccionar imágenes
          <View style={styles.containerContrasenia}>
            <View style={styles.botonesContrasenia}>
              <Button
                onPress={() => handleImageLogin('imagen1')}
                title="Imagen1"
              />
              {imagenesContrasenia.imagen1!=null ? (
            <Text style={styles.input2}> Foto Seleccionada</Text>
          ) : ( 
              <Text style={styles.input2}> No hay foto </Text>
          )}
            </View>
            {/* Imagen 2 */}
            <View style={styles.botonesContrasenia}>
              <Button
                onPress={() => handleImageLogin('imagen2')}
                title="Imagen2"
              />
              {imagenesContrasenia.imagen2!=null ? (
            <Text style={styles.input2}> Foto Seleccionada</Text>
          ) : ( 
              <Text style={styles.input2}> No hay foto </Text>
          )}
            </View>

            {/* Imagen 3 */}
            <View style={styles.botonesContrasenia}>
              <Button
                onPress={() => handleImageLogin('imagen3')}
                title="Imagen3"
              />
              {imagenesContrasenia.imagen3!=null ? (
            <Text style={styles.input2}> Foto Seleccionada</Text>
          ) : ( 
              <Text style={styles.input2}> No hay foto </Text>
          )}
            </View>

            {/* Imagen 4 */}
            <View style={styles.botonesContrasenia}>
              <Button
                onPress={() => handleImageLogin('imagen4')}
                title="Imagen4"
              />
              {imagenesContrasenia.imagen4!=null ? (
            <Text style={styles.input2}> Foto Seleccionada</Text>
          ) : ( 
              <Text style={styles.input2}> No hay foto </Text>
          )}
            </View>
          </View>

        )
      }

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
        <Text>Añadir foto del usuario:</Text>
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

    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  containerContrasenia: {
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  botonesContrasenia: {
    flexDirection: 'row', // Alinea los elementos horizontalmente
    justifyContent: 'space-between', // Distribuye el espacio uniformemente
    alignItems: 'center', // Alinea los elementos verticalmente
    marginVertical: 5, // Añade un espacio vertical entre cada par de botón y texto
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  input2: {
    flex: 1, // Asegura que el texto ocupe el espacio restante en el contenedor
    textAlign: 'center', // Centra el texto,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userIcon: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10
  },
  userIconPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
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