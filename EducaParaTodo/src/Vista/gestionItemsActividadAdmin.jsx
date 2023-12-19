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
import Swal from "sweetalert2";
import { anadeVideo } from "../Controlador/tareas";
import { almacenaVideo, openGallery } from "../Controlador/multimedia";

export default function GestionItemActividad() {
  const [urlVideo, setUrlVideo] = useState("");
  const [nombreVideo, setnombreVideo] = useState("");
  const [viewVideo, setViewVideo] = useState(false);

  const handleVideo = () => {
    setViewVideo(true);
  };
  const handleImagen = () => {
    setViewVideo(false);
    setnombreVideo("");
    setUrlVideo("");
  };
  const handleAudio = () => {
    setViewVideo(false);
    setnombreVideo("");
    setUrlVideo("");
  };
  const handlePictograma = () => {
    setViewVideo(false);
    setnombreVideo("");
    setUrlVideo("");
  };
  const handleAñadirVideo = async () => {
    if (viewVideo) {
      if (nombreVideo !== "" && urlVideo !== "") {
        await almacenaVideo(urlVideo, nombreVideo + ".mp4");
        if (Platform.OS === "web") {
          Swal.fire({
            title: "Subida completada",
            text: "El video se ha añadido con éxito",
            icon: "success",
            confirmButtonText: "De acuerdo",
          });
        } else {
          Alert.alert("Subida completada", "El video se ha añadido con éxito");
        }
        setViewVideo(false);
        setnombreVideo("");
        setUrlVideo("");
      } else {
        if (Platform.OS === "web") {
          Swal.fire({
            title: "Campos Incompletos",
            text: "Debes rellenar los campos requeridos",
            icon: "warning",
            confirmButtonText: "De acuerdo",
          });
        } else {
          Alert.alert(
            "Campos Incompletos,",
            "Debes rellenar los campos requeridos"
          );
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Items Actividad</Text>
      <View>
        {Platform.OS === "web" ? (
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
              <TouchableOpacity
                style={styles.button}
                onPress={handlePictograma}
              >
                <Text style={styles.buttonText}>Añadir Pictograma</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      <View style={styles.separador} />
      <View style={styles.separador} />
      <View style={styles.separador} />
      <View style={styles.separador} />
      {viewVideo && (
        <View style={styles.container}>
          <View style={styles.separador} />

          <TouchableOpacity
            style={styles.buttonAñadir}
            onPress={async () => {
              setUrlVideo(await openGallery());
            }}
          >
            {urlVideo == "" ? (
              <Text style={styles.textoNoSeleccionado}>
                Pulsa el botón para elegir Video
              </Text>
            ) : (
              <Text style={styles.textoSeleccionado}>Video Seleccionado </Text>
            )}
          </TouchableOpacity>

          <View style={styles.separador} />
          <View style={styles.separador} />

          <Text style={[styles.text]}>Introduzca Nombre:</Text>

          <View style={styles.separador} />

          <TextInput
            style={[styles.input]}
            placeholder="Elija nombre para el video"
            value={nombreVideo}
            onChangeText={setnombreVideo}
          />
        </View>
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAñadirVideo}>
        <Text style={styles.addButtonText}>Añadir</Text>
      </TouchableOpacity>
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
  textoSeleccionado: {
    color: "green",
    textAlign: "center",
    fontWeight: "bold",
  },
  textoNoSeleccionado: {
    textAlign: "center",
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
});
