import {getAlumnosLogin, getAlumnoIdPorNombre, getAlumnoImagenesLogin, getAlumnos, getVisualizacionesPreferentesAlumno, getAlumnosApellidos, getAlumnosNombre, getAlumnosVisualizacionPredefinida, updateAlumno, addAlumno, deleteAlumno, getAlumnoID} from '../Modelo/firebase'
import { almacenaImagen } from './multimedia';

export async function aniadeAlumno(nombre, apellidos, password, foto, visualizacion) {
    if (nombre != '' && apellidos != '' && password != '' && visualizacion != null) {
        //let id_imagen = almacenaImagen(foto);
        await addAlumno(nombre, apellidos, password, foto, visualizacion);
    }
}

/**
 * @name buscaAlumno
 *
 * @description Busca todos los alumnos disponibles
 *
 * @param
 *
 * @returns array de todos los alumnos disponibles
 */
export async function buscaAlumno() {
    let alumnos = null;

    alumnos = await getAlumnos();

    //console.log(alumnos);
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
 * @name buscaAlumnoNombre
 *
 * @description Accede a los alumnos de la base de datos que tengan ese nombre
 *
 * @param {string} nombre Nombre del alumno a devolver
 *
 * @returns array de alumnos con el nombre pasado como argumento
 */
export async function buscaAlumnoNombre(nombre) {
    let alumnos = null;

    if (nombre != null)
        alumnos = await getAlumnosNombre(nombre);

    return alumnos;
}

export async function buscaAlumnoApellidos(apellidos) {
    let alumnos = null;

    if (apellidos != null)
        alumnos = await getAlumnosApellidos(apellidos);

    return alumnos;
}

export async function buscaAlumnoVisualizacionPredefinida(visualizacion) {
    let alumnos = null;

    if (visualizacion != null)
        alumnos = await getAlumnosVisualizacionPredefinida(visualizacion);

    return alumnos;
}

export async function loginAlumno (nombre, password) {
    let id = null;

    if (nombre != '' && password != '') {
        alumno = await getAlumnosLogin(nombre, password);
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

export async function buscaAlumnoId (id) {
    let instancia = null;

    if (id != null)
        instancia = await getAlumnoID(id);

    return instancia;
}

export async function actualizaAlumno(id, nombre, apellidos, foto, visualizacion) {
    if (nombre != '' && apellidos != '' && visualizacion != null) 
        await updateAlumno(id, nombre, apellidos, foto, visualizacion);
}

export async function borraAlumno(id) {
    await deleteAlumno(id);
}