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
  ScrollView,
} from "react-native";
import Swal from "sweetalert2";
import { buscarMenus } from "../Controlador/tareas";
import * as global from "./VarGlobal";

export default function TiposMenusComanda({ navigation }) {
  // Variables para tipo de menu
  const [selectedMenuType, setSelectedMenuType] = useState("Ninguno");
  const [menuList, setMenuList] = useState([]);
  const [menuTypes, setMenuTypes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarMenus = async () => {
      try {
        const datos = await buscarMenus();
        const menusConNinguno = [...datos.map((item) => item)];
        setMenuTypes(menusConNinguno); // Guardamos los datos en la variable de estado
        setCargando(false);
      } catch (error) {
        console.error("Error al obtener menus:", error);
        setCargando(false);
      }
    };
    cargarMenus(); // Llamamos a la función al montar el componente
    setMenuList(global.getSoloMenus);
  }, []);

  const addItem = () => {
    if (
      selectedMenuType !== "Ninguno" &&
      !menuList.some((menuItem) => menuItem === selectedMenuType)
    ) {
      setMenuList([selectedMenuType, ...menuList]);
    }
  };

  const deleteItem = (index) => {
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
          let arrayCopy = [...menuList];
          arrayCopy.splice(index, 1);
          setMenuList(arrayCopy);
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
              let arrayCopy = [...menuList];
              arrayCopy.splice(index, 1);
              setMenuList(arrayCopy);
            },
          },
        ],
        { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
      );
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>{item}</Text>
      <TouchableOpacity onPress={() => deleteItem(index)}>
        <Image
          source={require("../../Imagenes/CrearTarea/iconoBasura.png")}
          style={styles.deleteButton}
        />
      </TouchableOpacity>
    </View>
  );

  const guardarDatos = () => {
    global.setSoloMenus(menuList); // LLevamos la cuenta de los menus para que no se pierden información
    global.setMenusObjetos(menuTypes, menuList); // Llevamos la cuenta de los objetos de los menus elegidos
    navigation.navigate("alimentosMenusComanda");
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
          <Text style={[styles.title]}>Tipos de Menu</Text>
        </View>

        <View style={styles.separador} />
        <View style={styles.separador} />

        <Text style={styles.text}>Añada tipo de menú: </Text>

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
              selectedValue={selectedMenuType}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setSelectedMenuType(itemValue);
              }}
            >
              <Picker.Item
                key={"Ninguno"}
                label={"Ninguno"}
                value={"Ninguno"}
              />
              {menuTypes.map((menuType) => (
                <Picker.Item
                  key={menuType.id}
                  label={menuType.Nombre}
                  value={menuType.Nombre}
                />
              ))}
            </Picker>
          )}

          <TouchableOpacity style={styles.button} onPress={() => addItem()}>
            <Text style={styles.buttonText}>Añadir </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separador} />
        <View style={styles.separador} />

        <FlatList
          data={menuList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.separador} />
        <View style={styles.separador} />

        <View style={[styles.buttonContainer]}>
          <View style={[styles.button]}>
            <Button
              title="Guardar"
              onPress={() => showAlertStore()}
              color="#0000FF"
            />
          </View>
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
    marginBottom: 10,
    flexDirection: "row",
  },
  button: {
    marginHorizontal: 10,
    alignItems: "center", // Centra el texto horizontalmente
    justifyContent: "center",
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
  Image: {
    width: 20,
    height: 20,
  },
});
