import {getAlumnosLogin, getAlumnos, getAlumnosApellidos, getAlumnosNombre, getAlumnosVisualizacionPredefinida, updateAlumno, addAlumno, deleteAlumno, getAlumnoId, getAlumnoIdPorNombre,getVisualizacionesPreferentesAlumno} from '../Modelo/firebase'
import { almacenaImagen } from './multimedia';

/**
 * @name aniadeAlumno
 * 
 * @description Añade un alumno a la base de datos 
 * 
 * @param {String} nombre Nombre del alumno
 * @param {String} apellidos Apellidos del alumno
 * @param {String} password Contraseña del alumno
 * @param {String} foto Nombre de la foto del alumno
 * @param {String[]} visualizacion Array de visualizaciones disponibles del alumno
 * @param {String} tipoLogin Tipo de login para el alumno
 * 
 * @return @true si se ha añadido, @false si no
 */
export async function aniadeAlumno(nombre, apellidos, password, foto, visualizacion, tipoLogin) {
    if (nombre != '' && apellidos != '' && password != '' && visualizacion != null && tipoLogin != '') {
        //let id_imagen = almacenaImagen(foto);
        await addAlumno(nombre, apellidos, password, foto, visualizacion, tipoLogin);
        return true;
    } else
        return false;
}

/**
 * @name buscaAlumno
 * 
 * @description Descarga de la base de datos los datos de los alumnos
 * 
 * @returns Un array de arrays etiquetados de la forma:
 *                  - id : String
 *                  - nombre : String
 *                  - apellidos : String
 *                  - visualizacionPreferente : String[]
 *                  - foto : String
 *                  - tipoLogin : String
 */
export async function buscaAlumno() {
    let alumnos = null;

    alumnos = await getAlumnos();

    //console.log(alumnos);
    return alumnos;
}

/**
 * @name buscaAlumnoNombre
 * 
 * @description Descarga los alumnos de la base de datos que tenga el nombre dado
 * 
 * @param {String} nombre Nombre del alumno
 * @returns Un array de arrays etiquetados de la forma:
 *                  - id : String
 *                  - nombre : String
 *                  - apellidos : String
 *                  - visualizacionPreferente : String[]
 *                  - foto : String
 *                  - tipoLogin : String
 */
export async function buscaAlumnoNombre(nombre) {
    let alumnos = null;

    if (nombre != null)
        alumnos = await getAlumnosNombre(nombre);

    return alumnos;
}

/**
 * @name buscaAlumnoApellidos
 * 
 * @description Descarga los alumnos de la base de datos que tengan los apellidos dados
 * 
 * @param {String} apellidos Apellidos del alumno
 * 
 * @returns Un array de arrays etiquetados de la forma:
 *                  - id : String
 *                  - nombre : String
 *                  - apellidos : String
 *                  - visualizacionPreferente : String[]
 *                  - foto : String
 *                  - tipoLogin : String
 */
export async function buscaAlumnoApellidos(apellidos) {
    let alumnos = null;

    if (apellidos != null)
        alumnos = await getAlumnosApellidos(apellidos);

    return alumnos;
}

/**
 * @name buscaAlumnoVisualizacionPredefinida
 * 
 * @description Busca a los alumnos que contengan las visualizaciones dadas
 * 
 * @param {String[]} visualizacion La visualización del alumno
 * 
 * @returns Un array de arrays etiquetados de la forma:
 *                  - id : String
 *                  - nombre : String
 *                  - apellidos : String
 *                  - visualizacionPreferente : String[]
 *                  - foto : String
 *                  - tipoLogin : String
 */
export async function buscaAlumnoVisualizacionPredefinida(visualizacion) {
    let alumnos = null;

    if (visualizacion != null)
        alumnos = await getAlumnosVisualizacionPredefinida(visualizacion);

    return alumnos;
}

/**
 * @name buscaVisualizacionesPreferentesAlumno
 *
 * @description Consulta los tipos de visualización del alumno
 *
 * @param {string} alumniId ID del alumno a consultar sus tipos de visualización
 *
 * @returns array de los tipos de visualización del alumno
 */
export async function buscaVisualizacionesPreferentesAlumno(alumnoId) {
    let visualizacionesPreferentes = null;
  
    visualizacionesPreferentes = await getVisualizacionesPreferentesAlumno(alumnoId);
  
    return visualizacionesPreferentes;
  }

/**
 * @name loginAlumno
 * 
 * @description Busca al alumno identificado por su nombre y contraseña
 * 
 * @param {String} nombre Nombre del alumno
 * @param {String} password Contraseña del alumno
 * 
 * @returns identificador del alumno
 */
export async function loginAlumno (nombre, password) {
    let id = null;

    if (nombre != '' && password != '') {
        let alumno = await getAlumnosLogin(nombre, password);
        if (alumno.length>0) id = alumno[0].id;
    }

    return id;
}

/**
 * @name obtenerIdAlumnoPorNombre
 *
 * @description Obtiene el ID del alumno de la base de datos a partir de su nombre
 *
 * @param {string} nombre Nombre del alumno a buscar
 *
 * @returns ID del alumno
 */
export async function obtenerIdAlumnoPorNombre(nombre) {
    try {
      const idAlumno = await getAlumnoIdPorNombre(nombre);
      return idAlumno;
    } catch (error) {
      console.error('Error al obtener ID del alumno por nombre:', error);
      throw error;
    }
  }

/**
 * @name buscaAlumnoId
 * 
 * @description Busca al alumno con el identificador dado
 * 
 * @param {String} id Identificador del alumno
 * 
 * @returns Un array etiquetado de la forma:
 *                  - id : String
 *                  - nombre : String
 *                  - apellidos : String
 *                  - visualizacionPreferente : String[]
 *                  - foto : String
 *                  - tipoLogin : String
 */
export async function buscaAlumnoId (id) {
    let instancia = null;

    if (id != null)
        instancia = await getAlumnoId(id);

    return instancia;
}

/**
 * @name actualizaAlumno
 * 
 * @description Actualiza los datos del alumno identificado con id
 * 
 * @param {String} id Identificador del alumno
 * @param {String} nombre Nombre a cambiar del alumno
 * @param {String} apellidos Apellidos a cambiar del alumno
 * @param {String} foto Nombre de la foto a cambiar del alumno
 * @param {String[]} visualizacion Vector de visualizaciones a cambiar del alumno
 * @param {String} tipoLogin Tipo del login a cambiar del alumno
 */
export async function actualizaAlumno(id, nombre, apellidos, foto, visualizacion, tipoLogin) {
    if (nombre != '' && apellidos != '' && visualizacion != null) 
        await updateAlumno(id, nombre, apellidos, foto, visualizacion, tipoLogin);
}

/**
 * @name borraAlumno
 * 
 * @description Borra al alumno identificado de la base de datos
 * 
 * @param {String} id Identificador del alumno
 */
export async function borraAlumno(id) {
    await deleteAlumno(id);
}