import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const initialData = [];

export default function VerTodosMateriales({ navigation, AnadirMaterial, setMaterialesTarea }) {
  // Variables para los alimentos del menu
  //const [data, setData] = useGlobalState();
/*
  useEffect(() => {
    // Esto se ejecutará cada vez que `enviarDatos` cambie
    if (enviarDatos != undefined && enviarDatos != null) {
      setData(enviarDatos);
      console.log(enviarDatos);
    }
  }, [enviarDatos]);

  useEffect(() => {
    console.log(data);
  }, [data]);
*/
  const deleteItem = (id) => {
    setMaterialesTarea(AnadirMaterial.filter((item) => item[0] !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.leftColumn}>
        <Text style={styles.label}>Material</Text>
        <Text style={styles.itemText}>{item[4]}</Text>
        <View style={styles.separador} />
        <Text style={styles.label}>Cantidad</Text>
        <Text style={styles.itemText}>{item[3]}</Text>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.label}>Lugar destino</Text>
        <Text style={styles.itemText}>{item[2]}</Text>
        <View style={styles.separador} />
        <Text style={styles.label}>Lugar origen</Text>
        <Text style={styles.itemText}>{item[1]}</Text>
      </View>
      <TouchableOpacity
        onPress={() => deleteItem(item[0])}
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
        <TouchableOpacity
          onPress={() => navigation.navigate("tareaMateriales")}
        >
          <Image
            source={require("../../Imagenes/CrearTarea/Flecha_atras.png")}
            style={[styles.Image, { marginLeft: 40 }]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.separador} />
      <View style={styles.separador} />

      <FlatList
        data={AnadirMaterial}
        keyExtractor={(item, index) => item[0].toString()}
        renderItem={renderItem}
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