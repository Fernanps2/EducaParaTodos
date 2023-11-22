import {getAdministradores, getAdministradoresApellidos, getAdministradoresNombre, addAdministrador, updateAdministrador} from '../Modelo/firebase'

export function aniadeAdministrador(nombre, apellidos, password, foto) {
    if (nombre != '' || apellidos != '' || password != '' || foto != '') {
        addAdministrador(nombre, apellidos, password, foto)
        return true;
    } else
        return false;
}

export function buscaAdministrador({nombre='', apellidos=''}) {
    let {nombre, apellidos} = {nombre, apellidos};
    let administradores = null;

    if (nombre != '')
        administradores = getAdministradoresNombre(nombre);
    else if (apellidos != '')
        administradores = getAdministradoresApellidos(apellidos);
    else
        administradores = getAdministradores();

    return administradores;
}

export function actualizaAdministrador(id, {nombre='', apellidos='', password='', foto=''}) {
    let datos = {nombre, apellidos, password, foto};

    updateAdministrador(id, datos);
}