import { almacenarImagen, cargarImagen } from "../Modelo/firebase";

export function almacenaImagen(imagen) {
    if (imagen != '')
        almacenarImagen();
}

export function cargaImagen(imagen) {
    let imagenCargada = null;

    if (imagen != '')
        imagenCargada = cargarImagen()

    return imagenCargada;
}