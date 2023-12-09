import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  buscarTareaIdTareasInventario,
  obtenerProfesores,
} from "../Controlador/tareas";

export default function VerTareaMaterial({ route, navigation }) {
  const id = route.params.id; // obtenemos el id Tarea.

  // Variable para obtener todos los pasos de la tarea inventario.
  const [tareas, setTareas] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [aulas, setAulas] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      // Obtenemos las tareas
      const datos = await buscarTareaIdTareasInventario(id);
      // Obtenemos a los profesores
      const datosProfesores = await obtenerProfesores();
      setProfesores(datosProfesores);
      // Obtenemos la información para las aulas.
      const aulas = datosProfesores
        .map(({ nombre, aula, foto }) => {
          if (foto !== "") {
            return { nombre, aula, foto };
          }
        })
        .filter((aula) => aula !== undefined); // Esto removerá los valores undefined del resultado del map

      // Añadimos el almacen.
      aulas.push({
        nombre: "Almacén",
        aula: "Almacén",
        foto: require("../../Imagenes/almacen.png"), // Asegúrate de que la ruta es correcta y accesible en el contexto de tu app
      });

      setAulas(aulas);

      // vamos a agrupar las tareas por lugar de origen.
      const agrupadosPorOrigen = datos.reduce((acumulador, itemActual) => {
        // Si el acumulador ya tiene la clave del lugarOrigen, solo añade el objeto actual a ese array
        if (acumulador[itemActual.lugarOrigen]) {
          acumulador[itemActual.lugarOrigen].push(itemActual);
        } else {
          // Si no, crea un nuevo array para esa clave con el objeto actual
          acumulador[itemActual.lugarOrigen] = [itemActual];
        }
        return acumulador;
      }, {});

      setTareas(agrupadosPorOrigen);
    }

    cargarDatos();
  }, [id]);

  // Pantalla primera de ir al lugar de origen.
  const renderLugarOrigen = (lugarOrigen, tareas) => {
    // Buscar en aulas la foto correspondiente al lugar de origen
    const aula = aulas.find((a) => a.aula === lugarOrigen);

    return (
      <View>
        <View style={styles.row}>
        <Image source={require("../../Imagenes/ninoAndando.png")} style={styles.image} />
        <Image source={aula.foto} style={styles.image} />
        </View>

        <View style={styles.separador}></View>
        <View style={styles.separador}></View>

        <Text style={styles.text}>{lugarOrigen === 'Almacén' ? `Voy al ${lugarOrigen}` : `Voy a la ${lugarOrigen}`}</Text>
        
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>

        <TouchableOpacity style={styles.imagePulsar} onPress={() => console.log("Estoy en el almacén")}>
          <Image source={require("../../Imagenes/bien.png")} style={styles.image}/>
        </TouchableOpacity>

        <View style={styles.separador}></View>
        <View style={styles.separador}></View>

        <Text style={styles.text}>{lugarOrigen === 'Almacén' ? `Estoy en el ${lugarOrigen}` : `Estoy en la ${lugarOrigen}`}</Text>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(tareas)}
        renderItem={({ item }) => renderLugarOrigen(item, tareas[item])}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", 
    alignContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 150,
    height: 150,
  },
  imagePulsar:{
    borderWidth: 5,
    borderColor: 'black',
    width: 180,
    height: 180,
  },
  row: {
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
  },
  separador: {
    height: 10,
  },
});
