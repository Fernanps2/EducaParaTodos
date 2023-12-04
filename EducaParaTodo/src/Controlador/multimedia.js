import { almacenarImagen, almacenarPictograma, almacenarVideo, descargarImagen, descargarPictograma, descargarVideo } from "../Modelo/firebase";
// import { PermissionsAndroid } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export async function almacenaImagen(imagen) {
    if (imagen != '')
        almacenarImagen(imagen);
}

export async function almacenaPictograma(imagen) {
    if (imagen != '')
        almacenarPictograma(imagen);
}

export async function almacenaVideo(video) {
    if (video != '')
        almacenarVideo(video);
}

export async function descargaImagen(imagen) {
    let imagenCargada = null;

    if (imagen != '')
        imagenCargada = await descargarImagen(imagen);

    return imagenCargada;
}

export async function descargaPictograma(imagen) {
    let imagenCargada = null;

    if (imagen != '')
        imagenCargada = await descargarPictograma(imagen);

    return imagenCargada;
}

export async function descargaVideo(video) {
    let videoCargada = null;

    if (video != '')
        videoCargada = await descargarVideo(video);

    return videoCargada;
}

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
        almacenaImagen(imageUri);
        return imageUri;
    }

    return null;
}