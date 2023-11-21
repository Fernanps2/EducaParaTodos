import {getProfesores, getProfesoresApellidos, getProfesoresNombre, addProfesor, updateProfesor} from '../Modelo/firebase'

export function aniadeProfesor(nombre, apellidos, password, foto) {
    if (nombre != '' || apellidos != '' || password != '' || foto != '')
        addProfesor(nombre, apellidos, password, foto)
}

export function buscaProfesor({nombre='', apellidos=''}) {
    let {nombre, apellidos} = {nombre, apellidos};
    let profesores = null;

    if (nombre != '')
        profesores = getProfesoresNombre(nombre);
    else if (apellidos != '')
        profesores = getProfesoresApellidos(apellidos);
    else
        profesores = getProfesores();

    return profesores;
}

export function actualizaProfesor(id, {nombre='', apellidos='', password='', foto=''}) {
    let datos = {nombre, apellidos, password, foto};

    updateProfesor(id, datos);
}