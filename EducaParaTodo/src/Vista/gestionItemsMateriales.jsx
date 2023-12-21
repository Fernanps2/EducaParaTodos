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
import { RFValue } from "react-native-responsive-fontsize";
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
    /*
    * Se descarga los tipos de materiales(fino, gordo..) y añade la opción de ninguno a la cabeza. Además
    * se descarga las fotos de estos tipos desde la base de datos.
    */
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

  /* 
  * Se actualizará el valor de materiales cuando tengamos que modificar uno y estemos en la interfaz 
  * de elegir material.
  */
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

  // Renderiza el contenido cuando se elije la opción de crear material y se actualiza los estodos de las variables
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

    // Renderiza el contenido cuando se elije la opción de modificar material y se actualiza los estodos de las variables
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

  // Inicializa el valor de todas las variables
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

  /* 
  * Añade un nuevo tipo a la base de datos tanto cuando se añade un material como cuando se modifica un 
  * material. se comprueba posibles errores con avisos, 
  */
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
            cantidad: Number(stockTipo),
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
            cantidad: Number(stockTipo),
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

  // Cuando se pulsa el boton cancelar se manda un mensaje de confirmación para borrar toda la información.
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

  // Elimina un material, se realiza mensajes de confirmación.
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

  // Borrar un material de la base de datos y actualiza el renderizado actualizando los estados de las variables
  const borrarMaterial = async () => {
    await eliminarMaterial(seleccionado.id);
    setSeleccionado([]);
    setIsSeleccionado(false);
    setViewModificarMaterial(true);
    setViewCrearMaterial(false);
  };

  // Se añade un material a la base de datos con comprobaciones de errores, y mensajes de confirmación.
  const handleAnadirMaterial = async () => {
    if (
      nombre.trim() === "" ||
      foto.trim() === "" ||
      fotoUri === "" ||
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
                cantidad: Number(caracteristica.cantidad),
                foto: caracteristica.foto + ".png",
              };
            });
            await aniadeMaterial(
              nombre,
              foto + ".png",
              Number(stock),
              soloTipos
            ); // Almacenamos material en la BD
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
                    cantidad: Number(caracteristica.cantidad),
                    foto: caracteristica.foto + ".png",
                  };
                });
                await aniadeMaterial(
                  nombre,
                  foto + ".png",
                  Number(stock),
                  soloTipos
                ); // Almacenamos material en la BD
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

  /*
  * Asegura que no haya errores, es decir que esten rellenos los campos de nombre, foto y stock. Tiene mensajes 
  * de aviso
  */
  const sinErrores = () => {
    if (
      nuevoNombre.trim() === "" ||
      nuevaFoto.trim() === "" ||
      Number(nuevoStock) <= 0
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

  // función que modifica un material con mensajes de confirmación e información.
  const handleModificar = async () => {
    if (sinErrores()) {
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
                  cantidad: Number(caracteristica.cantidad),
                  foto: caracteristica.foto + ".png",
                };
              });

              await modificarMaterial(
                seleccionado.id,
                nuevoNombre,
                nuevaFoto + ".png",
                Number(nuevoStock),
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
                      cantidad: Number(caracteristica.cantidad),
                      foto: caracteristica.foto + ".png",
                    };
                  }
                );

                await modificarMaterial(
                  seleccionado.id,
                  nuevoNombre,
                  nuevaFoto + ".png",
                  Number(stockTotal),
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
                      cantidad: Number(caracteristica.cantidad),
                      foto: caracteristica.foto + ".png",
                    };
                  }
                );

                await modificarMaterial(
                  seleccionado.id,
                  nuevoNombre,
                  nuevaFoto + ".png",
                  Number(nuevoStock),
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
                        cantidad: Number(caracteristica.cantidad),
                        foto: caracteristica.foto + ".png",
                      };
                    }
                  );

                  await modificarMaterial(
                    seleccionado.id,
                    nuevoNombre,
                    nuevaFoto + ".png",
                    Number(nuevoStock),
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
                          cantidad: Number(caracteristica.cantidad),
                          foto: caracteristica.foto + ".png",
                        };
                      }
                    );

                    await modificarMaterial(
                      seleccionado.id,
                      nuevoNombre,
                      nuevaFoto + ".png",
                      Number(stockTotal),
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
                          cantidad: Number(caracteristica.cantidad),
                          foto: caracteristica.foto + ".png",
                        };
                      }
                    );

                    await modificarMaterial(
                      seleccionado.id,
                      nuevoNombre,
                      nuevaFoto + ".png",
                      Number(nuevoStock),
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


// Esta función actualiza el stock dado un input
const handleStockInput = (dato) => {
  // Chequea si el input no es un número o si esta vacío
  if (!isNaN(dato) && dato.trim() !== "") {
    // Si el producto lo estamos modificando, actualiza el nuevo stock
    if (isSeleccionado) {
      setNuevoStock(dato);
    } else {
      // Sino, actualiza el stock actual
      setStock(dato);
    }
  } else if (dato.trim() === "") {
    // Si el input esta vacío limpia el stock
    if (isSeleccionado) {
      setNuevoStock("");
    } else {
      setStock("");
    }
  }
};

  // Elimina un tipo de material, lleva mensajes de confirmación.
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
          // si estamos modificando un material se elimina de su variable
          if (isSeleccionado) {
            // Eliminamos el tipo filtrando
            setNuevasCaracteristicas(
              nuevasCaracteristicas.filter((item) => item.id !== id)
            );
          } else {
            // Eliminamos el tipo filtrando
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
              // si estamos modificando un material se elimina de su variable
              if (isSeleccionado) {
                // Eliminamos el tipo filtrando
                setNuevasCaracteristicas(
                  nuevasCaracteristicas.filter((item) => item.id !== id)
                );
              } else {
                // Eliminamos el tipo filtrando
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

  // Renderiza los tipos de un material mostrando su nombre, cantidad, foto, y icono de eliminar.
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

  // Busca un material por el nombre.
  const handleBuscar = () => {
    // Si se busca por un nombre, se filtra por ese nombre
    if (buscar) {
      const newData = materiales.filter((item) => item.nombre.includes(buscar));
      setFiltrar(newData);
    } else {
      // Sino se puso nada en buscar entonces aparece todo
      setFiltrar(materiales);
    }
  };

  // Muestra todos los materiales.
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

  // Renderiza todos los materiales que hay con su nombre, stock y icono para modificar
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
      {!viewCrearMaterial && !viewModificarMaterial && (
        <Text style={styles.text}>
          ¿Qué opción desea realizar? Pulse sobre el botón que desee.
        </Text>
      )}

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

      {viewCrearMaterial && (
        <View style={styles.container}>
          <View style={[{ height: RFValue(5) }]} />

          <Text style={[styles.text]}>Nombre </Text>

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

          <View style={[{ height: RFValue(5) }]} />

          <Text style={[styles.text]}>Foto</Text>

          {isSeleccionado ? (
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
                <Text
                  style={{
                    ...styles.addButtonText,
                    color: nuevaFotoUri !== "" ? "green" : "#fff",
                  }}
                >
                  {nuevaFotoUri !== "" ? "Foto Añadida" : "Añadir Nueva Foto"}
                </Text>
              </TouchableOpacity>
              <TextInput
                style={[styles.inputNombreFotoNueva]}
                placeholder="Nombre foto"
                value={nuevaFoto}
                onChangeText={(texto) => setNuevaFoto(texto)}
              />
            </View>
          ) : (
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
                <Text
                  style={{
                    ...styles.addButtonText,
                    color: fotoUri !== "" ? "green" : "#fff",
                  }}
                >
                  {fotoUri !== "" ? "Foto Añadida" : "Añadir Nueva Foto"}
                </Text>
              </TouchableOpacity>
              <TextInput
                style={[styles.inputNombreFotoNueva]}
                placeholder="Nombre foto"
                value={foto}
                onChangeText={(texto) => setFoto(texto)}
              />
            </View>
          )}

          {viewPregunta && (
            <>
              <Text style={[styles.text]}>
                ¿El objeto tiene características como grueso, fino, colores...?
              </Text>

              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.buttonSmall}
                  onPress={() => {
                    setViewPregunta(false), setViewTipos(true);
                  }}
                >
                  <Text style={styles.buttonText}>Si </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonSmall}
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
              <View style={[{ height: RFValue(5) }]} />
              <Text style={[styles.text]}>Stock </Text>

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
            </>
          )}

          {viewTipos && (
            <View style={styles.containertipo}>
              <View style={styles.container}>
                <View style={[{ height: RFValue(5) }]} />

                <Text style={[styles.text]}>
                  Añada una característica al material:
                </Text>

                <View style={[{ height: RFValue(5) }]} />

                <Text style={[styles.text]}>Tipo característica </Text>

                {cargarTipoBD ? (
                  <View
                    style={[{ alignContent: "center", alignItems: "center" }]}
                  >
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
                      <Text style={styles.addButtonText}>
                        Nueva caracteristica
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={[{ alignContent: "center", alignItems: "center" }]}
                  >
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

                <View style={[{ height: RFValue(2) }]} />

                <Text style={[styles.text]}>Cantidad</Text>
                <TextInput
                  style={[styles.input]}
                  placeholder="Elija la cantidad"
                  value={stockTipo}
                  onChangeText={setStockTipo}
                  keyboardType="numeric"
                />

                <Text style={[styles.text]}>Foto</Text>

                {cargarFotoTipoBD ? (
                  <View
                    style={[{ alignContent: "center", alignItems: "center" }]}
                  >
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
                      <Text style={styles.addButtonText}>
                        Nueva caracteristica
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={[{ alignContent: "center", alignItems: "center" }]}
                  >
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
                        <Text
                          style={{
                            ...styles.addButtonText,
                            color: fotoTipoUri !== "" ? "green" : "#fff",
                          }}
                        >
                          {fotoTipoUri !== ""
                            ? "Foto Añadida"
                            : "Añadir Nueva Foto"}
                        </Text>
                      </TouchableOpacity>
                      <TextInput
                        style={[styles.inputNombreFotoNueva]}
                        placeholder="Nombre foto"
                        value={fotoTipo}
                        onChangeText={setFotoTipo}
                      />
                    </View>
                    <TouchableOpacity
                      style={[styles.addButtonTipoBD]}
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
              </View>
            </View>
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
        <View style={styles.container}>
          <View style={styles.separador} />

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
          <View style={[{ height: RFValue(1) }]} />
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
            <View style={[{ height: RFValue(2) }]} />
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
    alignContent: "center",
  },
  contentContainer: {
    alignItems: "center",
  },
  containertipo: {
    width: Platform.OS === "web" ? RFValue(200) : RFValue(250),
    height: Platform.OS === 'web' ? 'auto' : RFValue(413),
    padding: RFValue(2),
    borderRadius: RFValue(5),
    borderWidth: RFValue(1),
    borderColor: "#d0d0d0", // Un borde ligeramente más oscuro que el fondo del botón
  },
  button: {
    backgroundColor: "#e0e0e0", // Un color gris claro para los botones
    padding: RFValue(2),
    marginVertical: 5,
    width: Platform.OS === "web" ? RFValue(100) : RFValue(150),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d0d0d0", // Un borde ligeramente más oscuro que el fondo del botón
    marginHorizontal: RFValue(10),
  },
  buttonSmall: {
    backgroundColor: "#e0e0e0", // Un color gris claro para los botones
    padding: RFValue(5),
    marginVertical: 5,
    width: Platform.OS === "web" ? RFValue(20) : RFValue(70),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d0d0d0", // Un borde ligeramente más oscuro que el fondo del botón
    marginHorizontal: RFValue(10),
    alignItems: "center",
    alignContent: "center",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  addButtonTipo: {
    backgroundColor: "blue",
    padding: RFValue(2),
    width: Platform.OS === "web" ? RFValue(50) : RFValue(100),
    borderRadius: 5,
  },
  addButtonTipoBD: {
    backgroundColor: "grey",
    padding: RFValue(2),
    width: Platform.OS === "web" ? RFValue(70) : RFValue(200),
    borderRadius: 5,
  },
  addButtonTipoFotoBD: {
    backgroundColor: "lightblue", // Un color gris claro para los botones
    padding: RFValue(1),
    width: Platform.OS === "web" ? RFValue(70) : RFValue(100),
    height: Platform.OS === "web" ? RFValue(10) : RFValue(25),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d0d0d0", // Un borde ligeramente más oscuro que el fondo del botón
    marginHorizontal: RFValue(10),
  },
  addButton: {
    backgroundColor: "green",
    padding: RFValue(5),
    width: Platform.OS === "web" ? RFValue(50) : RFValue(100),
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: RFValue(5),
    width: Platform.OS === "web" ? RFValue(50) : RFValue(100),
    borderRadius: 5,
    marginHorizontal: RFValue(20),
  },
  searchButton: {
    backgroundColor: "blue",
    padding: Platform.OS === "web" ? RFValue(2) : RFValue(5),
    width: Platform.OS === "web" ? RFValue(25) : RFValue(100),
    height: Platform.OS === "web" ? RFValue(10) : RFValue(35),
    borderRadius: 5,
    marginHorizontal: RFValue(10),
    alignContent: "center",
    alignItems: "center",
  },
  showAllMaterials: {
    backgroundColor: "gray",
    padding: RFValue(2),
    width: Platform.OS === "web" ? RFValue(50) : RFValue(120),
    borderRadius: 5,
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
    marginHorizontal: RFValue(50),
    flexDirection: "row",
  },
  rowBotones: {
    position: "absolute",
    bottom: RFValue(10),
    flexDirection: "row",
    alignItems: "center",
  },
  separador: {
    height: RFValue(2),
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    marginBottom: RFValue(2),
    width: Platform.OS === "web" ? RFValue(100) : RFValue(200),
    height: Platform.OS === "web" ? RFValue(8) : RFValue(25),
    padding: RFValue(5),
  },
  inputNombreFotoNueva: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    marginBottom: RFValue(1),
    width: Platform.OS === "web" ? RFValue(120) : RFValue(200),
    height: Platform.OS === "web" ? RFValue(10) : RFValue(25),
    padding: RFValue(5),
  },
  text: {
    fontSize: Platform.OS === "web" ? RFValue(5) : RFValue(12),
  },
  separador: {
    height: RFValue(10),
  },
  itemContainerTipo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: RFValue(5),
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  itemContainerListar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10),
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    width: Platform.OS === "web" ? RFValue(100) : RFValue(300),
  },
  label: {
    fontWeight: "bold",
  },
  itemText: {
    fontSize: Platform.OS === "web" ? RFValue(5) : RFValue(10), // Tamaño de fuente mediano para buena legibilidad
    color: "#333", // Color oscuro para el texto para alto contraste
    marginVertical: RFValue(3),
  },
  itemTextBold: {
    fontSize: Platform.OS === "web" ? RFValue(5) : RFValue(10), // Tamaño de fuente mediano para buena legibilidad
    color: "#333", // Color oscuro para el texto para alto contraste
    fontWeight: "bold", // Peso de la fuente normal; puede ser 'bold' si es necesario
    marginVertical: RFValue(3),
  },
  TextSmall: {
    fontSize: RFValue(12), // Tamaño de fuente mediano para buena legibilidad
    color: "green", // Color oscuro para el texto para alto contraste
    marginBottom: RFValue(5),
  },
  deleteButton: {
    padding: RFValue(5), // Espacio adicional alrededor del ícono para un área de toque más grande
    marginRight: RFValue(5), // Espacio a la derecha si es necesario
    justifyContent: "center", // Centra el ícono verticalmente dentro del botón
    alignItems: "center", // Centra el ícono horizontalmente dentro del botón
  },
  icon: {
    width: Platform.OS === "web" ? RFValue(10) : RFValue(20),
    height: Platform.OS === "web" ? RFValue(10) : RFValue(20),
  },
  materialInfo: {
    flexDirection: "column",
    width: Platform.OS === "web" ? RFValue(50) : RFValue(200),
  },
  materialName: {
    fontSize: Platform.OS === "web" ? RFValue(8) : RFValue(16),
    fontWeight: "bold",
    marginVertical: RFValue(8),
  },
  materialTotal: {
    fontSize: Platform.OS === "web" ? RFValue(6) : RFValue(14),
  },
  FlatListCaracteristicas: {
    marginTop: RFValue(2),
    height: Platform.OS === "web" ? RFValue(60) : RFValue(100),
    maxHeight: Platform.OS === "web" ? RFValue(60) : RFValue(100),
    width: Platform.OS === "web" ? RFValue(80) : RFValue(200),
    maxWidth: Platform.OS === "web" ? RFValue(80) : RFValue(200),
  },
  FlatListMateriales: {
    height: Platform.OS === "web" ? RFValue(200) : RFValue(500),
    maxHeight: Platform.OS === "web" ? RFValue(200) : RFValue(500),
  },
  leftColumn: {
    flexDirection: "column",
    justifyContent: "center",
    marginRight: RFValue(5),
  },
  rightColumn: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  picker: {
    height: Platform.OS === "web" ? RFValue(10) : RFValue(25),
    width: Platform.OS === "web" ? RFValue(100) : RFValue(200),
    marginBottom: RFValue(1),
  },
});
