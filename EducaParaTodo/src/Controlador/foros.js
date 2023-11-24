import {getForos, getForosNombre, addForo, updateForo, getForoID} from '../Modelo/firebase'

export async function aniadeForo(nombre) {
    if (nombre != '')
        await addForo(nombre)
}

export async function buscaForo() {
    let foros = null;

    foros = await getForos();

    return foros;
}

export async function buscaForoNombre(nombre) {
    let foros = null;

    if (nombre != null) {
        foros = await getForosNombre(nombre);
    }

    return foros;
}

export async function buscaForoId (id) {
    let instancia = null;

    if (id != null)
        instancia = getForoID(id);

    return instancia;
}

export async function actualizaForo(id, nombre) {
    if (nombre != '')
        await updateForo(id, nombre);
}

export async function borraForo(id) {
    await deleteForo(id);
}