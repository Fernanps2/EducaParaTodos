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
        </View>
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAñadir}>
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
