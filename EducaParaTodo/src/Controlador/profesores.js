import {getProfesoresLogin, getProfesores, getProfesorAula, getProfesoresApellidos, getProfesoresNombre, addProfesor, updateProfesor, updateProfesorAdmin, deleteProfesor, getProfesorID} from '../Modelo/firebase'

export async function aniadeProfesor(nombre, apellidos, password, foto, aula) {
    if (nombre != '' && apellidos != '' && password != '')
        await addProfesor(nombre, apellidos, password, foto, aula)
}

export async function buscaProfesor() {
    let profesores = null;

    profesores = await getProfesores();

    return profesores;
}

export async function buscaProfesorAula(aula) {
    let profesores = null;

    profesores = await getProfesorAula(aula);

    return profesores;
}

export async function buscaProfesorNombre (nombre) {
    let profesores = null;

    if (nombre != null) {
        profesores = await getProfesoresNombre(nombre);
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
        const profesor = await getProfesoresLogin(nombre, password);
        if (profesor.length>0) id = profesor[0].id;
    }

    return id;
}

export async function buscaProfesorId (id) {
    let instancia = null;

    if (id != null){
        instancia = await getProfesorID(id);
        //console.log(instancia);
    }
    return instancia;
}

export async function actualizaProfesor(id, nombre, apellidos, password, foto, aula) {
    if (nombre != '' && apellidos != '' && password != '')
        await updateProfesor(id, nombre, apellidos, password, foto, aula);
}

export async function actualizaProfesorAdmin(id, nombre, apellidos, foto, aula) {
    if (nombre != '' && apellidos != '')
        await updateProfesorAdmin(id, nombre, apellidos, foto, aula);
}

export async function borraProfesor(id) {
    await deleteProfesor(id);
}