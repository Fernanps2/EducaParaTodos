import {getProfesoresLogin, getProfesores, getProfesoresApellidos, getProfesoresNombre, addProfesor, updateProfesor, updateProfesorAdmin, deleteProfesor, getProfesorID} from '../Modelo/firebase'

/**
 * @name aniadeProfesor
 * 
 * @description Añade un profesor a la base de datos
 * 
 * @param {String} nombre Nombre del profesor
 * @param {String} apellidos Apellidos del profesor
 * @param {String} password Contraseña del profesor
 * @param {String} foto Nombre de la foto del profesor
 * @param {String} aula Nombre del aula asignada al profesor
 * 
 * @returns @true si se ha añadido, @false en caso contrario
 */
export async function aniadeProfesor(nombre, apellidos, password, foto, aula) {
    if (nombre != '' && apellidos != '' && password != '') {
        await addProfesor(nombre, apellidos, password, foto, aula);
        return true;
    }
    else 
        return false;
}

/**
 * @name buscaProfesor
 * 
 * @description Descarga los datos de todos los profesores de la base de datos
 * 
 * @returns Un array de arrays etiquetados de la forma:
 *                  - id : String
 *                  - nombre : String
 *                  - apellidos : String
 *                  - foto : String
 *                  - aula : String
 */
export async function buscaProfesor() {
    let profesores = null;

    profesores = await getProfesores();

    return profesores;
}

/**
 * @name buscaProfesorNombre
 * 
 * @description Busca a los profesores que tienen el nombre dado
 * 
 * @param {String} nombre Nombre del alumno
 * 
 * @returns Un array de arrays etiquetados de la forma:
 *                  - id : String
 *                  - nombre : String
 *                  - apellidos : String
 *                  - foto : String
 *                  - aula : String
 */
export async function buscaProfesorNombre (nombre) {
    let profesores = null;

    if (nombre != null) {
        console.log('buscando profesores con nombre: ' + nombre);
        profesores = await getProfesoresNombre(nombre);
        console.log('se han encontrado: ' + JSON.stringify(profesores));
    }

    return profesores;
}

/**
 * @name buscaProfesorApellidos
 * 
 * @description Busca a los profesores que tienen los apellidos dados
 * 
 * @param {String} apellidos Apellidos del profesor
 * 
 * @returns Un array de arrays etiquetados de la forma:
 *                  - id : String
 *                  - nombre : String
 *                  - apellidos : String
 *                  - foto : String
 *                  - aula : String
 */
export async function buscaProfesorApellidos (apellidos) {
    let profesores = null;

    if (apellidos != null) {
        profesores = await getProfesoresApellidos(apellidos);
    }

    return profesores;
}

/**
 * @name loginProfesor
 * 
 * @description Busca al profesor que tiene el nombre y contraseña dados
 * 
 * @param {String} nombre Nombre del profesor
 * @param {String} password Contraseña del profesor
 * 
 * @returns Identificador del profesor
 */
export async function loginProfesor (nombre, password) {
    let id = null;

    if (nombre != '' && password != '') {
        const profesor = await getProfesoresLogin(nombre, password);
        if (profesor.length>0) id = profesor[0].id;
    }

    return id;
}

/**
 * @name buscaProfesorId
 * 
 * @description Busca al profesor identificado por id
 * 
 * @param {String} id Identificador del profesor
 * 
 * @returns Un array etiquetado de la forma:
 *                  - id : String
 *                  - nombre : String
 *                  - apellidos : String
 *                  - foto : String
 *                  - aula : String
 */
export async function buscaProfesorId (id) {
    let instancia = null;

    if (id != null){
        instancia = await getProfesorID(id);
        //console.log(instancia);
    }
    return instancia;
}

/**
 * @name actualizaProfesor
 * 
 * @description Actualiza los datos del profesor identificado por id
 * 
 * @param {String} id Identificador del profesor
 * @param {String} nombre Nombre a cambiar del profesor
 * @param {String} apellidos Apellidos a cambiar del profesor
 * @param {String} password Contraseña a cambiar del profesor
 * @param {String} foto Nombre de la foto a cambiar del profesor
 * @param {String} aula Nombre del aula a cambiar del profesor
 */
export async function actualizaProfesor(id, nombre, apellidos, password, foto, aula) {
    if (nombre != '' && apellidos != '' && password != '')
        await updateProfesor(id, nombre, apellidos, password, foto, aula);
}

/**
 * @name actualizaProfesorAdmin
 * 
 * @description Actualiza los datos del profesor identificado por id, salvo la contraseña
 * 
 * @param {String} id Identificador del profesor
 * @param {String} nombre Nombre a cambiar del profesor
 * @param {String} apellidos Apellidos a cambiar del profesor
 * @param {String} foto Nombre de la foto a cambiar del profesor
 * @param {String} aula Nombre del aula a cambiar del profesor
 */
export async function actualizaProfesorAdmin(id, nombre, apellidos, foto, aula) {
    if (nombre != '' && apellidos != '')
        await updateProfesorAdmin(id, nombre, apellidos, foto, aula);
}

/**
 * @name borraProfesor
 * 
 * @description Borra al profesor identificado de la base de datos
 * 
 * @param {String} id Identificador del profesor
 */
export async function borraProfesor(id) {
    await deleteProfesor(id);
}