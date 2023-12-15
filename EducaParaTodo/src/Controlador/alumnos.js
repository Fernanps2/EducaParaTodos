import {getAlumnosLogin, getAlumnoIdPorNombre, getAlumnoImagenesLogin, getAlumnos, getVisualizacionesPreferentesAlumno, getAlumnosApellidos, getAlumnosNombre, getAlumnosVisualizacionPredefinida, updateAlumno, addAlumno, deleteAlumno, getAlumnoID} from '../Modelo/firebase'
import { almacenaImagen } from './multimedia';

export async function aniadeAlumno(nombre, apellidos, password, foto, visualizacion) {
    if (nombre != '' && apellidos != '' && password != '' && visualizacion != null) {
        //let id_imagen = almacenaImagen(foto);
        await addAlumno(nombre, apellidos, password, foto, visualizacion);
    }
}

export async function buscaAlumno() {
    let alumnos = null;

    alumnos = await getAlumnos();

    //console.log(alumnos);
    return alumnos;
}

export async function buscaVisualizacionesPreferentesAlumno(alumnoId) {
  let visualizacionesPreferentes = null;

  visualizacionesPreferentes = await getVisualizacionesPreferentesAlumno(alumnoId);

  return visualizacionesPreferentes;
}

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

export async function obtenerImagenesLoginAlumno(idAlumno) {
  try {
    const imagenes = await getAlumnoImagenesLogin(idAlumno);
    return imagenes;
  } catch (error) {
    console.error('Error al obtener imágenes del alumno:', error);
    throw error;
  }
}

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