import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  FlatList,
  Image,
  ScrollView
} from "react-native";
import { almacenaImagen, almacenaPictograma, almacenaVideo, descargaImagenes, descargaVideos, eliminaImagen, eliminaVideo, openGallery } from "../Controlador/multimedia";
import Swal from "sweetalert2";
import { Video, ResizeMode } from 'expo-av';

export default function GestionItemActividad() {
  //Sección de variables para añadir item
  const [urlVideo, setUrlVideo] = useState("");
  const [nombreVideo, setnombreVideo] = useState("");
  const [viewVideo, setViewVideo] = useState(false);

  const [urlPictograma, setUrlPictograma] = useState("");
  const [nombrePictograma, setnombrePictograma] = useState("");
  const [viewPictograma, setViewPictograma] = useState(false);

  const [urlImagen, setUrlImagen] = useState("");
  const [nombreImagen, setNombreImagen] = useState("");
  const [viewImagen, setViewImagen] = useState(false);

  //Sección de variables para eliminar un item
  const vid = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [viewEliminarVideo, setViewEliminarVideo] = useState(false);
  const [videos, setVideos] = useState([]);
  const [videosSeleccionados, setVideosSeleccionados] = useState([]);

  const [viewEliminarPictograma, setViewEliminarPictograma] = useState(false);

  const [viewEliminarImagen, setViewEliminarImagen] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);

  //Sección de funciones
  const handleVideo = () => {
    setViewVideo(true); //
    setViewPictograma(false);
    setViewImagen(false);

    setViewEliminarVideo(false);
    setViewEliminarPictograma(false);
    setViewEliminarImagen(false);
  };
  const handleImagen = () => {
    setViewVideo(false);
    setViewPictograma(false);
    setViewImagen(true); //

    setViewEliminarVideo(false);
    setViewEliminarPictograma(false);
    setViewEliminarImagen(false);
  };
  const handleAudio = () => {
    setViewVideo(false);
    setViewPictograma(false);
    setViewImagen(false);

    setViewEliminarVideo(false);
    setViewEliminarPictograma(false);
    setViewEliminarImagen(false);
  };
  const handlePictograma = () => {
    setViewPictograma(true); //
    setViewVideo(false);
    setViewImagen(false);

    setViewEliminarVideo(false);
    setViewEliminarPictograma(false);
    setViewEliminarImagen(false);
  };

  const handleEliminarVideo = async () => {
    setViewPictograma(false);
    setViewVideo(false);
    setViewImagen(false);

    setViewEliminarVideo(true); //
    setViewEliminarPictograma(false); 
    setViewEliminarImagen(false);

    setVideos(await descargaVideos());
  }
  const handleEliminarImagen = async () => {
    setViewPictograma(false);
    setViewVideo(false);
    setViewImagen(false);

    setViewEliminarVideo(false);
    setViewEliminarPictograma(false);
    setViewEliminarImagen(true); //

    setImagenes(await descargaImagenes());
  }
  const handleEliminarAudio = () => {
    setViewPictograma(false);
    setViewVideo(false);
    setViewImagen(false);

    setViewEliminarVideo(false);
    setViewEliminarPictograma(false);
    setViewEliminarImagen(false);
  }
  const handleEliminarPictograma = () => {
    setViewPictograma(false);
    setViewVideo(false);
    setViewImagen(false);

    setViewEliminarVideo(false);
    setViewEliminarPictograma(true); //
    setViewEliminarImagen(false);
  }

  const handleAñadir = () => {
    if (viewVideo) {
      if (nombreVideo !== "" && urlVideo !== "") {
        almacenaVideo(urlVideo, nombreVideo);
      } else {
        if (Platform.OS === "web"){
          Swal.fire({
            title: "Campos Incompletos",
            text: "Debes rellenar los campos requeridos",
            icon: "warning",
            confirmButtonText: "De acuerdo",
          })
        }else{
          Alert.alert('Campos Incompletos,', 'Debes rellenar los campos requeridos');
        }
      }
    }
  };

  const handleAñadirPictograma = async () => {
    if (viewPictograma) {
      if (nombrePictograma !== "" && urlPictograma !== "") {
        console.log(urlPictograma);
        almacenaPictograma(urlPictograma, nombrePictograma);
      } else {
        if (Platform.OS ===   "web"){
          Swal.fire({
            title: "Campos Incompletos",
            text: "Debes rellenar los campos requeridos",
            icon: "warning",
            confirmButtonText: "De acuerdo",
          })
        }else{
          Alert.alert('Campos Incompletos,', 'Debes rellenar los campos requeridos');
        }
      }
    }
  };

  const handleAñadirImagen = async () => {
    if (viewImagen) {
      if (nombreImagen !== "" && urlImagen !== "") {
        console.log(urlImagen);
        almacenaImagen(urlImagen, nombreImagen);
      } else {
        if (Platform.OS ===   "web"){
          Swal.fire({
            title: "Campos Incompletos",
            text: "Debes rellenar los campos requeridos",
            icon: "warning",
            confirmButtonText: "De acuerdo",
          })
        }else{
          Alert.alert('Campos Incompletos,', 'Debes rellenar los campos requeridos');
        }
      }
    }
  };

  //FUNCIONES PARA ELIMINAR IMAGEN
  //Para seleccionar y deseleccionar una imagen
  const toggleSelection = (imageId) => {
    const index = imagenesSeleccionadas.indexOf(imageId);

    if (index == -1) {
      setImagenesSeleccionadas([...imagenesSeleccionadas, imageId]);
    } else {
      const updatedSelection = [...imagenesSeleccionadas];
      updatedSelection.splice(index,1);
      setImagenesSeleccionadas(updatedSelection);
    }
  };
  
  //Renderizar la imagen
  const renderImage = ({item}) => {
    const isSelected = imagenesSeleccionadas.includes(item.nombre);
    //console.log(item.uri);

    return (
      <TouchableOpacity
        style={isSelected ? styles.selectedImage : styles.image}
        onPress={() => toggleSelection(item.nombre)}
      >
        <Image
          source={{uri: item.uri}}
          style={styles.imageStyle}
        />
      </TouchableOpacity>
    );
  };

  const eliminarImagenes = async () => {
    if (viewEliminarImagen) {
      imagenesSeleccionadas.map((selectedId) => {
        eliminaImagen(selectedId);
      });
      setImagenesSeleccionadas([]);

      console.log("Imágenes eliminadas");

      if (Platform.OS ===   "web"){
        Swal.fire({
          title: "Listo",
          text: "Imágenes borradas correctamente",
          icon: "success",
          confirmButtonText: "De acuerdo",
        })
      }else{
        Alert.alert('Listo', 'Imágenes borradas correctamente');
      }

      //Actualizamos de nuevo las imágenes
      setImagenes(await descargaImagenes());
    }
  }

  //FIN FUNCIONES ELIMINAR IMAGEN

  //FUNCIONES PARA ELIMINAR VIDEO
  //Para seleccionar y deseleccionar un video
  const toggleSelectionVideo = (videoId) => {
    const index = videosSeleccionados.indexOf(videoId);

    if (index == -1) {
      setVideosSeleccionados([...videosSeleccionados, videoId]);
    } else {
      const updatedSelection = [...videosSeleccionados];
      updatedSelection.splice(index,1);
      setVideosSeleccionados(updatedSelection);
    }
  };
  
  //Renderizar el video
  const renderVideo = ({item}) => {
    const isSelected = videosSeleccionados.includes(item.nombre);
    //console.log(item.uri);

    return (
      <TouchableOpacity
        style={isSelected ? styles.selectedImage : styles.image}
        onPress={() => toggleSelectionVideo(item.nombre)}
      >
        <Video ref={vid}
          source={{uri: item.uri}}
          useNativeControls resizeMode={ResizeMode.CONTAIN} isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}/>
      </TouchableOpacity>
    );
  };

  const eliminarVideos = async () => {
    if (viewEliminarVideo) {
      videosSeleccionados.map((selectedId) => {
        eliminaVideo(selectedId);
      });
      setVideosSeleccionados([]);

      console.log("Videos eliminados");

      if (Platform.OS ===   "web"){
        Swal.fire({
          title: "Listo",
          text: "Videos borrados correctamente",
          icon: "success",
          confirmButtonText: "De acuerdo",
        })
      }else{
        Alert.alert('Listo', 'Videos borrados correctamente');
      }

      //Actualizamos de nuevo las imágenes
      setVideos(await descargaVideos());
    }
  }

  //FIN FUNCIONES ELIMINAR VIDEO

  const abrirGaleria = async() => {
    if(viewPictograma) setUrlPictograma(await openGallery());
    else if (viewImagen) setUrlImagen(await openGallery());
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Items Actividad</Text>
      <View>
        {Platform.OS === "web" ? (
          <View>
          <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={handleVideo}>
            <Text style={styles.buttonText}>Añadir Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleAudio}>
            <Text style={styles.buttonText}>Añadir Audio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleImagen}>
            <Text style={styles.buttonText}>Añadir Imagen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePictograma}>
            <Text style={styles.buttonText}>Añadir Pictograma</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
        <TouchableOpacity style={styles.buttonDelete} onPress={handleEliminarVideo} >
            <Text style={styles.buttonText}>Eliminar Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDelete} onPress={handleEliminarAudio} >
            <Text style={styles.buttonText}>Eliminar Audio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDelete} onPress={handleEliminarImagen} >
            <Text style={styles.buttonText}>Eliminar Imagen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDelete} onPress={handleEliminarPictograma} >
            <Text style={styles.buttonText}>Eliminar Pictograma</Text>
          </TouchableOpacity>
          
        </View>
        
        </View>
          
        ) : (
          <>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={handleVideo}>
                <Text style={styles.buttonText}>Añadir Video</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleAudio}>
                <Text style={styles.buttonText}>Añadir Audio</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separador}></View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={handleImagen}>
                <Text style={styles.buttonText}>Añadir Imagen</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handlePictograma}>
                <Text style={styles.buttonText}>Añadir Pictograma</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separador}></View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.buttonDelete} onPress={handleEliminarVideo}>
                <Text style={styles.buttonText}>Eliminar Video</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonDelete} onPress={handleEliminarAudio}>
                <Text style={styles.buttonText}>Eliminar Audio</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separador}></View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.buttonDelete} onPress={handleEliminarImagen}>
                <Text style={styles.buttonText}>Eliminar Imagen</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonDelete} onPress={handleEliminarPictograma}>
                <Text style={styles.buttonText}>Eliminar Pictograma</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      {viewVideo && (
        <View>
          <Text style={[styles.text]}>Introduzca URL:</Text>

          <View style={styles.separador} />

          <TextInput
            style={[styles.input]}
            placeholder="URL"
            value={urlVideo}
            onChangeText={setUrlVideo}
          />

          <View style={styles.separador} />
          <View style={styles.separador} />

          <Text style={[styles.text]}>Introduzca Nombre:</Text>

          <View style={styles.separador} />

          <TextInput
            style={[styles.input]}
            placeholder="Elija Nombre"
            value={nombreVideo}
            onChangeText={setnombreVideo}
          />

          <View style={styles.separador5} />
          <View style={styles.separador5} />

          <TouchableOpacity style={styles.addButton} onPress={handleAñadir}>
            <Text style={styles.addButtonText}>Añadir</Text>
          </TouchableOpacity>
        </View>
      )}
      {viewPictograma && (
        <View>

          <View style={styles.separador} />

          <TouchableOpacity style={styles.buttonAñadir} onPress={()  => abrirGaleria()}>
            <Text>Pulsa el botón para elegir Pictograma</Text>
          </TouchableOpacity>



          <View style={styles.separador} />
          <View style={styles.separador} />

          <Text style={[styles.text]}>Introduzca Nombre:</Text>

          <View style={styles.separador} />

          <TextInput
            style={[styles.input]}
            placeholder="Elija Nombre"
            value={nombrePictograma}
            onChangeText={setnombrePictograma}
          />
          
          <View style={styles.separador5} />
          <View style={styles.separador5} />

          <TouchableOpacity style={styles.addButton} onPress={handleAñadirPictograma}>
            <Text style={styles.addButtonText}>Añadir</Text>
          </TouchableOpacity>
        </View>
      )}
      {viewImagen && (
        <View>

          <View style={styles.separador} />

          <TouchableOpacity style={styles.buttonAñadir} onPress={()  => abrirGaleria()}>
            {urlImagen=="" ? (<Text>Pulsa el botón para elegir Imagen</Text>) : (<Text style={styles.textoSeleccionado}>Imagen Seleccionada </Text>)}
          </TouchableOpacity>



          <View style={styles.separador} />
          <View style={styles.separador} />

          <Text style={[styles.text]}>Introduzca Nombre:</Text>

          <View style={styles.separador} />

          <TextInput
            style={[styles.input]}
            placeholder="Elija Nombre"
            value={nombreImagen}
            onChangeText={setNombreImagen}
          />
          
          <View style={styles.separador5} />
          <View style={styles.separador5} />

          <TouchableOpacity style={styles.addButton} onPress={handleAñadirImagen}>
            <Text style={styles.addButtonText}>Añadir</Text>
          </TouchableOpacity>
        </View>
      )}
      {viewEliminarImagen && (
        <ScrollView>
          <View style={styles.separador} />

          <Text style={styles.text}>Selecciona las imágenes a eliminar:</Text>

          <View style={styles.separador}/>
          <View style={styles.separador}/>

          <View style={styles.container}>
          
            <FlatList
              data={imagenes}
              renderItem={renderImage}
              keyExtractor={(item) => item.name}
              numColumns={3}
              contentContainerStyle={styles.imageGrid}
            />
            <View style={styles.selectedImagesContainer}>
              <Text>Imágenes seleccionadas:</Text>
              {imagenesSeleccionadas.map((selectedId) => (
                <Text key={selectedId}>{imagenes.find(item => item.nombre == selectedId).nombre}</Text>
              ))}
            </View>
          </View>

          <View style={styles.separador}/>

          <TouchableOpacity style={styles.buttonDelete} onPress={eliminarImagenes}>
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      {viewEliminarVideo && (
        <ScrollView>
          <View style={styles.separador} />

          <Text style={styles.text}>Selecciona los vídeos a eliminar:</Text>

          <View style={styles.separador}/>
          <View style={styles.separador}/>

          <View style={styles.container}>
          
            <FlatList
              data={videos}
              renderItem={renderVideo}
              keyExtractor={(item) => item.name}
              numColumns={3}
              contentContainerStyle={styles.imageGrid}
            />
            <View style={styles.selectedImagesContainer}>
              <Text>Videos seleccionadas:</Text>
              {videosSeleccionados.map((selectedId) => (
                <Text key={selectedId}>{videos.find(item => item.nombre == selectedId).nombre}</Text>
              ))}
            </View>
          </View>

          <View style={styles.separador}/>

          <TouchableOpacity style={styles.buttonDelete} onPress={eliminarVideos}>
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#e0e0e0", // Un color gris claro para los botones
    padding: 10,
    marginVertical: 5,
    width: 100,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d0d0d0", // Un borde ligeramente más oscuro que el fondo del botón
    marginHorizontal: Platform.OS === "web" ? 10 : 3,
  },
  buttonAñadir: {
    backgroundColor: "#e0e0e0", // Un color gris claro para los botones
    padding: 5,
    marginVertical: 1,
    width: 250,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d0d0d0", // Un borde ligeramente más oscuro que el fondo del botón
    marginHorizontal: Platform.OS === "web" ? 10 : 3,
  },
  buttonDelete: {
    backgroundColor: "#FF0000", // Un color gris claro para los botones
    padding: 10,
    marginVertical: 5,
    width: 100,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d0d0d0", // Un borde ligeramente más oscuro que el fondo del botón
    marginHorizontal: Platform.OS === "web" ? 10 : 3,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "green",
    padding: 15,
    width: 100,
    position: "absolute", // Posicionar el botón en la parte inferior de la pantalla
    bottom: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
  },
  separador: {
    height: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    marginBottom: 10,
    width: 250,
    height: 30,
    padding: 5,
  },
  text: {
    fontSize: 15,
  },
  separador: {
    height: 10,
  },
  separador5: {
    height: 50,
  },
  textoSeleccionado: {
    color: "green"
  },
  image: {
    margin: 5,
    width: 100,
    height: 100,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'black',
},
  selectedImage: {
    margin: 5,
    width: 100,
    height: 100,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'green',
  },
  imageStyle: {
    width: '100%',
    height: 100,
  },
  selectedImagesContainer: {
    marginTop: 20,
  },
  imageGrid: {
    justifyContent: 'space-between', // Espacio entre las filas
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});