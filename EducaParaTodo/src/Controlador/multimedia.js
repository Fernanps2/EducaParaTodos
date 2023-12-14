import { almacenarImagen, almacenarPictograma, almacenarVideo, almacenarFotoPersona, almacenarImagenLogin} from "../Modelo/firebase";
import { descargarImagen, descargarPictograma, descargarVideo, descargarEmoticono, descargarFotoPersona, descargarImagenLogin } from "../Modelo/firebase";
import { descargarImagenes, descargarPictogramas, descargarVideos, descargarEmoticonos, descargarFotosPersonas, descargarImagenesLogin } from "../Modelo/firebase";
import { eliminarImagen, eliminarPictograma, eliminarVideo, eliminarFotoPersona, eliminarImagenLogin } from "../Modelo/firebase";
// import { PermissionsAndroid } from "react-native";
import * as ImagePicker from 'expo-image-picker';

/**
 * @name almacenaImagen
 * 
 * @description Almacena una imagen en la base de datos
 * 
 * @param {string} imagen uri de la imagen a subir
 * @param {string} nombre nombre de la imagen a subir
 * 
 * @warning Si el nombre es idéntico a otro de la base de datos saltará una alerta
 */
export async function almacenaImagen(imagen, nombre) {
    if (imagen != '' && nombre != '')
        almacenarImagen(imagen, nombre);
    else 
        if (Platform.OS === "web") {
            Swal.fire({
            title: "ERROR",
            text: "No puede subirse un archivo vacío o sin nombre",
            icon: "warning",
            confirmButtonText: "De acuerdo",
            });
        } else {
            Alert.alert('Mensaje importante,', 'No puede subirse un archivo vacío o sin nombre');
        }
}

/**
 * @name almacenaPictograma
 * 
 * @description Almacena un pictograma en la base de datos
 * 
 * @param {string} imagen uri del pictograma a subir
 * @param {string} nombre nombre del pictograma
 * 
 * @warning Si el nombre es idéntico a otro de la base de datos saltará una alerta
 */
export async function almacenaPictograma(imagen, nombre) {
    if (imagen != '' && nombre != '')
        almacenarPictograma(imagen, nombre);
    else 
        if (Platform.OS === "web") {
            Swal.fire({
            title: "ERROR",
            text: "No puede subirse un archivo vacío o sin nombre",
            icon: "warning",
            confirmButtonText: "De acuerdo",
            });
        } else {
            Alert.alert('Mensaje importante,', 'No puede subirse un archivo vacío o sin nombre');
        }
}

/**
 * @name almacenaVideo
 * 
 * @description Almacena un vídeo en la base de datos
 * 
 * @param {string} video uri del vídeo a subir
 * @param {string} nombre nombre del vídeo
 * 
 * @warning Si el nombre es idéntico a otro de la base de datos saltará una alerta
 */
export async function almacenaVideo(video, nombre) {
    if (video != '' && nombre != '')
        almacenarVideo(video, nombre);
    else
        if (Platform.OS === "web") {
            Swal.fire({
            title: "ERROR",
            text: "No puede subirse un archivo vacío o sin nombre",
            icon: "warning",
            confirmButtonText: "De acuerdo",
            });
        } else {
            Alert.alert('Mensaje importante,', 'No puede subirse un archivo vacío o sin nombre');
        }
}

/**
 * @name almacenaFotoPersona
 * 
 * @description Almacena la foto de una persona en la base de datos
 * 
 * @param {string} foto uri de la foto a subir
 * @param {string} nombre nombre de la foto (opcional)
 * 
 * @warning Si el nombre es idéntico a otro de la base de datos saltará una alerta
 */
export async function almacenaFotoPersona(foto, nombre) {
    if (foto != '')
        almacenarFotoPersona(foto, nombre);
    else {
        if (Platform.OS === "web") {
            Swal.fire({
            title: "ERROR",
            text: "No puede subirse un archivo vacío",
            icon: "warning",
            confirmButtonText: "De acuerdo",
            });
        } else {
            Alert.alert('Mensaje importante,', 'No puede subirse un archivo vacío');
        }
    }
}

