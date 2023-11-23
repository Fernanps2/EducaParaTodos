import { getProfesorTarea, getProfesorTarea_Profesor, getProfesorTarea_Tarea, addProfesorTarea, updateProfesorTarea} from '../Modelo/firebase'
import { getAlumnoTarea, getAlumnoTarea_Alumno, getAlumnoTarea_Tarea, addAlumnoTarea, updateAlumnoTarea } from '../Modelo/firebase';

//FUNCIONES PARA PROFESOR TAREA
export function aniadeProfesorTarea(id_profesor, id_tarea) {
    if (id_profesor=='' || id_tarea=='')
        addProfesorTarea(id_profesor, id_tarea)
}

export function buscaProfesorTarea({id_profesor='', id_tarea=''}) {
    let {id_profesor, id_tarea} = {id_profesor, id_tarea};
    let profesores = null;

    if (id_profesor != '')
        profesores = getProfesorTarea_Profesor(id_profesor);
    else if (id_tarea != '')
        profesores = getProfesorTarea_Tarea(id_tarea);
    else
        profesores = getProfesorTarea();

    return profesores;
}

export function actualizaProfesor(id, {id_profesor='', id_tarea=''}) {
    let datos = {id_profesor, id_tarea};

    updateProfesor(id, datos);
}

export function aniadeTareaAProfesor(id_profesor, id_tarea) {
    if (id_profesor != '' || id_tarea != '') {
        let profesorTarea = getProfesorTarea_Profesor(id_profesor);

        let tareas = profesorTarea.tarea;

        if (!tareas.include(id_tarea)) {
            tareas.push(id_tarea);
            updateProfesor(id, {profesor: id_profesor, tarea: tareas});
        }
    }
}

//FUNCIONES PARA ALUMNO TAREA

export function aniadeAlumnoTarea(id_alumno, id_tarea) {
    if (id_alumno != '' || id_tarea != '')
        addProfesor(id_alumno, id_tarea)
}

export function buscaAlumnoTarea({id_alumno='', id_tarea=''}) {
    let {id_alumno, id_tarea} = {id_alumno, id_tarea};
    let alumnos = null;

    if (id_alumno != '')
        alumnos = getAlumnoTarea_Alumno(id_alumno);
    else if (id_tarea != '')
        alumnos = getAlumnoTarea_Tarea(id_tarea);
    else
        alumnos = getAlumnoTarea();

    return alumnos;
}

export function actualizaAlumno(id, {id_alumno='', id_tarea=''}) {
    let datos = {id_alumno, id_tarea};

    updateProfesor(id, datos);
}

export function aniadeTareaAAlumno(id_alumno, id_tarea) {
    if (id_alumno != '' || id_tarea != '') {
        let alumnoTarea = getAlumnoTarea_Alumno(id_alumno);

        let tareas = alumnoTarea.tarea;

        if (!tareas.include(id_tarea)) {
            tareas.push(id_tarea);
            updateProfesor(id, {alumno: id_alumno, tarea: tareas});
        }
    }
}