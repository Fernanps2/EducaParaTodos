import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  buscarTareaIdTareasInventario,
  obtenerProfesores,
  getMaterialIdBD,
} from "../Controlador/tareas";

export default function VerTareaMaterial({ route, navigation }) {
  const id = route.params.id; // obtenemos el id Tarea.
  const usuario = route.params.usuario;

  // Variable para obtener todos los pasos de la tarea inventario.
  const [tareas, setTareas] = useState([]);
  const [agrupadosDestiTareas, setAgrupadosDestiTareas] = useState("");
  const [materiales, setMateriales] = useState([]);
  const [tickMateriales, setTickMateriales] = useState([]); // garantizar que objeto se ha cogido.
  const [profesores, setProfesores] = useState([]);
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
  const [viewBotonEmpezarLlevar, setViewBotonEmpezarLlevar] = useState(false);
  const [viewFelicitaciones, setViewFelicitaciones] = useState(false);
  const [cargando, setCargando] = useState(true);

  // Variables para ir a recoger los materiales
  const [lugarOrigenNow, setLugarOrigenNow] = useState(""); // Saber porque lugar de origen vamos
  const [imagenLugarOrigenNow, setImagenLugarOrigenNow] = useState(""); // saber la imagen del lugar origen actual.
  const [indexLugarOrigen, setIndexLugarOrigen] = useState(0);

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

  // se cargan las aulas, tareas, profesores, y lugares de origen y destino
  useEffect(() => {
    async function cargarDatos() {
      // Obtenemos las tareas
      const datos = await buscarTareaIdTareasInventario(id);
      // Obtenemos a los profesores
      const datosProfesores = await obtenerProfesores();
      setProfesores(datosProfesores);
      // Obtenemos la información para las aulas.
      const aulas = datosProfesores
        .map(({ nombre, aula, foto }) => {
          if (foto !== "") {
            return { nombre, aula, foto };
          }
        })
        .filter((aula) => aula !== undefined); // Esto removerá los valores undefined del resultado del map

      // Añadimos el almacen.
      aulas.push({
        nombre: "Almacén",
        aula: "Almacen",
        foto: require("../../Imagenes/almacen.png"), // Asegúrate de que la ruta es correcta y accesible en el contexto de tu app
      });

      setAulas(aulas);

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
          // Crear un nuevo array con los campos nombre y tick para averiguar si ese material ha sido recogido o no.
          setTickMateriales(
            materiales.flatMap((materialArray) =>
              materialArray.map((material) => ({
                nombre: material.nombre,
                tick: false,
              }))
            )
          );
          setMateriales(materiales);
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
      setMaterialLlevarIndex(0);
      let aulaNow;
      if (lugarDestinos.length > 0 && Object.keys(tareas).length > 0) {
        if (cambioOrigen !== lugarOrigenNow) {
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
  }, [destinoActualIndex, lugarOrigenNow]); // Se actualiza cuando va al siguiente lugar de dejada(index) y cuando se almacena los lugares destino.

  // se actualiza variables del lugar origen
  useEffect(() => {
    if (lugaresOrigen.length > 0 && aulas.length > 0) {
      const lugar = lugaresOrigen[indexLugarOrigen].id;
      setLugarOrigenNow(lugar);

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
      const tareasAplanados = [].concat(
        ...agrupadosDestiTareas[lugarDestinoNow]
      );

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
          } else {
            setFotoCaracteristicaMaterialLlevar("");
          }
        }
      }
    };
    actualizaMaterialLlevar();
    setMaterialesCargados("");
  }, [materialLlevarIndex, materialesCargados]);

  // Nos verifica si todos los materiales han sido recogidos.
  const isTodosRecogidos = (ticks) => {
    return ticks.every((material) => material.tick === true);
  };

  const handleActualizaEstado = () => {
    // Actualizar tickMateriales
    const nuevosTickMateriales = tickMateriales.map((material) => {
      if (material.nombre === nombreMaterial) {
        return { ...material, tick: true };
      }
      return material;
    });
    // Vemos ti todos los materiales han sido recogidos
    if (isTodosRecogidos(nuevosTickMateriales)) {
      setViewBotonEmpezarLlevar(true);
    }

    // Actualizar el estado con los nuevos tickMateriales
    setTickMateriales(nuevosTickMateriales);
    setViewCadaObjetoRecoger(false);
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
    if (destinoActualIndex < tareasConDestinoCorrecto.length - 1) {
      setMaterialesCargados("siguiente clase");
      setDestinoActualIndex(destinoActualIndex + 1);
    } else {
      // Sino hay mas vamos a la siguiente recogida
      handleNextRecogida();
      setCargandoMaterialesRecogidosOrigen(true);
      setViewObjetosRecoger(false);
    }
  };

  // Para pasar al siguiente material para llevar al aula.
  const handleNextMaterialLlevar = () => {
    if (
      materialLlevarIndex <
      agrupadosDestiTareas[lugarDestinoNow].length - 1
    ) {
      setMaterialLlevarIndex(materialLlevarIndex + 1);
      setMaterialesCargados("siguiente material al aula");
    } else {
      // si ya ha termiando con los materiales, pasa a la siguiente clase
      handleNextLugarDestino();
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

  // Pantalla primera de ir al lugar de origen a recoger los materiales.
  const renderLugarOrigen = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.retrocederPulsar}
          onPress={() => {
            if(indexLugarOrigen > 0){
              // Volvemos hacia atras en lugar origen, ya que esos materiales venían de otro lugar.
              setIndexLugarOrigen(indexLugarOrigen -1);
              // Cargamos la pantalla anteiror de recoger materiales en un lugar origen.
              setCargandoMaterialesRecogidosOrigen(true);
              setViewCadaObjetoRecoger(false);
            }else{
              navigation.navigate("Tareas", { usuario });
            }
          }}
        >
          <Image
            style={styles.imageVerySmall}
            source={require("../../Imagenes/retroceder.png")}
          />
        </TouchableOpacity>
        <View style={styles.row}>
          <Image
            source={require("../../Imagenes/ninoAndando.png")}
            style={styles.image}
          />
          <Image source={imagenLugarOrigenNow} style={styles.image} />
        </View>

        <View style={styles.separador}></View>
        <View style={styles.separador}></View>

        <Text style={styles.text}>
          {lugarOrigenNow === "Almacén"
            ? `Voy al ${lugarOrigenNow}`
            : `Voy a la ${lugarOrigenNow}`}
        </Text>

        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>

        <TouchableOpacity
          style={styles.imagePulsar}
          onPress={() => {
            setViewObjetosRecoger(true);
            setViewCadaObjetoRecoger(false);
          }}
        >
          <Image
            source={require("../../Imagenes/bien.png")}
            style={styles.image}
          />
        </TouchableOpacity>

        <View style={styles.separador}></View>
        <View style={styles.separador}></View>

        <Text style={styles.text}>
          {lugarOrigenNow === "Almacén"
            ? `Estoy en el ${lugarOrigenNow}`
            : `Estoy en la ${lugarOrigenNow}`}
        </Text>
      </View>
    );
  };

  // Objetos a recoger en el lugar origen
  const renderObjetosARecoger = (lugar, tareas, fotoLugarOrigen) => {
    // Aplanar el array de materiales antes de renderizar
    const materialesAplanados = quitamosDuplicados([].concat(...materiales));
    const tareasAplanados = [].concat(...tareas);
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.retrocederPulsar}
          onPress={() => {
            setViewObjetosRecoger(false);
          }}
        >
          <Image
            style={styles.imageVerySmall}
            source={require("../../Imagenes/retroceder.png")}
          />
        </TouchableOpacity>
        {viewBotonEmpezarLlevar ? (
          <>
            <View style={styles.row}>
              <Image
                source={{ uri: fotoLugarOrigen }}
                style={[styles.image, { marginHorizontal: 45 }]}
              />
              <TouchableOpacity
                style={[styles.imagePulsar, { marginHorizontal: 20 }]}
                onPress={() => {
                  setCargandoMaterialesRecogidosOrigen(false);
                  setViewBotonEmpezarLlevar(false);
                }}
              >
                <Image
                  source={require("../../Imagenes/bien.png")}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={[styles.text, { marginHorizontal: 30 }]}>
                {lugar === "Almacén"
                  ? `Estoy en el ${lugar}`
                  : `Estoy en el aula ${lugar}`}
              </Text>
              <Text style={[styles.text, { marginHorizontal: 20 }]}>
                Nos vamos a repartir
              </Text>
            </View>
          </>
        ) : (
          <>
            <Image source={{ uri: fotoLugarOrigen }} style={styles.image} />
            <Text style={styles.text}>
              {lugar === "Almacén"
                ? `Estoy en el ${lugar}`
                : `Estoy en el aula ${lugar}`}
            </Text>
          </>
        )}
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>

        <FlatList
          data={materialesAplanados}
          renderItem={({ item }) => {
            // Encontrar el objeto correspondiente en tickMateriales
            const tickMaterial = tickMateriales.find(
              (material) => material.nombre === item.nombre
            );

            // Determinar el estilo de la imagen
            const imagenStyle =
              tickMaterial && tickMaterial.tick
                ? [styles.imagenDentroBoton, { backgroundColor: "green" }] // Estilo cuando tick es true
                : styles.imagenDentroBoton; // Estilo por defecto

            return (
              <>
                <TouchableOpacity
                  style={styles.imagenYTextoPulsar}
                  onPress={() => {
                    setViewCadaObjetoRecoger(true);
                    const stock = tareasAplanados
                      .filter((tarea) => tarea.idMaterial === item.id)
                      .map((tarea) => tarea.cantidad);
                    setStock(stock[0]);
                    setNombreMaterial(item.nombre);
                    setFotoMaterial(item.foto);
                    const objetosFiltrados = tareasAplanados
                      .filter((tarea) => tarea.idMaterial === item.id)
                      .map((tarea) => tarea.caracteristica);
                    setCaract(objetosFiltrados); // obtenemos las caracteristicas del objeto a recoger.
                  }}
                >
                  <Image source={{ uri: item.foto }} style={imagenStyle} />
                  <Text style={styles.textBoton}>
                    Coger {item.nombre}
                    {item.caracteristica !== "Ninguno"
                      ? item.caracteristica
                      : ""}
                  </Text>
                </TouchableOpacity>
              </>
            );
          }}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnStyle}
        />
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

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.row}>
          <Image
            source={{ uri: imagenLugarOrigenNow }}
            style={[styles.image, { marginHorizontal: 15 }]}
          />
          <Image
            source={{ uri: fotoMaterial }}
            style={[styles.image, { marginHorizontal: 15 }]}
          />
        </View>
        <Text style={styles.text}>
          {lugarOrigenNow === "Almacén"
            ? `Estoy en el ${lugarOrigenNow} cogiendo ${nombreMaterial}s`
            : `Estoy en el aula ${lugarOrigenNow} cogiendo ${nombreMaterial}s`}
        </Text>

        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>

        <>
          {caract[0] === "Ninguno" ? (
            <>
              <View style={styles.row}>
                {stock >= 1 && stock <= 10 ? (
                  <Image
                    source={require(`../../Imagenes/Numeros/${stock}.png`)}
                    style={styles.image}
                  />
                ) : (
                  <Text style={styles.numeroImagen}>{stock}</Text>
                )}
              </View>

              <Text style={styles.text}>
                Cogemos {stock} {nombreMaterial}
                {stock > 1 ? "s" : ""}
              </Text>
            </>
          ) : (
            <View style={{ height: 300 }}>
              <FlatList
                data={tipos}
                renderItem={({ item }) => (
                  <View>
                    <View style={[styles.row]}>
                      <Image
                        source={{ uri: item.foto }}
                        style={styles.imageSmall}
                      />
                      {item.cantidad >= 1 && item.cantidad <= 10 ? (
                        <Image
                          source={require(`../../Imagenes/Numeros/${item.cantidad}.png`)}
                          style={styles.imageSmall}
                        />
                      ) : (
                        <Text style={styles.numeroImagen}>{item.cantidad}</Text>
                      )}
                    </View>
                    <Text style={styles.text}>
                      {`Cogemos ${item.cantidad} ${nombreMaterial} ${item.nombre}`}
                    </Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
              />
            </View>
          )}
        </>

        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>

        <TouchableOpacity
          style={styles.imagePulsar}
          onPress={() => {
            handleActualizaEstado();
          }}
        >
          <Image
            source={require("../../Imagenes/bien.png")}
            style={styles.image}
          />
          <View style={styles.separador}></View>
          <View style={styles.separador}></View>
          <View style={styles.separador}></View>
          <Text style={styles.text}>Cogido</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Pantalla donde muestra el lugar destino a llevar y sus materiales
  const renderLugarDestino = () => {
    // Buscar en aulas la foto correspondiente al lugar de origen
    const aula = aulas.find((a) => a.aula === lugarDestinoNow);

    return (
      <View>
        {viewMaterialLlevarClase ? (
          <>
            <TouchableOpacity
              style={styles.retrocederPulsar}
              onPress={() => {
                setViewMaterialLlevarClase(false);
              }}
            >
              <Image
                style={styles.imageVerySmall}
                source={require("../../Imagenes/retroceder.png")}
              />
            </TouchableOpacity>
            <Image source={aula.foto} style={styles.image} />
            <View style={styles.separador}></View>
            <View style={styles.separador}></View>
            <Text style={styles.text}>
              {lugarDestinoNow === "Almacén"
                ? `Estoy en el ${lugarDestinoNow}`
                : `Estoy en el aula ${lugarDestinoNow}`}
            </Text>

            <View style={styles.separador}></View>
            <View style={styles.separador}></View>
            <View style={styles.separador}></View>
            <View style={styles.separador}></View>
            <View style={styles.separador}></View>
            <View style={styles.separador}></View>

            <View style={styles.row}>
              {stockMaterialLlevar >= 1 && stockMaterialLlevar <= 10 ? (
                <Image
                  source={require(`../../Imagenes/Numeros/${stockMaterialLlevar}.png`)}
                  style={styles.image}
                />
              ) : (
                <Text style={styles.numeroImagen}>{stockMaterialLlevar}</Text>
              )}
              <Image
                source={{ uri: fotoMaterialLlevar }}
                style={styles.image}
              />
              {fotoCaracteristicaMaterialLlevar !== "" && (
                <Image
                  source={{ uri: fotoCaracteristicaMaterialLlevar }}
                  style={styles.image}
                />
              )}
            </View>
            {caractersiticaMaterialLlevar !== "Ninguno" ? (
              <>
                <Text style={styles.text}>
                  Dejamos {stockMaterialLlevar} {nombreMaterialLlevar}
                  {stockMaterialLlevar > 1 ? "s" : ""}{" "}
                  {caractersiticaMaterialLlevar}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.text}>
                  Dejamos {stockMaterialLlevar} {nombreMaterialLlevar}
                  {stockMaterialLlevar > 1 ? "s" : ""}
                </Text>
              </>
            )}

            <View style={styles.separador}></View>
            <View style={styles.separador}></View>
            <View style={styles.separador}></View>
            <View style={styles.separador}></View>
            <View style={styles.separador}></View>
            <View style={styles.separador}></View>

            <TouchableOpacity
              style={styles.imagePulsar}
              onPress={() => {
                handleNextMaterialLlevar(); // Pasamos al siguiente material,
              }}
            >
              <Image
                source={require("../../Imagenes/bien.png")}
                style={styles.image}
              />
              <View style={styles.separador}></View>
              <View style={styles.separador}></View>
              <View style={styles.separador}></View>
              <Text style={styles.text}>Lo hemos dejado</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.retrocederPulsar}
              onPress={() => {
                if (destinoActualIndex > 0) {
                  // Si ya llevamos entregando en varias clases, nos vamos a la clase anterior
                  setMaterialesCargados("siguiente clase");
                  setMaterialLlevarIndex(0);

                  setDestinoActualIndex(destinoActualIndex - 1);
                } else {
                  // si es el primer lugar para llevar los maeriales, entonces nos vamos para el lugar de origen
                  setCargandoMaterialesRecogidosOrigen(true);
                  setViewObjetosRecoger(false);
                }
              }}
            >
              <Image
                style={styles.imageVerySmall}
                source={require("../../Imagenes/retroceder.png")}
              />
            </TouchableOpacity>
            <View style={styles.row}>
              <Image
                source={require("../../Imagenes/ninoAndando.png")}
                style={styles.image}
              />
              <Image source={aula.foto} style={styles.image} />
            </View>

            <View style={styles.separador}></View>
            <View style={styles.separador}></View>

            <Text style={styles.text}>
              {lugarDestinoNow === "Almacén"
                ? `Voy al ${lugarDestinoNow}`
                : `Voy a la aula ${lugarDestinoNow}`}
            </Text>

            <View style={styles.separador}></View>
            <View style={styles.separador}></View>
            <View style={styles.separador}></View>
            <View style={styles.separador}></View>
            <View style={styles.separador}></View>
            <View style={styles.separador}></View>
            <View style={styles.separador}></View>
            <View style={styles.separador}></View>

            <TouchableOpacity
              style={styles.imagePulsar}
              onPress={() => {
                setViewMaterialLlevarClase(true);
              }}
            >
              <Image
                source={require("../../Imagenes/bien.png")}
                style={styles.image}
              />
            </TouchableOpacity>

            <View style={styles.separador}></View>
            <View style={styles.separador}></View>

            <Text style={styles.text}>
              {lugarDestinoNow === "Almacén"
                ? `Estoy en el ${lugarDestinoNow}`
                : `Estoy en la aula ${lugarDestinoNow}`}
            </Text>
          </>
        )}
      </View>
    );
  };

  // Pantalla para mostrar al alumno la felicitacion de haber terminado
  const renderFelicitaciones = () => {
    return (
      <View>
        <Image
          source={require("../../Imagenes/TareasAlumnos/muyBien.png")}
          style={styles.imageLarge}
        />
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <Text style={styles.felicitacionText}>Muy Bien Hecho</Text>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <TouchableOpacity
          style={styles.imagePulsar}
          onPress={() => {
            navigation.navigate("Tareas", { usuario });
          }}
        >
          <Image
            source={require("../../Imagenes/bien.png")}
            style={styles.image}
          />
        </TouchableOpacity>
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderWidth: 5,
    borderColor: "black",
    backgroundColor: "#f2f2f2",
  },
  image: {
    width: 150,
    height: 150,
  },
  imageLarge: {
    width: 300,
    height: 300,
  },
  imageSmall: {
    width: 120,
    height: 120,
  },
  imageVerySmall: {
    width: 50,
    height: 50,
  },
  imagenDentroBoton: {
    width: 180,
    height: 180,
  },
  imagePulsar: {
    borderWidth: 5,
    borderColor: "black",
    backgroundColor: "#f2f2f2",
    width: 180,
    height: 180,
  },
  retrocederPulsar: {
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#f2f2f2",
    width: 55,
    height: 55,
  },
  row: {
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
  },
  textBoton: {
    fontSize: 20,
    fontWeight: "bold",
  },
  felicitacionText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  separador: {
    height: 10,
  },
  columnStyle: {
    justifyContent: "space-between",
  },
  cargandoTexto: {
    fontWeight: "bold",
    fontSize: 30,
  },
  numeroImagen: {
    fontSize: 70,
  },
});
