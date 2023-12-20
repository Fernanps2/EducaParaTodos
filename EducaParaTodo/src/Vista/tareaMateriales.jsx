import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  Platform,
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import Swal from "sweetalert2";
import {
  aniadeTarea,
  aniadeTareaInventario,
  modificarMaterial,
} from "../Controlador/tareas";
import {
  get,
  inicializarmateriales,
  isVaciaListaMateriales,
  get_materialesBD,
  setInicioPantalla,
} from "./VarGlobal";
import { descargaTipoTareas } from "../Controlador/multimedia";

export default function TareaActividad({ navigation }) {
  // Variables para guardar nombre de la actividad
  const [nombreTarea, setNombreTarea] = useState("");

  // Variables para guardar fecha y hora
  const [inicioFecha, setInicioFecha] = useState("");
  const [inicioHora, setInicioHora] = useState("");
  const [finFecha, setFinFecha] = useState("");
  const [finHora, setFinHora] = useState("");

  //Variables para switch
  const [periocidad, setPeriocidad] = useState("Diario");

  // Variable para la foto
  const [fotostipo, setFotosTipo] = useState([]);
  const [foto, setFoto] = useState("");

  // Variable para carga
  const [cargando, setCargando] = useState(true);

  // Actualizamos la variable que indica que hemos entrado a la pantalla de crear tarea materiales
  useEffect(() => {
    setInicioPantalla(true);
    async function descargarDatos() {
      const data = await descargaTipoTareas();
      data.unshift("Ninguno");
      setFotosTipo(data);

      setCargando(false);
    }

    descargarDatos();
  }, []);

  // Borramos toda la información cuando pulsamos borrar
  const handleDeleteInformation = () => {
    setNombreTarea("");
    setFinFecha("");
    setFinHora("");
    setInicioFecha("");
    setInicioHora("");
    setPeriocidad("Diario");
    inicializarmateriales();
  };

  //Validamos las horas
  const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;

  const validateTime = (time) => timeRegex.test(time);

  const saveTimes = () => {
    if (!validateTime(inicioHora) || !validateTime(finHora)) {
      if (Platform.OS === "web") {
        Swal.fire({
          title: "Horas inválidas",
          text: "Por favor, ingresa las horas en el formato hh:mm.",
          icon: "warning",
          confirmButtonText: "De acuerdo",
        });
      } else {
        Alert.alert(
          "Horas inválidas",
          "Por favor, ingresa las horas en el formato hh:mm."[
            { text: "De acuerdo" }
          ]
        );
      }
      return false;
    }

    // Si las horas son válidas, compara las horas de inicio y finalización
    const [startHours, startMinutes] = inicioHora.split(":").map(Number);
    const [endHours, endMinutes] = finHora.split(":").map(Number);

    // Convertir horas y minutos a minutos totales para comparación
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    if (
      startTotalMinutes >= endTotalMinutes &&
      new Date(inicioFecha).getTime() === new Date(finFecha).getTime()
    ) {
      if (Platform.OS === "web") {
        Swal.fire({
          title: "Atención",
          text: "La hora de inicio debe ser menor que la hora de finalización.",
          icon: "warning",
          confirmButtonText: "De acuerdo",
        });
      } else {
        Alert.alert(
          "Error",
          "La hora de inicio debe ser menor que la hora de finalización."[
            { text: "De acuerdo" }
          ]
        );
      }
      return false;
    }
    return true;
  };

  //Validamos las fechas
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  const validateDate = (date) => dateRegex.test(date);

  const saveDates = () => {
    if (validateDate(inicioFecha) && validateDate(finFecha)) {
      // Aquí podrías añadir lógica adicional para comparar las fechas

      if (new Date(inicioFecha) > new Date(finFecha)) {
        if (Platform.OS === "web") {
          Swal.fire({
            title: "Atención",
            text: "La fecha de inicio no puede ser posterior a la fecha de finalización.",
            icon: "warning",
            confirmButtonText: "De acuerdo",
          });
        } else {
          Alert.alert(
            "Error",
            "La fecha de inicio no puede ser posterior a la fecha de finalización."[
              { text: "De acuerdo" }
            ]
          );
        }
        return false;
      } else {
        return true;
      }
    } else {
      // Si alguna de las fechas no es válida, muestra una alerta
      if (Platform.OS === "web") {
        Swal.fire({
          title: "Atención, Fechas inválidas",
          text: "Por favor, ingresa fechas válidas en el formato aaaa-mm-dd.",
          icon: "warning",
          confirmButtonText: "De acuerdo",
        });
      } else {
        Alert.alert(
          "Fechas inválidas",
          "Por favor, ingresa fechas válidas en el formato aaaa-mm-dd."[
            { text: "De acuerdo" }
          ]
        );
      }
      return false;
    }
  };

  const guardarDatos = async () => {
    try {
      if (saveDates() && saveTimes()) {
        const idTarea = await aniadeTarea(
          nombreTarea,
          inicioFecha + "//" + inicioHora,
          finFecha + "//" + finHora,
          "material",
          periocidad,
          foto,
        );
        // Obtenemos todos los objetos de materiales de la tarea
        const materiales = get();
        materiales.forEach(
          async (item) =>
            await aniadeTareaInventario(
              item.id,
              item.caracteristica,
              item.cantidad,
              item.origen,
              item.destino,
              idTarea
            )
        );
        //Actuliazmos el la base de datos con el material de stock restante.
        const datos = get_materialesBD();
        for (const item of datos) {
          await modificarMaterial(
            item.id,
            item.nombre,
            item.foto,
            item.stock,
            item.caracteristicas
          );
        }
        //await modificarMaterial();

        // Reiniciamos los materiales
        inicializarmateriales();

        setInicioPantalla(false);
        navigation.navigate("gestionTareas");
      }
    } catch (error) {
      console.error("Error al crear la tarea materiales:", error);
    }
  };

  const showAlertDelete = () => {
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
          handleDeleteInformation();
        }
      });
    } else {
      Alert.alert(
        "¿Quiere borrar?", // Título
        "Pulsa una opción", // Mensaje
        [
          { text: "Cancelar" },
          { text: "Confirmar", onPress: () => handleDeleteInformation() },
        ],
        { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
      );
    }
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
          if (isVaciaListaMateriales()) {
            Swal.fire({
              title: "Ningún Material elegido",
              text: "Verifica que hayas elegido algún material.",
              icon: "warning",
              confirmButtonText: "De acuerdo",
            });
          } else {
            if (nombreTarea === "" || foto === "" || foto === "Ninguno") {
              Swal.fire({
                title: "Campo incompleto.",
                text: "Pon nombre a la tarea.",
                icon: "warning",
                confirmButtonText: "De acuerdo",
              });
            } else {
              guardarDatos();
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
              if (isVaciaListaMateriales()) {
                Alert.alert(
                  "Ningún Material elegido", // Título
                  "Verifica que hayas elegido algún material.", // Mensaje
                  [{ text: "De acuerdo" }]
                );
              } else {
                if (nombreTarea === "") {
                  Alert.alert(
                    "Campo incompletos", // Título
                    "Pon nombre a la tarea y su lugar.", // Mensaje
                    [{ text: "De acuerdo" }]
                  );
                } else {
                  guardarDatos();
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
    <>
      {cargando ? (
        <Text style={styles.textoCargando}>Cargando...</Text>
      ) : (
        <>
          <View style={styles.separador} />
          <View style={styles.separador} />

          <View style={[styles.row, { justifyContent: "center" }]}>
            {Platform.OS === "web" && (
              <>
                <Text style={[styles.title]}>Materiales</Text>
              </>
            )}
          </View>

          <View style={styles.container}>
            <View style={[styles.row, { justifyContent: "center" }]}>
              {Platform.OS !== "web" && (
                <>
                  <Text style={[styles.title]}>Materiales</Text>
                </>
              )}
            </View>

            <View style={styles.separador} />

            <Text style={styles.text}>Nombre Tarea</Text>

            <View style={styles.separador} />

            <TextInput
              style={[styles.input]}
              placeholder="Elija Nombre"
              value={nombreTarea}
              onChangeText={setNombreTarea}
            />

            <View style={styles.separador} />

            <Text style={styles.text}>Inicio Tarea </Text>

            <View style={styles.separador} />

            <View style={[styles.row]}>
              <TextInput
                style={[styles.inputFechaHora]}
                placeholder="aaaa-mm-dd"
                value={inicioFecha}
                onChangeText={setInicioFecha}
              />
              <TextInput
                style={[styles.inputFechaHora]}
                placeholder="hh:mm"
                value={inicioHora}
                onChangeText={setInicioHora}
              />
            </View>

            <View style={styles.separador} />

            <Text style={styles.text}>Fin Tarea </Text>

            <View style={styles.separador} />

            <View style={[styles.row]}>
              <TextInput
                style={[styles.inputFechaHora]}
                placeholder="aaaa-mm-dd"
                value={finFecha}
                onChangeText={setFinFecha}
              />
              <TextInput
                style={[styles.inputFechaHora]}
                placeholder="hh:mm"
                value={finHora}
                onChangeText={setFinHora}
              />
            </View>
            <View style={styles.separador} />

            <View style={styles.row}>
              <Text style={[styles.text, { marginRight: 5 }]}>Periocidad </Text>
              <Picker
                selectedValue={periocidad}
                onValueChange={(itemValue, itemIndex) =>
                  setPeriocidad(itemValue)
                }
                style={styles.picker}
              >
                <Picker.Item label="Diario" value="diario" />
                <Picker.Item label="Semanal" value="semanal" />
                <Picker.Item label="Mensual" value="mensual" />
              </Picker>
            </View>

            <View style={styles.separador} />
            <View style={styles.separador} />
            <View style={styles.separador} />

            <View style={styles.row}>
              <Text style={[styles.text, { marginRight: 5 }]}>Foto </Text>
              <Picker
                selectedValue={foto}
                onValueChange={(itemValue, itemIndex) => setFoto(itemValue)}
                style={styles.pickerFoto}
              >
                {fotostipo.map((foto, index) => (
                  <Picker.Item
                    key={index}
                    label={foto === "Ninguno" ? "Ninguno" : `${foto.nombre}`}
                    value={foto.nombre}
                  />
                ))}
              </Picker>
            </View>

            <View style={styles.separador} />
            <View style={styles.separador} />
            <View style={styles.separador} />
            <View style={styles.separador} />

            <Button
              title="Añadir Material"
              onPress={() => navigation.navigate("anadirMaterial")}
              color="#D3D3D3"
            />

            <View style={styles.separador} />
            <View style={styles.separador} />
            <View style={styles.separador} />
            <View style={styles.separador} />

            <Button
              title="Ver todos materiales"
              onPress={() => navigation.navigate("verTodosMateriales")}
              color="#90EE90"
            />

            <View style={styles.separador} />
            <View style={styles.separador} />
            <View style={styles.separador} />
            <View style={styles.separador} />

            <View style={[styles.buttonContainer]}>
              <View style={[styles.button]}>
                <Button
                  title="Borrar"
                  onPress={() => showAlertDelete()}
                  color="#FF0000"
                />
              </View>

              <View style={[styles.button]}>
                <Button
                  title="Guardar"
                  onPress={() => showAlertStore()}
                  color="#0000FF"
                />
              </View>
            </View>
          </View>
        </>
      )}
    </>
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
  input: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    height: 30,
    padding: 5,
  },
  inputFechaHora: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    marginBottom: 10,
    width: 100,
    height: 30,
    padding: 5,
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
  },
  separador: {
    height: 10,
  },
  Image: {
    width: 20,
    height: 20,
  },
  picker: {
    height: 25,
    width: Platform.OS === "web" ? 150 : 200,
  },
  pickerFoto: {
    height: 25,
    width: Platform.OS === "web" ? 200 : 250,
  },
  textoCargando: {
    textAlign: "center",
    fontSize: 15,
  },
});
