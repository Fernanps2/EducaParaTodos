import { getProfesorTarea, getProfesorTarea_Profesor, getProfesorTarea_Tarea, addProfesorTarea, updateProfesorTarea, updateAlumno, deleteProfesorTarea} from '../Modelo/firebase'
import { getAlumnoTarea, getAlumnoTarea_Alumno, getAlumnoTarea_Tarea, addAlumnoTarea, updateAlumnoTarea, deleteAlumnoTarea } from '../Modelo/firebase';

//FUNCIONES PARA PROFESOR TAREA
export async function aniadeProfesorTarea(id_profesor, id_tareas) {
    if (id_profesor=='' && id_tareas=='')
        await addProfesorTarea(id_profesor, id_tareas)
}

export async function buscaProfesorTarea() {
    let profesores = null;

    profesores = await getProfesorTarea();

    return profesores;
}

export async function buscaProfesorTarea_Profesor(id_profesor) {
    let profesores = null;

    if (id_profesor != null)
        profesores = await getProfesorTarea_Profesor(id_profesor);

    return profesores;
}

export async function buscaProfesorTarea_Tarea(id_tareas) {
    let profesores = null;

    if (id_tareas != null) {
        profesores = await getProfesorTarea_Tarea(id_tareas);
    }

    return profesores;
}

export async function actualizaProfesorTarea(id, id_profesor, id_tarea) {
    if (id_profesor != '' && id_tarea != '')
        await updateProfesorTarea(id, id_profesor, id_tarea);
}

export async function aniadeTareaAProfesor(id_profesor, id_tarea) {
    if (id_profesor != '' && id_tarea != '') {
        let profesorTarea = await getProfesorTarea_Profesor(id_profesor);

        if (profesorTarea != null) {
            let tareas = profesorTarea[0].tarea;

            if (!tareas.include(id_tarea)) {
                tareas.push(id_tarea);
                await updateProfesorTarea(id, id_profesor, id_tareas);
            }
        }
    }
}

export async function borraProfesorTarea(id) {
    await deleteProfesorTarea(id);
}

//FUNCIONES PARA ALUMNO TAREA

export async function aniadeAlumnoTarea(id_alumno, id_tarea) {
    if (id_alumno != '' && id_tarea != '')
        await addAlumnoTarea(id_alumno, id_tarea)
}

export async function buscaAlumnoTarea() {
    let alumnos = null;

    alumnos = await getAlumnoTarea();

    return alumnos;
}

export async function buscaAlumnoTarea_Alumno(id_alumno) {
    let alumnos = null;

    if (id_alumno != null)
        alumnos = await getAlumnoTarea_Alumno(id_alumno);

    return alumnos;
}

export async function buscaAlumnoTarea_Tarea(id_tareas) {
    let alumnos = null;

    if (id_tareas != null)
        alumnos = await getAlumnoTarea_Tarea(id_tareas);

    return alumnos;
}

export async function actualizaAlumno(id, id_alumno, id_tarea) {
    if (id_alumno != '' && id_tarea != '')
        await updateAlumnoTarea(id, id_alumno, id_tarea);
}

export async function aniadeTareaAAlumno(id_alumno, id_tarea) {
    if (id_alumno != '' && id_tarea != '') {
        let alumnoTarea = await getAlumnoTarea_Alumno(id_alumno);

        if (alumnoTarea != null) {
            let tareas = alumnoTarea[0].tarea;

            if (!tareas.include(id_tarea)) {
                tareas.push(id_tarea);
                await updateAlumnoTarea(id, id_alumno, tareas);
            }
        }
    }
}

export async function borraAlumnoTarea(id) {
    await deleteAlumnoTarea(id);
}