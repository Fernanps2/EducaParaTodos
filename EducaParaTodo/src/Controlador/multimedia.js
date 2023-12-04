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
        imagenCargada = cargarImagen();

    return imagenCargada;
}

export const openGallery = async () => {
    /*const resultPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

    if (PermissionsAndroid.RESULTS) {
        const resultImagePicker = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3]
        });

        console.log(resultImagePicker);

        if (resultImagePicker.canceled === false) {
            const imageUri = resultImagePicker.assets[0].uri;

            almacenaImagen(imageUri);

            return (imageUri);
        }
    }*/

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
        const imageUri = result.assets[0].uri;

        return imageUri;
    }

    return null;
}