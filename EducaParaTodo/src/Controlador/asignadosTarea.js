import { getProfesorTarea, getProfesorTarea_Profesor, getProfesorTarea_Tarea, addProfesorTarea, updateProfesorTarea, updateAlumno, deleteProfesorTarea, getProfesorTareaID} from '../Modelo/firebase'
import { getAlumnoTarea, getAlumnoTarea_Alumno, getAlumnoTarea_Tarea, addAlumnoTarea, updateAlumnoTarea, deleteAlumnoTarea, getAlumnoTareaID } from '../Modelo/firebase';

//FUNCIONES PARA PROFESOR TAREA

/**
 * @name aniadeProfesorTarea
 * 
 * @description Añade a la base de datos la relación entre profesor y tareas
 * 
 * @param {String} id_profesor Identificador del profesor
 * @param {String[]} id_tareas Identificador de las tareas
 */
export async function aniadeProfesorTarea(id_profesor, id_tareas) {
    if (id_profesor=='' && id_tareas=='')
        await addProfesorTarea(id_profesor, id_tareas)
}

/**
 * @name buscaProfesorTarea
 * 
 * @description Descarga de la base de datos todas las relaciones entre profesores y tareas
 * 
 * @returns Un array de arrays etiquetados de la forma:
 *                  - id : String
 *                  - profesor : String
 *                  - tarea : String[]
 */
export async function buscaProfesorTarea() {
    let profesores = null;

    profesores = await getProfesorTarea();

    return profesores;
}

/**
 * @name buscaProfesorTarea_Profesor
 * 
 * @description Busca las relaciones con tareas que tiene el profesor identificado
 * 
 * @param {String} id_profesor Identificador del profesor
 * @returns Un array de arrays etiquetados de la forma:
 *                  - id : String
 *                  - profesor : String
 *                  - tarea : String[]
 */
export async function buscaProfesorTarea_Profesor(id_profesor) {
    let profesores = null;

    if (id_profesor != null)
        profesores = await getProfesorTarea_Profesor(id_profesor);

    return profesores;
}

/**
 * @name buscaProfesorTarea_Tarea
 * 
 * @description Busca las relaciones de los profesores que contienen las tareas dadas
 * 
 * @param {String[]} id_tareas Identificador de la tareas
 * 
 * @returns Un array de arrays etiquetados de la forma:
 *                  - id : String
 *                  - profesor : String
 *                  - tarea : String[]
 */
export async function buscaProfesorTarea_Tarea(id_tareas) {
    let profesores = null;

    if (id_tareas != null) {
        profesores = await getProfesorTarea_Tarea(id_tareas);
    }

    return profesores;
}

/**
 * @name buscaProfesorTareaId
 * 
 * @description Busca la relación entre profesor y tarea identificado
 * 
 * @param {String} id Identificador de la relación
 * 
 * @returns Un array etiquetado de la forma:
 *                  - id : String
 *                  - profesor : String
 *                  - tarea : String[]
 */
export async function buscaProfesorTareaId (id) {
    let instancia = null;

    if (id != null)
        instancia = getProfesorTareaID(id);

    return instancia;
}

/**
 * @name actualizaProfesorTarea
 * 
 * @description Actualiza los datos de la relación identificada
 * 
 * @param {String} id Identificador de la relación
 * @param {String} id_profesor Identificador del profesor
 * @param {String[]} id_tarea Identificadores de las tareas
 */
export async function actualizaProfesorTarea(id, id_profesor, id_tarea) {
    if (id_profesor != '' && id_tarea != '')
        await updateProfesorTarea(id, id_profesor, id_tarea);
}

/**
 * @name aniadeTareaAProfesor
 * 
 * @description Añade una tarea a la relación con el profesor identificado
 * 
 * @param {String} id_profesor Identificador del profesor
 * @param {String} id_tarea Identificador de la tarea
 */
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

/**
 * @name borraProfesorTarea
 * 
 * @description Borra de la base de datos la relación identificada
 * 
 * @param {String} id Identificador de la relación
 */
export async function borraProfesorTarea(id) {
    await deleteProfesorTarea(id);
}