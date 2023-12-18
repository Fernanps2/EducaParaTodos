import React, { useState } from "react";
import {
  Button,
  Platform,
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Swal from "sweetalert2";
import {
  cargarVideosBD,
  cargarAudiosBD,
} from "../Controlador/tareas";
import {
  descargaPictogramas,
  descargaImagenes,
} from "../Controlador/multimedia"

export default function PasoActividad({ navigation }) {
  // Variables para añadir items
  const [showAddStepAddText, setShowAddStepAddText] = useState(false); // Opcion Añadir texto en pasos
  const [showAddStepAddPict, setShowAddStepAddPict] = useState(false); // Opcion Añadir pictograma en pasos
  const [showAddStepAddVideo, setShowAddStepAddVideo] = useState(false); // Opcion Añadir video en pasos
  const [showAddStepAddImage, setShowAddStepAddImage] = useState(false); // Opcion Añadir imagen en pasos
  const [showAddStepAddAudio, setShowAddStepAddAudio] = useState(false); // Opcion Añadir imagen en pasos

  // Variables para guardar input
  const [nombrePaso, setNombrePaso] = useState("");

  // Variables para pictogramas
  const [dataPicto, setDataPicto] = useState([]);
  const [isLoadingPicto, setIsLoadindPicto] = useState(false);
  const [selectedPictograma, setSelectedPictograma] = useState("");
  const [storePictograma, setStorePictograma] = useState("");
  const [isStorePicto, setIsStorePicto] = useState(false);

  // Variables para Video
  const [dataVideo, setDataVideo] = useState([]);
  const [isLoadingVideo, setIsLoadindVideo] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [storeVideo, setStoreVideo] = useState("");
  const [isStoreVideo, setIsStoreVideo] = useState(false);

  // Variables para Imagenes
  const [dataImagen, setDataImagen] = useState([]);
  const [isLoadingIma, setIsLoadindIma] = useState(false);
  const [selectedImagen, setSelectedImagen] = useState("");
  const [storeImagen, setStoreImagen] = useState("");
  const [isStoreIma, setIsStoreIma] = useState(false);

  // Variables para Audio
  const [dataAudio, setDataAudio] = useState([]);
  const [isLoadingAudio, setIsLoadindAudio] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState("");
  const [storeAudio, setStoreAudio] = useState("");
  const [isStoreAudio, setIsStoreAudio] = useState(false);

  // Variables para texto
  const [storeTexto, setStoreTexto] = useState("");
  const [isStoreTexto, setIsStoreTexto] = useState(false);
  const [selectedTexto, setSelectedTexto] = useState("");

  //Cargamos pictogramas
  const cargarPictogramas = async () => {
    setIsLoadindPicto(true); // Iniciar la carga
    const data = await descargaPictogramas()
    setDataPicto(data);
    setIsLoadindPicto(false);
  };

  //Cargamos videos
  const cargarVideos = async () => {
    setIsLoadindVideo(true); // Iniciar la carga
    setDataVideo(await cargarVideosBD());
    setIsLoadindVideo(false);
  };

  //Cargamos imagenes
  const cargarImagenes = async () => {
    setIsLoadindIma(true); // Iniciar la carga
    setDataImagen(await descargaImagenes());
    setIsLoadindIma(false);
  };

  //Cargamos audios
  const cargarAudios = async () => {
    setIsLoadindAudio(true); // Iniciar la carga
    setDataAudio(await cargarAudiosBD());
    setIsLoadindAudio(false);
  };

  // Pulsamos boton añadir texto en añadir paso
  const handleAnadirTexto = () => {
    setShowAddStepAddText(true);
    setShowAddStepAddPict(false);
    setShowAddStepAddVideo(false);
    setShowAddStepAddImage(false);
    setShowAddStepAddAudio(false);
  };
  // Pulsamos boton añadir pictograma en añadir paso
  const handleAnadirPicto = () => {
    setShowAddStepAddText(false);
    setShowAddStepAddPict(true);
    setShowAddStepAddVideo(false);
    setShowAddStepAddImage(false);
    setShowAddStepAddAudio(false);
    cargarPictogramas();
  };
  // Pulsamos boton añadir video en añadir paso
  const handleAnadirVideo = () => {
    setShowAddStepAddText(false);
    setShowAddStepAddPict(false);
    setShowAddStepAddVideo(true);
    setShowAddStepAddImage(false);
    setShowAddStepAddAudio(false);
    cargarVideos();
  };
  // Pulsamos boton añadir imagen en añadir paso
  const handleAnadirImagen = () => {
    setShowAddStepAddText(false);
    setShowAddStepAddPict(false);
    setShowAddStepAddVideo(false);
    setShowAddStepAddImage(true);
    setShowAddStepAddAudio(false);
    cargarImagenes();
  };

  // Pulsamos boton añadir audio en añadir paso
  const handleAnadirAudio = () => {
    setShowAddStepAddText(false);
    setShowAddStepAddPict(false);
    setShowAddStepAddVideo(false);
    setShowAddStepAddImage(false);
    setShowAddStepAddAudio(true);
    cargarAudios();
  };

  // Pulsamos un pictogramaentre los elegidos
  const handlePictoPress = (item) => {
    setSelectedPictograma(item);
  };

  // elegimos un pictograma
  const handleGuardarPictograma = () => {
    setStorePictograma(selectedPictograma);
    setIsStorePicto(true);
  };

  // Borramos pictograma
  const handletrashPicto = () => {
    setIsStorePicto(false);
    setStorePictograma("");
  };

  // Pulsamos un video entre los elegidos
  const handleVideoPress = (item) => {
    setSelectedVideo(item);
  };

  // elegimos un video
  const handleGuardarVideo = () => {
    setStoreVideo(selectedVideo);
    setIsStoreVideo(true);
  };

  // Borramos video
  const handletrashVideo = () => {
    setIsStoreVideo(false);
    setStoreVideo("");
  };

  // Pulsamos un Imagen entre los elegidos
  const handleImagenPress = (item) => {
    setSelectedImagen(item);
  };

  // elegimos un Imagen
  const handleGuardarImagen = () => {
    setStoreImagen(selectedImagen);
    setIsStoreIma(true);
  };

  // Borramos Imagen
  const handletrashImagen = () => {
    setIsStoreIma(false);
    setStoreImagen("");
  };

  // Pulsamos un Audio entre los elegidos
  const handleAudioPress = (item) => {
    setSelectedAudio(item);
  };

  // elegimos un Audio
  const handleGuardarAudio = () => {
    setStoreAudio(selectedAudio);
    setIsStoreAudio(true);
  };

  // Borramos Audio
  const handletrashAudio = () => {
    setIsStoreAudio(false);
    setStoreAudio("");
  };

  // guardamos un Texto
  const handleGuardarTexto = () => {
    setIsStoreTexto(true);
    setStoreTexto(selectedTexto);
    setSelectedTexto("");
  };

  // Borramos Texto
  const handletrashTexto = () => {
    setIsStoreTexto(false);
    setStoreTexto("");
  };

  const guardarDatos = () => {
    navigation.navigate("verPasosActividad", {
      nombre: nombrePaso,
      texto: storeTexto,
      imagen: storeImagen,
      pictograma: storePictograma,
      video: storeVideo,
      audio: storeAudio,
    });
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
          if (
            nombrePaso !== "" &&
            (storeAudio !== "" ||
              storeImagen !== "" ||
              storePictograma !== "" ||
              storeTexto !== "" ||
              storeVideo !== "")
          ) {
            guardarDatos();
          } else {
            Swal.fire({
              title: "Campo Incorrectos",
              text: "Verifica que has puesto nombre al paso y que se haya elegido algún item.",
              icon: "warning",
              confirmButtonText: "De acuerdo",
            });
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
                nombrePaso !== "" &&
                (storeAudio !== "" ||
                  storeImagen !== "" ||
                  storePictograma !== "" ||
                  storeTexto !== "" ||
                  storeVideo !== "")
              ) {
                guardarDatos();
              } else {
                Alert.alert(
                  "Campo Incorrectos",
                  "Verifica que has puesto nombre al paso y que se haya elegido algún item."[
                    { text: "De acuerdo" }
                  ]
                );
              }
            },
          },
        ],
        { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.separador} />
        <View style={styles.separador} />

        <View style={[{ flexDirection: "row" }]}>
          <Text style={[styles.title]}>Paso de Actividad</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("tareaActividad")}
          >
            <Image
              source={require("../../Imagenes/CrearTarea/Flecha_atras.png")}
              style={[styles.Image, { marginLeft: 40 }]}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.separador} />

        <Text style={[styles.text]}>Nombre Paso</Text>

        <View style={styles.separador} />

        <TextInput
          style={[styles.input]}
          placeholder="Elija Nombre"
          value={nombrePaso}
          onChangeText={setNombrePaso}
        />

        <View style={styles.separador} />

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.addButtonAñadirPaso}
            onPress={handleAnadirTexto}
          >
            <Text style={styles.addButtonAñadirPasoText}>Texto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButtonAñadirPaso}
            onPress={handleAnadirPicto}
          >
            <Text style={styles.addButtonAñadirPasoText}>Pictograma</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButtonAñadirPaso}
            onPress={handleAnadirVideo}
          >
            <Text style={styles.addButtonAñadirPasoText}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButtonAñadirPaso}
            onPress={handleAnadirImagen}
          >
            <Text style={styles.addButtonAñadirPasoText}>Imagen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButtonAñadirPaso}
            onPress={handleAnadirAudio}
          >
            <Text style={styles.addButtonAñadirPasoText}>Audio</Text>
          </TouchableOpacity>
        </View>

        {!showAddStepAddText &&
          !showAddStepAddPict &&
          !showAddStepAddVideo &&
          !showAddStepAddImage &&
          !showAddStepAddAudio && (
            <View style={styles.rectangleTexto}>
              <Text style={[{ alignItems: "center" }]}>
                Elija que item añadir{" "}
              </Text>
            </View>
          )}

        {showAddStepAddText && (
          <View>
            <View style={styles.rectangleTexto}>
              <TextInput
                multiline
                textAlignVertical="top"
                style={styles.inputTexto}
                placeholder="Escribe aquí..."
                onChangeText={(text) => setSelectedTexto(text)}
                value={selectedTexto}
              />
            </View>

            <TouchableOpacity
              style={styles.addButtonGuardarItem}
              onPress={() => handleGuardarTexto()}
            >
              <Text style={styles.addButtonGuardarItemText}>Guardar Texto</Text>
            </TouchableOpacity>
          </View>
        )}

        {showAddStepAddPict && (
          <View>
            <View style={styles.rectangleOthers}>
              {isLoadingPicto ? (
                <Text>Cargando_Pictogramas... </Text>
              ) : (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}
                >
                  {dataPicto.map((picto, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handlePictoPress(picto)}
                    >
                      <Image
                        key={index}
                        source={{ uri: picto.uri }}
                        style={styles.image}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            <TouchableOpacity
              style={styles.addButtonGuardarItem}
              onPress={() => handleGuardarPictograma()}
            >
              <Text style={styles.addButtonGuardarItemText}>
                Guardar Pictograma
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {showAddStepAddVideo && (
          <View>
            <View style={styles.rectangleOthers}>
              {isLoadingVideo ? (
                <Text>Cargando_Videos... </Text>
              ) : (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}
                >
                  {dataVideo.map((video, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleVideoPress(video)}
                    >
                      <Text style={styles.videos}>{video.nombre}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            <TouchableOpacity
              style={styles.addButtonGuardarItem}
              onPress={() => handleGuardarVideo()}
            >
              <Text style={styles.addButtonGuardarItemText}>Guardar Video</Text>
            </TouchableOpacity>
          </View>
        )}

        {showAddStepAddImage && (
          <View>
            <View style={styles.rectangleOthers}>
              {isLoadingIma ? (
                <Text>Cargando_Imagenes... </Text>
              ) : (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}
                >
                  {dataImagen.map((imagen, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleImagenPress(imagen)}
                    >
                      <Image
                        key={index}
                        source={{ uri: imagen.uri }}
                        style={styles.image}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            <TouchableOpacity
              style={styles.addButtonGuardarItem}
              onPress={() => handleGuardarImagen()}
            >
              <Text style={styles.addButtonGuardarItemText}>
                Guardar Imagen
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {showAddStepAddAudio && (
          <View>
            <View style={styles.rectangleOthers}>
              {isLoadingAudio ? (
                <Text>Cargando_Videos... </Text>
              ) : (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}
                >
                  {dataAudio.map((audio, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleAudioPress(audio)}
                    >
                      <Text style={styles.videos}>{audio.nombre}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            <TouchableOpacity
              style={styles.addButtonGuardarItem}
              onPress={() => handleGuardarAudio()}
            >
              <Text style={styles.addButtonGuardarItemText}>Guardar Audio</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={[styles.row, { marginBottom: 12 }]}>
          <Text style={styles.textItemAnadido}>Texto_Añadido </Text>
          <TouchableOpacity
            style={styles.imageTrashWrapper}
            onPress={() => handletrashTexto()}
          >
            <Image
              source={require("../../Imagenes/CrearTarea/iconoBasura.png")}
              style={styles.imageTrash}
            ></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.rectangleChoose}>
          {isStoreTexto ? (
            <TextInput
              multiline
              textAlignVertical="top"
              style={styles.textoChoose}
              placeholder={storeTexto}
              editable={false}
            />
          ) : (
            <Text>Ninguno </Text>
          )}
        </View>

        <View style={[styles.row, { marginBottom: 12 }]}>
          <Text style={styles.textItemAnadido}>Pictograma_Añadido </Text>
          <TouchableOpacity
            style={styles.imageTrashWrapper}
            onPress={() => handletrashPicto()}
          >
            <Image
              source={require("../../Imagenes/CrearTarea/iconoBasura.png")}
              style={styles.imageTrash}
            ></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.rectangleChoose}>
          {isStorePicto ? (
            <Image source={{ uri: storePictograma.uri }} style={styles.image} />
          ) : (
            <Text>Ninguno </Text>
          )}
        </View>

        <View style={[styles.row, { marginBottom: 12 }]}>
          <Text style={styles.textItemAnadido}>Video_Añadido </Text>
          <TouchableOpacity
            style={styles.imageTrashWrapper}
            onPress={() => handletrashVideo()}
          >
            <Image
              source={require("../../Imagenes/CrearTarea/iconoBasura.png")}
              style={styles.imageTrash}
            ></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.rectangleChoose}>
          {isStoreVideo ? (
            <Text style={styles.videos}>{storeVideo.nombre} </Text>
          ) : (
            <Text>Ninguno </Text>
          )}
        </View>

        <View style={[styles.row, { marginBottom: 12 }]}>
          <Text style={styles.textItemAnadido}>Imagen_Añadido </Text>
          <TouchableOpacity
            style={styles.imageTrashWrapper}
            onPress={() => handletrashImagen()}
          >
            <Image
              source={require("../../Imagenes/CrearTarea/iconoBasura.png")}
              style={styles.imageTrash}
            ></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.rectangleChoose}>
          {isStoreIma ? (
            <Image source={{ uri: storeImagen.uri }} style={styles.image} />
          ) : (
            <Text>Ninguno </Text>
          )}
        </View>

        <View style={[styles.row, { marginBottom: 12 }]}>
          <Text style={styles.textItemAnadido}>Audio_Añadido </Text>
          <TouchableOpacity
            style={styles.imageTrashWrapper}
            onPress={() => handletrashAudio()}
          >
            <Image
              source={require("../../Imagenes/CrearTarea/iconoBasura.png")}
              style={styles.imageTrash}
            ></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.rectangleChoose}>
          {isStoreAudio ? (
            <Text style={styles.videos}>{storeAudio.nombre} </Text>
          ) : (
            <Text>Ninguno </Text>
          )}
        </View>

        <View style={styles.separador}></View>

        <View style={[styles.addButtonGuardar]}>
          <Button
            title="Guardar"
            onPress={() => showAlertStore()}
            style={styles.addButtonText}
          />
        </View>

        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
        <View style={styles.separador}></View>
      </ScrollView>
    </View>
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
  },
  inputTexto: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    marginBottom: 10,
    width: 220,
    height: 60,
    fontSize: 12,
    maxHeight: 200,
    padding: 10,
  },
  textoChoose: {
    width: 180,
    height: 50,
    fontSize: 12,
    maxHeight: 200,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 15,
  },
  textItemAnadido: {
    position: "relative",
    left: 0,
    fontSize: 15,
  },
  addButton: {
    backgroundColor: "#808080",
    padding: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  addButtonGuardar: {
    alignItems: "center",
    borderRadius: 4,
    width: Platform.OS === "web" ? 80 : 90,
    position: "absolute",
    left: 150,
    top: 800,
  },
  addButtonAñadirPaso: {
    backgroundColor: "#808080",
    padding: 5,
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1, // Grosor del borde
  },
  addButtonAñadirPasoText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
  },
  addButtonGuardarItem: {
    padding: 2,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "blue",
    transform: [{ translateY: -31 }, { translateX: 150 }],
    height: 15,
    width: 100,
  },
  addButtonGuardarItemText: {
    color: "white",
    fontSize: 9,
  },
  rectangleTexto: {
    width: Platform.OS === "web" ? 265 : 278,
    height: 110, // Altura del rectángulo
    backgroundColor: "white", // Color de fondo del rectángulo
    justifyContent: "center", // Centra el texto verticalmente
    alignItems: "center", // Centra el texto horizontalmente
    borderWidth: 1, // Grosor del borde
    marginBottom: 10,
    transform: [{ translateY: -4 }],
  },
  rectangleOthers: {
    width: Platform.OS === "web" ? 265 : 278, // Ancho del rectángulo
    height: 110, // Altura del rectángulo
    backgroundColor: "white", // Color de fondo del rectángulo
    justifyContent: "space-around", // Centra el texto verticalmente
    alignItems: "center", // Centra el texto horizontalmente
    borderWidth: 1, // Grosor del borde
    marginBottom: 10,
    transform: [{ translateY: -4 }],
    flexDirection: "row",
  },
  rectangleChoose: {
    width: 190, // Ancho del rectángulo
    height: 60, // Altura del rectángulo
    backgroundColor: "white", // Color de fondo del rectángulo
    justifyContent: "center", // Centra el texto verticalmente
    alignItems: "center", // Centra el texto horizontalmente
    borderWidth: 1, // Grosor del borde
    marginBottom: 10,
    transform: [{ translateY: -4 }, { translateX: 25 }],
  },
  image: {
    width: 50, // Ancho de la imagen
    height: 50, // Altura de la imagen
    resizeMode: "contain", // Asegura que escale
    marginHorizontal: 10,
  },
  imageTrash: {
    width: 20, // Ancho de la imagen
    height: 20, // Altura de la imagen
  },
  imageTrashWrapper: {
    position: "absolute",
    left: 200,
  },
  videos: {
    height: 50, // Altura de la imagen
    resizeMode: "contain", // Asegura que escale
    marginHorizontal: 20,
  },
  separador: {
    height: 10,
  },
  Image: {
    width: 20,
    height: 20,
  },
});
