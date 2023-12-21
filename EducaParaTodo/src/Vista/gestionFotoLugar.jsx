import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Swal from "sweetalert2";
import { RFValue } from "react-native-responsive-fontsize";
import {
  descargaLugarNoAula,
  descargaLugaresNoAulas,
  almacenaFotoLugar,
  eliminaFotoLugar,
  openGallery,
} from "../Controlador/multimedia";
import {
  buscarLugaresNoAulas,
  modificarLugarNoAula,
} from "../Controlador/tareas";

export default function GestionFotoLugar() {
  // Variables para base de datos
  const [lugares, setLugares] = useState([]); // Guardamos los lugares cargados de la base de datos
  const [imagenes, setImagenes] = useState([]); // Guardamos todas las imagenes de la carpeta de storage
  const [cargando, setCargando] = useState(true);
  const [cargandoFoto, setCargandoFoto] = useState(true);

  // Variables para añadir foto
  const [urlFoto, setUrlFoto] = useState("");
  const [nombreFoto, setNombreFoto] = useState("");

  // Variables para eliminar foto
  const [nombreEliminar, setNombreEliminar] = useState("");

  // Variables para gestionar foto
  const [lugar, setLugar] = useState(""); // donde se guarda el lugar elegido
  const [uriFoto, setUriFoto] = useState("");
  const [fotoSeleccionada, setFotoSeleccionada] = useState("");

  // Variables para renderizar
  const [viewFotos, setViewFotos] = useState(false);
  const [viewFoto, setViewFoto] = useState(false);
  const [viewAnadirFoto, setViewAnadirFoto] = useState(false);
  const [viewGestionarFoto, setViewGestionarFoto] = useState(false);
  const [viewEliminarFoto, setViewEliminarFoto] = useState(false);

  const [actualizar, setActualizar] = useState(0);

  useEffect(() => {
    const descargar = async () => {
      const datosOriginales = await buscarLugaresNoAulas();

      // Crear el objeto adicional
      const objetoAdicional = {
        nombre: "Ninguno",
        foto: "",
      };

      // Añadir el objeto al principio del array creando un nuevo array
      const datosModificados = [objetoAdicional, ...datosOriginales];

      console.log("datos:", datosModificados);
      // Actualizar el estado
      setLugares(datosModificados);

      const data = await descargaLugaresNoAulas();
      setImagenes(data);

      setCargando(false);
    };

    descargar();
  }, [actualizar]);

  // Funcion para eliminar foto
  const handleEliminarImagen = () => {
    if (nombreEliminar === "") {
      if (Platform.OS === "web") {
        Swal.fire({
          title: "Imagen no seleccionada",
          text: "Seleccione la imagen para eliminar",
          icon: "warning",
          confirmButtonText: "De acuerdo",
        });
      } else {
        Alert.alert(
          "Imagen no seleccionada,",
          "Seleccione la imagen para eliminar"
        );
      }
    } else {
      if (Platform.OS === "web") {
        Swal.fire({
          title: "¿Seguro que quieres eliminar la foto?",
          text: "La foto se eliminará.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "red",
          cancelButtonColor: "blue",
          confirmButtonText: "Eliminar",
          cancelButtonText: "Cancelar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await eliminaFotoLugar(nombreEliminar);
            setViewEliminarFoto(false);
            setActualizar(actualizar + 1);
            Swal.fire({
              title: "Imagen eliminada",
              text: "La imagen ha sido eliminada",
              icon: "success",
              confirmButtonText: "De acuerdo",
            });
          }
        });
      } else {
        Alert.alert(
          "¿Seguro que quieres eliminar la foto?",
          "La foto se eliminará.",
          [
            { text: "Cancelar" },
            {
              text: "Confirmar",
              onPress: async () => {
                await eliminaFotoLugar(nombreEliminar);
                setViewEliminarFoto(false);
                setActualizar(actualizar + 1);
                Alert.alert("Imagen eliminada", "La imagen ha sido eliminada");
              },
            },
          ],
          { cancelable: true } // Si se puede cancelar tocando fuera de la alerta"
        );
      }
    }
  };

  // Funciones para añadir foto

  const handleIntercambiarImagen = () => {
    if (fotoSeleccionada === "") {
      if (Platform.OS === "web") {
        Swal.fire({
          title: "Imagen no seleccionada",
          text: "Seleccione la imagen que prefiera",
          icon: "warning",
          confirmButtonText: "De acuerdo",
        });
      } else {
        Alert.alert(
          "Imagen no seleccionada,",
          "Seleccione la imagen que prefiera"
        );
      }
    } else {
      if (Platform.OS === "web") {
        Swal.fire({
          title: "¿Seguro que quieres cambiar la foto?",
          text: "La foto se modificará.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "blue",
          cancelButtonColor: "red",
          confirmButtonText: "Modificar",
          cancelButtonText: "Cancelar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const idLugar = lugares.find((obj) => obj.nombre === lugar);
            await modificarLugarNoAula(idLugar.id, lugar, fotoSeleccionada);
            setViewFotos(false);
            setViewFoto(false);
            setActualizar(actualizar + 1);
            Swal.fire({
              title: "Imagen modificada",
              text: "La imagen ha sido actualizada",
              icon: "success",
              confirmButtonText: "De acuerdo",
            });
          }
        });
      } else {
        Alert.alert(
          "¿Seguro que quieres cambiar la foto?",
          "La foto se modificará.",
          [
            { text: "Cancelar" },
            {
              text: "Confirmar",
              onPress: async () => {
                const idLugar = lugares.find((obj) => obj.nombre === lugar);
                await modificarLugarNoAula(idLugar.id, lugar, fotoSeleccionada);
                setViewFotos(false);
                setViewFoto(false);
                setActualizar(actualizar + 1);
                Alert.alert(
                  "Imagen modificada",
                  "La imagen ha sido actualizada"
                );
              },
            },
          ],
          { cancelable: true } // Si se puede cancelar tocando fuera de la alerta"
        );
      }
    }
  };

  const handleCambiarImagen = () => {
    setViewFotos(true);
  };

  const handleElegirImagen = async () => {
    if (lugar !== "" && lugar !== "Ninguno") {
      setViewFotos(false);
      setCargandoFoto(true);
      setViewFoto(true);
      const lugarEncontrado = lugares.find((obj) => obj.nombre === lugar);
      setUriFoto(await descargaLugarNoAula(lugarEncontrado.foto));
      setCargandoFoto(false);
    } else {
      if (Platform.OS === "web") {
        Swal.fire({
          title: "Campos Incompletos",
          text: "El lugar no debe se Ninguno",
          icon: "warning",
          confirmButtonText: "De acuerdo",
        });
      } else {
        Alert.alert("Campos Incompletos,", "El lugar no debe se Ninguno");
      }
    }
  };

  // Funciones para eliminar foto

  const seleccionarFoto = (nombre) => {
    setFotoSeleccionada(nombre);
    // Aquí puedes agregar lógica adicional para eliminar la foto si lo deseas
  };

  const estilosImagen = (nombre) => {
    return nombre === fotoSeleccionada
      ? styles.imagenSeleccionada
      : styles.imagen;
  };

  const estilosImagenEliminar = (nombre) => {
    return nombre === nombreEliminar
      ? styles.imagenSeleccionada
      : styles.imagen;
  };

  const borrarTodo = () => {
    setNombreFoto("");
    setUrlFoto("");
    setLugar("");
    setNombreEliminar("");
    setUriFoto("");
    setFotoSeleccionada("");
  }

  const handleAnadir = () => {
    setViewGestionarFoto(false);
    setViewAnadirFoto(true);
    setViewEliminarFoto(false);
    setViewFotos(false);
    setViewFoto(false);
    borrarTodo();
  };

  const handleGestionar = () => {
    setViewGestionarFoto(true);
    setViewAnadirFoto(false);
    setViewEliminarFoto(false);
    setViewFotos(false);
    setViewFoto(false);
    borrarTodo();
  };

  const handleEliminar = () => {
    setViewGestionarFoto(false);
    setViewAnadirFoto(false);
    setViewEliminarFoto(true);
    setViewFotos(false);
    setViewFoto(false);
    borrarTodo();
  };

  const handleAñadirImagen = async () => {
    if (nombreFoto !== "" && urlFoto !== "") {
      await almacenaFotoLugar(urlFoto, nombreFoto + ".png");
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
      setNombreFoto("");
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

  return (
    <>
      {cargando ? (
        <View style={styles.container}>
          <Text> Cargando...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Fotos para lugares</Text>

          <View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={handleAnadir}>
                <Text style={styles.buttonText}>Añadir Foto</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleEliminar}>
                <Text style={styles.buttonText}>Eliminar fotos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleGestionar}>
                <Text style={styles.buttonText}>Gestionar fotos</Text>
              </TouchableOpacity>
            </View>
          </View>

          {Platform.OS === "web" && (
                <View>
                  <View style={styles.separador} />
                  <View style={styles.separador} />
                </View>
              )}

          {viewEliminarFoto && (
            <View style={styles.container}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {imagenes.map((img, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setNombreEliminar(img.nombre)}
                  >
                    <Image
                      source={{ uri: img.uri }}
                      style={estilosImagenEliminar(img.nombre)}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleEliminarImagen}
              >
                <Text style={styles.selectButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}

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
                onChangeText={setNombreFoto}
              />

              <TouchableOpacity
                style={styles.selectButton}
                onPress={handleAñadirImagen}
              >
                <Text style={styles.selectButtonText}>Añadir</Text>
              </TouchableOpacity>
            </View>
          )}

          {viewGestionarFoto && (
            <View style={styles.container}>
              <Text style={styles.text}>
                {"Elija el lugar al que quiera modificar su foto. "}
              </Text>

              <View style={styles.separador} />

              <Picker
                selectedValue={lugar}
                onValueChange={(itemValue, itemIndex) => setLugar(itemValue)}
                style={styles.picker}
              >
                {lugares.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.nombre}
                    value={item.nombre}
                  />
                ))}
              </Picker>

              {Platform.OS === "web" && (
                <View>
                  <View style={styles.separador} />
                  <View style={styles.separador} />
                </View>
              )}

              <TouchableOpacity
                style={styles.selectButton}
                onPress={handleElegirImagen}
              >
                <Text style={styles.selectButtonText}>Elegir</Text>
              </TouchableOpacity>

              {viewFoto && (
                <View style={styles.container}>
                  {cargandoFoto ? (
                    <Text style={styles.text}>Cargando...</Text>
                  ) : (
                    <View style={styles.container}>
                      <Image
                        source={{ uri: uriFoto.uri }}
                        style={styles.imagen}
                      />
                      <Text style={styles.text}>{"Imagen actual "}</Text>
                      <View style={styles.separador} />
                      <TouchableOpacity
                        style={styles.changeButton}
                        onPress={handleCambiarImagen}
                      >
                        <Text style={styles.selectButtonText}>Cambiar</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}

              {viewFotos && (
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
                    onPress={handleIntercambiarImagen}
                  >
                    <Text style={styles.selectButtonText}>Confirmar</Text>
                  </TouchableOpacity>
                </View>
              )}
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
  selectButton: {
    backgroundColor: "lightblue",
    padding: Platform.OS === 'web' ? 10 : 5,
    width: 100,
    borderRadius: 5,
  },
  selectButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  changeButton: {
    backgroundColor: "gray",
    padding: 10,
    width: 100,
    borderRadius: 5,
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
    width: Platform.OS === "web" ? RFValue(50) : RFValue(60),
    height: Platform.OS === "web" ? RFValue(50) : RFValue(60),
    margin: RFValue(5),
  },
  imagenSeleccionada: {
    borderWidth: 2,
    borderColor: "blue",
    width: Platform.OS === "web" ? RFValue(50) : RFValue(60),
    height: Platform.OS === "web" ? RFValue(50) : RFValue(60),
    margin: RFValue(5),
  },
  picker: {
    height: 25,
    width: Platform.OS === "web" ? 150 : 200,
    borderWidth: 1,
    fontSize: 20,
  },
});
