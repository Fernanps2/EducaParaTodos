import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
} from "react-native";
import Swal from "sweetalert2";
import * as global from "./VarGlobal";
import { useRoute } from "@react-navigation/native";

export default function VerPasosActividad({ navigation }) {
  // Variables para los alimentos del menu
  const [data, setData] = useState([]);

  const route = useRoute();

  useEffect(() => {
    if (route.params !== undefined) {
      // Añades el objeto al array
      const { nombre, texto, imagen, pictograma, video, audio } = route.params;
      global.pushPasos(nombre, texto, imagen, pictograma, video, audio);
      setData(global.getPasos);
    }
  }, [route.params]);

  useEffect(() => {
    setData(global.getPasos);
  });

  const deleteItem = (id) => {
    if (Platform.OS === "web") {
      Swal.fire({
        title: "¿Estás seguro que quieres eliminarlo?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Borrar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          global.filtrarPasos(id);
          setData(global.getPasos);
        }
      });
    } else {
      Alert.alert(
        "¿Quiere borrar?", // Título
        "Pulsa una opción", // Mensaje
        [
          { text: "Cancelar" },
          {
            text: "Confirmar",
            onPress: () => {
              global.filtrarPasos(id);
              setData(global.getPasos);
            },
          },
        ],
        { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
      );
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.leftColumn}>
        <Text style={styles.label}>Nombre Paso</Text>
        <Text style={styles.itemText}>{item.nombre}</Text>
        <View style={styles.separador} />
        <Text style={styles.label}>Texto</Text>
        <Text style={styles.itemText}>{item.texto}</Text>
        <View style={styles.separador} />
        <Text style={styles.label}>Pictograma</Text>
        <Text style={styles.itemText}>{item.pictograma.nombre}</Text>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.label}>Imagen</Text>
        <Text style={styles.itemText}>{item.imagen.nombre}</Text>
        <View style={styles.separador} />
        <Text style={styles.label}>Video</Text>
        <Text style={styles.itemText}>{item.video.nombre}</Text>
        <Text style={styles.label}>Audio</Text>
        <Text style={styles.itemText}>{item.audio.nombre}</Text>
      </View>
      <TouchableOpacity
        onPress={() => deleteItem(item.id)}
        style={styles.deleteButton}
      >
        <Image
          source={require("../../Imagenes/CrearTarea/iconoBasura.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.separador} />
      <View style={styles.separador} />

      <View style={[{ flexDirection: "row" }, { justifyContent: "center" }]}>
        <Text style={[styles.title]}>Materiales en Tarea</Text>
        <TouchableOpacity onPress={() => navigation.navigate("tareaActividad")}>
          <Image
            source={require("../../Imagenes/CrearTarea/Flecha_atras.png")}
            style={[styles.Image, { marginLeft: 40 }]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.separador} />
      <View style={styles.separador} />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center",
  },
  separador: {
    height: 10,
  },
  leftColumn: {
    flexDirection: "column",
    justifyContent: "center",
    marginRight: 30,
  },
  rightColumn: {
    flexDirection: "column",
    justifyContent: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  itemDetail: {
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
  },
  itemText: {
    fontSize: 16, // Tamaño de fuente mediano para buena legibilidad
    color: "#333", // Color oscuro para el texto para alto contraste
    fontWeight: "bold", // Peso de la fuente normal; puede ser 'bold' si es necesario
    marginVertical: 8,
  },
  deleteButton: {
    padding: 10, // Espacio adicional alrededor del ícono para un área de toque más grande
    marginRight: 5, // Espacio a la derecha si es necesario
    justifyContent: "center", // Centra el ícono verticalmente dentro del botón
    alignItems: "center", // Centra el ícono horizontalmente dentro del botón
  },
  icon: {
    width: 24,
    height: 24,
  },
  Image: {
    width: 20,
    height: 20,
  },
});
