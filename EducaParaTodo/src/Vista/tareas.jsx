import React from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { CerrarSesion } from "./cerrarSesion";
import { buscarTarea } from "../Controlador/tareas";

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
        <Image style={styles.foto} source={{ uri: tarea.fotoURL }} />
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
        const Tareas = await buscarTarea(usuario.id);
        setTareas(Tareas);
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
                    {indiceActual > 0 && (
                      <TouchableOpacity onPress={tareaAnterior}>
                        <Image
                          style={[styles.flechas, { marginHorizontal: 30 }]}
                          source={require("../../Imagenes/flechaAtras.png")}
                        />
                      </TouchableOpacity>
                    )}

                    <DatosTareas
                      tarea={tareas[indiceActual]}
                      navigation={navigation}
                      usuario={usuario}
                    />
                    {indiceActual < tareas.length - 1 && (
                      <TouchableOpacity onPress={siguienteTarea}>
                        <Image
                          style={[styles.flechas, { marginHorizontal: 30 }]}
                          source={require("../../Imagenes/flechaSiguiente.png")}
                        />
                      </TouchableOpacity>
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
    padding: 20,
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
    margin: 30,
    backgroundColor: "lightblue",
    padding: 20,
    borderRadius: 10,
  },
  titulo: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
  },
  texto: {
    fontWeight: "bold",
    marginBottom: 50,
    marginTop: 5,
    flexWrap: "wrap",
    //width: 200,
    maxWidth: 150,
  },
  felicitacionText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "black",
  },
  contenedor_tareas: {
    flexDirection: "column",
    width: "50%",
    alignItems: "center",
  },
  contenedor_tarea_unica: {
    flexDirection: "column",
    width: "100%", // Ocupa todo el ancho para una sola tarea
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  flechas: {
    width: 100,
    height: 100,
  },
});
