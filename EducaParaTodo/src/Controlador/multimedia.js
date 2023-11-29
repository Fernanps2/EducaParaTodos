import { almacenarImagen, cargarImagen } from "../Modelo/firebase";
import { PermissionsAndroid } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export async function almacenaImagen(imagen) {
    if (imagen != '')
        almacenarImagen();
}

export async function cargaImagen(imagen) {
    let imagenCargada = null;

    if (imagen != '')
        imagenCargada = cargarImagen()

    return imagenCargada;
}

export const openGallery = async () => {
    const resultPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

    if (PermissionsAndroid.RESULTS) {
        const resultImagePicker = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (resultImagePicker.canceled === false) {
            const imageUri = resultImagePicker.assets[0].uri;

           // almacenaImagen(imageUri);

            return (imageUri);
        }
    }

    return null;
}