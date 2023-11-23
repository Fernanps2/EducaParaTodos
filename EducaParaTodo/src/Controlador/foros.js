import {getForos, getForosNombre, addForo, updateForo} from '../Modelo/firebase'

export function aniadeForo(nombre) {
    if (nombre != '')
        addForo(nombre)
}

export function buscaForo({nombre=''}) {
    let {nombre, apellidos} = {nombre, apellidos};
    let foros = null;

    if (nombre != '')
        foros = getForosNombre(nombre);
    else
        foros = getForos();

    return foros;
}

export function actualizaProfesor(id, {nombre=''}) {
    let datos = {nombre};

    updateProfesor(id, datos);
}