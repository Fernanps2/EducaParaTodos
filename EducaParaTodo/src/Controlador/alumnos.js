import {getAlumnosLogin, getAlumnos, getAlumnosApellidos, getAlumnosNombre, getAlumnosVisualizacionPredefinida, updateAlumno, addAlumno, deleteAlumno, getAlumnoId} from '../Modelo/firebase'
import { almacenaImagen } from './multimedia';

export async function aniadeAlumno(nombre, apellidos, password, foto, visualizacion, tipoLogin) {
    if (nombre != '' && apellidos != '' && password != '' && visualizacion != null && tipoLogin != '') {
        //let id_imagen = almacenaImagen(foto);
        await addAlumno(nombre, apellidos, password, foto, visualizacion, tipoLogin);
    }
}

export async function buscaAlumno() {
    let alumnos = null;

    alumnos = await getAlumnos();

    //console.log(alumnos);
    return alumnos;
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
        const alumno = await getAlumnosLogin(nombre, password);
        if (alumno.length>0) id = alumno[0].id;
    }

    return id;
}

export async function buscaAlumnoId (id) {
    let instancia = null;

    if (id != null)
        instancia = await getAlumnoId(id);

    return instancia;
}

export async function actualizaAlumno(id, nombre, apellidos, foto, visualizacion, tipoLogin) {
    if (nombre != '' && apellidos != '' && visualizacion != null) 
        await updateAlumno(id, nombre, apellidos, foto, visualizacion, tipoLogin);
}

export async function borraAlumno(id) {
    await deleteAlumno(id);
}