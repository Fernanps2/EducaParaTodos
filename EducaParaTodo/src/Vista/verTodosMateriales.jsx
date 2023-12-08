import React, { useEffect, useState } from "react";
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
import { useRoute } from "@react-navigation/native";
import * as lista from "./VarGlobal";
import {modificarReduciendoStock_materialesBD} from "./VarGlobal";

export default function VerTodosMateriales({ navigation }) {
  const route = useRoute();
  const [materialesTarea, setMaterialesTarea] = useState([]);

  useEffect(() => {
    if (route.params !== undefined) {
      // Añades el objeto al array
      lista.listaTareaMateriales.push(route.params);
      setMaterialesTarea(lista.get);
    }
  }, [route.params]);

  useEffect(() => {
    setMaterialesTarea(lista.get);
  });

  const deleteItem = (item) => {
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
          lista.filtrar(item.id);
          setMaterialesTarea(lista.get);
          modificarReduciendoStock_materialesBD(item.id, item.cantidad, item.caracteristica);
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
              lista.filtrar(item.id);
              setMaterialesTarea(lista.get);
              modificarReduciendoStock_materialesBD(item.id, item.cantidad, item.caracteristica);
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
        <Text style={styles.label}>Material</Text>
        <Text style={styles.itemText}>{item.nombre}</Text>
        <View style={styles.separador} />
        <Text style={styles.label}>Cantidad</Text>
        <Text style={styles.itemText}>{item.cantidad}</Text>
        <View style={styles.separador} />
        <Text style={styles.label}>Característica</Text>
        <Text style={styles.itemText}>{item.caracteristica}</Text>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.label}>Lugar destino</Text>
        <Text style={styles.itemText}>{item.destino}</Text>
        <View style={styles.separador} />
        <Text style={styles.label}>Lugar origen</Text>
        <Text style={styles.itemText}>{item.origen}</Text>
      </View>
      <TouchableOpacity
        onPress={() => deleteItem(item)}
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
        data={materialesTarea}
        keyExtractor={(item, index) => item.id}
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