/**
 * @name almacenaImagenLogin
 * 
 * @description Almacena una imagen para un login en la base de datos
 * 
 * @param {string} imagen uri de la imagen a subir
 * @param {string} nombre nombre de la imagen
 * 
 * @warning Si el nombre es idéntico a otro de la base de datos saltará una alerta
 */
export async function almacenaImagenLogin(imagen, nombre) {
    if (imagen != '' && nombre != '')
        almacenarImagenLogin(imagen, nombre);
    else {
        if (Platform.OS === "web") {
            Swal.fire({
            title: "ERROR",
            text: "No puede subirse un archivo vacío o sin nombre",
            icon: "warning",
            confirmButtonText: "De acuerdo",
            });
        } else {
            Alert.alert('Mensaje importante,', 'No puede subirse un archivo vacío o sin nombre');
        }
    }
}

/**
 * @name descargaImagen
 * 
 * @description Accede a la base de datos y descarga la imagen por el nombre dado
 * 
 * @param {string} imagen nombre de la imagen a buscar
 * 
 * @returns array con etiqueta (JSON): 
 *                          "uri": url del archivo
 *                          "nombre": nombre del archivo
 */
export async function descargaImagen(imagen) {
    let imagenCargada = null;

    if (imagen != '') {
        imagenCargada = await descargarImagen(imagen);
        console.log(imagenCargada);
    }

    return imagenCargada;
}

/**
 * @name descargaImagenes
 * 
 * @description Accede a la base de datos y descarga todos las imagenes de la carpeta
 * 
 * @returns array de arrays con etiqueta (JSON): 
 *                          "uri": url del archivo
 *                          "nombre": nombre del archivo
 */
export async function descargaImagenes() {
    const array = await descargarImagenes();

    return array;
}

/**
 * @name descargaPictograma
 * 
 * @description Accede a la base de datos y descarga el pictograma con nombre dado
 * 
 * @param {string} imagen nombre del pictograma a buscar
 * 
 * @returns array con etiqueta (JSON): 
 *                          "uri": url del archivo
 *                          "nombre": nombre del archivo
 */
export async function descargaPictograma(imagen) {
    let imagenCargada = null;

    if (imagen != '')
        imagenCargada = await descargarPictograma(imagen);

    return imagenCargada;
}

/**
 * @name descargaPictogramas
 * 
 * @description Accede a la base de datos y descarga todos los pictogramas de la carpeta
 * 
 * @returns array de arrays con etiqueta (JSON): 
 *                          "uri": url del archivo
 *                          "nombre": nombre del archivo
 */
export async function descargaPictogramas() {
    const array = await descargarPictogramas();

    return array;
}

/**
 * @name descargaVideo
 * 
 * @description Accede a la base de datos y descarga el vídeo con el nombre dado
 * 
 * @param {string} video nombre del vídeo a buscar
 * 
 * @returns array con etiqueta (JSON): 
 *                          "uri": url del archivo
 *                          "nombre": nombre del archivo
 */
export async function descargaVideo(video) {
    let videoCargada = null;

    if (video != '')
        videoCargada = await descargarVideo(video);

    return videoCargada;
}

/**
 * @name descargaVideos
 * 
 * @description Accede a la base de datos y descarga todos los vídeos de la carpeta
 * 
 * @returns array de arrays con etiqueta (JSON): 
 *                          "uri": url del archivo
 *                          "nombre": nombre del archivo
 */
export async function descargaVideos() {
    const array = await descargarVideos();

    return array;
}

/**
 * @name descargaEmoticono
 * 
 * @description Accede a la base de datos y descarga el emoticono con el nombre dado
 * 
 * @param {string} emoticono nombre del emoticono a buscar
 * 
 * @returns array con etiqueta (JSON): 
 *                          "uri": url del archivo
 *                          "nombre": nombre del archivo
 */
export async function descargaEmoticono(emoticono) {
    let emoticCargada = null;

    if (emoticono != '')
        emoticCargada = await descargarEmoticono(emoticono);

    return emoticCargada;
}

/**
 * @name descargaEmoticonos
 * 
 * @description Accede a la base de datos y descarga todos los emoticonos de la carpeta
 * 
 * @returns array de arrays con etiqueta (JSON): 
 *                          "uri": url del archivo
 *                          "nombre": nombre del archivo
 */
