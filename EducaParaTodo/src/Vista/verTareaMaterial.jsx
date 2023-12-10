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

const personas = [{ nombre: "Juan" }, { nombre: "Ana" }, { nombre: "Luis" }];

export default function VerTareaMaterial({ route, navigation }) {
  const id = route.params.id; // obtenemos el id Tarea.

  // Variable para obtener todos los pasos de la tarea inventario.
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [materiales, setMateriales] = useState([]);
  const [tickMateriales, setTickMateriales] = useState([]); // garantizar que objeto se ha cogido.
  const [cargandoMateriales, setCargandoMateriales] = useState(true);
  const [profesores, setProfesores] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [viewObjetosRecoger, setViewObjetosRecoger] = useState(false);
  const [viewCadaObjetoRecoger, setViewCadaObjetoRecoger] = useState(false);
  const [lugarOrigenNow, setLugarOrigenNow] = useState(""); // Saber porque lugar de origen vamos
  const [imagenLugarOrigenNow, setImagenLugarOrigenNow] = useState(""); // saber la imagen del lugar origen actual.
  const [lugaresOrigen, setLugaresOrigen] = useState([]);
  // Variables para guardar objeto para recoger su cantidad.
  const [stock, setStock] = useState("");
  const [nombreMaterial, setNombreMaterial] = useState("");
  const [fotoMaterial, setFotoMaterial] = useState("");

  // se cargan las aulas, tareas, profesores, y lugares de origen
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
        aula: "Almacén",
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
      setCargando(false);
    }

    cargarDatos();
  }, []);

  // se cargan materiales,
  useEffect(() => {
    if (lugarOrigenNow !== "" && viewObjetosRecoger) {
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
                caracteristicas:
                  material.caracteristicas &&
                  material.caracteristicas.length > 0
                    ? material.caracteristicas.map((caracteristica) => ({
                        tipo: caracteristica.tipo,
                        tick: false,
                      }))
                    : [],
              }))
            )
          );
          setMateriales(materiales);
          setCargandoMateriales(false);
        } catch (error) {
          // Manejo de errores
          console.error("Error al obtener materiales:", error);
        }
      };
      obtenerMateriales();
    }
  }, [lugarOrigenNow]);

  const handleActualizaEstado = () => {
    // Actualizar tickMateriales
  const nuevosTickMateriales = tickMateriales.map(material => {
    if (material.nombre === nombreMaterial) {
      return { ...material, tick: true };
    }
    return material;
  });

  // Actualizar el estado con los nuevos tickMateriales
  setTickMateriales(nuevosTickMateriales);
  setViewCadaObjetoRecoger(false);
  }

  const renderObjetosARecoger = (lugar, tareas, fotoLugarOrigen) => {
    // Aplanar el array de materiales antes de renderizar
    const materialesAplanados = [].concat(...materiales);
    console.log(tareas);

    return (
      <View style={{ flex: 1 }}>
        <Image source={{ uri: fotoLugarOrigen }} style={styles.image} />
        <Text style={styles.text}>
          {lugar === "Almacén"
            ? `Estoy en el ${lugar}`
            : `Estoy en el aula ${lugar}`}
        </Text>

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
              <TouchableOpacity
                style={styles.imagenYTextoPulsar}
                onPress={() => {
                  setViewCadaObjetoRecoger(true);
                  setStock(item.stock);
                  setNombreMaterial(item.nombre);
                  setFotoMaterial(item.foto);
                }}
              >
                <Image source={{ uri: item.foto }} style={imagenStyle} />
                <Text style={styles.textBoton}>{item.nombre}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnStyle}
        />
      </View>
    );
  };

  // Pantalla primera de ir al lugar de origen.
  const renderLugarOrigen = (lugarOrigen) => {
    // Buscar en aulas la foto correspondiente al lugar de origen
    const aula = aulas.find((a) => a.aula === lugarOrigen);

    return (
      <View>
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
          {lugarOrigen === "Almacén"
            ? `Voy al ${lugarOrigen}`
            : `Voy a la ${lugarOrigen}`}
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
            setLugarOrigenNow(lugarOrigen);
            setImagenLugarOrigenNow(aula.foto);
            setViewObjetosRecoger(true);
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
          {lugarOrigen === "Almacén"
            ? `Estoy en el ${lugarOrigen}`
            : `Estoy en la ${lugarOrigen}`}
        </Text>
      </View>
    );
  };

  // Pnatalla que muestra la cantidad de objetos a recoger.
  const renderMaterialARecoger = () => {
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
        <View style={styles.separador}></View>

        {stock >= 1 && stock <= 10 ? (
          <Image
            source={require(`../../Imagenes/Numeros/${stock}.png`)}
            style={styles.image}
          />
        ) : (
          <Text style={{ fontSize: 30 }}>{stock}</Text>
        )}
        <Text style={styles.text}>
          <Text style={styles.text}>
            {stock} {nombreMaterial}
            {stock > 1 ? "s" : ""}
          </Text>
        </Text>

        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>

        <TouchableOpacity style={styles.imagePulsar} onPress={() => {handleActualizaEstado()}}>
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
        viewObjetosRecoger ? ( // cuando vemos los objetos a recoger en un lugar
          !cargandoMateriales ? ( // esperando a que cargen los materiales.
            <>
              {viewCadaObjetoRecoger ? ( // cuando recogemos la cantidad de un material
                <>{renderMaterialARecoger()}</>
              ) : (
                <>
                  {renderObjetosARecoger(
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
          <FlatList
            data={lugaresOrigen}
            renderItem={({ item }) => renderLugarOrigen(item.id)}
            keyExtractor={(item, index) => index.toString()}
          />
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
});
