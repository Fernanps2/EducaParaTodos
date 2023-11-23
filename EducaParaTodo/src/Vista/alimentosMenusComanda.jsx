import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
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
  Platform,
} from "react-native";
import Swal from "sweetalert2";

// Uso base de datos
import appFirebase from "../Modelo/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {} from "../Modelo/modelo";
const db = getFirestore(appFirebase);

export default function TiposMenusComanda({ navigation }) {
  // Variables para los alimentos del menu
  const [selectedMenu, setSelectedMenu] = useState("");
  const [menus, setMenus] = useState({
    'Ninguno': [],
    "Menu Carne": [],
    "Menu Verdura": [],
  });
  const [selectedAlimento, setSelectedAlimento] = useState();
  const [alimentos, setAlimentos] = useState([
    'Ninguno',
    "Ensalada",
    "Pechuga de pollo",
    "Lemguado",
  ]);

  const addFood = () => {
    if (selectedAlimento) {
      const updatedMenu = { ...menus };
      const currentFoods = updatedMenu[selectedMenu] || [];
      updatedMenu[selectedMenu] = [...currentFoods, selectedAlimento];
      setMenus(updatedMenu);
      setSelectedAlimento("");
    }
  };

  const deleteFood = (food) => {
    const updatedMenu = { ...menus };
    updatedMenu[selectedMenu] = updatedMenu[selectedMenu].filter(
      (item) => item !== food
    );
    setMenus(updatedMenu);
  };

  // Guardamos los alumentos que se añadieron al menu.
  const guardarDatos = () => {
    navigation.navigate("tareaComanda");
  };

  const showAlertStore = () => {
    if (Platform.OS === "web") {
      Swal.fire({
        title: "¿Estás listo para guardar?",
        text: "Verifica la información antes de proceder.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          guardarDatos();
        }
      });
    } else {
      Alert.alert(
        "¿Quiere guardar?", // Título
        "Pulsa una opción", // Mensaje
        [
          { text: "Cancelar" },
          { text: "Confirmar", onPress: () => guardarDatos() },
        ],
        { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.separador} />
      <View style={styles.separador} />

      <View style={[styles.row, { justifyContent: "center" }]}>
        <Text style={[styles.title]}>Alimentos Menu</Text>
        <TouchableOpacity onPress={() => navigation.navigate("tareaComanda")}>
          <Image
            source={require("../../Imagenes/CrearTarea/Flecha_atras.png")}
            style={[styles.Image, { marginLeft: 40 }]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.separador} />
      <View style={styles.separador} />

      <Text style={styles.text}>Selecciona tipo de menú </Text>

      <View style={styles.separador} />
      <View style={styles.separador} />

      <Picker
        selectedValue={selectedMenu}
        onValueChange={(itemValue) => setSelectedMenu(itemValue)}
        style={styles.picker}
      >
        {Object.keys(menus).map((menu, index) => (
          <Picker.Item key={index} label={menu} value={menu} />
        ))}
      </Picker>

      <View style={styles.separador} />
      <View style={styles.separador} />

      <Text style={styles.text}>Añada alimento </Text>

      <View style={styles.separador} />
      <View style={styles.separador} />

      <View style={[styles.row]}>
        <Picker
          selectedValue={selectedAlimento}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedAlimento(itemValue)
          }
          style={styles.picker}
        >
          {alimentos.map((alimento, index) => (
          <Picker.Item key={index} label={alimento} value={alimento} />
        ))}
        </Picker>

        <TouchableOpacity style={[styles.button, {marginLeft: 12}]} onPress={() => addFood()}>
          <Text style={styles.buttonText}>Añadir </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separador} />
      <View style={styles.separador} />

      <FlatList
        data={menus[selectedMenu]}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{item}</Text>
            <TouchableOpacity onPress={() => deleteFood(item)}>
              <Image
                source={require("../../Imagenes/CrearTarea/iconoBasura.png")}
                style={styles.deleteButton}
              />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.separador} />
      <View style={styles.separador} />

      <View style={[styles.buttonContainer]}>
        <Button
          title="Guardar"
          onPress={() => showAlertStore()}
          color="#0000FF"
          style={[styles.button]}
        />
      </View>
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
  row: {
    flexDirection: "row",
  },
  text: {
    textAlign: "center",
    fontSize: 15,
  },
  buttonContainer: {
    alignItems: "center",
    borderRadius: 4,
    width: Platform.OS === "web" ? 80 : 90,
    justifyContent: "center",
    marginBottom: 10,
  },
  button: {
    alignItems: "center", // Centra el texto horizontalmente
    paddingVertical: 10, // Espacio vertical dentro del botón
    paddingHorizontal: 20, // Espacio horizontal dentro del botón
    backgroundColor: "blue", // Color de fondo del botón
    borderRadius: 5, // Redondea las esquinas del botón
  },
  buttonText: {
    color: "white", // Color del texto del botón
    fontSize: 16, // Tamaño del texto del botón
    // Puedes añadir más estilos de texto si lo necesitas
  },
  separador: {
    height: 10,
  },
  picker: {
    height: 25,
    width: Platform.OS === "web" ? 150 : 200,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  itemText: {
    fontSize: 16, // Tamaño de fuente mediano para buena legibilidad
    color: "#333", // Color oscuro para el texto para alto contraste
    fontWeight: "bold", // Peso de la fuente normal; puede ser 'bold' si es necesario
    marginVertical: 8,
  },
  deleteButton: {
    width: 20, // Ancho de la imagen
    height: 20, // Altura de la imagen
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    //flex: 1,
    marginRight: 8,
    paddingHorizontal: 8,
    height: 40,
    width: 200,
  },
  Image: {
    width: 20,
    height: 20,
  },
});