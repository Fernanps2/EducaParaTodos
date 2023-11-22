import {getAlumnos, getAlumnosApellidos, getAlumnosNombre, getAlumnosVisualizacionPredefinida, updateAlumno, addAlumno} from '../Modelo/firebase'
import { almacenaImagen } from './multimedia';

export function aniadeAlumno(nombre, apellidos, password, foto, visualizacion) {
    if (nombre != '' || apellidos != '' || password != '' || foto != '' || visualizacion != null) {
        let id_imagen = almacenaImagen(foto);
        addAlumno(nombre, apellidos, password, id_imagen, visualizacion);
    }
}

export function buscaAlumno({nombre='', apellidos='', visualizacion=''}) {
    let {nombre, apellidos, visualizacion} = {nombre, apellidos, visualizacion};
    let alumnos = null;

    if (nombre != '')
        alumnos = getAlumnosNombre(nombre);
    else if (apellidos != '')
        alumnos = getAlumnosApellidos(apellidos);
    else if (visualizacion!='')
        alumnos = getAlumnosVisualizacionPredefinida(visualizacion);
    else
        alumnos = getAlumnos();

    return alumnos;
}

export function actualizaAlumno(id, {nombre='', apellidos='', password='', foto='', visualizacion=''}) {
    let datos = {nombre, apellidos, password, foto, visualizacion};

    updateAlumno(id, datos);
}