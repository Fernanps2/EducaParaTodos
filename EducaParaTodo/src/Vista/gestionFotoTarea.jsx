import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import Swal from "sweetalert2";
import { RFValue } from "react-native-responsive-fontsize";
import {
  almacenaTipoTarea,
  descargaTipoTareas,
  openGallery,
  eliminaTipoTarea,
} from "../Controlador/multimedia";

export default function GestionFotoTarea() {
  // Variables para guardar datos
  const [urlFoto, setUrlFoto] = useState("");
  const [nombreFoto, setnombrefoto] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null);

  // Variables para renderizar el contenido
  const [viewAnadirFoto, setViewAnadirFoto] = useState(false);
  const [viewEliminarFoto, setViewEliminarFoto] = useState(false);
  const [cargando, setCargando] = useState(true);

  // Variable para actualizar las variables con la información actualizada de la base de datos
  const [actualizar, setActualizar] = useState(0);

  useEffect(() => {
    /**
     * La función descarga es una asíncrona que descarga las fotos de la base de datos para su posterior uso.
     * Además cambia el estado de carga a false.
     */
    const descargar = async () => {
      const datos = await descargaTipoTareas();
      setImagenes(datos);
      setCargando(false);
    };

    descargar();
  }, [actualizar]);

  // Función para cuando se seleccionada la opción de añadir foto
  const handleanadir = () => {
    setViewAnadirFoto(true);
    setViewEliminarFoto(false);
    setFotoSeleccionada(null);
  };

  // Función que renderiza contenido cuando se seleccióna la opción de eliminar foto
  const handleEliminar = () => {
    setViewAnadirFoto(false);
    setViewEliminarFoto(true);
    setFotoSeleccionada(null);
    setActualizar(actualizar + 1);
  };

  // añade una imagen a la base de datos, lleva consigo mensajes de aviso de error e informativos
  const handleAñadirImagen = async () => {
    if (nombreFoto !== "" && urlFoto !== "") {
      await almacenaTipoTarea(urlFoto, nombreFoto + ".png");
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
      setViewAnadirFoto(false);
      setnombrefoto("");
      setUrlFoto("");
      setActualizar(actualizar + 1);
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
  };

  // Cuando se selcciona una foto se guarda su nombre en la variable fotoSeleccionada
  const seleccionarFoto = (nombre) => {
    setFotoSeleccionada(nombre);
  };

  // Cambia el estilo según ese foto ha sido seleccionada o no.
  const estilosImagen = (nombre) => {
    return nombre === fotoSeleccionada
      ? styles.imagenSeleccionada
      : styles.imagen;
  };

  // Elimina una foto de la base de datos, hace pregunta de confirmación, de información (cuando esta borrada).
  const handleEliminarImagen = async () => {
    if (Platform.OS === "web") {
      Swal.fire({
        title: "¿Seguro que quieres eliminar?",
        text: "La foto se borrará para siempre.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "blue",
        confirmButtonText: "Borrar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (fotoSeleccionada === null) {
            Swal.fire({
              title: "Imagen no escogida",
              text: "Debes de escoger antes una imagen",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "blue",
              cancelButtonColor: "red",
              confirmButtonText: "De acuerdo",
              cancelButtonText: "Cancelar",
            });
          } else {
            await eliminaTipoTarea(fotoSeleccionada);
            Swal.fire({
              title: "Eliminación completada",
              text: "La imagen se ha eliminado con éxito",
              icon: "success",
              confirmButtonText: "De acuerdo",
            });
            setFotoSeleccionada(null);
            setActualizar(actualizar + 1);
          }
        }
      });
    } else {
      Alert.alert(
        "¿Seguro que quieres eliminar?",
        "La foto se borrará para siempre.",
        [
          { text: "Cancelar" },
          {
            text: "Confirmar",
            onPress: async () => {
              if (fotoSeleccionada === null) {
                Alert.alert(
                  "Eliminación completada",
                  "Debes de escoger antes una imagen",
                  [
                    { text: "Cancelar" },
                    {
                      text: "Confirmar"},
                  ]
                );
              } else {
                await eliminaTipoTarea(fotoSeleccionada);
                Alert.alert(
                  "Eliminación completada",
                  "La imagen se ha eliminado con éxito"
                );
                setFotoSeleccionada(null);
                setActualizar(actualizar + 1);
              }
            },
          },
        ],
        { cancelable: true } // Si se puede cancelar tocando fuera de la alerta"
      );
    }
  };

  return (
    <>
      {cargando ? (
        <View style={styles.container}>
          <Text> Cargando...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Fotos para Tareas</Text>
          <View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={handleanadir}>
                <Text style={styles.buttonText}>Añadir Foto</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleEliminar}>
                <Text style={styles.buttonText}>Eliminar Foto</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.separador} />
          <View style={styles.separador} />
          <View style={styles.separador} />
          <View style={styles.separador} />

          {viewAnadirFoto && (
            <View style={styles.container}>
              <View style={styles.separador} />

              <TouchableOpacity
                style={styles.buttonAñadir}
                onPress={async () => {
                  setUrlFoto(await openGallery());
                }}
              >
                {urlFoto == "" ? (
                  <Text style={styles.textoNoSeleccionado}>
                    Pulsa el botón para elegir Imagen
                  </Text>
                ) : (
                  <Text style={styles.textoSeleccionado}>
                    Imagen Seleccionada{" "}
                  </Text>
                )}
              </TouchableOpacity>

              <View style={styles.separador} />
              <View style={styles.separador} />

              <Text style={[styles.text]}>Introduzca Nombre:</Text>

              <View style={styles.separador} />

              <TextInput
                style={[styles.input]}
                placeholder="Elija nombre para la foto"
                value={nombreFoto}
                onChangeText={setnombrefoto}
              />

              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAñadirImagen}
              >
                <Text style={styles.addButtonText}>Añadir</Text>
              </TouchableOpacity>
            </View>
          )}

          {viewEliminarFoto && (
            <View style={styles.container}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {imagenes.map((img, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => seleccionarFoto(img.nombre)}
                  >
                    <Image
                      source={{ uri: img.uri }}
                      style={estilosImagen(img.nombre)}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleEliminarImagen}
              >
                <Text style={styles.addButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </>
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
  deleteButton: {
    backgroundColor: "red",
    padding: 15,
    width: 100,
    position: "absolute", // Posicionar el botón en la parte inferior de la pantalla
    bottom: 20,
    borderRadius: 5,
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
  imagen: {
    width: RFValue(100), // Ejemplo
    height: RFValue(100), // Ejemplo
    margin: RFValue(5),
  },
  imagenSeleccionada: {
    borderWidth: 2,
    borderColor: "blue",
    width: RFValue(100), // Ejemplo
    height: RFValue(100), // Ejemplo
    margin: RFValue(5),
  },
});
