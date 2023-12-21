import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {
  buscarTareaIdTareasInventario,
  obtenerProfesores,
  getMaterialIdBD,
  getvisualizacion,
  completarTarea,
  buscarLugaresNoAulas,
} from "../Controlador/tareas";
import {
  mostrarNumeroRecogidas,
  mostrarNumeroLugaresDestino,
} from "./pantallaTareaMaterialInformacion";
import {
  descargaFotoPersona,
  descargaMaterial,
  descargaTipoMaterial,
  descargaLugarNoAula,
} from "../Controlador/multimedia";

export default function VerTareaMaterial({ route, navigation }) {
  const id = route.params.id; // obtenemos el id Tarea.
  const usuario = route.params.usuario;

  // Variable para saber la visualizacion del alumno.
  const [visualizacion, setVisualizacion] = useState("");

  // Variable para obtener todos los pasos de la tarea inventario.
  const [tareas, setTareas] = useState([]);
  const [agrupadosDestiTareas, setAgrupadosDestiTareas] = useState("");
  const [materiales, setMateriales] = useState([]);
  const [tickMateriales, setTickMateriales] = useState([]); // garantizar que objeto se ha cogido.
  const [aulas, setAulas] = useState([]);
  const [lugarDestinoNow, setLugarDestinoNow] = useState(""); // Saber a que lugar vamos a repartir
  const [lugaresOrigen, setLugaresOrigen] = useState([]); // Todos lugares para recoger materiales
  const [lugarDestinos, setLugaresDestinos] = useState([]); // Todos los lugares para llevar los materiales.
  const [destinoActualIndex, setDestinoActualIndex] = useState(0);

  // Variables para gestionar el renderizado
  const [cargandoMateriales, setCargandoMateriales] = useState(true);
  const [viewObjetosRecoger, setViewObjetosRecoger] = useState(false);
  const [viewCadaObjetoRecoger, setViewCadaObjetoRecoger] = useState(false);
  const [
    cargandoMaterialesRecogidosOrigen,
    setCargandoMaterialesRecogidosOrigen,
  ] = useState(true);
  const [viewFelicitaciones, setViewFelicitaciones] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [materialRecogido, setMaterialRecogido] = useState(false);
  const [viewRecogidasQuedan, setViewRecogidasQuedan] = useState(true);
  const [viewPantallaSeguro, setViewPantallaSeguro] = useState(false);
  const [esPrimeraVezRecogida, setEsPrimeraVezRecogida] = useState(true);
  const [viewDestinoQuedan, setViewDestinoQuedan] = useState(true);

  // Variables para ir a recoger los materiales
  const [lugarOrigenNow, setLugarOrigenNow] = useState(""); // Saber porque lugar de origen vamos
  const [imagenLugarOrigenNow, setImagenLugarOrigenNow] = useState(""); // saber la imagen del lugar origen actual.
  const [indexLugarOrigen, setIndexLugarOrigen] = useState(0);
  const [indiceActual, setIndiceActual] = useState(0); // Para mostrar objetos a recoger en el lugar origen
  const [indiceActualTipo, setIndiceActualTipo] = useState(0); // Para mostrar tipos de objetos en el lugar origen

  // Variables para guardar objeto para recoger su cantidad.
  const [stock, setStock] = useState("");
  const [nombreMaterial, setNombreMaterial] = useState("");
  const [fotoMaterial, setFotoMaterial] = useState("");
  const [caract, setCaract] = useState([]);

  // Variables para llevar material a la clase
  const [nombreMaterialLlevar, setNombreMaterialLlevar] = useState(""); // Guardamos nombre Material a llevar.
  const [stockMaterialLlevar, setStockMaterialllevar] = useState(""); // Guardamos stock del material a llevar
  const [fotoMaterialLlevar, setFotoMaterialLlevar] = useState(""); // Guardaremos la foto del material a llevar
  const [
    fotoCaracteristicaMaterialLlevar,
    setFotoCaracteristicaMaterialLlevar,
  ] = useState(""); // Guardaremos la foto del tipo de material a llevar
  const [caractersiticaMaterialLlevar, setCaracteristicaMaterialLlevar] =
    useState("");
  const [materialLlevarIndex, setMaterialLlevarIndex] = useState(0); // Indice para llevar cuenta de los materiales a llevar
  const [viewMaterialLlevarClase, setViewMaterialLlevarClase] = useState(false); // muestra el material llevado a la clase

  // variable para controlar el renderizado de lugares destino
  const [cambioOrigen, setCambioOrigen] = useState("");
  const [materialesCargados, setMaterialesCargados] = useState("");

  // Variable para imagenes de pictogramas de numeros
  const imagenesNumeros = {
    1: require("../../Imagenes/Numeros/1.png"),
    2: require("../../Imagenes/Numeros/2.png"),
    3: require("../../Imagenes/Numeros/3.png"),
    4: require("../../Imagenes/Numeros/4.png"),
    5: require("../../Imagenes/Numeros/5.png"),
    6: require("../../Imagenes/Numeros/6.png"),
    7: require("../../Imagenes/Numeros/7.png"),
    8: require("../../Imagenes/Numeros/8.png"),
    9: require("../../Imagenes/Numeros/9.png"),
    10: require("../../Imagenes/Numeros/10.png"),
  };

  // se cargan las aulas, tareas, profesores, y lugares de origen y destino
  useEffect(() => {
    async function cargarDatos() {
      // Obtenemos visualización
      const visu = await getvisualizacion(id);
      setVisualizacion(visu);
      // Obtenemos las tareas
      const datos = await buscarTareaIdTareasInventario(id);
      // Obtenemos a los aulas de los profesores
      const datosProfesores = await obtenerProfesores();
      // Procesamos los datos de los profesores
      const aulas = await Promise.all(
        datosProfesores.map(async ({ nombre, aula, foto }) => {
          if (foto !== "") {
            const fotoDescargada = await descargaFotoPersona(foto);
            return { nombre, aula, foto: fotoDescargada };
          }
          return null; // Retornar null para los casos donde no hay foto
        })
      ).then((resultados) => resultados.filter((aula) => aula !== null)); // Filtramos los nulos después de resolver todas las promesas

      // Descargamos los lugares
      const lugares = await buscarLugaresNoAulas();
      const lug = await Promise.all(
        lugares.map(async ({ nombre, foto }) => {
          if (foto !== "") {
            const fotoDescargada = await descargaLugarNoAula(foto);
            return { nombre: nombre, aula: nombre, foto: fotoDescargada };
          }
          return null; // Retornar null para los casos donde no hay foto
        })
      ).then((resultados) => resultados.filter((aula) => aula !== null));

      // procesamos datos de lugares
      lug.forEach((lugar) => {
        aulas.push(lugar);
      });
      console.log('aulas: ', aulas)
      console.log('lugares: ', lug);

      setAulas(aulas);

      // vamos a agrupar las tareas por lugar de destino.
      const agrupadosPorDestino = datos.reduce((acumulador, itemActual) => {
        // Si el acumulador ya tiene la clave del lugarOrigen, solo añade el objeto actual a ese array
        if (acumulador[itemActual.lugarDestino]) {
          acumulador[itemActual.lugarDestino].push(itemActual);
        } else {
          // Si no, crea un nuevo array para esa clave con el objeto actual
          acumulador[itemActual.lugarDestino] = [itemActual];
        }
        return acumulador;
      }, {});

      setAgrupadosDestiTareas(agrupadosPorDestino);
      setLugaresDestinos(
        Object.entries(agrupadosPorDestino).map(([key, value]) => {
          return { id: key };
        })
      );

      // vamos a agrupar las tareas por lugar de origen.
      const agrupadosPorOrigen = datos.reduce((acumulador, itemActual) => {
        // Si el acumulador ya tiene la clave del lugarOrigen, solo añade el objeto actual a ese array
        if (acumulador[itemActual.lugarOrigen]) {
          acumulador[itemActual.lugarOrigen].push(itemActual);
        } else {
          // Si no, crea un nuevo array para esa clave con el objeto actual
          acumulador[itemActual.lugarOrigen] = [itemActual];
        }
        return acumulador;
      }, {});

      setTareas(agrupadosPorOrigen);
      setLugaresOrigen(
        Object.entries(agrupadosPorOrigen).map(([key, value]) => {
          return { id: key };
        })
      );

      const resultado = {};

      // Función auxiliar para crear un objeto con idMaterial y tick
      const crearObjetoConTick = (idMaterial) => ({
        idMaterial,
        tick: false,
      });

      // Iterar sobre cada clave ('Almacen', 'C', etc.)
      for (const lugar in agrupadosPorOrigen) {
        const objetos = agrupadosPorOrigen[lugar];
        const objetosUnicos = new Map();

        // Filtrar, extraer idMaterial y crear objeto con tick, evitando duplicados
        objetos.forEach((objeto) => {
          if (objeto.idMaterial && !objetosUnicos.has(objeto.idMaterial)) {
            objetosUnicos.set(
              objeto.idMaterial,
              crearObjetoConTick(objeto.idMaterial)
            );
          }
        });

        // Convertir el Map a un Array y asignarlo al resultado
        resultado[lugar] = Array.from(objetosUnicos.values());
      }

      setTickMateriales(resultado);

      setCargando(false);
    }

    cargarDatos();
  }, []);

  // se cargan materiales,
  useEffect(() => {
    if (lugarOrigenNow !== "") {
      const obtenerMateriales = async () => {
        const ids = tareas[lugarOrigenNow].map((item) => item.idMaterial);

        // Creamos un array de promesas
        const promesas = ids.map(async (id) => await getMaterialIdBD(id));

        try {
          // Esperamos a que todas las promesas se resuelvan
          const materiales = await Promise.all(promesas);

          // Procesar cada material y sus caracteristicas
          const materialesProcesados = await Promise.all(
            materiales.map(async (subArray) => {
              const objetosProcesados = await Promise.all(
                subArray.map(async (objeto) => {
                  // Procesar la foto del objeto
                  if (objeto.foto) {
                    objeto.foto = await descargaMaterial(objeto.foto);
                  }

                  // Procesar cada caracteristica del objeto
                  if (objeto.caracteristicas) {
                    objeto.caracteristicas = await Promise.all(
                      objeto.caracteristicas.map(async (caracteristica) => {
                        if (caracteristica.foto) {
                          caracteristica.foto = await descargaTipoMaterial(
                            caracteristica.foto
                          );
                        }
                        return caracteristica;
                      })
                    );
                  }

                  return objeto; // Devuelve el objeto con foto y caracteristicas actualizadas
                })
              );

              return objetosProcesados; // Devuelve el sub-array con todos los objetos actualizados
            })
          );
          setMateriales(materialesProcesados);
          setCargandoMateriales(false);
        } catch (error) {
          // Manejo de errores
          console.error("Error al obtener materiales:", error);
        }
        setMaterialesCargados("materiales");
      };

      obtenerMateriales();
    }
  }, [lugarOrigenNow]);

  // se actualiza el lugar destino actual
  useEffect(() => {
    const actualizaLugarDestino = () => {
      let aulaNow;
      if (lugarDestinos.length > 0 && Object.keys(tareas).length > 0) {
        if (
          cambioOrigen !== lugarOrigenNow &&
          materialesCargados !== "retroceder en destino informacion"
        ) {
          setDestinoActualIndex(0);
          setCambioOrigen(lugarOrigenNow);
        }
        const tareasFiltradas = tareas[lugarOrigenNow];
        const idsDestino = lugarDestinos.map((destino) => destino.id);
        const tareasConDestinoCorrecto = tareasFiltradas.filter((tarea) =>
          idsDestino.includes(tarea.lugarDestino)
        );
        if (tareasConDestinoCorrecto.length > destinoActualIndex) {
          aulaNow = tareasConDestinoCorrecto[destinoActualIndex].lugarDestino;

          setLugarDestinoNow(aulaNow);
          if (materialesCargados !== "retroceder en destino informacion") {
            setViewDestinoQuedan(true); // para que muestre el numero de destino que tiene que ir.
          } else {
            setViewDestinoQuedan(false); // para que retroceda al lugar destino anterior a la pantalla de información.
          }
        }
        if (materialesCargados === "siguiente clase") {
          const tareasAplanados = [].concat(...agrupadosDestiTareas[aulaNow]);
          const materialesAplanados = [].concat(...materiales);

          if (tareasAplanados.length > materialLlevarIndex) {
            const tareaActual = tareasAplanados[materialLlevarIndex];
            setStockMaterialllevar(tareaActual.cantidad);
            setCaracteristicaMaterialLlevar(tareaActual.caracteristica);
            // Obtenemos el material correspondiente.
            const material = materialesAplanados.find(
              (material) => material.id === tareaActual.idMaterial
            );
            // Nos quitamo estorbos.
            if (material !== undefined) {
              setNombreMaterialLlevar(material.nombre);
              setFotoMaterialLlevar(material.foto);

              // sino tiene caracteristicas obtenemos su foto directamente
              if (tareaActual.caracteristica !== "Ninguno") {
                // Buscar la foto de la característica específica
                const fotoCaracteristica = material.caracteristicas.find(
                  (carac) => carac.tipo === tareaActual.caracteristica
                )?.foto;
                setFotoCaracteristicaMaterialLlevar(fotoCaracteristica);
              }
            }
          }
        }
      }
    };

    actualizaLugarDestino();
    if (materialesCargados !== "retroceder en destino informacion") {
      setMaterialLlevarIndex(0);
    }
  }, [destinoActualIndex, lugarOrigenNow]); // Se actualiza cuando va al siguiente lugar de dejada(index) y cuando se almacena los lugares destino.

  // se actualiza variables del lugar origen
  useEffect(() => {
    if (lugaresOrigen.length > 0 && aulas.length > 0) {
      const lugar = lugaresOrigen[indexLugarOrigen].id;
      setLugarOrigenNow(lugar);
      if (materialesCargados !== "retroceder en destino informacion") {
        setIndiceActual(0); // indice de materiales a recoger en lugar origen
        setMaterialRecogido(false);
        setViewRecogidasQuedan(true); // Para que muestre la pantalla con info de la recogidas que le queda.
      }

      const aula = aulas.find((a) => a.aula === lugar);
      if (aula) {
        setImagenLugarOrigenNow(aula.foto);
      }
    }
  }, [indexLugarOrigen, lugaresOrigen]); // Se actualiza cuando va al siguiente lugar de recogida(index) y cuando se almacena los lugares origen.

  // se actualiza variables de los materiales del lugar destino
  useEffect(() => {
    const actualizaMaterialLlevar = () => {
      if (
        materialesCargados === "" ||
        materialesCargados === "siguiente clase"
      ) {
        return; // No hacer nada si no están inicializados o están vacíos
      }
      // Esta variable tendrá el valor del indice del array de materiales a dejar en las aulas
      // Se hace de esta forma ya que los set tienen un tiempo de retardo
      let indice;
      // Cuando retrocedemos en la pantalla de dejar materiales en las aulas.
      if (materialesCargados === "retroceder") {
        setMaterialLlevarIndex(materialLlevarIndex - 1);
        indice = materialLlevarIndex - 1;
      } else {
        indice = materialLlevarIndex;
      }
      ///////////////////////////////////////////////////////////////////////////
      const tareasFiltradas = [].concat(
        ...agrupadosDestiTareas[lugarDestinoNow]
      );
      ///////////////////////////////////////////////////////////////////////////
      // Cogemos solo aquellas tareas con lugarOrigenNow.
      const tareasAplanados = tareasFiltradas.filter(
        (tarea) => tarea.lugarOrigen === lugarOrigenNow
      );

      const materialesAplanados = [].concat(...materiales);
      if (tareasAplanados.length > indice) {
        const tareaActual = tareasAplanados[indice];
        setStockMaterialllevar(tareaActual.cantidad);
        setCaracteristicaMaterialLlevar(tareaActual.caracteristica);
        // Obtenemos el material correspondiente.
        const material = materialesAplanados.find(
          (material) => material.id === tareaActual.idMaterial
        );
        // Nos quitamo estorbos.
        if (material !== undefined) {
          setNombreMaterialLlevar(material.nombre);
          setFotoMaterialLlevar(material.foto);

          // sino tiene caracteristicas obtenemos su foto directamente
          if (tareaActual.caracteristica !== "Ninguno") {
            // Buscar la foto de la característica específica
            const fotoCaracteristica = material.caracteristicas.find(
              (carac) => carac.tipo === tareaActual.caracteristica
            )?.foto;
            setFotoCaracteristicaMaterialLlevar(fotoCaracteristica);
          } else {
            setFotoCaracteristicaMaterialLlevar("");
          }
        }
      }
    };

    actualizaMaterialLlevar();
    setMaterialesCargados("");
  }, [materialLlevarIndex, materialesCargados]);

  const handleActualizaEstado = () => {
    // Encuentra el idMaterial correspondiente al nombreMaterial
    const idMaterialCorrespondiente = materiales
      .flat() // Aplana el array de arrays
      .find((material) => material.nombre === nombreMaterial)?.id;

    // Actualizar tickMateriales
    const actualizados = tickMateriales[lugarOrigenNow].map((material) => {
      if (material.idMaterial === idMaterialCorrespondiente) {
        return { ...material, tick: true };
      }
      return material;
    });

    // Actualiza tickMateriales
    setTickMateriales((prevState) => ({
      ...prevState,
      [lugarOrigenNow]: actualizados,
    }));
    setViewCadaObjetoRecoger(false);
    setMaterialRecogido(true);
    setIndiceActualTipo(0);
  };

  // Pasamos a la siguiente sala para hacer recogida de materiales.
  const handleNextRecogida = () => {
    // Pasamos a la siguiente aula
    if (indexLugarOrigen < lugaresOrigen.length - 1) {
      setIndexLugarOrigen(indexLugarOrigen + 1);
    } else {
      // Sino hay mas terminamos mostrando el mensaje de bien hecho.
      setCargandoMaterialesRecogidosOrigen(true);
      setViewFelicitaciones(true);
    }
  };

  // Para pasar a la siguiente aula a llevar los materiales
  const handleNextLugarDestino = () => {
    const tareasFiltradas = tareas[lugarOrigenNow];
    const idsDestino = lugarDestinos.map((destino) => destino.id);
    const tareasConDestinoCorrecto = tareasFiltradas.filter((tarea) =>
      idsDestino.includes(tarea.lugarDestino)
    );

    // Crear un Set para almacenar los lugares de destino únicos
    const lugaresUnicos = new Set();
    const tareasListas = tareasConDestinoCorrecto.filter((tarea) => {
      const yaVisto = lugaresUnicos.has(tarea.lugarDestino);
      lugaresUnicos.add(tarea.lugarDestino);
      return !yaVisto;
    });

    if (destinoActualIndex < tareasListas.length - 1) {
      setMaterialesCargados("siguiente clase");
      setMaterialLlevarIndex(0);
      setDestinoActualIndex(destinoActualIndex + 1);
    } else {
      // Caso que no haya mas clases a donde llevar materiales.
      setViewPantallaSeguro(true);
      setViewDestinoQuedan(true);
    }
  };

  // handleNextMaterialLlevar se encarga de manejar la transición al siguiente material que debe ser llevado a un aula.
  const handleNextMaterialLlevar = () => {
    // Filtra las tareas por el lugar de origen actual,
    // para obtener solo aquellas tareas que deben ser llevadas desde el lugar de origen actual al destino actual.
    const tareasFiltradas = agrupadosDestiTareas[lugarDestinoNow].filter(
      (tarea) => tarea.lugarOrigen === lugarOrigenNow
    );

    // Verifica si el índice del material actual es menor que la longitud de las tareas filtradas menos uno.
    // Esto determina si hay más materiales para llevar al aula actual.
    if (materialLlevarIndex < tareasFiltradas.length - 1) {
      // Incrementa el índice del material a llevar, para pasar al siguiente material.
      setMaterialLlevarIndex(materialLlevarIndex + 1);
      // Actualiza el estado para indicar que hay un siguiente material para llevar al aula.
      setMaterialesCargados("siguiente material al aula");
    } else {
      // En caso de que no haya más materiales para llevar en el aula actual,
      // se procede a la siguiente clase.
      handleNextLugarDestino();
      // Oculta la vista del material a llevar a la clase,
      // ya que se ha terminado de distribuir todos los materiales para esa clase.
      setViewMaterialLlevarClase(false);
    }
  };

  // Quitamos los duplicados de los materiales, ya que puede haber dos materiales con distintos tipos.
  const quitamosDuplicados = (datos) => {
    const materialesUnicos = datos.reduce((acumulador, materialActual) => {
      if (!acumulador[materialActual.id]) {
        acumulador[materialActual.id] = materialActual;
      }
      return acumulador;
    }, {});

    // Convertir el objeto de vuelta a un array
    return Object.values(materialesUnicos);
  };

  // Filtramos los lugares destino por el lugar origen
  const filtrarDestinoPorOrigen = () => {
    // Creamos un arreglo con todos los elementos de tareas[lugarOrigenNow]
    const todosLosElementos = [].concat(...tareas[lugarOrigenNow]);

    // Utilizamos un objeto para almacenar los lugares de destino únicos
    const destinosUnicos = {};

    todosLosElementos.forEach((elemento) => {
      // Si el lugarDestino no está en destinosUnicos, lo agregamos
      if (!destinosUnicos[elemento.lugarDestino]) {
        destinosUnicos[elemento.lugarDestino] = true;
      }
    });

    // Obtenemos las claves del objeto destinosUnicos, que son los lugares de destino únicos
    return Object.keys(destinosUnicos);
  };

  const actualizarPantallaInfo = () => {
    setViewRecogidasQuedan(false);
    if (esPrimeraVezRecogida) {
      setEsPrimeraVezRecogida(false);
    }
  };

  // Obtenems el último objeto a dejar en un lugar al hacer marcha atrás en la pantalla de información de dejar objetos.
  const obtenerUltimoObjeto = () => {
    const tareasFiltradas1 = tareas[lugarOrigenNow];
    const idsDestino = lugarDestinos.map((destino) => destino.id);
    const tareasConDestinoCorrecto = tareasFiltradas1.filter((tarea) =>
      idsDestino.includes(tarea.lugarDestino)
    );

    // Obtenemos el aula
    let aulaNow = tareasConDestinoCorrecto[destinoActualIndex - 1].lugarDestino;

    // Obtenemos el nuevo lugarDestinoNow.
    setMaterialesCargados("retroceder en destino informacion");
    setDestinoActualIndex(destinoActualIndex - 1);

    const tareasFiltradas = [].concat(...agrupadosDestiTareas[aulaNow]);

    // Cogemos solo aquellas tareas con lugarOrigenNow.
    const tareasAplanados = tareasFiltradas.filter(
      (tarea) => tarea.lugarOrigen === lugarOrigenNow
    );

    const materialesAplanados = [].concat(...materiales);

    let indice = tareasAplanados.length - 1; // cogemos el ultimo

    if (tareasAplanados.length > indice) {
      const tareaActual = tareasAplanados[indice];
      setStockMaterialllevar(tareaActual.cantidad);
      setCaracteristicaMaterialLlevar(tareaActual.caracteristica);
      // Obtenemos el material correspondiente.
      const material = materialesAplanados.find(
        (material) => material.id === tareaActual.idMaterial
      );
      // Nos quitamo estorbos.
      if (material !== undefined) {
        setNombreMaterialLlevar(material.nombre);
        setFotoMaterialLlevar(material.foto);

        // sino tiene caracteristicas obtenemos su foto directamente
        if (tareaActual.caracteristica !== "Ninguno") {
          // Buscar la foto de la característica específica
          const fotoCaracteristica = material.caracteristicas.find(
            (carac) => carac.tipo === tareaActual.caracteristica
          )?.foto;
          setFotoCaracteristicaMaterialLlevar(fotoCaracteristica);
        } else {
          setFotoCaracteristicaMaterialLlevar("");
        }
      }
    }
    setMaterialLlevarIndex(indice);
  };

  // Poner primera letra en mayúscula
  const capitalizarPrimeraLetra = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Pantalla primera de ir al lugar de origen a recoger los materiales.
  const renderLugarOrigen = () => {
    return viewRecogidasQuedan ? (
      <View style={styles.container}>
        {indexLugarOrigen == 0 && (
          <View>
            <TouchableOpacity
              style={styles.retrocederPulsar}
              onPress={() => {
                navigation.navigate("Tareas", { usuario });
              }}
            >
              <Image
                style={styles.imageRetroceder}
                source={require("../../Imagenes/retroceder.png")}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.text,
                { marginLeft: RFValue(Platform.OS === "web" ? -122 : -124) },
              ]}
            >
              {`Atrás `}
            </Text>
            <View style={[{ height: RFValue(2) }]} />
          </View>
        )}
        {mostrarNumeroRecogidas(
          lugaresOrigen.length - indexLugarOrigen,
          styles,
          esPrimeraVezRecogida,
          visualizacion,
          lugaresOrigen,
          aulas,
          indexLugarOrigen
        )}

        <TouchableOpacity
          style={styles.imagePulsar}
          onPress={() => {
            actualizarPantallaInfo();
          }}
        >
          <Image
            source={require("../../Imagenes/siguiente.png")}
            style={styles.imageSiguiente}
          />
        </TouchableOpacity>
        <Text style={styles.felicitacionText}>¡Vamos!</Text>
      </View>
    ) : (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.retrocederPulsar}
          onPress={() => {
            setViewRecogidasQuedan(true);
          }}
        >
          <Image
            style={styles.imageRetroceder}
            source={require("../../Imagenes/retroceder.png")}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.text,
            { marginLeft: RFValue(Platform.OS === "web" ? -122 : -124) },
          ]}
        >
          {`Atrás `}
        </Text>
        <View style={[{ height: RFValue(2) }]} />
        <View style={[styles.row]}>
          <Image
            source={require("../../Imagenes/ninoAndando.png")}
            style={styles.image}
          />

          <Image
            source={{ uri: imagenLugarOrigenNow.uri }}
            style={styles.image}
          />
        </View>

        <Text
          style={[
            styles.text,
            { flex: 1, alignContent: "center", alignItems: "center" },
          ]}
        >
          {lugarOrigenNow === "Almacen"
            ? `Voy al ${lugarOrigenNow} a coger materiales`
            : `Voy a la aula ${lugarOrigenNow} a coger materiales`}
        </Text>

        <View style={styles.separador}></View>
        <View style={styles.separador}></View>

        <TouchableOpacity
          style={[styles.imagePulsar]}
          onPress={() => {
            setViewObjetosRecoger(true);
            setViewCadaObjetoRecoger(false);
          }}
        >
          <Image
            source={require("../../Imagenes/siguiente.png")}
            style={styles.imageSiguiente}
          />
        </TouchableOpacity>

        <Text style={styles.text}>
          {lugarOrigenNow === "Almacen"
            ? `Estoy en el ${lugarOrigenNow} `
            : `Estoy en la aula ${lugarOrigenNow} `}
        </Text>
      </View>
    );
  };

  // Objetos a recoger en el lugar origen
  const renderObjetosARecoger = (lugar, tareas, fotoLugarOrigen) => {
    // Aplanar el array de materiales antes de renderizar
    const materialesAplanados = quitamosDuplicados([].concat(...materiales));
    const tareasAplanados = [].concat(...tareas);

    const materialActual = materialesAplanados[indiceActual];

    const avanzarMaterial = () => {
      if (indiceActual < materialesAplanados.length - 1) {
        setIndiceActual(indiceActual + 1);
      }
    };

    const retrocederMaterial = () => {
      if (indiceActual > 0) {
        setIndiceActual(indiceActual - 1);
      } else {
        setViewObjetosRecoger(false);
      }
    };

    // Encontrar el objeto correspondiente en tickMateriales
    const tickMaterial = tickMateriales[lugarOrigenNow].find(
      (material) => material.idMaterial === materialActual.id
    );

    // Determinar el estilo de la imagen
    const imagenStyle =
      tickMaterial && tickMaterial.tick
        ? [styles.imagenDentroBoton, { backgroundColor: "green" }] // Estilo cuando tick es true
        : styles.imagenDentroBoton; // Estilo por defecto

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.retrocederPulsar}
          onPress={() => {
            retrocederMaterial();
          }}
        >
          <Image
            style={styles.imageRetroceder}
            source={require("../../Imagenes/retroceder.png")}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.text,
            { marginLeft: RFValue(Platform.OS === "web" ? -122 : -124) },
          ]}
        >
          {`Atrás `}
        </Text>
        <View style={[{ height: RFValue(2) }]} />
        <Image
          source={{ uri: fotoLugarOrigen.uri }}
          style={[styles.image, { marginHorizontal: 45 }]}
        />
        <Text style={[styles.text, { marginHorizontal: 30, flex: 1 }]}>
          {lugar === "Almacen"
            ? `Estoy en el ${lugar} `
            : `Estoy en el aula ${lugar} `}
        </Text>

        <TouchableOpacity
          style={[styles.imagenYTextoPulsar]}
          onPress={() => {
            setViewCadaObjetoRecoger(true);
            const stock = tareasAplanados
              .filter((tarea) => tarea.idMaterial === materialActual.id)
              .map((tarea) => tarea.cantidad);
            setStock(stock[0]);
            setNombreMaterial(materialActual.nombre);
            setFotoMaterial(materialActual.foto);
            const objetosFiltrados = tareasAplanados
              .filter((tarea) => tarea.idMaterial === materialActual.id)
              .map((tarea) => tarea.caracteristica);
            setCaract(objetosFiltrados); // obtenemos las caracteristicas del objeto a recoger.
          }}
        >
          <Image
            source={{ uri: materialActual.foto.uri }}
            style={imagenStyle}
          />
          <Text style={styles.textBoton}>
            Coger {materialActual.nombre}
            {materialActual.caracteristica !== "Ninguno"
              ? materialActual.caracteristica
              : ""}
          </Text>
        </TouchableOpacity>

        {materialesAplanados.length - 1 !== indiceActual &&
          (materialRecogido || tickMaterial.tick) && (
            <View style={styles.container}>
              <View style={[{height: Platform.OS !== 'web' && RFValue(30)}]}/>
              <TouchableOpacity
                style={[styles.imagePulsar, { marginHorizontal: 20, flex: 1 }]}
                onPress={() => {
                  avanzarMaterial(); // Llamada directa a la función avanzarMaterial
                  setMaterialRecogido(false); // Se esconde la opción de pasar a recoger el siguinte material en un lugar origen.
                }}
              >
                <Image
                  source={require("../../Imagenes/siguiente.png")}
                  style={[styles.imageSiguiente ]}
                />
              </TouchableOpacity>

              <Text style={[styles.text]}>
                {`Siguiente material  `}
                </Text>
            </View>
          )}

        {materialesAplanados.length - 1 === indiceActual &&
          tickMaterial.tick && (
            <View style={styles.container}>
              <View style={[{height: Platform.OS !== 'web' && RFValue(30)}]}/>
              <TouchableOpacity
                style={[styles.imagePulsar, { marginHorizontal: 20, flex: 1 }]}
                onPress={() => {
                  setCargandoMaterialesRecogidosOrigen(false);
                  setViewDestinoQuedan(true); // para que muestre el numero de destino que tiene que ir.
                }}
              >
                <Image
                  source={require("../../Imagenes/tick.png")}
                  style={[styles.imageSiguiente]}
                />
              </TouchableOpacity>

              <Text style={[styles.text]}>{`Reparto los materiales `}</Text>
            </View>
          )}
      </View>
    );
  };

  // Pantalla que muestra la cantidad de objetos a recoger en el lugar origen.
  const renderMaterialARecoger = () => {
    const materialesAplanados = quitamosDuplicados([].concat(...materiales));
    const tareasAplanados = [].concat(...tareas[lugarOrigenNow]);
    let tipos = [];

    // Primero, se verifica si el primer elemento de 'caract' es diferente de "Ninguno".
    if (caract[0] !== "Ninguno") {
      // Aquí, se filtran los materiales que coinciden con el nombre del material deseado.
      // Luego, se usan 'flatMap' y 'map' para transformar cada material en sus características,
      // agregando el 'id' del material a cada característica.
      const arrayCaracteristica = materialesAplanados
        .filter((material) => material.nombre === nombreMaterial)
        .flatMap((material) =>
          material.caracteristicas.map((caracteristica) => ({
            ...caracteristica,
            idMaterial: material.id,
          }))
        )
        .filter((caracteristica) => caract.includes(caracteristica.tipo));

      // Aquí, se mapean las características filtradas para crear un nuevo array de objetos.
      // Para cada característica, se busca en 'tareasAplanados' la primera tarea que coincida con el 'idMaterial' y el 'tipo'.
      let resultados = arrayCaracteristica.map((caracteristica) => {
        const tareaFiltrada = tareasAplanados.find(
          (tarea) =>
            tarea.idMaterial === caracteristica.idMaterial &&
            tarea.caracteristica === caracteristica.tipo
        );

        // Se crea un objeto con la 'foto', la 'cantidad' (obtenida de la tarea filtrada, si existe, o 0 en caso contrario),
        // y el 'nombre' (que es el tipo de la característica).
        return {
          foto: caracteristica.foto,
          cantidad: tareaFiltrada ? parseInt(tareaFiltrada.cantidad, 10) : 0,
          nombre: caracteristica.tipo,
        };
      });

      // Los resultados se asignan a 'tipos', que ahora contiene un array de objetos con la información deseada.
      tipos = resultados;
    }

    const tipoActual = tipos[indiceActualTipo];

    const avanzarAlSiguienteTipo = () => {
      if (indiceActualTipo < tipos.length - 1) {
        setIndiceActualTipo(indiceActualTipo + 1);
      }
    };

    return (
      <View style={styles.container}>
        <View
          style={[
            {
              width: RFValue(20),
              height: RFValue(20),
            },
          ]}
        />
        <View style={styles.row}>
          <Image
            source={{ uri: imagenLugarOrigenNow.uri }}
            style={[styles.image, { marginHorizontal: 15 }]}
          />
          <Image
            source={{ uri: fotoMaterial.uri }}
            style={[styles.image, { marginHorizontal: 15 }]}
          />
        </View>
        <Text style={[styles.text, { flex: 1 }]}>
          {lugarOrigenNow === "Almacen"
            ? `Estoy en el ${lugarOrigenNow}. Cojo ${nombreMaterial} `
            : `Estoy en el aula ${lugarOrigenNow}. Cojo ${nombreMaterial} `}
        </Text>

        <View style={styles.container}>
          {caract[0] === "Ninguno" ? (
            <View style={styles.container}>
              {(visualizacion === "imagenes" ||
                visualizacion === "pictogramas") && (
                <View>
                  {stock >= 1 && stock <= 10 ? (
                    <Image
                      source={imagenesNumeros[stock]}
                      style={[styles.image]}
                    />
                  ) : (
                    <Text style={[styles.numeroImagen]}>{stock}</Text>
                  )}
                </View>
              )}

              <Text style={[styles.text]}>
                Cojo {stock} {nombreMaterial}
                {stock > 1 ? "s" : ""}
              </Text>
            </View>
          ) : (
            <View style={styles.container}>
              {(visualizacion === "imagenes" ||
                visualizacion === "pictogramas") && (
                <View style={[styles.row]}>
                  {tipoActual.cantidad >= 1 && tipoActual.cantidad <= 10 ? (
                    <Image
                      source={imagenesNumeros[tipoActual.cantidad]}
                      style={[styles.imageSmall]}
                    />
                  ) : (
                    <Text style={styles.numeroImagen}>
                      {tipoActual.cantidad}
                    </Text>
                  )}
                  <Image
                    source={{ uri: tipoActual.foto.uri }}
                    style={[styles.imageSmall]}
                  />
                </View>
              )}

              <Text style={[styles.text]}>
                {`Cojo ${tipoActual.cantidad} ${nombreMaterial} ${tipoActual.nombre} `}
              </Text>
            </View>
          )}
        </View>

        {indiceActualTipo >= tipos.length - 1 ? (
          <View style={[styles.container]}>
            <View style={[{height: Platform.OS === 'web' ? RFValue(12) : RFValue(45)}]}/>
            <TouchableOpacity
              style={[styles.imagePulsar, { flex: 1 }]}
              onPress={() => {
                handleActualizaEstado();
              }}
            >
              <Image
                source={require("../../Imagenes/tick.png")}
                style={[styles.imageSiguiente, ]}
              />
            </TouchableOpacity>
            <Text style={[styles.text]}>Todo Recogido </Text>
          </View>
        ) : (
          <View style={[styles.container]}>
            <View style={[{height: Platform.OS === 'web' ? RFValue(12) : RFValue(45)}]}/>
            <TouchableOpacity
              style={[styles.imagePulsar, { flex: 1 }]}
              onPress={() => {
                avanzarAlSiguienteTipo();
              }}
            >
              <Image
                source={require("../../Imagenes/siguiente.png")}
                style={[styles.imageSiguiente, ]}
              />
            </TouchableOpacity>
            <Text style={[styles.text]}>Cogido </Text>
          </View>
        )}
      </View>
    );
  };

  // Pantalla donde muestra el lugar destino a llevar y sus materiales
  const renderLugarDestino = () => {
    // Buscar en aulas la foto correspondiente al lugar de origen
    const aula = aulas.find((a) => a.aula === lugarDestinoNow);

    return viewDestinoQuedan ? (
      viewPantallaSeguro ? (
        <>{pantallaConfirmacion()}</>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.retrocederPulsar}
            onPress={() => {
              if (destinoActualIndex > 0) {
                setViewDestinoQuedan(false);
                setViewMaterialLlevarClase(true);
                obtenerUltimoObjeto();
              } else {
                setViewCadaObjetoRecoger(true);
                setCargandoMateriales(false);
                setViewCadaObjetoRecoger(false);
                setCargandoMaterialesRecogidosOrigen(true);
              }
            }}
          >
            <Image
              style={styles.imageRetroceder}
              source={require("../../Imagenes/retroceder.png")}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              { marginLeft: RFValue(Platform.OS === "web" ? -122 : -124) },
            ]}
          >
            {`Atrás `}
          </Text>
          <View style={[{ height: RFValue(2) }]} />
          {mostrarNumeroLugaresDestino(
            filtrarDestinoPorOrigen().length - destinoActualIndex,
            styles,
            visualizacion,
            aulas,
            tareas[lugarOrigenNow],
            destinoActualIndex
          )}

          <TouchableOpacity
            style={styles.imagePulsar}
            onPress={() => {
              setViewDestinoQuedan(false);
            }}
          >
            <Image
              source={require("../../Imagenes/siguiente.png")}
              style={styles.imageSiguiente}
            />
          </TouchableOpacity>
          <Text style={styles.felicitacionText}>¡Seguimos!</Text>
        </View>
      )
    ) : (
      <View style={styles.container}>
        {viewMaterialLlevarClase ? (
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.retrocederPulsar}
              onPress={() => {
                if (materialLlevarIndex > 0) {
                  setMaterialesCargados("retroceder");
                } else {
                  setViewMaterialLlevarClase(false);
                }
              }}
            >
              <Image
                style={styles.imageRetroceder}
                source={require("../../Imagenes/retroceder.png")}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.text,
                { marginLeft: RFValue(Platform.OS === "web" ? -122 : -124) },
              ]}
            >
              {`Atrás `}
            </Text>
            <View style={[{ height: RFValue(2) }]} />
            <Image source={{ uri: aula.foto.uri }} style={styles.image} />
            <Text style={[styles.text, { flex: 1 }]}>
              {lugarDestinoNow === "Almacen"
                ? `Estoy en el ${lugarDestinoNow} `
                : `Estoy en el aula ${lugarDestinoNow} `}
            </Text>

            {(visualizacion === "imagenes" ||
              visualizacion === "pictogramas") && (
              <View style={styles.row}>
                {stockMaterialLlevar >= 1 && stockMaterialLlevar <= 10 ? (
                  <Image
                    source={imagenesNumeros[stockMaterialLlevar]}
                    style={styles.imageSmall}
                  />
                ) : (
                  <Text style={styles.numeroImagen}>{stockMaterialLlevar}</Text>
                )}
                <Image
                  source={{ uri: fotoMaterialLlevar.uri }}
                  style={styles.imageSmall}
                />
                {fotoCaracteristicaMaterialLlevar !== "" && (
                  <Image
                    source={{ uri: fotoCaracteristicaMaterialLlevar.uri }}
                    style={styles.imageSmall}
                  />
                )}
              </View>
            )}
            {caractersiticaMaterialLlevar !== "Ninguno" ? (
              <View style={styles.container}>
                <Text style={styles.text}>
                  Dejo {stockMaterialLlevar} {nombreMaterialLlevar}
                  {stockMaterialLlevar > 1 ? "s" : ""}{" "}
                  {caractersiticaMaterialLlevar}
                </Text>
              </View>
            ) : (
              <View style={styles.container}>
                <Text style={styles.text}>
                  Dejamos {stockMaterialLlevar} {nombreMaterialLlevar}
                  {stockMaterialLlevar > 1 ? "s" : ""}
                </Text>
              </View>
            )}

            {materialLlevarIndex ==
            agrupadosDestiTareas[lugarDestinoNow].filter((objeto) => {
              return objeto.lugarOrigen === lugarOrigenNow;
            }).length -
              1 ? (
              <View style={styles.container}>
                <View style={[{height: Platform.OS === 'web' ? RFValue(6) : RFValue(30)}]}/>
                <TouchableOpacity
                  style={[styles.imagePulsar, { flex: 1 }]}
                  onPress={() => {
                    handleNextMaterialLlevar(); // Pasamos al siguiente material,
                  }}
                >
                  <Image
                    source={require("../../Imagenes/tick.png")}
                    style={[styles.imageSiguiente]}
                  />
                </TouchableOpacity>
                <Text style={[styles.text]}>Todo dejado </Text>
              </View>
            ) : (
              <View style={styles.container}>
                <View style={[{height: Platform.OS === 'web' ? RFValue(6) : RFValue(30)}]}/>
                <TouchableOpacity
                  style={[styles.imagePulsar, { flex: 1 }]}
                  onPress={() => {
                    handleNextMaterialLlevar(); // Pasamos al siguiente material,
                  }}
                >
                  <Image
                    source={require("../../Imagenes/siguiente.png")}
                    style={[styles.imageSiguiente]}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Dejo otro material </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.retrocederPulsar}
              onPress={() => {
                if (destinoActualIndex > 0) {
                  // Si ya llevamos entregando en varias clases, nos vamos a la clase anterior
                  setViewDestinoQuedan(true);
                } else {
                  // si es el primer lugar para llevar los maeriales, entonces nos vamos al mensaje de destinos
                  setViewDestinoQuedan(true);
                }
              }}
            >
              <Image
                style={styles.imageRetroceder}
                source={require("../../Imagenes/retroceder.png")}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.text,
                { marginLeft: RFValue(Platform.OS === "web" ? -122 : -124) },
              ]}
            >
              {`Atrás `}
            </Text>
            <View style={[{ height: RFValue(2) }]} />
            <View style={styles.row}>
              <Image
                source={require("../../Imagenes/ninoAndando.png")}
                style={styles.image}
              />
              <Image source={{ uri: aula.foto.uri }} style={styles.image} />
            </View>

            <Text style={[styles.text, { flex: 1 }]}>
              {lugarDestinoNow === "Almacen"
                ? `Voy al ${lugarDestinoNow} a dejar materiales`
                : `Voy a la Aula ${lugarDestinoNow} a dejar materiales`}
            </Text>

            <TouchableOpacity
              style={styles.imagePulsar}
              onPress={() => {
                setViewMaterialLlevarClase(true);
              }}
            >
              <Image
                source={require("../../Imagenes/siguiente.png")}
                style={styles.imageSiguiente}
              />
            </TouchableOpacity>

            <Text style={styles.text}>
              {lugarDestinoNow === "Almacen"
                ? `Estoy en el ${lugarDestinoNow} `
                : `Estoy en la aula ${lugarDestinoNow} `}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const pantallaConfirmacion = () => {
    return (
      <View style={styles.container}>
        <View style={[styles.row, { flex: 1 }]}>
          <Image
            style={styles.doubleImageLarge}
            source={require("../../Imagenes/pensar.png")}
          />
          <Image
            style={styles.doubleImageLarge}
            source={require("../../Imagenes/terminar.png")}
          />
        </View>
        <Text style={[styles.felicitacionText, { flex: 1 }]}>
          ¿Has terminado?
        </Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.imagePulsar, { marginHorizontal: 20 }]}
            onPress={() => {
              setViewDestinoQuedan(false);
              setViewMaterialLlevarClase(true);
            }}
          >
            <Image
              style={styles.imageSiguiente}
              source={require("../../Imagenes/retroceder.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.imagePulsar, { marginHorizontal: 20 }]}
            onPress={() => {
              // vamos a la siguiente recogida
              handleNextRecogida();
              setCargandoMaterialesRecogidosOrigen(true);
              setViewObjetosRecoger(false);
              setViewPantallaSeguro(false);
            }}
          >
            <Image
              source={require("../../Imagenes/bien.png")}
              style={styles.imageSiguiente}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={[styles.felicitacionText, { marginHorizontal: 60 }]}>
            No
          </Text>
          <Text style={[styles.felicitacionText, { marginHorizontal: 60 }]}>
            Si
          </Text>
        </View>
      </View>
    );
  };

  // Pantalla para mostrar al alumno la felicitacion de haber terminado
  const renderFelicitaciones = () => {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../Imagenes/TareasAlumnos/muyBien.png")}
          style={styles.imageVeryLarge}
        />

        <Text style={[styles.felicitacionText, { flex: 1 }]}>
          Muy Bien Hecho
        </Text>

        <TouchableOpacity
          style={styles.imagePulsar}
          onPress={ async () => {
            await completarTarea(id);
            navigation.navigate("Tareas", { usuario, refresh: Date.now() });
          }}
        >
          <Image
            source={require("../../Imagenes/bien.png")}
            style={styles.imageSiguiente}
          />
        </TouchableOpacity>
        <Text style={styles.felicitacionText}>Hecho</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!cargando ? (
        !cargandoMaterialesRecogidosOrigen ? ( // Vemos cuando empieza a repartir los objetos
          <>{renderLugarDestino()}</> // Pantalla donde muestra el lugar destino a llevar y sus materiales
        ) : viewFelicitaciones ? (
          <>{renderFelicitaciones()}</>
        ) : viewObjetosRecoger ? ( // cuando vemos los objetos a recoger en un lugar
          !cargandoMateriales ? ( // esperando a que cargen los materiales.
            <>
              {viewCadaObjetoRecoger ? ( // Pantalla que muestra la cantidad de objetos a recoger en el lugar origen.
                <>{renderMaterialARecoger()}</>
              ) : (
                <>
                  {renderObjetosARecoger(
                    // Objetos a recoger en el lugar origen
                    lugarOrigenNow,
                    tareas[lugarOrigenNow],
                    imagenLugarOrigenNow
                  )}
                </>
              )}
            </>
          ) : (
            <Text style={styles.cargandoTexto}>Cargando...</Text>
          )
        ) : (
          <>{renderLugarOrigen()}</> // Pantalla primera de ir al lugar de origen a recoger los materiales.
        )
      ) : (
        <Text style={styles.cargandoTexto}>Cargando...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "white",
  },
  imagenYTextoPulsar: {
    alignItems: "center",
    justifyContent: "center",
    margin: RFValue(10),
    borderWidth: RFValue(1),
    borderColor: "black",
    backgroundColor: "#f2f2f2",
  },
  image: {
    width: Platform.OS === "web" ? RFValue(60) : RFValue(100),
    height: Platform.OS === "web" ? RFValue(60) : RFValue(100),
  },
  imageVeryLarge: {
    width: Platform.OS === "web" ? RFValue(180) : RFValue(300),
    height: Platform.OS === "web" ? RFValue(180) : RFValue(300),
  },
  imageLarge: {
    width: Platform.OS === "web" ? RFValue(90) : RFValue(250),
    height: Platform.OS === "web" ? RFValue(90) : RFValue(250),
  },
  doubleImageLarge: {
    width: Platform.OS === "web" ? RFValue(90) : RFValue(150),
    height: Platform.OS === "web" ? RFValue(90) : RFValue(150),
  },
  imageSmall: {
    width: Platform.OS === "web" ? RFValue(50) : RFValue(90),
    height: Platform.OS === "web" ? RFValue(50) : RFValue(90),
  },
  imageRetroceder: {
    width: Platform.OS === "web" ? RFValue(20) : RFValue(40),
    height: Platform.OS === "web" ? RFValue(20) : RFValue(40),
  },
  imagenDentroBoton: {
    width: Platform.OS === "web" ? RFValue(50) : RFValue(100),
    height: Platform.OS === "web" ? RFValue(50) : RFValue(100),
  },
  imageSiguiente: {
    width: Platform.OS === "web" ? RFValue(50) : RFValue(100),
    height: Platform.OS === "web" ? RFValue(50) : RFValue(100),
  },
  imagePulsar: {
    borderWidth: RFValue(1),
    borderColor: "black",
    backgroundColor: "#f2f2f2",
    width: Platform.OS === "web" ? RFValue(53) : RFValue(103),
    height: Platform.OS === "web" ? RFValue(53) : RFValue(103),
  },
  retrocederPulsar: {
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#f2f2f2",
    width: Platform.OS === "web" ? RFValue(22) : RFValue(43),
    height: Platform.OS === "web" ? RFValue(22) : RFValue(43),
    marginLeft: RFValue(-120),
  },
  row: {
    flexDirection: "row",
  },
  text: {
    fontSize: Platform.OS === "web" ? RFValue(10) : RFValue(20),
  },
  textBoton: {
    fontSize: Platform.OS === "web" ? RFValue(10) : RFValue(20),
    fontWeight: "bold",
  },
  felicitacionText: {
    fontWeight: "bold",
    fontSize: Platform.OS === "web" ? RFValue(12) : RFValue(20),
  },
  separador: {
    height: RFValue(10),
  },
  columnStyle: {
    justifyContent: "space-between",
  },
  cargandoTexto: {
    fontWeight: "bold",
    fontSize: RFValue(10),
  },
  numeroImagen: {
    fontSize: RFValue(30),
  },
});
