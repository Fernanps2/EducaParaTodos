import { setTarea,asignarFeedback,getTareaId,getTareas, deleteTareaId,setTareaActividad,getTareasActividad,getPasos,setPasoActividad,setTareaComanda,getTareasComanda,setMenu, getTareasActividadId } from "../Modelo/firebase";
import { getMenus,setAlimento,getAlimento,setTareaInventario,setMaterial,getMaterial,getMaterialId,getMateriales,getTareasInventario } from "../Modelo/firebase";

export async function aniadeTarea(titulo, fechaInicio, fechaFin, tipo, periodicidad){
    if(titulo != '' && fechaInicio != '' && fechaFin != '' && tipo != '' && periodicidad != '' )
        await setTarea(titulo,fechaInicio,fechaFin,tipo,periocidad);
}

export async function asignarFeedback (idTarea, feedBack){
    if(idTarea != '' && feedBack != ''){
        await asignarFeedback(idTarea, feedBack);
    }
}

// Esta función busca la tarea con ese ID
export async function buscarTarea(idTarea){
    let tarea = null;

    if(idTarea != ''){
        tarea = await getTareaId(idTarea);
    }

    return tarea;
}

// Esta función busca todas las tareas
export async function buscarTareas(){
    let tareas = null;

    tareas = await getTareas();

    return tareas;
}

export async function borrarTarea (idTarea){
    if(idTarea != ''){
        await deleteTareaId(idTarea);
    }
}

export async function aniadeTareaActividad (aula,pasos,idTarea){
    if(aula != '' && pasos != '' && idTarea != ''){
        await aniadeTareaActividad(aula,pasos,idTarea);
    }
}

// Esta función devuelve todas las tareas de tipo actividad
export async function buscarTareasActividad(){
    let tareas = null;

    tareas = await getTareasActividad();

    return tareas;
}

// Esta función devuelve la tareaActividad con ese ID
export async function buscarTareaActividad(idTarea){
    let tarea = null;

    if(idTarea != ''){
        tarea = await getTareasActividadId(idTarea);
    }

    return tarea;
}

// Esta función devuelve todos los pasos correspondientes a una actividad
export async function buscarPasos(idActividad){
    let pasos = null;

    if(idActividad != ''){
        pasos = await getPasos(idActividad);
    }
}

export async function aniadePasoActividad(audio,imagen,pictograma,video,texto,nombre,idTarea){
    if(audio != '' && imagen != '' && pictograma != '' && video != '' && texto != '' && nombre != '' && idTarea != ''){
        await setPasoActividad(audio,imagen,pictograma,video,texto,nombre,idTarea);
    }
}

export async function aniadeTareaComanda(idTarea,menus){
    if(idTarea != '' && menus != ''){
        await setTareaComanda(idTarea, menus);
    }
}

// Esta función muestra todas las tareas de tipo comanda
export async function buscarTareasComandas(){
    let tareas = null;

    tareas = await getTareasComanda();

    return tareas;
}

export async function aniadeMenu(idTarea,idMenu, idAlimentos){
    if(idTarea != '' && idMenu != '' && idAlimentos != ''){
        await setMenu(idTarea,idMenu,idAlimentos);
    }
}

// Esta función muestra todos los menús
export async function buscarMenus(){
    let menus = null;

    menus = await getMenus();

    return menus;
}

export async function aniadeAlimento(nombreAlimento,imagen){
    if(nombreAlimento != '' && imagen != ''){
        await setAlimento(nombreAlimento, imagen);
    }
}

export async function buscarAlimento(nombre){
    let alimento = null;

    if(nombre != ''){
        alimento = await getAlimento(nombre);
    }

    return alimento;
}

export async function aniadeTareaInventario(idMaterial,cantidad,lugarOrigen,lugarDestino,idTarea){
    if(idMaterial != '' && cantidad != '' && lugarOrigen != '' && lugarDestino != '' && idTarea != ''){
        await setTareaInventario(idMaterial,cantidad,lugarOrigen,lugarDestino,idTarea);
    }
}

export async function aniadeMaterial(foto,nombre,stock){
    if(foto != '' && nombre != '' && stock != ''){
        await setMaterial(foto,nombre,stock);
    }
}

// Esta función devuelve el material con ese nombre
export async function buscarMaterial(nombre){
    let material = null;

    if(nombre != ''){
        getMaterial(nombre);
    }

    return nombre;
}

// Esta función devuelve el material con ese id
export async function getMaterialId(id){
    let material = null;

    if(id != ''){
        await getMaterialId(id);
    }

    return material;
}

// Esta función devuelve todos los materiales almacenados en la base de datos
export async function buscarMateriales(){
    let materiales = null;

    materiales = await getMateriales();

    return materiales;
}

//Esta función devuelve todas las tareas Inventario almacenadas en la base de datos
export async function buscarTareasInventario(){
    let tareasInventario = null;

    tareasInventario = await getTareasInventario();

    return tareasInventario;
}
