import React, { useEffect, useState } from "react";
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
import { setVideo } from "../Modelo/firebase";
import {   descargaPictogramas, eliminaPictograma } from "../Controlador/multimedia";
import { almacenaImagen, almacenaPictograma, almacenaVideo, descargaImagenes, eliminaImagen, openGallery } from "../Controlador/multimedia";
import Swal from "sweetalert2";
import { ActivityIndicator } from "react-native-web";

export default function GestionItemActividad() {
  //Sección de variables para añadir item

  const [isLoading, setIsLoading] = useState(false);

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
  const [viewEliminarVideo, setViewEliminarVideo] = useState(false);

  const [viewEliminarPictograma, setViewEliminarPictograma] = useState(false);
  const [pictogramas,setPictogramas] = useState([]);
  const [pictogramasSeleccionados, setPictogramasSeleccionados] = useState([]);


  const [viewEliminarImagen, setViewEliminarImagen] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);

  //Sección de funciones de visibilidad
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
    setViewEliminarPictograma(false);
    setViewImagen(false);

    setViewEliminarVideo(false);
    setViewEliminarPictograma(false);
    setViewEliminarImagen(false);
  };

  const handleEliminarVideo = () => {
    setViewPictograma(false);
    setViewVideo(false);
    setViewImagen(false);

    setViewEliminarVideo(true); //
    setViewEliminarPictograma(false); 
    setViewEliminarImagen(false);
  }
  const handleEliminarImagen = async () => {
    setViewPictograma(false);
    setViewVideo(false);
    setViewImagen(false);

    setViewEliminarVideo(false);
    setViewEliminarPictograma(false);
    setViewEliminarImagen(true); //

    setIsLoading(true);
    try{
      setImagenes(await descargaImagenes());
    }catch {
      console.log('Error al descargar las imagenes');
    } finally {
      setIsLoading(false);
    }
  }
  const handleEliminarAudio = () => {
    setViewPictograma(false);
    setViewVideo(false);
    setViewImagen(false);

    setViewEliminarVideo(false);
    setViewEliminarPictograma(false);
    setViewEliminarImagen(false);
  }
  const handleEliminarPictograma = async () => {
    setViewPictograma(false);
    setViewVideo(false);
    setViewImagen(false);

    setViewEliminarVideo(false);
    setViewEliminarPictograma(true); //
    setViewEliminarImagen(false);

    setIsLoading(true);
    try{
      setPictogramas(await descargaPictogramas());
    }catch {
      console.log('Error al descargar los pictogramas');
    } finally {
      setIsLoading(false);
    }
    //setPictogramas(await descargaPictogramas());
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
  // funcion para añadir pictogramas
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



  // funcion para añadir imagen
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



  // FUNCIONES PARA ELIMINAR PICTOGRAMAS

   //Para seleccionar y deseleccionar una imagen
   const toggleSelectionPictograma = (pictogramaid) => {
    const index = pictogramasSeleccionados.indexOf(pictogramaid);

    if (index == -1) {
      setPictogramasSeleccionados([...pictogramasSeleccionados, pictogramaid]);
    } else {
      const updatedSelection = [...pictogramasSeleccionados];
      updatedSelection.splice(index,1);
      setPictogramasSeleccionados(updatedSelection);
    }
  };
  
  //Renderizar la imagen
  const renderPictograma = ({item}) => {
    const isSelected = pictogramasSeleccionados.includes(item.nombre);
    //console.log(item.uri);

    return (
      <TouchableOpacity
        style={isSelected ? styles.selectedImage : styles.image}
        onPress={() => toggleSelectionPictograma(item.nombre)}
      >
        <Image
          source={{uri: item.uri}}
          style={styles.imageStyle}
        />
      </TouchableOpacity>
    );
  };
  // funcion para eliminar los pictogramas seleccionados
  const EliminarPictograma = async () => {
    if (viewEliminarPictograma) {
      pictogramasSeleccionados.map((selectedId) => {
        eliminaPictograma(selectedId);
      })
      setPictogramasSeleccionados([]);

      console.log("Pictogramas eliminados");

      if (Platform.OS ===   "web"){
        Swal.fire({
          title: "Listo",
          text: "Pictogramas borrados correctamente",
          icon: "success",
          confirmButtonText: "De acuerdo",
        })
      }else{
        Alert.alert('Listo', 'Pictogramas borrados correctamente');
      }

      //Actualizamos de nuevo los pictogramas
      setPictogramas(await descargaPictogramas());
    }
  }

  // FIN DE FUNCIONES PARA ELIMINAR PICTOGRAMAS


  // Funcion para abrir la galeria
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
      {viewEliminarPictograma && (
        <ScrollView>
        <View style={styles.separador} />

        <Text style={styles.text}>Selecciona los pictogramas a eliminar:</Text>

        <View style={styles.separador}/>
        <View style={styles.separador}/>
        {isLoading ? (
          <ActivityIndicator size = "large" color="black" />
        ) : (
          <View style={styles.container}>
        
          <FlatList
            data={pictogramas}
            renderItem={renderPictograma}
            keyExtractor={(item) => item.name}
            numColumns={3}
            contentContainerStyle={styles.imageGrid}
          />
          <View style={styles.selectedImagesContainer}>
            <Text>Pictogramas seleccionados:</Text>
            {pictogramasSeleccionados.map((selectedId) => (
              <Text key={selectedId}>{pictogramas.find(item => item.nombre == selectedId).nombre}</Text>
            ))}
          </View>
        </View>
        )}
       

        <View style={styles.separador}/>

        <TouchableOpacity style={styles.buttonDelete} onPress={EliminarPictograma}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </ScrollView>
      )}
      {viewImagen && (
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
      {viewEliminarImagen && (
        <ScrollView>
          <View style={styles.separador} />

          <Text style={styles.text}>Selecciona las imágenes a eliminar:</Text>

          <View style={styles.separador}/>
          <View style={styles.separador}/>

          {isLoading ? (
            <ActivityIndicator size = "large" color="black"/>
          ) : (
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
          )}

          <View style={styles.separador}/>

          <TouchableOpacity style={styles.buttonDelete} onPress={eliminarImagenes}>
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