export async function descargaEmoticonos() {
    const array = await descargarEmoticonos();

    return array;
}

/**
 * @name descargaFotoPersona
 * 
 * @description Accede a la base de datos y descarga la foto dada por el nombre
 * 
 * @param {string} foto nombre de la foto a buscar
 * 
 * @returns array con etiqueta (JSON): 
 *                          "uri": url del archivo
 *                          "nombre": nombre del archivo
 */
export async function descargaFotoPersona(foto) {
    let fotoCargada = null;

    if (foto != '')
        fotoCargada = await descargarFotoPersona(foto);

    return fotoCargada;
}

/**
 * @name descargaFotosPersonas
 * 
 * @description Accede a la base de datos y descarga todas las fotos de la carpeta
 * @returns array de arrays con etiqueta (JSON): 
 *                          "uri": url del archivo
 *                          "nombre": nombre del archivo
 */
export async function descargaFotosPersonas() {
    const array = await descargarFotosPersonas();

    return array;
}

/**
 * @name descargaImagenLogin
 * 
 * @description Accede a la base de datos y descarga la imagen por el nombre dado
 * 
 * @param {string} imagen nombre de la imagen para login a buscar
 * 
 * @returns array con etiqueta (JSON): 
 *                          "uri": url del archivo
 *                          "nombre": nombre del archivo
 */
export async function descargaImagenLogin(imagen) {
    let imagenCargada = null;

    if (imagen != '')
        imagenCargada = await descargarImagenLogin(imagen);

    return imagenCargada;
}

/**
 * @name descargaImagenesLogin
 * 
 * @description Accede a la base de datos y descarga todas las imágenes de la carpeta
 * 
 * @returns array de arrays con etiqueta (JSON): 
 *                          "uri": url del archivo
 *                          "nombre": nombre del archivo
 */
export async function descargaImagenesLogin() {
    const array = await descargarImagenesLogin();

    return array;
}

/**
 * @name eliminaImagen
 * 
 * @description Borra la imagen con el nombre del archivo
 * 
 * @param {string} nombreArchivo El nombre del archivo a eliminar
 */
export async function eliminaImagen(nombreArchivo) {
    if (nombreArchivo != null && nombreArchivo != '') {
        await eliminarImagen(nombreArchivo);
    }
}

/**
 * @name eliminaVideo  
 * 
 * @description Borra el video con el nombre del archivo
 * 
 * @param {string} nombreArchivo El nombre del archivo a eliminar
 */
export async function eliminaVideo(nombreArchivo) {
    if (nombreArchivo != null && nombreArchivo != '') {
        await eliminarVideo(nombreArchivo);
    }
}

/**
 * @name eliminaPictograma
 * 
 * @description Borra el pictograma con el nombre del archivo
 * 
 * @param {string} nombreArchivo El nombre del archivo a eliminar
 */
export async function eliminaPictograma(nombreArchivo) {
    if (nombreArchivo != null && nombreArchivo != '') {
        await eliminarPictograma(nombreArchivo);
    }
}

/**
 * @name eliminaFotoPersona
 * 
 * @description Borra la foto con el nombre del archivo
 * 
 * @param {string} nombreArchivo El nombre del archivo a eliminar
 */
export async function eliminaFotoPersona(nombreArchivo) {
    if (nombreArchivo != null && nombreArchivo != '') {
        await eliminarFotoPersona(nombreArchivo);
    }
}

/**
 * @name eliminaImagenLogin
 * 
 * @description Borra la imagen para el login con el nombre del archivo
 * 
 * @param {string} nombreArchivo El nombre del archivo a eliminar
 */
export async function eliminaImagenLogin(nombreArchivo) {
    if (nombreArchivo != null && nombreArchivo != '') {
        await eliminarImagenLogin(nombreArchivo);
    }
}

/**
 * @name openGallery
 * 
 * @description Abre la galería del dispositivo y selecciona una imagen
 * 
 * @returns {string} El uri de la imagen, si se cancela devuelve @null
 */
export const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        //console.log(imageUri);
        //almacenaImagen(imageUri);
        return imageUri;
    }

    return null;
}