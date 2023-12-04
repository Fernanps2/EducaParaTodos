import {getAdministradoresLogin, getAdministradores, getAdministradoresApellidos, getAdministradoresNombre, addAdministrador, updateAdministrador, deleteAdministrador, getAdministradorID} from '../Modelo/firebase'

export async function aniadeAdministrador(nombre, apellidos, password, foto) {
    if (nombre != '' && apellidos != '' && password != '') {
        await addAdministrador(nombre, apellidos, password, foto)
        return true;
    } else
        return false;
}

export async function buscaAdministrador() {
    let administradores = null;

    administradores = await getAdministradores();

    return administradores;
}

export async function buscaAdministradorNombre(nombre) {
    let administradores = null;

    if (nombre != null)
        administradores = await getAdministradoresNombre(nombre);

    return administradores;
}

export async function buscaAdministradorApellidos(apellidos) {
    let administradores = null;

    if (apellidos != null)
        administradores = await getAdministradoresApellidos(apellidos);

    return administradores;
} 

export async function loginAdministrador (nombre, password) {
    let id = null;

    try {
        if (nombre != '' && password != '') {
            let admin = await getAdministradoresLogin(nombre, password);
            id = admin[0].id;
        }
    } catch (error) {
        console.log(error);
    }

    return id;
}

export async function buscaAdministradorId (id) {
    let instancia = null;

    if (id != null)
        instancia = getAdministradorID(id);

    return instancia;
}

export async function actualizaAdministrador(id, nombre, apellidos, password, foto) {
    if (nombre != '' && apellidos != '' && password != '')
        await updateAdministrador(id, datos);
}

export async function borraAdministrador(id) {
    await deleteAdministrador(id);
}