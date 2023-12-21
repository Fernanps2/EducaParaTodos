import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { CerrarSesion } from "./cerrarSesion";
import { buscarTareaid } from "../Controlador/tareas";
import { RFValue } from "react-native-responsive-fontsize";
import { descargaTipoTarea } from "../Controlador/multimedia";

export default function Tareas({ route, navigation }) {
  const { usuario } = route.params; // Obtiene el usuario que accedió a la pantalla

  const [tareas, setTareas] = useState([]); // Las tareas de ese usuario
  const [indiceActual, setIndiceActual] = useState(0); // El indice actual que recorre las tareas
  const [cargando, setCargando] = useState(true); // Renderiza la pantalla cuando se haya descargado la información de al base de datos.

  // useEffect se usa para cargar y procesar datos de tareas cuando el componente se monta o cuando cambian
  // las dependencias especificadas (usuario, route.params.refresh).
  useEffect(() => {
    // Función asíncrona para cargar la lista de tareas.
    const listaTareas = async () => {
      setCargando(true); // Establece el estado 'cargando' a true al inicio de la carga de datos.

      try {
        // Obtener tareas asociadas al ID del usuario actual.
        const tareas = await buscarTareaid(usuario.id);
console.log('tareas: ', tareas)
        // Procesa cada tarea para descargar la imagen si existe una URL de foto.
        const datos = await Promise.all(
          tareas.map(async ({ id, tipo, fotoURL, titulo }) => {
            if (fotoURL !== "") {
              // Descarga la imagen si la URL de la foto no está vacía.
              const fotoDescargada = await descargaTipoTarea(fotoURL);
              return { id, tipo, titulo, fotoURL: fotoDescargada };
            }
            return null; // Retornar null para los casos donde no hay foto.
          })
        );

        // Filtra los datos para eliminar los elementos nulos (tareas sin foto).
        const datosFiltrados = datos.filter((tarea) => tarea !== null);

        // Actualiza el estado con los datos de las tareas procesadas.
        setIndiceActual(0); // Reinicia el índice actual a 0.
        setTareas(datosFiltrados); // Establece el nuevo conjunto de tareas.
        setCargando(false); // Establece el estado 'cargando' a false al finalizar la carga.
      } catch (error) {
        console.log(error); // Manejo de errores en caso de fallo en la carga o procesamiento.
      }
    };

    listaTareas(); // Llama a la función listaTareas para ejecutar la carga y procesamiento de datos.
  }, [usuario, route.params.refresh]); // Dependencias del useEffect.

  // Función para avanzar a la siguiente tarea
  const siguienteTarea = () => {
    if (indiceActual < tareas.length - 1) {
      setIndiceActual(indiceActual + 1);
    }
  };

  // Función para regresar a la tarea anterior
  const tareaAnterior = () => {
    if (indiceActual > 0) {
      setIndiceActual(indiceActual - 1);
    }
  };

  // Cuando presiona una tarea, en función de que tipo sea se renderiza una pantalla u otra.
  const manejoPresionarBoton = (tarea, navigation, usuario) => {
    const id = tarea.id;
    if (tarea.tipo == "comanda") {
      navigation.navigate("seleccionAula", { id, usuario });
    } else if (tarea.tipo === "actividad") {
      navigation.navigate("verTarea", { id, usuario });
    } else if (tarea.tipo === "material") {
      navigation.navigate("verTareaMaterial", { id, usuario });
    }
  };

  // Componente que muestra los datos de las tareas
  const DatosTareas = ({ tarea, navigation, usuario }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => manejoPresionarBoton(tarea, navigation, usuario)}
        >
          <Image style={styles.foto} source={{ uri: tarea.fotoURL.uri }} />
        </TouchableOpacity>
        <Text style={styles.texto}>{tarea.titulo} </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CerrarSesion />
      <View style={styles.caja}>
        <Text style={styles.titulo}> TAREAS PENDIENTES:</Text>
      </View>
      <>
        {cargando ? (
          <>
            <Text style={styles.felicitacionText}>Espera un momento...</Text>
          </>
        ) : (
          <>
            {tareas.length > 0 ? (
              tareas.length == 1 ? (
                <View style={styles.contenedor_tarea_unica}>
                  <DatosTareas
                    tarea={tareas[indiceActual]}
                    navigation={navigation}
                    usuario={usuario}
                  />
                </View>
              ) : (
                <View style={styles.contenedor_tarea_unica}>
                  <View style={styles.row}>
                    {indiceActual > 0 ? (
                      <TouchableOpacity onPress={tareaAnterior}>
                        <Image
                          style={[styles.flechas, { marginHorizontal: 30 }]}
                          source={require("../../Imagenes/flechaAtras.png")}
                        />
                        <Text style={[styles.texto, { marginHorizontal: 30 }]}>
                          Atrás
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View
                        style={[styles.flechas, { marginHorizontal: 30 }]}
                      />
                    )}

                    <DatosTareas
                      tarea={tareas[indiceActual]}
                      navigation={navigation}
                      usuario={usuario}
                    />
                    {indiceActual < tareas.length - 1 ? (
                      <TouchableOpacity onPress={siguienteTarea}>
                        <Image
                          style={[styles.flechas, { marginHorizontal: 30 }]}
                          source={require("../../Imagenes/flechaSiguiente.png")}
                        />
                        <Text style={[styles.texto, { marginHorizontal: 30 }]}>
                          Siguiente
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View
                        style={[styles.flechas, { marginHorizontal: 30 }]}
                      />
                    )}
                  </View>
                </View>
              )
            ) : (
              <View>
                {console.log("No hay tarea")}
                <Image
                  source={require("../../Imagenes/TareasAlumnos/muyBien.png")}
                  style={styles.image}
                />
                <Text style={styles.felicitacionText}>
                  Muy Bien, no tienes tareas
                </Text>
              </View>
            )}
          </>
        )}
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: RFValue(20),
    alignItems: "center",
  },
  datos: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
  },
  caja: {
    margin: RFValue(10),
    backgroundColor: "lightblue",
    padding: RFValue(8),
    borderRadius: RFValue(10),
  },
  titulo: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: Platform.OS === "web" ? RFValue(15) : RFValue(22),
  },
  texto: {
    fontWeight: "bold",
    marginBottom: RFValue(50),
    marginTop: RFValue(5),
    flexWrap: "wrap",
    maxWidth: Platform.OS === "web" ? RFValue(100) : RFValue(150),
    fontSize: Platform.OS === "web" ? RFValue(10) : RFValue(13),
  },
  felicitacionText: {
    fontWeight: "bold",
    fontSize: RFValue(10),
  },
  foto: {
    width: Platform.OS === "web" ? RFValue(80) : RFValue(150),
    height: Platform.OS === "web" ? RFValue(80) : RFValue(150),
    borderRadius: RFValue(20),
    overflow: "hidden",
    borderWidth: RFValue(1),
    borderColor: "black",
  },
  contenedor_tarea_unica: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    width: "100%", // Ocupa todo el ancho para una sola tarea
    alignItems: "center",
    alignContent: "center",
  },
  image: {
    width: RFValue(125),
    height: RFValue(125),
  },
  flechas: {
    width: RFValue(60),
    height: RFValue(60),
  },
});
