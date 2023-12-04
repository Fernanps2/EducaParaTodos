import {getMensajes, getMensajeID, addMensaje, updateMensaje, deleteMensaje} from '../Modelo/firebase'

export async function aniadeMensaje(id_profe, mensaje, aula, fecha, hora) {
    if (id_profe != '' && id_mensaje != '')
        await addMensaje(id_profe, mensaje, aula, fecha, hora);
}

export async function buscaMensaje() {
    let mensajes = null;

    mensajes = await getMensajes();

    return mensajes;
}

export async function buscaMensajeId (id) {
    let instancia = null;

    if (id != null)
        instancia = getMensajeID(id);

    return instancia;
}

export async function actualizaMensaje(id, id_profe, mensaje, aula, fecha, hora) {
    if (id_profe != '')
        await updateMensaje(id, id_profe, mensaje, aula, fecha, hora);
}

export async function borraMensaje(id) {
    await deleteMensaje(id);
}