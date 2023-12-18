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
  ScrollView,
} from "react-native";
import {
  aniadeMaterial,
  buscarMateriales,
  eliminarMaterial,
  modificarMaterial,
  buscarTipoMateriales,
  aniadeTipoMaterial,
} from "../Controlador/tareas";
import {
  descargaTipoMateriales,
  openGallery,
  almacenaTipoMaterial,
  almacenaMaterial,
} from "../Controlador/multimedia";
import Swal from "sweetalert2";
import { Picker } from "@react-native-picker/picker";

export default function gestionItemMaterial() {
  //Variables para ver las distintas vistas
  const [viewCrearMaterial, setViewCrearMaterial] = useState(false);
  const [viewModificarMaterial, setViewModificarMaterial] = useState(false);
  const [viewPregunta, setViewPregunta] = useState(true);
  const [viewTipos, setViewTipos] = useState(false);
  const [viewStock, setViewStock] = useState(false);

  // Variables para guardar los campos de añadir un material
  const [nombre, setNombre] = useState("");
  const [foto, setFoto] = useState("");
  const [fotoUri, setFotoUri] = useState("");
  const [stock, setStock] = useState("");
  const [tipo, setTipo] = useState("");
  const [stockTipo, setStockTipo] = useState("");
  const [fotoTipo, setFotoTipo] = useState("");
  const [fotoTipoUri, setFotoTipoUri] = useState("");
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
  const [nuevaFotoUri, setNuevaFotoUri] = useState("");
  const [nuevoStock, setNuevoStock] = useState("");
  const [nuevasCaracteristicas, setNuevasCaracteristicas] = useState([]);

  // Variables para tipos de base de datos
  const [tipos, setTipos] = useState([]);
  const [cargarTipoBD, setCargarTipoBD] = useState(true);
  const [fotosTipos, setFotosTipos] = useState([]);
  const [cargarFotoTipoBD, setCargarFotoTipoBD] = useState(true);

  useEffect(() => {
    const cargarTipos = async () => {
      const datosTipos = await buscarTipoMateriales();
      // Crear el objeto con nombre 'Ninguno' y índice 0
      const opcionNinguno = { id: 0, nombre: "Ninguno" };
      // Añadir el objeto al inicio del array
      datosTipos.unshift(opcionNinguno);
      setTipos(datosTipos);
      const cargarFotos = await descargaTipoMateriales();
      const opcionNingunoFoto = { uri: 0, nombre: "Ninguno" };
      cargarFotos.unshift(opcionNingunoFoto);
      setFotosTipos(cargarFotos);
    };

    cargarTipos();
  }, []);

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
    setViewPregunta(true);
    setViewStock(false);
    setViewTipos(false);
  };

  const handleModificarMaterial = () => {
    setViewCrearMaterial(false);
    setViewModificarMaterial(true);
    setViewPregunta(false);
    setViewStock(false);
    setViewTipos(false);
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
    setStockTipo("");
    setFotoTipo("");
    setFotoTipoUri("");
    setNuevaFotoUri("");
  };

  const handleAnadirTipo = () => {
    if (
      tipo.trim() !== "" &&
      tipo !== "Ninguno" &&
      fotoTipo.trim() !== "" &&
      fotoTipo !== "Ninguno" &&
      !isNaN(stockTipo) &&
      stockTipo > 0 &&
      (!cargarFotoTipoBD ? fotoTipoUri.trim() !== "" : true)
    ) {
      if (!isSeleccionado) {
        setCaracteristicas([
          ...caracteristicas,
          {
            id: idMaterial,
            tipo,
            cantidad: stockTipo,
            foto: fotoTipo,
            uri: fotoTipoUri,
            nuevoTipo: !cargarTipoBD,
            nuevaFoto: !cargarFotoTipoBD,
          },
        ]);
        setIdMaterial(idMaterial + 1);
        setTipo("");
        setStockTipo("");
        setFotoTipo("");
        setFotoTipoUri("");
        let total = Number(stock) + Number(stockTipo);
        setStock(total);
      } else {
        setNuevasCaracteristicas([
          ...nuevasCaracteristicas,
          {
            id: nuevasCaracteristicas.length + 2,
            tipo,
            cantidad: stockTipo,
            foto: fotoTipo,
            uri: fotoTipoUri,
            nuevoTipo: !cargarTipoBD,
            nuevaFoto: !cargarFotoTipoBD,
          },
        ]);
        setTipo("");
        setStockTipo("");
        setFotoTipo("");
        setFotoTipo("");
        setFotoTipoUri("");
      }
    } else {
      if (Platform.OS === "web") {
        Swal.fire({
          title: "Campos incorrectos",
          text: "Rellena todos los campos correctamente antes de añadir el tipo.",
          icon: "warning",
          confirmButtonText: "De acuerdo",
        });
      } else {
        Alert.alert(
          "Campos incorrectos", // Título
          "Rellena todos los campos antes de añadir el tipo.", // Mensaje
          [{ text: "De acuerdo" }],
          { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
        );
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
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Cancelar",
        cancelButtonText: "Seguir",
      }).then((result) => {
        if (result.isConfirmed) {
          setNombre("");
          setFoto("");
          setStock("");
          setTipo("");
          setCaracteristicas([]);
          setStockTipo("");
          setFotoTipo("");
          setViewTipos(false);
          setViewStock(false);
          setViewPregunta(false);
          setViewCrearMaterial(false);
          setViewModificarMaterial(false);
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
              setStockTipo("");
              setFotoTipo("");
              setViewTipos(false);
              setViewStock(false);
              setViewPregunta(false);
              setViewCrearMaterial(false);
              setViewModificarMaterial(false);
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
    await eliminarMaterial(seleccionado.id);
    setSeleccionado([]);
    setIsSeleccionado(false);
    setViewModificarMaterial(true);
    setViewCrearMaterial(false);
  };

  const handleAnadirMaterial = async () => {
    if (
      nombre.trim() === "" ||
      foto.trim() === "" ||
      nuevaFotoUri === "" ||
      stock <= 0
    ) {
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
            const soloTipos = caracteristicas.map((caracteristica) => {
              return {
                tipo: caracteristica.tipo,
                cantidad: caracteristica.cantidad,
                foto: caracteristica.foto + ".png",
              };
            });
            await aniadeMaterial(nombre, foto + ".png", stock, soloTipos); // Almacenamos material en la BD
            await almacenaMaterial(fotoUri, foto + ".png"); // Almacenamos la foto en la BD
            for (const caracteristica of caracteristicas) {
              if (caracteristica.nuevoTipo) {
                await aniadeTipoMaterial(caracteristica.tipo); // almacenamos el nombre del nuevo tipo en la BD
              }
              if (caracteristica.nuevaFoto) {
                await almacenaTipoMaterial(
                  // almacenamos la foto del nuevo tipo de material en la BD
                  caracteristica.uri,
                  caracteristica.foto + ".png"
                );
              }
            }
            borrarTodo();
            setViewTipos(false);
            setViewStock(false);
            setViewPregunta(false);
            setViewCrearMaterial(false);
            setViewModificarMaterial(false);
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
                const soloTipos = caracteristicas.map((caracteristica) => {
                  return {
                    tipo: caracteristica.tipo,
                    cantidad: caracteristica.cantidad,
                    foto: caracteristica.foto + ".png",
                  };
                });
                await aniadeMaterial(nombre, foto + ".png", stock, soloTipos); // Almacenamos material en la BD
                await almacenaMaterial(fotoUri, foto + ".png"); // Almacenamos la foto en la BD
                for (const caracteristica of caracteristicas) {
                  if (caracteristica.nuevoTipo) {
                    await aniadeTipoMaterial(caracteristica.tipo); // almacenamos el nombre del nuevo tipo en la BD
                  }
                  if (caracteristica.nuevaFoto) {
                    await almacenaTipoMaterial(
                      // almacenamos la foto del nuevo tipo de material en la BD
                      caracteristica.uri,
                      caracteristica.foto + ".png"
                    );
                  }
                }
                borrarTodo();
                setViewTipos(false);
                setViewStock(false);
                setViewPregunta(false);
                setViewCrearMaterial(false);
                setViewModificarMaterial(false);
              },
            },
          ],
          { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
        );
      }
    }
  };

  const sinErrores = () => {
    if (
      nuevoNombre.trim() === "" ||
      nuevaFoto.trim() === "" ||
      nuevoStock <= 0
    ) {
      if (Platform.OS === "web") {
        Swal.fire({
          title: "Campos incorrectos",
          text: "Rellena todos los campos correctamente antes de añadir el tipo (nombre, foto o stock).",
          icon: "warning",
          confirmButtonText: "De acuerdo",
        });
      } else {
        Alert.alert(
          "Campos incorrectos", // Título
          "Rellena todos los campos antes de añadir el tipo  (nombre, foto o stock).", // Mensaje
          [{ text: "De acuerdo" }],
          { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
        );
      }
      return false;
    } else return true;
  };

  const handleModificar = async () => {
    if (sinErrores ()) {
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
            // Comprobación de que el stock sea igual al número de items totales.
            if (nuevasCaracteristicas.length === 0) {
              const soloTipos = nuevasCaracteristicas.map((caracteristica) => {
                return {
                  tipo: caracteristica.tipo,
                  cantidad: caracteristica.cantidad,
                  foto: caracteristica.foto + ".png",
                };
              });

              await modificarMaterial(
                seleccionado.id,
                nuevoNombre,
                nuevaFoto + ".png",
                nuevoStock,
                soloTipos
              );
              if (nuevaFotoUri !== "")
                await almacenaMaterial(nuevaFotoUri, nuevaFoto + ".png"); // Almacenamos la foto en la BD
            } else {
              // Obtenemos el stock de todos las caracteristicas y los sumamos.
              let stockTotal = nuevasCaracteristicas.reduce(
                (acumulador, item) => {
                  return acumulador + Number(item.cantidad);
                },
                0
              );

              if (stockTotal !== nuevoStock) {
                // Enviar mensajes de error y modificar el stock, y guardamos los datos.

                Swal.fire({
                  title: "Error en el stock final",
                  text: "La suma de los stocks de los tipos no es igual al número de stock final, luego se modificará el stock total.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  confirmButtonText: "De acuerdo",
                });
                // Se guarda el material cambiendo su stock final.
                const soloTipos = nuevasCaracteristicas.map(
                  (caracteristica) => {
                    return {
                      tipo: caracteristica.tipo,
                      cantidad: caracteristica.cantidad,
                      foto: caracteristica.foto + ".png",
                    };
                  }
                );

                await modificarMaterial(
                  seleccionado.id,
                  nuevoNombre,
                  nuevaFoto + ".png",
                  stockTotal,
                  soloTipos
                );
                if (nuevaFotoUri !== "")
                  await almacenaMaterial(nuevaFotoUri, nuevaFoto + ".png"); // Almacenamos la foto en la BD
                for (const caracteristica of nuevasCaracteristicas) {
                  if (caracteristica.nuevoTipo) {
                    await aniadeTipoMaterial(caracteristica.tipo); // almacenamos el nombre del nuevo tipo en la BD
                  }
                  if (caracteristica.nuevaFoto) {
                    await almacenaTipoMaterial(
                      // almacenamos la foto del nuevo tipo de material en la BD
                      caracteristica.uri,
                      caracteristica.foto + ".png"
                    );
                  }
                }
              } else {
                // Guardamos los datos, ya que no hay error en las cuentas
                const soloTipos = nuevasCaracteristicas.map(
                  (caracteristica) => {
                    return {
                      tipo: caracteristica.tipo,
                      cantidad: caracteristica.cantidad,
                      foto: caracteristica.foto + ".png",
                    };
                  }
                );

                await modificarMaterial(
                  seleccionado.id,
                  nuevoNombre,
                  nuevaFoto + ".png",
                  nuevoStock,
                  soloTipos
                );

                if (nuevaFotoUri !== "")
                  await almacenaMaterial(nuevaFotoUri, nuevaFoto + ".png"); // Almacenamos la foto en la BD

                for (const caracteristica of nuevasCaracteristicas) {
                  if (caracteristica.nuevoTipo) {
                    await aniadeTipoMaterial(caracteristica.tipo); // almacenamos el nombre del nuevo tipo en la BD
                  }
                  if (caracteristica.nuevaFoto) {
                    await almacenaTipoMaterial(
                      // almacenamos la foto del nuevo tipo de material en la BD
                      caracteristica.uri,
                      caracteristica.foto + ".png"
                    );
                  }
                }
              }
            }

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
                if (nuevasCaracteristicas.length === 0) {
                  const soloTipos = nuevasCaracteristicas.map(
                    (caracteristica) => {
                      return {
                        tipo: caracteristica.tipo,
                        cantidad: caracteristica.cantidad,
                        foto: caracteristica.foto + ".png",
                      };
                    }
                  );

                  await modificarMaterial(
                    seleccionado.id,
                    nuevoNombre,
                    nuevaFoto + ".png",
                    nuevoStock,
                    soloTipos
                  );
                  if (nuevaFotoUri !== "")
                    await almacenaMaterial(nuevaFotoUri, nuevaFoto + ".png"); // Almacenamos la foto en la BD
                } else {
                  // Obtenemos el stock de todos las caracteristicas y los sumamos.
                  let stockTotal = nuevasCaracteristicas.reduce(
                    (acumulador, item) => {
                      return acumulador + Number(item.cantidad);
                    },
                    0
                  );

                  if (stockTotal !== nuevoStock) {
                    // Enviar mensajes de error y modificar el stock, y guardamos los datos.

                    Alert.alert(
                      "Stock final modificado", // Título
                      "La suma de los stocks de los tipos no es igual al número de stock final.", // Mensaje
                      [{ text: "De acuerdo" }],
                      { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
                    );
                    // Se guarda el material cambiendo su stock final.
                    const soloTipos = nuevasCaracteristicas.map(
                      (caracteristica) => {
                        return {
                          tipo: caracteristica.tipo,
                          cantidad: caracteristica.cantidad,
                          foto: caracteristica.foto + ".png",
                        };
                      }
                    );

                    await modificarMaterial(
                      seleccionado.id,
                      nuevoNombre,
                      nuevaFoto + ".png",
                      stockTotal,
                      soloTipos
                    );
                    if (nuevaFotoUri !== "")
                      await almacenaMaterial(nuevaFotoUri, nuevaFoto + ".png"); // Almacenamos la foto en la BD
                    for (const caracteristica of nuevasCaracteristicas) {
                      if (caracteristica.nuevoTipo) {
                        await aniadeTipoMaterial(caracteristica.tipo); // almacenamos el nombre del nuevo tipo en la BD
                      }
                      if (caracteristica.nuevaFoto) {
                        await almacenaTipoMaterial(
                          // almacenamos la foto del nuevo tipo de material en la BD
                          caracteristica.uri,
                          caracteristica.foto + ".png"
                        );
                      }
                    }
                  } else {
                    // Guardamos los datos, ya que no hay error en las cuentas
                    const soloTipos = nuevasCaracteristicas.map(
                      (caracteristica) => {
                        return {
                          tipo: caracteristica.tipo,
                          cantidad: caracteristica.cantidad,
                          foto: caracteristica.foto + ".png",
                        };
                      }
                    );

                    await modificarMaterial(
                      seleccionado.id,
                      nuevoNombre,
                      nuevaFoto + ".png",
                      nuevoStock,
                      soloTipos
                    );

                    if (nuevaFotoUri !== "")
                      await almacenaMaterial(nuevaFotoUri, nuevaFoto + ".png"); // Almacenamos la foto en la BD

                    for (const caracteristica of nuevasCaracteristicas) {
                      if (caracteristica.nuevoTipo) {
                        await aniadeTipoMaterial(caracteristica.tipo); // almacenamos el nombre del nuevo tipo en la BD
                      }
                      if (caracteristica.nuevaFoto) {
                        await almacenaTipoMaterial(
                          // almacenamos la foto del nuevo tipo de material en la BD
                          caracteristica.uri,
                          caracteristica.foto + ".png"
                        );
                      }
                    }
                  }
                }

                borrarTodo();
                setViewCrearMaterial(false);
                setViewModificarMaterial(true);
              },
            },
          ],
          { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
        );
      }
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
      <View style={styles.leftColumn}>
        <Text style={styles.itemTextBold}>Nombre: </Text>
        <Text style={styles.itemText}>{item.tipo}</Text>
        <Text style={styles.itemTextBold}>Cantidad: </Text>
        <Text style={styles.itemText}>{item.cantidad}</Text>
      </View>

      <View style={styles.rightColumn}>
        <Text style={styles.itemTextBold}>Foto: </Text>
        <Text style={styles.itemText}>{item.foto}</Text>
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
    setViewTipos(true);
    setViewStock(true);
    setViewPregunta(false);
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
      // Nos quedamos con el nombre de la foto sin el .png.
      const nombreSinExtension = seleccionado.foto.split(".")[0];
      setNuevaFoto(nombreSinExtension);
      setNuevoStock(seleccionado.stock);
      const caracteristicasTransformadas = seleccionado.caracteristicas.map(
        (caracteristica, index) => ({
          id: index, // Genera un ID único
          tipo: caracteristica.tipo,
          foto: caracteristica.foto.split(".")[0], // Quita la extensión .png
          cantidad: caracteristica.cantidad,
        })
      );
      setNuevasCaracteristicas(caracteristicasTransformadas);
    }
  }, [seleccionado]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Items Materiales</Text>
        <View>
          <Text style={styles.text}>
            ¿Qué opción desea realizar? Pulse sobre el botón que desee.
          </Text>

          <View style={styles.separador}></View>
          <View style={styles.separador}></View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleCrearMaterial}
            >
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
              <View>
                <View style={styles.rowSolo}>
                  <TouchableOpacity
                    style={[styles.addButtonTipoFotoBD]}
                    onPress={async () => {
                      const uri = await openGallery();
                      if (uri) {
                        setNuevaFotoUri(uri);
                      }
                    }}
                  >
                    <Text style={styles.addButtonText}>Añadir Nueva Foto</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={[styles.inputNombreFotoNueva]}
                    placeholder="Nombre foto"
                    value={nuevaFoto}
                    onChangeText={(texto) => setNuevaFoto(texto)}
                  />
                </View>
                {nuevaFotoUri !== "" && (
                  <Text style={styles.TextSmall}> Añadida</Text>
                )}
              </View>
            ) : (
              <View>
                <View style={styles.rowSolo}>
                  <TouchableOpacity
                    style={[styles.addButtonTipoFotoBD]}
                    onPress={async () => {
                      const uri = await openGallery();
                      if (uri) {
                        setFotoUri(uri);
                      }
                    }}
                  >
                    <Text style={styles.addButtonText}>Añadir Nueva Foto</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={[styles.inputNombreFotoNueva]}
                    placeholder="Nombre foto"
                    value={foto}
                    onChangeText={(texto) => setFoto(texto)}
                  />
                </View>
                {fotoUri !== "" && (
                  <Text style={styles.TextSmall}> Añadida</Text>
                )}
              </View>
            )}

            <View style={styles.separador} />
            <View style={styles.separador} />

            {viewPregunta && (
              <>
                <Text style={[styles.text]}>
                  ¿El objeto tiene características como grueso, fino,
                  colores...?
                </Text>

                <View style={styles.separador} />

                <View style={styles.row}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setViewPregunta(false), setViewTipos(true);
                    }}
                  >
                    <Text style={styles.buttonText}>Sí</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setViewPregunta(false), setViewStock(true);
                    }}
                  >
                    <Text style={styles.buttonText}>No</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.separador} />
                <View style={styles.separador} />
              </>
            )}

            {viewStock && (
              <>
                <Text style={[styles.text]}>Stock</Text>

                <View style={styles.separador} />
                {isSeleccionado ? (
                  <TextInput
                    style={[styles.input]}
                    placeholder="Elija stock"
                    value={nuevoStock}
                    onChangeText={(texto) => setNuevoStock(texto)}
                    keyboardType="numeric"
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
              </>
            )}

            {viewTipos && (
              <>
                <Text style={[styles.text]}>
                  Añada una característica al material:
                </Text>

                <View style={styles.separador} />

                <Text style={[styles.text]}>Tipo característica</Text>

                <View style={styles.separador} />

                {cargarTipoBD ? (
                  <View>
                    <Picker
                      selectedValue={tipo}
                      onValueChange={(itemValue) => setTipo(itemValue)}
                      style={[styles.picker]}
                    >
                      {tipos.map((tipo, index) => (
                        <Picker.Item
                          key={index}
                          label={tipo.nombre}
                          value={tipo.nombre}
                        />
                      ))}
                    </Picker>

                    <TouchableOpacity
                      style={[styles.addButtonTipoBD]}
                      onPress={() => {
                        setCargarTipoBD(false);
                        setTipo("");
                      }}
                    >
                      <Text style={styles.addButtonText}>Añadir nuevo</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <TextInput
                      style={[styles.input]}
                      placeholder="Elija el nombre"
                      value={tipo}
                      onChangeText={setTipo}
                    />

                    <TouchableOpacity
                      style={[styles.addButtonTipoBD]}
                      onPress={() => {
                        setCargarTipoBD(true);
                        setTipo("");
                      }}
                    >
                      <Text style={styles.addButtonText}>Preelección</Text>
                    </TouchableOpacity>
                  </View>
                )}

                <View style={styles.separador} />

                <Text style={[styles.text]}>Cantidad</Text>

                <View style={styles.separador} />
                <TextInput
                  style={[styles.input]}
                  placeholder="Elija la cantidad"
                  value={stockTipo}
                  onChangeText={setStockTipo}
                  keyboardType="numeric"
                />

                <View style={[styles.separador]} />

                <Text style={[styles.text]}>Foto</Text>

                <View style={styles.separador} />

                {cargarFotoTipoBD ? (
                  <View>
                    <Picker
                      selectedValue={fotoTipo}
                      onValueChange={(itemValue) => setFotoTipo(itemValue)}
                      style={[styles.picker]}
                    >
                      {fotosTipos.map((tipo, index) => (
                        <Picker.Item
                          key={index}
                          label={tipo.nombre}
                          value={tipo.nombre}
                        />
                      ))}
                    </Picker>

                    <TouchableOpacity
                      style={[styles.addButtonTipoBD]}
                      onPress={() => {
                        setCargarFotoTipoBD(false);
                        setFotoTipo("");
                      }}
                    >
                      <Text style={styles.addButtonText}>Añadir nuevo</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <View style={styles.rowSolo}>
                      <TouchableOpacity
                        style={[styles.addButtonTipoFotoBD]}
                        onPress={async () => {
                          const uri = await openGallery();
                          if (uri) {
                            setFotoTipoUri(uri);
                          }
                        }}
                      >
                        <Text style={styles.addButtonText}>
                          Añadir Nueva Foto
                        </Text>
                      </TouchableOpacity>
                      <TextInput
                        style={[styles.inputNombreFotoNueva]}
                        placeholder="Nombre foto"
                        value={fotoTipo}
                        onChangeText={setFotoTipo}
                      />
                    </View>
                    {fotoTipoUri !== "" && (
                      <Text style={styles.TextSmall}> Añadida</Text>
                    )}
                    <TouchableOpacity
                      style={[styles.addButtonTipoBD, { marginTop: 5 }]}
                      onPress={() => {
                        setCargarFotoTipoBD(true);
                        setFotoTipo("");
                      }}
                    >
                      <Text style={styles.addButtonText}>Preelección</Text>
                    </TouchableOpacity>
                  </View>
                )}

                <View style={styles.separador} />

                <TouchableOpacity
                  style={styles.addButtonTipo}
                  onPress={handleAnadirTipo}
                >
                  <Text style={styles.addButtonText}>Añadir tipo</Text>
                </TouchableOpacity>

                <ScrollView style={styles.FlatListCaracteristicas}>
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
                </ScrollView>
              </>
            )}

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
                  {!viewPregunta && (
                    <>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={handleCancelar}
                      >
                        <Text style={styles.addButtonText}>Cancelar</Text>
                      </TouchableOpacity>
                    </>
                  )}
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
                  {!viewPregunta && (
                    <>
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={handleAnadirMaterial}
                      >
                        <Text style={styles.addButtonText}>Añadir</Text>
                      </TouchableOpacity>
                    </>
                  )}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
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
  addButtonTipoBD: {
    backgroundColor: "grey",
    padding: 5,
    width: 120,
    borderRadius: 5,
    marginRight: 100,
  },
  addButtonTipoFotoBD: {
    backgroundColor: "grey",
    padding: 5,
    width: 140,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 2,
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
  rowSolo: {
    flexDirection: "row",
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
  inputNombreFotoNueva: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    marginBottom: 10,
    width: 120,
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
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
    fontSize: 14, // Tamaño de fuente mediano para buena legibilidad
    color: "#333", // Color oscuro para el texto para alto contraste
    marginVertical: 3,
  },
  itemTextBold: {
    fontSize: 14, // Tamaño de fuente mediano para buena legibilidad
    color: "#333", // Color oscuro para el texto para alto contraste
    fontWeight: "bold", // Peso de la fuente normal; puede ser 'bold' si es necesario
    marginVertical: 3,
  },
  TextSmall: {
    fontSize: 12, // Tamaño de fuente mediano para buena legibilidad
    color: "green", // Color oscuro para el texto para alto contraste
    marginBottom: 5,
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
    marginTop: 10,
    marginLeft: 30,
    height: 100,
    maxHeight: 500,
    width: 200,
    maxWidth: 200,
  },
  FlatListMateriales: {
    height: 500,
    maxHeight: 500,
  },
  leftColumn: {
    flexDirection: "column",
    justifyContent: "center",
    marginRight: 30,
  },
  rightColumn: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  picker: {
    height: 25,
    width: Platform.OS === "web" ? 150 : 200,
    marginBottom: 10,
  },
});
