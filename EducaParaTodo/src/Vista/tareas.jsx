import React from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { CerrarSesion } from "./cerrarSesion";
import { buscarTarea } from "../Controlador/tareas";
import { RFValue } from "react-native-responsive-fontsize";
import {descargaTipoTarea} from "../Controlador/multimedia";

const manejoPresionarBoton = (tarea, navigation, usuario) => {
  const id = tarea.id;
  if (tarea.tipo == "comanda") {
    navigation.navigate("paginaAulas", { id, usuario });
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
        {/* Esto es muy importante mirarlo ya que aquí está cogiendo la ruta de una foto de internet no sé como hacer 
                 para que la ruta sea de una foto que tenemos en una carpeta no se me muestra por pantalla */}
        <Image style={styles.foto} source={{ uri: tarea.fotoURL.uri }} />
      </TouchableOpacity>
      <Text style={styles.texto}>{tarea.titulo} </Text>
    </View>
  );
};

const Tareas = ({ route, navigation }) => {
  const { usuario } = route.params;

  const [tareas, setTareas] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const listaTareas = async () => {
      try {
        const tareas = await buscarTarea(usuario.id);

        const datos = await Promise.all(
          tareas.map(async ({ id, tipo, fotoURL, titulo }) => {
            if (fotoURL !== "") {
              const fotoDescargada = await descargaTipoTarea(fotoURL);
              return { id, tipo, titulo, fotoURL: fotoDescargada };
            }
            return null; // Retornar null para los casos donde no hay foto
          })
        );

        console.log('datos son estos: ', datos);

        setTareas(datos);
        setCargando(false);
      } catch (error) {
        console.log(error);
      }
    };
    listaTareas();
  }, []);

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
                        <Text style={[styles.texto, { marginHorizontal: 30 }]}>Atrás</Text>
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
                        <Text style={[styles.texto,{ marginHorizontal: 30 }]}>Siguiente</Text>
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
};

export default Tareas;

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
    fontSize: RFValue(15),
  },
  texto: {
    fontWeight: "bold",
    marginBottom: RFValue(50),
    marginTop: RFValue(5),
    flexWrap: "wrap",
    maxWidth: RFValue(100),
    fontSize: RFValue(10),
  },
  felicitacionText: {
    fontWeight: "bold",
    fontSize: RFValue(10),
  },
  foto: {
    width: RFValue(80),
    height: RFValue(80),
    borderRadius: RFValue(20),
    overflow: "hidden",
    borderWidth: RFValue(1),
    borderColor: "black",
  },
  contenedor_tarea_unica: {
    flexDirection: "column",
    width: "100%", // Ocupa todo el ancho para una sola tarea
    alignItems: "center",
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
