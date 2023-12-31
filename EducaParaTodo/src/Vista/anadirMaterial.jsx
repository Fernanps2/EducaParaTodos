import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  TextInput,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import Swal from "sweetalert2";
import { buscarMateriales } from "../Controlador/tareas";
import { Picker } from "@react-native-picker/picker";
import {
  existeLista,
  set_materialesBD,
  get_materialesBD,
  modificarStock_materialesBD,
  isLargeItemMaterialesBD,
  isHasTiposItemMaterialesBD,
  getInicioPantalla,
} from "./VarGlobal";

export default function AnadirMaterial({ navigation }) {
  // Variables para elegir material
  const [initialMaterials, setInitialMaterials] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Función para llamar a getMateriales y almacenar la respuesta
    const cargarMateriales = async () => {
      try {
        const datosMateriales = await buscarMateriales();
        const datosMaterialesActuales = get_materialesBD();
        console.log("Datos de buscarMateriales:", datosMateriales);
        console.log("Datos de get_materialesBD:", datosMaterialesActuales);

        if (datosMaterialesActuales.length === 0 || getInicioPantalla()) {
          set_materialesBD(datosMateriales);
          setMaterials(datosMateriales); // Guardamos los datos en la variable de estado
          setInitialMaterials(datosMateriales);
          setCargando(false);
        } else {
          setMaterials(get_materialesBD); // Guardamos los datos en la variable de estado
          setInitialMaterials(get_materialesBD);
          setCargando(false);
        }
      } catch (error) {
        console.error("Error al obtener materiales:", error);
        setCargando(false);
      }
    };

    cargarMateriales(); // Llamamos a la función al montar el componente
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar

  // Variables para guardar los datos
  const [pickupLocation, setPickupLocation] = useState("Ninguno");
  const [dropoffLocation, setDropoffLocation] = useState("Ninguno");
  const [searchQuery, setSearchQuery] = useState("");
  const [labelQty, setLabelQty] = useState("");
  const [caracteristica, setCaracteristica] = useState("Ninguno");
  const [caracDef, setCaracDef] = useState("Ninguno");
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [nombreMaterial, setNombreMaterial] = useState("");
  const [material, setMaterial] = useState([]);
  const [stockComparar, setStockComparar] = useState("");

  // Hace una búsquedad de materiales
  const searchMaterials = () => {
    if (searchQuery) {
      setMaterials(
        materials.filter((material) => material.nombre.includes(searchQuery))
      );
    } else {
      setMaterials(initialMaterials);
    }
  };

  /**
   * The function "showAllMaterials" resets the materials state and clears the search query.
   */
  const showAllMaterials = () => {
    setMaterials(initialMaterials);
    setSearchQuery("");
  };

  // Selecciona un material y actualiza el estado de las variables con la información del objeto elegido
  const selectMaterial = (item) => {
    // Set the selected material ID, name, and object
    setSelectedMaterialId(item.id);
    setNombreMaterial(item.nombre);
    setMaterial(item);

    // Find the current value of the picker for this material
    const valorActualPicker = item.caracteristicas.find(
      (carac) => carac.tipo === caracteristica
    );
    if (valorActualPicker) {
      // If a value is found, set the default characteristic and stock to the value of the picker
      setCaracDef(valorActualPicker.tipo);
      setStockComparar(valorActualPicker.cantidad);
    } else {
      // If no value is found, set the default characteristic to "None" and the stock to the material's total stock
      setCaracDef("Ninguno");
      setStockComparar(item.stock);
    }
  };

  // Con esta función se muestra el stock del material en la lista, tanto del total si no se selecciona ningún tipo,
  // Como de cada tipo de material.
  const getCantidadForCaracteristica = (
    stock,
    caracteristicas,
    tipoSeleccionado
  ) => {
    const caracteristica = caracteristicas.find(
      (caracteristica) => caracteristica.tipo === tipoSeleccionado
    );
    return caracteristica ? caracteristica.cantidad : stock;
  };

  /**
   * La función "seleccionTipo" establece el estado "caracteristica" y actualiza el estado
   * "stockComparar" en función de los parámetros "tipo" e "item" seleccionados.
   */
  const seleccionTipo = (tipo, item) => {
    setCaracteristica(tipo);
    if (selectedMaterialId === item.id) {
      setCaracDef(tipo);
      const valor = item.caracteristicas.find((carac) => carac.tipo === tipo);
      setStockComparar(valor.cantidad);
    }
  };

  /**
   * La función renderItem es un componente de React en JavaScript que renderiza un elemento de
   * lista con información sobre un material, un selector para elegir una característica y
   * una casilla de verificación para seleccionar el elemento. Retorna un elemento JSX.
   */
  const renderItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <View style={styles.materialInfo}>
          <Text style={styles.materialName}>{item.nombre}</Text>
          <Text
            style={styles.materialTotal}
          >{`Cantidad total: ${getCantidadForCaracteristica(
            item.stock,
            item.caracteristicas,
            caracteristica
          )} `}</Text>
        </View>
        <Picker
          selectedValue={caracteristica}
          style={styles.picker}
          onValueChange={(itemValue) => seleccionTipo(itemValue, item)}
        >
          <Picker.Item key="Ninguno" label="Ninguno" value="Ninguno" />
          {item.caracteristicas.map((caracteristica, index) => (
            <Picker.Item
              key={index}
              label={caracteristica.tipo}
              value={caracteristica.tipo}
            />
          ))}
        </Picker>
        <TouchableOpacity
          style={[
            styles.checkbox,
            selectedMaterialId === item.id
              ? styles.checkboxChecked
              : styles.checkboxUnchecked,
          ]}
          onPress={() => selectMaterial(item)}
        >
          {selectedMaterialId === item.id && (
            <Text style={styles.checkboxLabel}>✓</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * La función guardarDatos verifica si ya se ha añadido un material con las mismas características,
   * y si no es así, actualiza la cantidad total en stock y navega hacia una nueva pantalla.
   */
  const guardarDatos = () => {
    // que no pueda introducir un material con la misma característica dos veces.
    if (
      existeLista(selectedMaterialId, caracDef, pickupLocation, dropoffLocation)
    ) {
      if (Platform.OS === "web") {
        Swal.fire({
          title: "Material ya introducido",
          text: "Este material ya lo haz añadido a la tarea",
          icon: "warning",
          confirmButtonText: "De acuerdo",
        });
      } else {
        Alert.alert(
          "Material ya introducido",
          "Este material ya lo haz añadido a la tarea"
        );
      }
    } else {
      // Actualizamos la cantidad de stock total.
      modificarStock_materialesBD(selectedMaterialId, labelQty, caracDef);
      navigation.navigate("verTodosMateriales", {
        id: selectedMaterialId,
        caracteristica: caracDef,
        origen: pickupLocation,
        destino: dropoffLocation,
        cantidad: labelQty,
        nombre: nombreMaterial,
      });
    }
  };

  // comprueba que estén rellanados todos los campos antes de guardar el material nuevo añadido
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
          if (
            pickupLocation == "Ninguno" ||
            dropoffLocation == "Ninguno" ||
            pickupLocation == dropoffLocation ||
            isNaN(labelQty) ||
            labelQty.trim() === "" ||
            labelQty <= 0 ||
            selectedMaterialId === null
          ) {
            Swal.fire({
              title: "Campos rellenados incorrectamente",
              text: "Comprueba que todos los campos estan rellanados correctamente.",
              icon: "warning",
              confirmButtonText: "De acuerdo",
            });
          } else {
            if (isHasTiposItemMaterialesBD(selectedMaterialId)) {
              if (caracDef === "Ninguno") {
                Swal.fire({
                  title: "Campo incorrecto",
                  text: "Debe elegir una característica del objeto elegido",
                  icon: "warning",
                  confirmButtonText: "De acuerdo",
                });
              } else {
                // Si tiene tipo entonces se escoge por el stock del tipo.
                if (
                  isLargeItemMaterialesBD(
                    selectedMaterialId,
                    caracDef,
                    labelQty
                  )
                ) {
                  Swal.fire({
                    title: "Cantidad incorrecta",
                    text: "La cantidad a recoger no debe ser superior al stock que hay.",
                    icon: "warning",
                    confirmButtonText: "De acuerdo",
                  });
                } else {
                  guardarDatos();
                }
              }
            } else {
              // Si no tiene tipo entonces se escoge por el stock final.
              if (Number(labelQty) > Number(stockComparar)) {
                Swal.fire({
                  title: "Cantidad incorrecta",
                  text: "La cantidad a recoger no debe ser superior al stock total.",
                  icon: "warning",
                  confirmButtonText: "De acuerdo",
                });
              } else {
                guardarDatos();
              }
            }
          }
        }
      });
    } else {
      Alert.alert(
        "¿Quiere guardar?", // Título
        "Pulsa una opción", // Mensaje
        [
          { text: "Cancelar" },
          {
            text: "Confirmar",
            onPress: () => {
              if (
                pickupLocation == "Ninguno" ||
                dropoffLocation == "Ninguno" ||
                pickupLocation == dropoffLocation ||
                isNaN(labelQty) ||
                labelQty.trim() === "" ||
                labelQty <= 0 ||
                selectedMaterialId === null
              ) {
                Alert.alert(
                  "Campos rellenados incorrectamente", // Título
                  "Comprueba que todos los campos estan rellanados correctamente.", // Mensaje
                  [{ text: "De acuerdo" }]
                );
              } else {
                if (isHasTiposItemMaterialesBD(selectedMaterialId)) {
                  if (caracDef === "Ninguno") {
                    Alert.alert(
                      "Campo incorrecto", // Título
                      "Debe elegir una característica del objeto elegido", // Mensaje
                      [{ text: "De acuerdo" }]
                    );
                  } else {
                    // Si tiene tipo entonces se escoge por el stock del tipo.
                    if (
                      isLargeItemMaterialesBD(
                        selectedMaterialId,
                        caracDef,
                        labelQty
                      )
                    ) {
                      Alert.alert(
                        "Cantidad incorrecta", // Título
                        "La cantidad a recoger no debe ser superior al stock que hay.", // Mensaje
                        [{ text: "De acuerdo" }]
                      );
                    } else {
                      guardarDatos();
                    }
                  }
                } else {
                  // Si no tiene tipo entonces se escoge por el stock final.
                  if (Number(labelQty) > Number(material.stock)) {
                    Alert.alert(
                      "Cantidad incorrecta", // Título
                      "La cantidad a recoger no debe ser superior al stock total.", // Mensaje
                      [{ text: "De acuerdo" }]
                    );
                  } else {
                    guardarDatos();
                  }
                }
              }
            },
          },
        ],
        { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
      );
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.separador} />
        <View style={styles.separador} />
        <View style={[styles.row, { justifyContent: "center" }]}>
          <Text style={[styles.title]}>Añadir Material</Text>
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
        <View style={styles.row}>
          <Text style={styles.text}>Recoger en: </Text>

          <Picker
            selectedValue={pickupLocation}
            style={styles.picker}
            onValueChange={(itemValue) => setPickupLocation(itemValue)}
          >
            <Picker.Item key="Ninguno" label="Ninguno" value="Ninguno" />
            <Picker.Item key="0" label="Almacén" value="Almacen" />
            <Picker.Item key="11" label="Impresora" value="Impresora" />
            <Picker.Item key="1" label="Aula A" value="A" />
            <Picker.Item key="2" label="Aula B" value="B" />
            <Picker.Item key="3" label="Aula C" value="C" />
            <Picker.Item key="4" label="Aula D" value="D" />
            <Picker.Item key="5" label="Aula E" value="E" />
            <Picker.Item key="6" label="Aula F" value="F" />
            <Picker.Item key="7" label="Aula G" value="G" />
            <Picker.Item key="8" label="Aula H" value="H" />
            <Picker.Item key="9" label="Aula I" value="I" />
            <Picker.Item key="10" label="Aula J" value="J" />
          </Picker>
        </View>
        <View style={styles.separador} />
        <View style={styles.separador} />
        <View style={styles.row}>
          <Text style={styles.text}>Llevar a: </Text>

          <Picker
            selectedValue={dropoffLocation}
            style={styles.picker}
            onValueChange={(itemValue) => setDropoffLocation(itemValue)}
          >
            <Picker.Item key="Ninguno" label="Ninguno" value="Ninguno" />
            <Picker.Item key="0" label="Almacén" value="Almacen" />
            <Picker.Item key="11" label="Impresora" value="Impresora" />
            <Picker.Item key="1" label="Aula A" value="A" />
            <Picker.Item key="2" label="Aula B" value="B" />
            <Picker.Item key="3" label="Aula C" value="C" />
            <Picker.Item key="4" label="Aula D" value="D" />
            <Picker.Item key="5" label="Aula E" value="E" />
            <Picker.Item key="6" label="Aula F" value="F" />
            <Picker.Item key="7" label="Aula G" value="G" />
            <Picker.Item key="8" label="Aula H" value="H" />
            <Picker.Item key="9" label="Aula I" value="I" />
            <Picker.Item key="10" label="Aula J" value="J" />
          </Picker>
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

        {cargando || materials.length == 0 ? (
          <View style={styles.Flatlist}>
            <View style={styles.text}>
              <Text>Cargando...</Text>
            </View>
          </View>
        ) : (
          <View style={styles.Flatlist}>
            <FlatList
              data={materials}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}

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
    </ScrollView>
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
    flexDirection: "column",
  },
  materialName: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  materialTotal: {
    fontSize: 14,
  },
  Image: {
    width: 20,
    height: 20,
  },
  picker: {
    height: 20,
    width: 150,
    marginHorizontal: 10,
  },
  Flatlist: {
    height: 400,
    maxHeight: 400,
  },
});
