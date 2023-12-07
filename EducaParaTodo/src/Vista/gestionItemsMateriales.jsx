import React, { useState, useEffect } from "react";
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
import {
  aniadeMaterial,
  buscarMateriales,
  eliminarMaterial,
  modificarMaterial,
} from "../Controlador/tareas";
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

  // Variable para elegir que materia modificar
  const [buscar, setBuscar] = useState("");
  const [materiales, setMateriales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtrar, setFiltrar] = useState([]);
  const [seleccionado, setSeleccionado] = useState([]);
  const [isSeleccionado, setIsSeleccionado] = useState(false);
  const [idMaterial, setIdMaterial] = useState(0);

  // Variable para modificar un material
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaFoto, setNuevaFoto] = useState("");
  const [nuevoStock, setNuevoStock] = useState("");
  const [nuevasCaracteristicas, setNuevasCaracteristicas] = useState([]);

  // Se actualizará el valor de materiales cuando tengamos que modificar uno y estemos en la interfaz de elegir material.

  useEffect(() => {
    if (viewModificarMaterial) {
      const cargarMateriales = async () => {
        try {
          const datosMateriales = await buscarMateriales();
          setMateriales(datosMateriales); // Guardamos los datos en la variable de estado
          setFiltrar(datosMateriales);
          setCargando(false);
        } catch (error) {
          console.error("Error al obtener materiales:", error);
          setCargando(false);
        }
      };
      cargarMateriales();
    }
  }, [viewModificarMaterial]);

  const handleCrearMaterial = () => {
    setViewCrearMaterial(true);
    setViewModificarMaterial(false);
    setIsSeleccionado(false);
    setSeleccionado([]);
    borrarTodo();
  };
  const handleModificarMaterial = () => {
    setViewCrearMaterial(false);
    setViewModificarMaterial(true);
    setIsSeleccionado(false);
    setSeleccionado([]);
    borrarTodo();
  };

  const borrarTodo = () => {
    setNombre("");
    setNuevoNombre("");
    setFoto("");
    setNuevaFoto("");
    setStock("");
    setNuevoStock("");
    setCaracteristicas([]);
    setNuevasCaracteristicas([]);
    setBuscar("");
  };

  const handleAnadirTipo = () => {
    if (tipo.trim() !== "") {
      if (!isSeleccionado) {
        setCaracteristicas([...caracteristicas, { id: idMaterial, tipo }]);
        setIdMaterial(idMaterial + 1);
        setTipo("");
      } else {
        setNuevasCaracteristicas([
          ...nuevasCaracteristicas,
          { id: nuevasCaracteristicas.length + 2, tipo },
        ]);
        setTipo("");
      }
    }
  };

  const handleCancelar = () => {
    if (Platform.OS === "web") {
      Swal.fire({
        title: "¿Estás seguro que quieres borrar?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Borrar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          setNombre("");
          setFoto("");
          setStock("");
          setTipo("");
          setCaracteristicas([]);
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
              setNombre("");
              setFoto("");
              setStock("");
              setTipo("");
              setCaracteristicas([]);
            },
          },
        ],
        { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
      );
    }
  };

  const handleEliminar = async () => {
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
          setNuevoNombre("");
          setNuevaFoto("");
          setNuevoStock("");
          setNuevasCaracteristicas([]);
          borrarMaterial();
        }
      });
    } else {
      Alert.alert(
        "¿Quiere eliminarlo?", // Título
        "Pulsa una opción", // Mensaje
        [
          { text: "Cancelar" },
          {
            text: "Confirmar",
            onPress: () => {
              setNuevoNombre("");
              setNuevaFoto("");
              setNuevoStock("");
              setNuevasCaracteristicas([]);
              borrarMaterial();
            },
          },
        ],
        { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
      );
    }
  };

  const borrarMaterial = async () => {
    console.log(seleccionado.id);
    await eliminarMaterial(seleccionado.id);
    setSeleccionado([]);
    setIsSeleccionado(false);
    setViewModificarMaterial(true);
    setViewCrearMaterial(false);
  };

  const handleAnadirMaterial = async () => {
    if (nombre.trim() === "" || foto.trim() === "" || stock.trim() === "") {
      if (Platform.OS === "web") {
        Swal.fire({
          title: "Campos incorrectos",
          text: "Rellena todos los campos antes de añadir el material.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "De acuerdo",
        });
      } else {
        Alert.alert(
          "Campos incorrectos", // Título
          "Rellena todos los campos antes de añadir el material.", // Mensaje
          [{ text: "De acuerdo" }],
          { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
        );
      }
    } else {
      if (Platform.OS === "web") {
        Swal.fire({
          title: "Añadir materal",
          text: "¿Quieres añadir este material?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Añadir",
          cancelButtonText: "Cancelar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const soloTipos = caracteristicas.map(
              (caracteristica) => caracteristica.tipo
            );
            await aniadeMaterial(nombre, foto, stock, soloTipos);
            borrarTodo();
          }
        });
      } else {
        Alert.alert(
          "¿Quieres añadir este material?", // Título
          "Pulsa una opción", // Mensaje
          [
            { text: "Cancelar" },
            {
              text: "Añadir",
              onPress: async () => {
                const soloTipos = caracteristicas.map(
                  (caracteristica) => caracteristica.tipo
                );
                await aniadeMaterial(nombre, foto, stock, soloTipos);
                borrarTodo();
              },
            },
          ],
          { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
        );
      }
    }
  };

  const handleModificar = async () => {
    if (Platform.OS === "web") {
      Swal.fire({
        title: "Modificar materal",
        text: "¿Quieres modificar el material?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Modificar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const soloTipos = nuevasCaracteristicas.map(
            (caracteristica) => caracteristica.tipo
          );
          await modificarMaterial(
            seleccionado.id,
            nuevoNombre,
            nuevaFoto,
            nuevoStock,
            soloTipos
          );
          borrarTodo();
          setViewCrearMaterial(false);
          setViewModificarMaterial(true);
        }
      });
    } else {
      Alert.alert(
        "¿Quieres modificar el material?", // Título
        "Pulsa una opción", // Mensaje
        [
          { text: "Cancelar" },
          {
            text: "Modificar",
            onPress: async () => {
              const soloTipos = nuevasCaracteristicas.map(
                (caracteristica) => caracteristica.tipo
              );
              await modificarMaterial(
                seleccionado.id,
                nuevoNombre,
                nuevaFoto,
                nuevoStock,
                soloTipos
              );
              borrarTodo();
              setViewCrearMaterial(false);
              setViewModificarMaterial(true);
            },
          },
        ],
        { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
      );
    }
  };

  const handleStockInput = (dato) => {
    if (!isNaN(dato) && dato.trim() !== "") {
      if (isSeleccionado) {
        setNuevoStock(dato);
      } else {
        setStock(dato);
      }
    } else if (dato.trim() === "") {
      if (isSeleccionado) {
        setNuevoStock("");
      } else {
        setStock("");
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
          console.log(nuevasCaracteristicas);
          if (isSeleccionado) {
            setNuevasCaracteristicas(
              nuevasCaracteristicas.filter((item) => item.id !== id)
            );
          } else {
            setCaracteristicas(
              caracteristicas.filter((item) => item.id !== id)
            );
          }
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
              if (isSeleccionado) {
                setNuevasCaracteristicas(
                  nuevasCaracteristicas.filter((item) => item.id !== id)
                );
              } else {
                setCaracteristicas(
                  caracteristicas.filter((item) => item.id !== id)
                );
              }
            },
          },
        ],
        { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
      );
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainerTipo}>
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

  // %%%%%%%%%%%%%% Funciones para mostrar los materiales %%%%%%%%%%%%%%%%%

  const handleBuscar = () => {
    if (buscar) {
      const newData = materiales.filter((item) => item.nombre.includes(buscar));
      setFiltrar(newData);
    } else {
      setFiltrar(materiales);
    }
  };

  const handleMostrarTodo = () => {
    setFiltrar(materiales);
    setBuscar("");
  };

  // Cuando queramos modificar un material lo guardamos en una variable, y cargamos la interfaz con sus datos.
  const handleModificarIcono = (item) => {
    setSeleccionado(item);
    setIsSeleccionado(true);
    setViewCrearMaterial(true);
    setViewModificarMaterial(false);
  };

  const renderItemMateriales = ({ item }) => (
    <View style={styles.itemContainerListar}>
      <View style={styles.materialInfo}>
        <Text style={styles.materialName}>{item.nombre}</Text>
        <Text
          style={styles.materialTotal}
        >{`Cantidad total: ${item.stock} `}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleModificarIcono(item)}
      >
        <Image
          source={require("../../Imagenes/CrearTarea/iconoModificar.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );

  // Cuando eligamos al material a modificar obtenemos sus valores.
  // actualizamos nuevas caracteristicas con esos campos para que se adapte a las funciones ya creada para
  // añadir caracteristicas a un nuevo material.

  useEffect(() => {
    if (
      seleccionado !== null &&
      seleccionado !== undefined &&
      seleccionado.caracteristicas !== undefined
    ) {
      setNuevoNombre(seleccionado.nombre);
      setNuevaFoto(seleccionado.foto);
      setNuevoStock(seleccionado.stock);
      const caracteristicasTransformadas = seleccionado.caracteristicas.map(
        (tipo, index) => ({
          id: index, // Genera un ID único
          tipo: tipo,
        })
      );
      setNuevasCaracteristicas(caracteristicasTransformadas);
    }
  }, [seleccionado]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Items Materiales</Text>
      <View>
        <Text style={styles.text}>
          ¿Qué opción desea realizar? Pulse sobre el botón que desee.
        </Text>

        <View style={styles.separador}></View>
        <View style={styles.separador}></View>

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
      {viewCrearMaterial && (
        <View>
          <Text style={[styles.text]}>Nombre</Text>

          <View style={styles.separador} />
          {isSeleccionado ? (
            <TextInput
              style={[styles.input]}
              placeholder="Elija nombre"
              value={nuevoNombre}
              onChangeText={(texto) => setNuevoNombre(texto)}
            />
          ) : (
            <TextInput
              style={[styles.input]}
              placeholder="Elija nombre"
              value={nombre}
              onChangeText={setNombre}
            />
          )}

          <View style={styles.separador} />
          <View style={styles.separador} />

          <Text style={[styles.text]}>Foto</Text>

          <View style={styles.separador} />
          {isSeleccionado ? (
            <TextInput
              style={[styles.input]}
              placeholder="Elija foto"
              value={nuevaFoto}
              onChangeText={(texto) => setNuevaFoto(texto)}
            />
          ) : (
            <TextInput
              style={[styles.input]}
              placeholder="Elija foto"
              value={foto}
              onChangeText={setFoto}
            />
          )}

          <View style={styles.separador} />
          <View style={styles.separador} />

          <Text style={[styles.text]}>Stock</Text>

          <View style={styles.separador} />
          {isSeleccionado ? (
            <TextInput
              style={[styles.input]}
              placeholder="Elija stock"
              value={nuevoStock}
              onChangeText={(texto) => setNuevoStock(texto)}
            />
          ) : (
            <TextInput
              style={[styles.input]}
              placeholder="Elija stock"
              value={stock}
              onChangeText={handleStockInput}
              keyboardType="numeric"
            />
          )}

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
            onPress={handleAnadirTipo}
          >
            <Text style={styles.addButtonText}>Añadir tipo</Text>
          </TouchableOpacity>

          <View style={styles.FlatListCaracteristicas}>
            {isSeleccionado ? (
              <FlatList
                data={nuevasCaracteristicas}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            ) : (
              <FlatList
                data={caracteristicas}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            )}
          </View>

          <View style={styles.rowBotones}>
            {isSeleccionado ? (
              <>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleEliminar}
                >
                  <Text style={styles.addButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancelar}
                >
                  <Text style={styles.addButtonText}>Borrar</Text>
                </TouchableOpacity>
              </>
            )}
            {isSeleccionado ? (
              <>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleModificar}
                >
                  <Text style={styles.addButtonText}>Modificar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAnadirMaterial}
                >
                  <Text style={styles.addButtonText}>Añadir</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      )}
      {viewModificarMaterial && (
        <View>
          <View style={[styles.row]}>
            <TextInput
              style={[styles.input]}
              placeholder="Elija Material"
              value={buscar}
              onChangeText={setBuscar}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleBuscar}
            >
              <Text style={styles.addButtonText}>Buscar</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.showAllMaterials}
            onPress={handleMostrarTodo}
          >
            <Text style={styles.addButtonText}>Mostrar Todo</Text>
          </TouchableOpacity>
          {cargando && (
            <View style={styles.text}>
              <Text>Cargando...</Text>
            </View>
          )}
          <View style={styles.FlatListMateriales}>
            <FlatList
              data={filtrar}
              keyExtractor={(item) => item.id}
              renderItem={renderItemMateriales}
            />
          </View>
        </View>
      )}
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
    marginHorizontal: 20,
  },
  searchButton: {
    backgroundColor: "blue",
    padding: 5,
    width: 100,
    height: 30,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  showAllMaterials: {
    backgroundColor: "gray",
    padding: 5,
    width: 120,
    borderRadius: 5,
    marginLeft: 300,
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
    position: "absolute",
    bottom: -75,
    flexDirection: "row",
    alignItems: "center",
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
  itemContainerTipo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    width: 200,
  },
  itemContainerListar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    width: 200,
    marginLeft: 140,
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
  materialInfo: {
    flexDirection: "column",
    width: 200,
  },
  materialName: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  materialTotal: {
    fontSize: 14,
  },
  FlatListCaracteristicas: {
    marginLeft: 30,
    height: 250,
    maxHeight: 500,
  },
  FlatListMateriales: {
    height: 500,
    maxHeight: 500,
  },
});
