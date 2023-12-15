import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { setVideo } from "../Modelo/firebase";
import { almacenaPictograma, openGallery } from "../Controlador/multimedia";

export default function GestionItemActividad() {
  const [urlVideo, setUrlVideo] = useState("");
  const [nombreVideo, setnombreVideo] = useState("");
  const [viewVideo, setViewVideo] = useState(false);

  const [urlPictograma, setUrlPictograma] = useState("");
  const [nombrePictograma, setnombrePictograma] = useState("");
  const [viewPictograma, setViewPictograma] = useState(false);

  const handleVideo = () => {
    setViewVideo(true);
    setViewPictograma(false);
  };
  const handleImagen = () => {
    setViewVideo(false);
    setnombreVideo("");
    setUrlVideo("");
    setViewPictograma(false);
  };
  const handleAudio = () => {
    setViewVideo(false);
    setnombreVideo("");
    setUrlVideo("");
    setViewPictograma(false);
  };
  const handlePictograma = () => {
    setViewPictograma(true);
    setViewVideo(false);
  };

  const handleAñadir = () => {
    if (viewVideo) {
      if (nombreVideo !== "" && urlVideo !== "") {
        setVideo(nombreVideo, urlVideo);
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

  const abrirGaleria = async() => {
    setUrlPictograma(await openGallery());
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
        <TouchableOpacity style={styles.buttonDelete} >
            <Text style={styles.buttonText}>Eliminar Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDelete} >
            <Text style={styles.buttonText}>Eliminar Audio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDelete} >
            <Text style={styles.buttonText}>Eliminar Imagen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDelete} >
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
              <TouchableOpacity style={styles.buttonDelete} >
                <Text style={styles.buttonText}>Eliminar Video</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonDelete} >
                <Text style={styles.buttonText}>Eliminar Audio</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separador}></View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.buttonDelete} >
                <Text style={styles.buttonText}>Eliminar Imagen</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonDelete}>
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
});
