import {getAdministradoresLogin, getAdministradores, getAdministadoresApellidos, getAdministradoresNombre, addAdministrador, updateAdministrador, deleteAdministrador, getAdministradorID} from '../Modelo/firebase'

/**
 * @name aniadeAdministrador
 * 
 * @description Añade un administrados a la base de datos
 * 
 * @param {String} nombre Nombre del administrador
 * @param {String} apellidos Apellidos del administrador
 * @param {String} password Contrasseña del administrador
 * @param {String} foto Nombre de la foto del administrador
 * 
 * @returns @true si el administrador ha sido añadido, @false si no
 */
export async function aniadeAdministrador(nombre, apellidos, password, foto) {
    if (nombre != '' && apellidos != '' && password != '') {
        await addAdministrador(nombre, apellidos, password, foto)
        return true;
    } else
        return false;
}

/**
 * @name buscaAdministrador
 * 
 * @description Descarga de la base de datos todos los administradores
 * 
 * @returns Un array de arrays etiquetados de la forma:
 *                  - id : String
 *                  - nombre : String
 *                  - apellidos : String
 *                  - foto : String
 */
export async function buscaAdministrador() {
    let administradores = null;

    administradores = await getAdministradores();

    return administradores;
}

/**
 * @name buscaAdministradorNombre
 * 
 * @description Descarga de la base de datos los administradores que tienen el nombre dado
 * 
 * @param {String} nombre Nombre del administrador a buscar
 * 
 * @returns Un array de arrays etiquetados de la forma:
 *                  - id : String
 *                  - nombre : String
 *                  - apellidos : String
 *                  - foto : String
 */
export async function buscaAdministradorNombre(nombre) {
    let administrador = null;

    if(nombre != null) {
        console.log('buscando administradores con nombre: ' + nombre);
        const administradores = await getAdministradoresNombre(nombre);
        console.log('se han encontrado: ' + JSON.stringify(administradores));

        if( administradores.length > 0 ){
            // si se encontro al menos un administrador, devolvemos el primero
            administrador = administradores[0];
        }
    }

    return administrador;
}

/**
 * @name buscaAdministradorApellidos
 * 
 * @description Descarga de la base de datos los administradores con apellidos dados
 * 
 * @param {String} apellidos Apellidos de los administradores a buscar
 * 
 * @returns Un array de arrays etiquetados de la forma:
 *                  - id : String
 *                  - nombre : String
 *                  - apellidos : String
 *                  - foto : String
 */
export async function buscaAdministradorApellidos(apellidos) {
    let administradores = null;

    if (apellidos != null)
        administradores = await getAdministadoresApellidos(apellidos);

    return administradores;
} 

/**
 * @name loginAdministrador
 * 
 * @description Función para identificar en un login a un administrador
 * 
 * @param {String} nombre Nombre del administrador
 * @param {String} password Contraseña de la contraseña
 * @returns El id del administrador
 */
export async function loginAdministrador (nombre, password) {
    let id = null;

    try {
        if (nombre != '' && password != '') {
            let admin = await getAdministradoresLogin(nombre, password);
            if (admin.length>0) id = admin[0].id;
        }
    } catch (error) {
        console.log(error);
    }

    return id;
}

/**
 * @name buscaAdministradorId
 * 
 * @description Descarga de la base de datos al administrador identificado
 * 
 * @param {String} id Identificador del administrador
 * 
 * @returns Un array etiquetado de la forma:
 *                  - id : String
 *                  - nombre : String
 *                  - apellidos : String
 *                  - foto : String
 */
export async function buscaAdministradorId (id) {
    let instancia = null;

    if (id != null)
        instancia = await getAdministradorID(id);

    return instancia;
}

/**
 * @name actualizaAdministrador
 * 
 * @description Actualiza los datos del administrador identificado por id
 * 
 * @param {String} id Identificador del administrador
 * @param {String} nombre Nombre del admin para cambiar
 * @param {String} apellidos Apellidos del admin para cambiar
 * @param {String} password Contraseña del admin para cambiar
 * @param {String} foto Foto del admin a cambiar
 */
export async function actualizaAdministrador(id, nombre, apellidos, password/*, foto*/) {
    if (nombre != '' && apellidos != '' && password != '')
        await updateAdministrador(id, nombre, apellidos, password);
}

/**
 * @name borraAdministrador
 * 
 * @description Borra el administrador identificado de la base de datos
 * 
 * @param {String} id Identificador del administrador
 */
export async function borraAdministrador(id) {
    await deleteAdministrador(id);
}