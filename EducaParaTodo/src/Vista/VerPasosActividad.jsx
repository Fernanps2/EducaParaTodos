import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

// Uso base de datos
import appFirebase from "../Modelo/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
const db = getFirestore(appFirebase);

const initialData = [
  {
    id: "1",
    Nombre_Paso: "Poner plato en la mesa",
    Texto: "Ninguno",
    Pictograma: "Ninguno",
    Imagen: "Mesa y plato",
    Video: "Poner Plato",
    Audio: "Ninguno",
  },
  {
    id: "2",
    Nombre_Paso: "Colocar los cubiertos",
    Texto: "Coloca tenedor al lado del plato",
    Pictograma: "Cubiertos",
    Imagen: "Cubiertos al lado del plato",
    Video: "Colocar Cubiertos",
    Audio: "Ninguno",
  },
  {
    id: "3",
    Nombre_Paso: "Doblar la servilleta",
    Texto: "Doblar la servilleta junto al plato",
    Pictograma: "Servilleta",
    Imagen: "Servilleta doblada",
    Video: "Doblar Servilleta",
    Audio: "Ninguno",
  },
  {
    id: "4",
    Nombre_Paso: "Llenar el vaso de agua",
    Texto: "Llenar el vaso de agua",
    Pictograma: "Vaso de agua",
    Imagen: "Vaso con agua",
    Video: "Llenar Vaso",
    Audio: "Ninguno",
  },
  {
    id: "5",
    Nombre_Paso: "Colocar el pan",
    Texto: "Colocar pan en la mesa",
    Pictograma: "Pan",
    Imagen: "Pan en la mesa",
    Video: "Colocar Pan",
    Audio: "Ninguno",
  },
  {
    id: "6",
    Nombre_Paso: "Acomodar la silla",
    Texto: "Poner silla enfrente de la mesa",
    Pictograma: "Silla",
    Imagen: "Silla y mesa",
    Video: "Acomodar Silla",
    Audio: "Ninguno",
  },
];

export default function VerPasosActividad({ navigation }) {
  // Variables para los alimentos del menu
  const [data, setData] = useState(initialData);

  const deleteItem = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.leftColumn}>
        <Text style={styles.label}>Nombre Paso</Text>
        <Text style={styles.itemText}>{item.Nombre_Paso}</Text>
        <View style={styles.separador} />
        <Text style={styles.label}>Texto</Text>
        <Text style={styles.itemText}>{item.Texto}</Text>
        <View style={styles.separador} />
        <Text style={styles.label}>Pictograma</Text>
        <Text style={styles.itemText}>{item.Pictograma}</Text>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.label}>Imagen</Text>
        <Text style={styles.itemText}>{item.Imagen}</Text>
        <View style={styles.separador} />
        <Text style={styles.label}>Video</Text>
        <Text style={styles.itemText}>{item.Video}</Text>
        <Text style={styles.label}>Audio</Text>
        <Text style={styles.itemText}>{item.Audio}</Text>
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