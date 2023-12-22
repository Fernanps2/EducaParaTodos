import {getForos, getForosNombre, addForo, updateForo, getForoID} from '../Modelo/firebase'

/**
 * @name aniadeForo
 * 
 * @description Añade un foro a la base de datos
 * 
 * @param {String} nombre Nombre del foro
 */
export async function aniadeForo(nombre) {
    if (nombre != '')
        await addForo(nombre)
}

/**
 * @name buscaForo
 * 
 * @description Descarga los datos de los foros de la base de datos
 * 
 * @returns Un array de arrays etiquetados de la forma:
 *                  - id : String
 *                  - nombre : String
 */
export async function buscaForo() {
    let foros = null;

    foros = await getForos();

    return foros;
}

/**
 * @name buscaForoNombre
 * 
 * @description Busca los foros que tienen el nombre dado
 * 
 * @param {String} nombre Nombre del foro
 * 
 * @returns Un array de arrays etiquetados de la forma:
 *                  - id : String
 *                  - nombre : String
 */
export async function buscaForoNombre(nombre) {
    let foros = null;

    if (nombre != null) {
        foros = await getForosNombre(nombre);
    }

    return foros;
}

/**
 * @name buscaForoId
 * 
 * @description Busca el foro identificado
 * 
 * @param {String} id Identificador del foro
 * @returns Un array etiquetado de la forma:
 *                  - id : String
 *                  - nombre : String
 */
export async function buscaForoId (id) {
    let instancia = null;

    if (id != null)
        instancia = getForoID(id);

    return instancia;
}

/**
 * @name actualizaForo
 * 
 * @description Actualiza los datos de un foro identificado con id
 * 
 * @param {String} id Identificador del foro
 * @param {String} nombre Nombre a cambiar del foro
 */
export async function actualizaForo(id, nombre) {
    if (nombre != '')
        await updateForo(id, nombre);
}

/**
 * @name borraForo
 * 
 * @description Borra un foro identificado de la base de datos
 * 
 * @param {String} id Identificador del foro
 */
export async function borraForo(id) {
    await deleteForo(id);
}