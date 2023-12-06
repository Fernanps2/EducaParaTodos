import {getProfesoresLogin, getProfesores, getProfesoresApellidos, getProfesoresNombre, addProfesor, updateProfesor, updateProfesorAdmin, deleteProfesor, getProfesorID} from '../Modelo/firebase'

export async function aniadeProfesor(nombre, apellidos, password, foto) {
    if (nombre != '' && apellidos != '' && password != '')
        await addProfesor(nombre, apellidos, password, foto)
}

export async function buscaProfesor() {
    let profesores = null;

    profesores = await getProfesores();

    return profesores;
}

export async function buscaProfesorNombre (nombre) {
    let profesores = null;

    if (nombre != null) {
        console.log('buscando profesores con nombre: ' + nombre);
        profesores = await getProfesoresNombre(nombre);
        console.log('se han encontrado: ' + JSON.stringify(profesores));
    }

    return profesores;
}

export async function buscaProfesorApellidos (apellidos) {
    let profesores = null;

    if (apellidos != null) {
        profesores = await getProfesoresApellidos(apellidos);
    }

    return profesores;
}

export async function loginProfesor (nombre, password) {
    let id = null;

    if (nombre != '' && password != '') {
        id = await getProfesoresLogin(nombre, password).id;
    }

    return id;
}

export async function buscaProfesorId (id) {
    let instancia = null;

    if (id != null)
        instancia = await getProfesorID(id);

    return instancia;
}

export async function actualizaProfesor(id, nombre, apellidos, password, foto) {
    if (nombre != '' && apellidos != '' && password != '')
        await updateProfesor(id, nombre, apellidos, password, foto);
}

export async function actualizaProfesorAdmin(id, nombre, apellidos, foto) {
    if (nombre != '' && apellidos != '')
        await updateProfesorAdmin(id, nombre, apellidos, foto);
}

export async function borraProfesor(id) {
    await deleteProfesor(id);
}