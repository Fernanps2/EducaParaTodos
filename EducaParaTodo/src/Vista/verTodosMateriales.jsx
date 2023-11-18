import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  TextInput,
} from "react-native";

// Uso base de datos
import appFirebase from "../Modelo/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
const db = getFirestore(appFirebase);

const initialData = [
  {
    id: "1",
    material: "Folios",
    destino: "Aula G",
    origen: "Almacén",
    cantidad: 10,
  },
  {
    id: "2",
    material: "Tijeras",
    destino: "Aula A",
    origen: "Aula F",
    cantidad: 2,
  },
  {
    id: "3",
    material: "Marcadores",
    destino: "Aula B",
    origen: "Almacén",
    cantidad: 15,
  },
  {
    id: "4",
    material: "Pinturas",
    destino: "Aula C",
    origen: "Almacén",
    cantidad: 20,
  },
  {
    id: "5",
    material: "Libros",
    destino: "Biblioteca",
    origen: "Almacén",
    cantidad: 30,
  },
  {
    id: "6",
    material: "Compases",
    destino: "Aula D",
    origen: "Almacén",
    cantidad: 5,
  },
  {
    id: "7",
    material: "Reglas",
    destino: "Aula E",
    origen: "Almacén",
    cantidad: 10,
  },
];

export default function VerTodosMateriales({ navigation }) {
  // Variables para los alimentos del menu
  const [data, setData] = useState(initialData);

  //Variables para logo de guardar
  const [guardando, setGuardando] = useState(false);

  const deleteItem = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.leftColumn}>
          <Text style={styles.label}>Material</Text>
          <Text style={styles.itemText}>{item.material}</Text>
          <View style={styles.separador} />
          <Text style={styles.label}>Cantidad</Text>
          <Text style={styles.itemText}>{item.cantidad}</Text>
      </View>
      <View style={styles.rightColumn}>
          <Text style={styles.label}>Lugar destino</Text>
          <Text style={styles.itemText}>{item.destino}</Text>
          <View style={styles.separador} />
          <Text style={styles.label}>Lugar origen</Text>
          <Text style={styles.itemText}>{item.origen}</Text>
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

      <Text style={styles.title}>Materiales en Tarea</Text>

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
});
