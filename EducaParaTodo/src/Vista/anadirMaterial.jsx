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

const initialMaterials = [
  { id: "1", name: "Lápices", total: 20 },
  { id: "2", name: "Gomas", total: 10 },
  { id: "3", name: "Folios", total: 50 },
  { id: "4", name: "Tijeras", total: 15 },
  { id: "5", name: "Pegamento", total: 30 },
];

export default function AnadirMaterial({ navigation }) {
  //Variables para logo de guardar
  const [guardando, setGuardando] = useState(false);

  // Variables para elegir material
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [labelQty, setLabelQty] = useState("");
  const [materials, setMaterials] = useState(initialMaterials);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);

  const searchMaterials = () => {
    if (searchQuery) {
      setMaterials(
        materials.filter((material) => material.name.includes(searchQuery))
      );
    } else {
      setMaterials(initialMaterials);
    }
  };

  const showAllMaterials = () => {
    setMaterials(initialMaterials);
    setSearchQuery("");
  };

  const selectMaterial = (id) => {
    setSelectedMaterialId(id);
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.materialInfo}>
        <Text style={styles.materialName}>{item.name}</Text>
        <Text style={styles.materialTotal}>{`Cantidad total: ${item.total} `}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.checkbox,
          selectedMaterialId === item.id
            ? styles.checkboxChecked
            : styles.checkboxUnchecked,
        ]}
        onPress={() => selectMaterial(item.id)}
      >
        {selectedMaterialId === item.id && (
          <Text style={styles.checkboxLabel}>✓</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const guardarDatos = () => {
    setGuardando(true);
    // Simula una operación de guardado que tarda 2 segundos.
    setTimeout(() => {
      setGuardando(false);
      // Aquí iría tu lógica de guardado real
    }, 5000);
    navigation.navigate("tareaMateriales");
  };

  const showAlertStore = () => {
    Alert.alert(
      "¿Quiere guardar?", // Título
      "Pulsa una opción", // Mensaje
      [
        { text: "Cancelar" },
        { text: "Confirmar", onPress: () => guardarDatos() },
      ],
      { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.separador} />
      <View style={styles.separador} />

      <Text style={styles.title}>Añadir Material</Text>

      <View style={styles.separador} />
      <View style={styles.separador} />

      <View style={styles.row}>
        <Text style={styles.text}>Recoger en: </Text>

        <TextInput
          placeholder="Elija lugar"
          value={pickupLocation}
          onChangeText={setPickupLocation}
          style={styles.input}
        />
      </View>

      <View style={styles.separador} />
      <View style={styles.separador} />

      <View style={styles.row}>
        <Text style={styles.text}>Llevar a: </Text>

        <TextInput
          placeholder="Elija lugar"
          value={dropoffLocation}
          onChangeText={setDropoffLocation}
          style={styles.input}
        />
      </View>

      <View style={styles.separador} />
      <View style={styles.separador} />

      <Text style={styles.text}>Busque material </Text>

      <View style={styles.separador} />
      <View style={styles.separador} />

      <View style={[styles.row]}>
        <TextInput
          placeholder="Buscar"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => searchMaterials()}
        >
          <Text style={styles.buttonText}>Buscar </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separador} />
      <View style={styles.separador} />

      <View style={[styles.row]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => showAllMaterials()}
        >
          <Text style={styles.buttonText}>Mostrar Todo </Text>
        </TouchableOpacity>

        <Text style={[styles.text, { fontSize: 15 }]}>Cantidad </Text>

        <TextInput
          placeholder="Nº"
          value={labelQty}
          onChangeText={setLabelQty}
          keyboardType="numeric"
          style={[styles.input, { width: 50 }]}
        />
      </View>

      <View style={styles.separador} />
      <View style={styles.separador} />

      <FlatList
        data={materials}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.separador} />
      <View style={styles.separador} />

      <View style={[styles.buttonContainer]}>
        {guardando && <ActivityIndicator size="large" color="#0000ff" />}

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
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
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
  checkbox: {
    width: 20, // Ancho del área tocable del checkbox
    height: 25, // Altura del área tocable del checkbox
    marginLeft: 12, // Espacio a la izquierda para separarlo del texto
    alignItems: "center", // Centra el carácter de verificación horizontalmente
    justifyContent: "center", // Centra el carácter de verificación verticalmente
    borderWidth: 1, // Borde del checkbox
    borderColor: "#000", // Color del borde del checkbox
    borderRadius: 3, // Bordes redondeados del checkbox
  },
  checkboxChecked: {
    backgroundColor: "#000", // Fondo cuando el checkbox está seleccionado
  },
  checkboxUnchecked: {
    backgroundColor: "#fff", // Fondo cuando el checkbox no está seleccionado
  },
  checkboxLabel: {
    fontSize: 16, // Tamaño del carácter de verificación
    color: "#fff", // Color del texto/caracter de verificación
  },
  materialInfo: {
    flexDirection: 'column',
  },
  materialName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  materialTotal: {
    fontSize: 14,
  },
});
