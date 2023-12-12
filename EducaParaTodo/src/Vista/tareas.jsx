import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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
      <TouchableOpacity onPress={() => manejoPresionarBoton(tarea, navigation, usuario)}>
        {/* Esto es muy importante mirarlo ya que aquí está cogiendo la ruta de una foto de internet no sé como hacer 
                 para que la ruta sea de una foto que tenemos en una carpeta no se me muestra por pantalla */}
        <Image style={styles.foto} source={{ uri: tarea.fotoURL }} />
        <Text style={styles.texto}>{tarea.titulo} </Text>
      </TouchableOpacity>
    </View>
  );
};

const Tareas = ({ route, navigation }) => {
  const { usuario } = route.params; // obtenemos los datos del usuario pasados en la navegación

  const [tareas, setTareas] = useState([]);
  const [hayTarea, setHayTarea] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const listaTareas = async () => {
      try {
        const Tareas = await buscarTarea(usuario.id);
        setTareas(Tareas);
        setCargando(false);
        if (Tareas.length === 0) {
          setHayTarea(false);
        } else setHayTarea(true);
      } catch (error) {
        console.log(error);
      }
    };
    listaTareas();
  }, []);

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
            {hayTarea ? (
              <ScrollView contentContainerStyle={styles.datos}>
                {tareas.map((tarea, index) => (
                  <View
                    key={index}
                    // Cambia el estilo dependiendo de si solo hay una tarea o más
                    style={
                      tareas.length === 1
                        ? styles.contenedor_tarea_unica
                        : styles.contenedor_tareas
                    }
                  >
                    <DatosTareas tarea={tarea} navigation={navigation} usuario={usuario} />
                  </View>
                ))}
              </ScrollView>
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
});
