import { setTarea,asignarFeedback,getTareaId,getTareas, deleteTareaId,setTareaActividad,getTareasActividad,getPasos,setPasoActividad,setTareaComanda,getTareasComanda,setMenu, getTareasActividadId } from "../Modelo/firebase";
import { getMenus,setAlimento,getAlimento,getAlimentos,setTareaInventario,setMaterial,getMaterial,getMaterialId,getMateriales,deleteMaterial,updateMaterial,getTareasInventario,cargarPictogramas,cargarVideos,cargarImagenes,cargarAudios} from "../Modelo/firebase";

export async function aniadeTarea(titulo, fechaInicio, fechaFin, tipo, periocidad){
        return await setTarea(titulo,fechaInicio,fechaFin,tipo,periocidad);
}

export async function asignarFeedbackBD (idTarea, feedBack){
        await asignarFeedback(idTarea, feedBack);
}

// Esta función busca la tarea con ese ID
export async function buscarTarea(idTarea){
    let tarea = null;

    tarea = await getTareaId(idTarea);

    return tarea;
}

// Esta función busca todas las tareas
export async function buscarTareas(){
    let tareas = null;

    tareas = await getTareas();

    return tareas;
}

export async function borrarTarea (idTarea){
        await deleteTareaId(idTarea);
}

export async function aniadeTareaActividad (aula,pasos,idTarea){
        await setTareaActividad(aula,pasos,idTarea);
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

    tarea = await getTareasActividadId(idTarea);

    return tarea;
}

// Esta función devuelve todos los pasos correspondientes a una actividad
export async function buscarPasos(idActividad){
    let pasos = null;

    pasos = await getPasos(idActividad);

    return pasos;
}

export async function aniadePasoActividad(audio,imagen,pictograma,video,texto,nombre,idTarea){
    await setPasoActividad(audio,imagen,pictograma,video,texto,nombre,idTarea);
}

export async function aniadeTareaComanda(idTarea,menus){
    await setTareaComanda(idTarea, menus);
}

// Esta función muestra todas las tareas de tipo comanda
export async function buscarTareasComandas(){
    let tareas = null;

    tareas = await getTareasComanda();

    return tareas;
}

export async function aniadeMenu(idTarea,idMenu, idAlimentos){
    await setMenu(idTarea,idMenu,idAlimentos);
}

// Esta función muestra todos los menús
export async function buscarMenus(){
    let menus = null;

    menus = await getMenus();

    return menus;
}

export async function aniadeAlimento(nombreAlimento,imagen){
    await setAlimento(nombreAlimento, imagen);
}

export async function buscarAlimento(nombre){
    let alimento = null;

    alimento = await getAlimento(nombre);

    return alimento;
}

export async function buscarAlimentos(){
    let alimento = null;

    alimento = await getAlimentos();

    return alimento;
}

export async function aniadeTareaInventario(idMaterial,caracteristica,cantidad,lugarOrigen,lugarDestino,idTarea){
    await setTareaInventario(idMaterial,caracteristica,cantidad,lugarOrigen,lugarDestino,idTarea);
}

export async function aniadeMaterial(nombre, foto, stock, caracteristicas){
    await setMaterial(nombre, foto, stock, caracteristicas);
}

// Esta función devuelve el material con ese nombre
export async function buscarMaterial(nombre){
    let material = null;

    material = getMaterial(nombre);

    return material;
}

// Esta función devuelve el material con ese id
export async function getMaterialIdBD(id){
    let material = null;

    material = await getMaterialId(id);

    return material;
}

// Esta función devuelve todos los materiales almacenados en la base de datos
export async function buscarMateriales(){
    let materiales = null;

    materiales = await getMateriales();

    return materiales;
}

export async function eliminarMaterial(id){
    await deleteMaterial(id);
}

export async function modificarMaterial(id, nombre, foto, stock, caracteristicas){
    await updateMaterial (id, nombre, foto, stock, caracteristicas);
}

//Esta función devuelve todas las tareas Inventario almacenadas en la base de datos
export async function buscarTareasInventario(){
    let tareasInventario = null;

    tareasInventario = await getTareasInventario();

    return tareasInventario;
}

export async function anadeVideo (nombreVideo, urlVideo){
    await setVideo(nombreVideo, urlVideo);
}

export async function cargarPictogramasBD (){
    let pictogramas = null;
    pictogramas = await cargarPictogramas();
    return pictogramas;
}

export async function cargarVideosBD (){
    let videos = null;
    videos = await cargarVideos();
    return videos;
}

export async function cargarImagenesBD (){
    let imagenes = null;
    imagenes = await cargarImagenes();
    return imagenes;
}

export async function cargarAudiosBD (){
    let audios = null;
    audios = await cargarAudios();
    return audios;
}