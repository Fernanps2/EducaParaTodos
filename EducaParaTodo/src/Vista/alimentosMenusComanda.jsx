import React, { useState, useEffect } from "react";
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
  Platform,
} from "react-native";
import Swal from "sweetalert2";
import * as global from "./VarGlobal";
import {buscarAlimentos} from "../Controlador/tareas"

export default function TiposMenusComanda({ navigation }) {
  // Variables para los alimentos del menu
  const [selectedMenu, setSelectedMenu] = useState("");
  const [menus, setMenus] = useState([]);

  // Guardamos la relación entre menus y alimentos.
  useEffect(() => {
        console.log('aqo');
        global.actualizarListaMenus ();
        setMenus(global.getMenus);
  }, []);

  const [selectedAlimento, setSelectedAlimento] = useState();
  const [alimentos, setAlimentos] = useState([]);
  const [alimentosObjetos, setAlimentosObjetos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarAlimentos = async () => {
      try {
        const datos = await buscarAlimentos();
        const storeObjetos = [...datos.map((item) => item)];
        setAlimentosObjetos(storeObjetos);
        const menusConNinguno = ["Ninguno", ...datos.map((item) => item.Nombre)];
        setAlimentos(menusConNinguno);
        setCargando(false);
      } catch (error) {
        console.error("Error al obtener menus:", error);
        setCargando(false);
      }
    };
    cargarAlimentos(); // Llamamos a la función al montar el componente
  }, []);

  const addFood = () => {
    if (
      selectedAlimento &&
      selectedAlimento !== "Ninguno" &&
      selectedMenu &&
      selectedMenu !== "Ninguno"
    ) {
      const updatedMenu = { ...menus };
      const currentFoods = updatedMenu[selectedMenu] || [];
      // Verifica si selectedAlimento ya está en currentFoods antes de agregarlo
      if (!currentFoods.includes(selectedAlimento)) {
        updatedMenu[selectedMenu] = [...currentFoods, selectedAlimento];
        setMenus(updatedMenu);
      }
      setSelectedAlimento("");
    }
  };

  const deleteFood = (food) => {
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
          const updatedMenu = { ...menus };
          updatedMenu[selectedMenu] = updatedMenu[selectedMenu].filter(
            (item) => item !== food
          );
          setMenus(updatedMenu);
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
              const updatedMenu = { ...menus };
              updatedMenu[selectedMenu] = updatedMenu[selectedMenu].filter(
                (item) => item !== food
              );
              setMenus(updatedMenu);
            },
          },
        ],
        { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
      );
    }
  };

  // Guardamos los alumentos que se añadieron al menu.
  const guardarDatos = () => {
    global.setListaMenus(menus);
    global.setAlimentosObjetos (alimentosObjetos);
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
        {cargando && (
          <View style={styles.text}>
            <Text>Cargando...</Text>
          </View>
        )}

        {!cargando && (
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
        )}

        <TouchableOpacity
          style={[styles.button, { marginLeft: 12 }]}
          onPress={() => addFood()}
        >
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
