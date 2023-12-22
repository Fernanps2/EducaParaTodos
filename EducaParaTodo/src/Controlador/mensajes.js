import {getMensajes, getMensajeID, addMensaje, updateMensaje, deleteMensaje} from '../Modelo/firebase'

/**
 * @name aniadeMensaje
 * 
 * @description Añade un mensaje a la base de datos
 * 
 * @param {String} id_profe Identificador del profesor
 * @param {String} mensaje Contenido del mensaje
 * @param {String} aula Nombre del aula
 * @param {String} fecha Fecha del mensaje
 * @param {String} hora Hora del mensaje
 */
export async function aniadeMensaje(id_profe, mensaje, aula, fecha, hora) {
    if (id_profe != '' && mensaje != '')
        await addMensaje(id_profe, mensaje, aula, fecha, hora);
}

/**
 * @name buscaMensaje
 * 
 * @description Descarga todos los mensajes de la base de datos
 * 
 * @returns Un array de arrays etiquetados de la forma:
 *                  - id : String
 *                  - id_profe : String
 *                  - mensaje : String
 *                  - aula : String
 *                  - fecha : String
 *                  - hora : String 
 */
export async function buscaMensaje() {
    let mensajes = null;

    mensajes = await getMensajes();

    return mensajes;
}

/**
 * @name buscaMensajeId
 * 
 * @description Busca un mensaje identificado
 * 
 * @param {String} id Identificador del mensaje
 * @returns Un array etiquetado de la forma:
 *                  - id : String
 *                  - id_profe : String
 *                  - mensaje : String
 *                  - aula : String
 *                  - fecha : String
 *                  - hora : String
 */
export async function buscaMensajeId (id) {
    let instancia = null;

    if (id != null)
        instancia = getMensajeID(id);

    return instancia;
}

/**
 * @name actualizaMensaje
 * 
 * @description Actualiza el mensaje identificado por id
 * 
 * @param {String} id Identificador del mensaje
 * @param {String} id_profe Identificador a cambiar del profesor
 * @param {String} mensaje Contenido a cambiar del mensaje
 * @param {String} aula Nombre del aula a cambiar del mensaje
 * @param {String} fecha Fecha a cambiar del mensaje
 * @param {String} hora Hora a cambiar del mensaje
 */
export async function actualizaMensaje(id, id_profe, mensaje, aula, fecha, hora) {
    if (id_profe != '' && mensaje != '')
        await updateMensaje(id, id_profe, mensaje, aula, fecha, hora);
}

/**
 * @name borraMensaje
 * 
 * @description Borra un mensaje de la base de datos
 * 
 * @param {String} id Identificador del mensaje
 */
export async function borraMensaje(id) {
    await deleteMensaje(id);
}