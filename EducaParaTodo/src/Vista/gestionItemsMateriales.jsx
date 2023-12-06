import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  FlatList,
  Image,
} from "react-native";
import { anadeVideo } from "../Controlador/tareas";
import Swal from "sweetalert2";

export default function gestionItemMaterial() {
  //Variables para ver las distintas vistas
  const [viewCrearMaterial, setViewCrearMaterial] = useState(false);
  const [viewModificarMaterial, setViewModificarMaterial] = useState(false);

  // Variables para guardar los campos de añadir un material
  const [nombre, setNombre] = useState("");
  const [foto, setFoto] = useState("");
  const [stock, setStock] = useState("");
  const [tipo, setTipo] = useState("");
  const [caracteristicas, setCaracteristicas] = useState([]);

  const handleCrearMaterial = () => {
    setViewCrearMaterial(true);
    setViewModificarMaterial(false);
  };
  const handleModificarMaterial = () => {
    setViewCrearMaterial(false);
    setViewModificarMaterial(true);
  };

  const handleAñadirTipo = () => {
    if (tipo) {
      setCaracteristicas([
        ...caracteristicas,
        { id: Date.now().toString(), tipo },
      ]);
      setTipo("");
    }
  };

  const handleAñadirMaterial = () => {};
  
  const handleCancelar = () => {
    setNombre("");
    setFoto("");
    setStock("");
    setTipo("");
    setCaracteristicas([]);
  };

  const handleAñadir = () => {
    if (viewVideo) {
      if (nombreVideo !== "" && urlVideo !== "") {
        anadeVideo(nombreVideo, urlVideo);
      } else {
        if (Platform.OS === "web") {
          Swal.fire({
            title: "Campos Incompletos",
            text: "Debes rellenar los campos requeridos",
            icon: "warning",
            confirmButtonText: "De acuerdo",
          });
        } else {
          Alert.alert(
            "Campos Incompletos,",
            "Debes rellenar los campos requeridos"
          );
        }
      }
    }
  };

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
          setCaracteristicas(caracteristicas.filter((item) => item.id !== id));
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
              setCaracteristicas(
                caracteristicas.filter((item) => item.id !== id)
              );
            },
          },
        ],
        { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
      );
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.label}>Característica</Text>
      <Text style={styles.itemText}>{item.tipo}</Text>
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
    <View style={styles.container}>
      <Text style={styles.header}>Items Materiales</Text>
      <View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={handleCrearMaterial}>
            <Text style={styles.buttonText}>Crear Material</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleModificarMaterial}
          >
            <Text style={styles.buttonText}>Modificar Material</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.separador} />
      <View style={styles.separador} />
      <View style={styles.separador} />
      <View style={styles.separador} />

      <View>
        <Text style={[styles.text]}>Nombre</Text>

        <View style={styles.separador} />

        <TextInput
          style={[styles.input]}
          placeholder="Elija nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <View style={styles.separador} />
        <View style={styles.separador} />

        <Text style={[styles.text]}>Foto</Text>

        <View style={styles.separador} />

        <TextInput
          style={[styles.input]}
          placeholder="Elija foto"
          value={foto}
          onChangeText={setFoto}
        />

        <View style={styles.separador} />
        <View style={styles.separador} />

        <Text style={[styles.text]}>Stock</Text>

        <View style={styles.separador} />

        <TextInput
          style={[styles.input]}
          placeholder="Elija stock"
          value={stock}
          onChangeText={setStock}
        />

        <View style={styles.separador} />
        <View style={styles.separador} />

        <Text style={[styles.text]}>Tipo</Text>

        <View style={styles.separador} />

        <TextInput
          style={[styles.input]}
          placeholder="Elija tipo"
          value={tipo}
          onChangeText={setTipo}
        />

        <TouchableOpacity
          style={styles.addButtonTipo}
          onPress={handleAñadirTipo}
        >
          <Text style={styles.addButtonText}>Añadir tipo</Text>
        </TouchableOpacity>
        <View style={[{ width: 180 }, { height: 250 }, { maxHeight: 500 }]}>
          <FlatList
            data={caracteristicas}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>

        <View style={styles.rowBotones}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelar}
          >
            <Text style={styles.addButtonText}>borrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAñadirMaterial}
          >
            <Text style={styles.addButtonText}>Añadir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  contentContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#e0e0e0", // Un color gris claro para los botones
    padding: 10,
    marginVertical: 5,
    width: 100,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d0d0d0", // Un borde ligeramente más oscuro que el fondo del botón
    marginHorizontal: 10,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  addButtonTipo: {
    backgroundColor: "blue",
    padding: 5,
    width: 120,
    borderRadius: 5,
    marginRight: 100,
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    width: 100,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    width: 100,
    borderRadius: 5,
    marginHorizontal: 20
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    marginHorizontal: 50,
    flexDirection: "row",
  },
  rowBotones: {
    position:'absolute',
    bottom: -75,
    flexDirection: "row",
    alignItems: 'center',
  },
  separador: {
    height: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    marginBottom: 10,
    width: 250,
    height: 30,
    padding: 5,
  },
  text: {
    fontSize: 15,
  },
  separador: {
    height: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
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
