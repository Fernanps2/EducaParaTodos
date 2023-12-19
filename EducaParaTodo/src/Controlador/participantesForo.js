import { getProfesoresForo, getProfesoresForo_Foro, getProfesoresForo_Profesores, addProfesoresForo, updateProfesoresForo, deleteProfesorForo, deleteAlumnoForo, getAlumnoForoID, getProfesorForoID } from '../Modelo/firebase'
import { getAlumnoForo, getAlumnoForo_Alumno, getAlumnoForo_Foro, addAlumnosForo, updateAlumnosForo } from '../Modelo/firebase';

//FUNCIONES PARA PROFESOR Foro
export async function aniadeProfesorForo(id_profesor, id_Foros) {
    if (id_profesor=='' && id_Foros=='')
        await addProfesoresForo(id_profesor, id_Foros)
}

export async function buscaProfesorForo() {
    let profesores = null;

    profesores = await getProfesoresForo();

    return profesores;
}

export async function buscaProfesorForo_Profesor(id_profesores) {
    let profesores = null;

    if (id_profesores != null)
        profesores = await getProfesoresForo_Profesores(id_profesores);

    return profesores;
}

export async function buscaProfesorForo_Foro(id_foro) {
    let profesores = null;

    if (id_foro != null) {
        profesores = await getProfesoresForo_Foro(id_foro);
    }

    return profesores;
}

export async function buscaProfesorForoId (id) {
    let instancia = null;

    if (id != null)
        instancia = getProfesorForoID(id);

    return instancia;
}

export async function actualizaProfesorForo(id, id_foro, id_profesores) {
    if (id_foro != '' && id_profesores != '')
        await updateProfesoresForo(id, id_foro, id_profesores);
}

export async function aniadeForoAProfesor(id_profesores, id_foro) {
    if (id_profesor != '' && id_foro != '') {
        let profesorForo = await getProfesoresForo_Profesor(id_profesor);

        if (profesorForo != null) {
            let Foros = profesorForo.foro;

            if (!Foros.include(id_Foro)) {
                Foros.push(id_Foro);
                await updateProfesorForo(id, id_profesor, Foros);
            }
        }
    }
}

export async function borraProfesorForo(id) {
    await deleteProfesorForo(id);
}

//FUNCIONES PARA ALUMNO Foro

export async function aniadeAlumnoForo(id_alumno, id_Foro) {
    if (id_alumno != '' && id_Foro != '')
        await addAlumnosForo(id_alumno, id_Foro)
}

export async function buscaAlumnoForo() {
    let alumnos = null;

    alumnos = await getAlumnoForo();

    return alumnos;
}

export async function buscaAlumnoForo_Alumno(id_alumno) {
    let alumnos = null;

    if (id_alumno != null)
        alumnos = await getAlumnoForo_Alumno(id_alumno);

    return alumnos;
}

export async function buscaAlumnoForo_Foro(id_Foros) {
    let alumnos = null;

    if (id_Foros != null)
        alumnos = await getAlumnoForo_Foro(id_Foros);

    return alumnos;
}

export async function buscaAlumnoForoId (id) {
    let instancia = null;

    if (id != null)
        instancia = getAlumnoForoID(id);

    return instancia;
}

export async function actualizaAlumno(id, id_alumno, id_Foro) {
    if (id_alumno != '' && id_Foro != '')
    await updateAlumnosForo(id, id_alumno, id_foro);
}

export async function aniadeForoAAlumno(id_alumno, id_Foro) {
    if (id_alumno != '' && id_Foro != '') {
        let alumnoForo = await getAlumnosForo_Alumno(id_alumno);

        if (alumnoForo != null) {
            let Foros = alumnoForo.foro;

            if (!Foros.include(id_Foro)) {
                Foros.push(id_Foro);
                await updateAlumnosForo(id, {alumno: id_alumno, foro: Foros});
            }
        }
    }
}

export async function borraAlumnoForo(id) {
    await deleteAlumnoForo(id);
}