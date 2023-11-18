import React, { useState } from 'react';
import { Button, Platform, ActivityIndicator, Alert, View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';


// Uso base de datos
import appFirebase from '../Modelo/firebase';
import {getFirestore, collection, getDocs} from 'firebase/firestore'
const db = getFirestore(appFirebase);

export default function PasoActividad ({navigation}) {
  
  // Variables para añadir items
  const [showAddStepAddText, setShowAddStepAddText] = useState(false); // Opcion Añadir texto en pasos
  const [showAddStepAddPict, setShowAddStepAddPict] = useState(false); // Opcion Añadir pictograma en pasos
  const [showAddStepAddVideo, setShowAddStepAddVideo] = useState(false); // Opcion Añadir video en pasos
  const [showAddStepAddImage, setShowAddStepAddImage] = useState(false); // Opcion Añadir imagen en pasos
  const [showAddStepAddAudio, setShowAddStepAddAudio] = useState(false); // Opcion Añadir imagen en pasos

  // Variables para guardar input
  const [nombrePaso, setNombrePaso] = useState ('');

  //Variables para logo de guardar
  const [guardando, setGuardando] = useState(false);

  // Variables para pictogramas
  const [dataPicto, setDataPicto] = useState([]);
  const [isLoadingPicto, setIsLoadindPicto] = useState(false);
  const [selectedPictograma, setSelectedPictograma] = useState('');
  const [storePictograma, setStorePictograma] = useState('');
  const [isStorePicto, setIsStorePicto] = useState(false);

    // Variables para Video
    const [dataVideo, setDataVideo] = useState([]);
    const [isLoadingVideo, setIsLoadindVideo] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState('');
    const [storeVideo, setStoreVideo] = useState('');
    const [isStoreVideo, setIsStoreVideo] = useState(false);

  // Funcion para mostrar los pictogramas de la base de datos
  const cargarPictogramas = (() => {
    setIsLoadindPicto(true); // Iniciar la carga
    const querybd = getFirestore(appFirebase);
    const queryCollection = collection(querybd, 'Pictogramas');
    getDocs(queryCollection)
      .then(res => {
        if(res.docs.length > 0){
          setDataPicto(res.docs.map(picto => ({id: picto.id, ...picto.data()})))
          setIsLoadindPicto(false);
        }else{
          console.log('No se encontraron documentos en la colección.')
          setIsLoadindPicto(false);
        }
    })
    .catch(error => {
      console.error('Error al obtener los documentos: ', error)
      setIsLoadindPicto(false);
    })
  })

    // Funcion para mostrar los pictogramas de la base de datos
    const cargarVideos = (() => {
      setIsLoadindVideo(true); // Iniciar la carga
      const querybd = getFirestore(appFirebase);
      const queryCollection = collection(querybd, 'Videos');
      getDocs(queryCollection)
        .then(res => {
          if(res.docs.length > 0){
            setDataVideo(res.docs.map(video => ({id: video.id, ...video.data()})))
            setIsLoadindVideo(false);
          }else{
            console.log('No se encontraron documentos en la colección.')
            setIsLoadindVideo(false);
          }
      })
      .catch(error => {
        console.error('Error al obtener los documentos: ', error)
        setIsLoadindVideo(false);
      })
    })

// Pulsamos boton añadir texto en añadir paso
const handleAnadirTexto = () => {
  setShowAddStepAddText(true);
  setShowAddStepAddPict(false);
  setShowAddStepAddVideo(false);
  setShowAddStepAddImage(false);
  setShowAddStepAddAudio(false);
}
// Pulsamos boton añadir pictograma en añadir paso
const handleAnadirPicto = () => {
  setShowAddStepAddText(false);
  setShowAddStepAddPict(true);
  setShowAddStepAddVideo(false);
  setShowAddStepAddImage(false);
  setShowAddStepAddAudio(false);
  cargarPictogramas();
}
// Pulsamos boton añadir video en añadir paso
const handleAnadirVideo = () => {
  setShowAddStepAddText(false);
  setShowAddStepAddPict(false);
  setShowAddStepAddVideo(true);
  setShowAddStepAddImage(false);
  setShowAddStepAddAudio(false);
  cargarVideos();
}
// Pulsamos boton añadir imagen en añadir paso
const handleAnadirImagen = () => {
  setShowAddStepAddText(false);
  setShowAddStepAddPict(false);
  setShowAddStepAddVideo(false);
  setShowAddStepAddImage(true);
  setShowAddStepAddAudio(false);
}

// Pulsamos boton añadir audio en añadir paso
const handleAnadirAudio = () => {
  setShowAddStepAddText(false);
  setShowAddStepAddPict(false);
  setShowAddStepAddVideo(false);
  setShowAddStepAddImage(false);
  setShowAddStepAddAudio(true);
}

// Pulsamos un pictogramaentre los elegidos
const handlePictoPress = (item) => {
  setSelectedPictograma(item);
};

// elegimos un pictograma
const handleGuardarPictograma = () => {
  setStorePictograma (selectedPictograma)
  setIsStorePicto (true)
};

// Borramos pictograma
const handletrashPicto = () => {
  setIsStorePicto (false);
  setStorePictograma('');
};

// Pulsamos un video entre los elegidos
const handleVideoPress = (item) => {
  setSelectedVideo(item);
};

// elegimos un video
const handleGuardarVideo = () => {
  setStoreVideo (selectedVideo)
  setIsStoreVideo (true)
};

// Borramos video
const handletrashVideo = () => {
  setIsStoreVideo (false);
  setStoreVideo('');
};

const guardarDatos = () => {
  setGuardando(true);
  // Simula una operación de guardado que tarda 2 segundos.
  setTimeout(() => {
    setGuardando(false);
    // Aquí iría tu lógica de guardado real
  }, 2000);
};

const showAlertDelete = () => {
  Alert.alert(
    "¿Quiere borrar?", // Título
    "Pulsa una opción", // Mensaje
    [
      { text: "Cancelar", onPress: () => console.log("Cancelar presionado"), style: "cancel" },
      { text: "Confirmar", onPress: () => console.log("Aceptar presionado") }
    ],
    { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
  );
};

const showAlertStore = () => {
  Alert.alert(
    "¿Quiere guardar?", // Título
    "Pulsa una opción", // Mensaje
    [
      { text: "Cancelar", onPress: () => console.log("Cancelar presionado"), style: "cancel" },
      { text: "Confirmar", onPress: () => guardarDatos ()}
    ],
    { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
  );
};

    return (
      <View style={styles.container}>
      <ScrollView>

      <View style={styles.separador} />
      <View style={styles.separador} />

      <Text style={styles.title}>Paso de actividad</Text>

      <View style={styles.separador} />

      <Text style={[styles.text]}>Nombre Paso</Text>

      <View style={styles.separador} />

      <TextInput style={[styles.input]} 
        placeholder="Elija Nombre" 
        value={nombrePaso}
        onChangeText={setNombrePaso}
      />

      <View style={styles.separador} />

      <View style={styles.row}>
        <TouchableOpacity style={styles.addButtonAñadirPaso} onPress={handleAnadirTexto}>
          <Text style={styles.addButtonAñadirPasoText}>Texto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButtonAñadirPaso} onPress={handleAnadirPicto}>
          <Text style={styles.addButtonAñadirPasoText}>Pictograma</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButtonAñadirPaso} onPress={handleAnadirVideo}>
          <Text style={styles.addButtonAñadirPasoText}>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButtonAñadirPaso} onPress={handleAnadirImagen}>
          <Text style={styles.addButtonAñadirPasoText}>Imagen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButtonAñadirPaso} onPress={handleAnadirAudio}>
          <Text style={styles.addButtonAñadirPasoText}>Audio</Text>
        </TouchableOpacity>
      </View>
      
      {
      (!showAddStepAddText && !showAddStepAddPict && !showAddStepAddVideo && !showAddStepAddImage && !showAddStepAddAudio) && (
        <View style={styles.rectangleTexto}>
           <Text style={[{alignItems: 'center'}]}>Elija que item añadir </Text>
        </View>
      )
      }

      {(showAddStepAddText) && (
        <View>
          <View style={styles.rectangleTexto}>
          <TextInput 
            multiline 
            textAlignVertical='top'
            style={styles.inputTexto} 
            placeholder="Escribe aquí..." 
          />
          </View>

          <TouchableOpacity style={styles.addButtonGuardarItem}>
            <Text style={styles.addButtonGuardarItemText}>
              Guardar Texto
            </Text>
          </TouchableOpacity>
          
          
        </View>
      )}
      
      {(showAddStepAddPict) && (
        <View>
          <View style={styles.rectangleOthers}>
            
            {isLoadingPicto ? (
              <Text>Cargando_Pictogramas... </Text>
            ) : (

              <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>

                {dataPicto.map((picto, index) =>(
                  <TouchableOpacity key={index} onPress={() => handlePictoPress (picto)} >
                    <Image key={index} source={{uri: picto.URL}} style={styles.image} />
                  </TouchableOpacity>
                ))}

              </ScrollView>

            )}

          </View>

          <TouchableOpacity 
            style={styles.addButtonGuardarItem}
            onPress={() => handleGuardarPictograma()}
          >
            <Text style={styles.addButtonGuardarItemText}>
              Guardar Pictograma
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {(showAddStepAddVideo) && (
        <View>
          <View style={styles.rectangleOthers}>
            
          {isLoadingVideo ? (
              <Text>Cargando_Videos... </Text>
            ) : (

              <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>

                {dataVideo.map((video, index) =>(
                  <TouchableOpacity key={index} onPress={() => handleVideoPress (video)} >
                    <Text style={styles.videos}>{video.Titulo}</Text>
                  </TouchableOpacity>
                ))}

              </ScrollView>

            )}

          </View>

          <TouchableOpacity 
            style={styles.addButtonGuardarItem}
            onPress={() => handleGuardarVideo()}
          >
            <Text style={styles.addButtonGuardarItemText}>
              Guardar Video
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {(showAddStepAddImage) && (
        <View>
          <View style={styles.rectangleOthers}>
            <TouchableOpacity>
              <Image source={require('../../Imagenes/CrearTarea/fregarSuelo.png')} style={styles.image}></Image>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../Imagenes/CrearTarea/habitacionOrdenada.png')} style={styles.image}></Image>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addButtonGuardarItem}>
            <Text style={styles.addButtonGuardarItemText}>
              Guardar Imagen
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {(showAddStepAddAudio) && (
        <View>
          <View style={styles.rectangleOthers}>
            <TouchableOpacity>
              <Image source={require('../../Imagenes/CrearTarea/Audio1.png')} style={styles.image}></Image>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addButtonGuardarItem}>
            <Text style={styles.addButtonGuardarItemText}>
              Guardar Audio
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={[styles.row, { marginBottom: 12 }]}>
        <Text style={styles.textItemAnadido}>Texto_Añadido </Text>
        <TouchableOpacity style={styles.imageTrashWrapper}>
          <Image 
            source={require('../../Imagenes/CrearTarea/iconoBasura.png')}
            styles={styles.imageTrash} 
          ></Image>
        </TouchableOpacity>
      </View>

      <View style={styles.rectangleChoose}>
        <Text>Ninguno </Text>
      </View>
   
      <View style={[styles.row, { marginBottom: 12 }]}>
        <Text style={styles.textItemAnadido}>Pictograma_Añadido </Text>
        <TouchableOpacity 
          style={styles.imageTrashWrapper}
          onPress={() => handletrashPicto ()}>
          <Image 
            source={require('../../Imagenes/CrearTarea/iconoBasura.png')} 
            style={styles.imageTrash}
          ></Image>
        </TouchableOpacity>
      </View>

      <View style={styles.rectangleChoose}>
        {isStorePicto ? (
          <Image source={{uri: storePictograma.URL}} style={styles.image} />
        ) : (
          <Text>Ninguno </Text>
        )
      }
      </View>
   
      <View style={[styles.row, { marginBottom: 12 }]}>
        <Text style={styles.textItemAnadido}>Video_Añadido </Text>
        <TouchableOpacity  
          style={styles.imageTrashWrapper} 
          onPress={() => handletrashVideo ()} >
          <Image 
            source={require('../../Imagenes/CrearTarea/iconoBasura.png')} 
            style={styles.imageTrash}
          ></Image>
        </TouchableOpacity>
      </View>

      <View style={styles.rectangleChoose}>
        {isStoreVideo ? (
          <Text style={styles.videos}>{storeVideo.Titulo}  </Text>
        ) : (
          <Text>Ninguno </Text>
        )
        }
      </View>
   
      <View style={[styles.row, { marginBottom: 12 }]}>
        <Text style={styles.textItemAnadido}>Imagen_Añadido </Text>
        <TouchableOpacity style={styles.imageTrashWrapper}>
        <Image 
          source={require('../../Imagenes/CrearTarea/iconoBasura.png')} 
          style={styles.imageTrash}
        ></Image>
        </TouchableOpacity>
      </View>

      <View style={styles.rectangleChoose}>
        <Text>Ninguno </Text>
      </View>

      <View style={[styles.row, { marginBottom: 12 }]}>
        <Text style={styles.textItemAnadido}>Audio_Añadido </Text>
        <TouchableOpacity style={styles.imageTrashWrapper}>
        <Image 
          source={require('../../Imagenes/CrearTarea/iconoBasura.png')} 
          style={styles.imageTrash}
        ></Image>
        </TouchableOpacity>
      </View>

      <View style={styles.rectangleChoose}>
        <Text>Ninguno </Text>
      </View>

      <View style={styles.separador}></View>
        
      {guardando && (
            
        <ActivityIndicator size="large" color="#0000ff" />
            
      )}
      
      <View style={[styles.addButtonGuardar]}>
          <Button 
            title="Guardar" 
            onPress={() => showAlertStore ()} 
            style={styles.addButtonText}
            />
        </View>

        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>

      </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    height: 30,
  },
  inputTexto:{
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    marginBottom: 10,
    width: 190,
    height: 60,
    fontSize: 10,
    maxHeight: 200,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  text:{
    fontSize: 15,
  },
  textItemAnadido:{
    position: 'relative', 
    left: 0,
    fontSize: 15
  },
  addButton: {
    backgroundColor: '#808080',
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonGuardar: {
    alignItems: 'center',
    borderRadius: 4,
    width: 80,
    position: 'absolute',
    left:150,
    top: 800
  },
  addButtonAñadirPaso: {
    backgroundColor: '#808080',
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,  
    borderWidth: 1, // Grosor del borde
  },
  addButtonAñadirPasoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  addButtonGuardarItem: {
    padding: 2,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'blue',
    transform: [{translateY: -36},{translateX: 150}],
    height: 20,
    width: 100,
  },
  addButtonGuardarItemText: {
    color: 'white',
    fontSize: 9,
  },
  rectangleTexto: {
    width: Platform.OS === 'web' ? 264 : 278,
    height: 100, // Altura del rectángulo
    backgroundColor: 'white', // Color de fondo del rectángulo
    justifyContent: 'center', // Centra el texto verticalmente
    alignItems: 'center', // Centra el texto horizontalmente
    borderWidth: 1, // Grosor del borde
    marginBottom: 10,
    transform: [{ translateY: -4 }]
  },
  rectangleOthers: {
    width: 278, // Ancho del rectángulo
    height: 100, // Altura del rectángulo
    backgroundColor: 'white', // Color de fondo del rectángulo
    justifyContent: 'space-around', // Centra el texto verticalmente
    alignItems: 'center', // Centra el texto horizontalmente
    borderWidth: 1, // Grosor del borde
    marginBottom: 10,
    transform: [{ translateY: -4 }],
    flexDirection: 'row',
  },
  rectangleChoose:
  {
    width: 190, // Ancho del rectángulo
    height: 60, // Altura del rectángulo
    backgroundColor: 'white', // Color de fondo del rectángulo
    justifyContent: 'center', // Centra el texto verticalmente
    alignItems: 'center', // Centra el texto horizontalmente
    borderWidth: 1, // Grosor del borde
    marginBottom: 10,
    transform: [
      {translateY: -4},
      {translateX: 25},
    ]
  },
  image: {
    width: 50, // Ancho de la imagen
    height: 50, // Altura de la imagen
    resizeMode: 'contain', // Asegura que escale
    marginHorizontal: 10
  },
  imageTrash: {
    width: 20, // Ancho de la imagen
    height: 20, // Altura de la imagen
  },
  imageTrashWrapper:{
    position: 'absolute',
    left:200,
  },
  videos: {
    height: 50, // Altura de la imagen
    resizeMode: 'contain', // Asegura que escale
    marginHorizontal: 20
  },
  separador: {
    height: 10,
  },
});