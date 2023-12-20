import { Alert } from "react-native";
import { setTarea,asignarFeedback,getTareaId,getTareas, deleteTareaId,setTareaActividad,getTareasActividad,getPasos,setPasoActividad,setTareaComanda,getTareasComanda,setMenu, getTareasActividadId, getPictogramasNumero, getTComanda, updatePedido, getPedidosTarea, terminarTarea, getTarea} from "../Modelo/firebase";
import { getMenus,getMenu,setAlimento,getAlimento,setTareaInventario,setMaterial,getMaterial,getMaterialId,getMateriales,getTareasInventario, setPedido, getPedido, getPedidoProfesor,deleteMenu,getMenusComanda} from "../Modelo/firebase";

export async function aniadeTarea(titulo, fechaInicio, fechaFin, tipo, periodicidad){
        await setTarea(titulo,fechaInicio,fechaFin,tipo,periocidad);
}
/*
export async function asignarFeedbackBD (idTarea, feedBack){
        await asignarFeedback(idTarea, feedBack);
}
*/
// Esta función busca las tareas asociadas a un alumno
// Busca las que idAlumno sea igual al parámetro idAlumno
export async function buscarTareaAlumno(idAlumno){
    let tarea = null;
    console.log("el id es: " + idAlumno);

    tarea = await getTareaId(idAlumno);

    return tarea;
}

// Esta función busca todas las tareas
export async function buscarTareas(){
    let tareas = null;

    tareas = await getTareas();

    return tareas;
}

// Funcion que busca una tarea cuyo id del documento sea igual a idTarea
export async function buscarTarea(idTarea){
    let tarea = null;

    tarea = await getTarea(idTarea);

    return tarea;
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
    console.log("COntorlaodr: " + JSON.stringify(tarea));

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

// Esta función muestra todas las tareas de tipo comanda en la colección tarea-comanda
export async function buscarTareasComandas(){
    let tareas = null;

    tareas = await getTareasComanda();

    return tareas;
}

// Esta función muestra todas las tareas de tipo comanda en la colección tarea que están completadas por lo que esto incluye también que esté asignada a un alumno
export async function buscarTComandas(){
    let tareas = null;

    tareas = await getTComanda();

    return tareas;
}


export async function aniadeMenu(nombre,foto){
    console.log("añadimos menu en controlador");
    await setMenu(nombre,foto);
}

// Esta función muestra todos los menús
export async function buscarMenus(){
    let menus = null;

    menus = await getMenus();

    return menus;
}

// Devolvemos todos los menús (el campo menus del documento) asociados a una tarea comanda en concreto

export async function buscarMenusComanda(idTarea){
    let menus = null;
    menus = await getMenusComanda(idTarea);
    return menus;
}

// Esta función muestra el menú con ese id
// PROBADO FUNCIONA
export async function buscarMenu(idMenu){
    let menu = null;

    menu = await getMenu(idMenu);

    return menu;
}


export async function aniadeAlimento(nombreAlimento,imagen){
    await setAlimento(nombreAlimento, imagen);
}

// Devuelve el alimento con ese nombre
export async function buscarAlimento(nombre){
    let alimento = null;

    alimento = await getAlimento(nombre);

    return alimento;
}

// Devuelve todos los alimentos
export async function buscarAlimentos(){
    let alimentos = null;

    alimentos = await getAlimentos();

    return alimentos;
}

export async function aniadeTareaInventario(idMaterial,cantidad,lugarOrigen,lugarDestino,idTarea){
    await setTareaInventario(idMaterial,cantidad,lugarOrigen,lugarDestino,idTarea);
}

export async function aniadeMaterial(foto,nombre,stock){
    await setMaterial(foto,nombre,stock);
}

// Esta función devuelve el material con ese nombre
export async function buscarMaterial(nombre){
    let material = null;

    material = getMaterial(nombre);

    return material;
}

// Esta función devuelve el material con ese id
export async function buscarMaterialId(id){
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

export async function buscarPictogramasNumero(){
    let pictogramas = null;

    pictogramas = await getPictogramasNumero();

    return pictogramas;
}

export async function aniadirPedido(idTarea,idMenu,idProf,aula,nPedidos){
    await setPedido(idTarea,idMenu,idProf,aula,nPedidos);
}

export async function buscarPedido (idMenu, idProf, idTarea){
    let pedidos = null;

    pedidos = await getPedido(idMenu,idProf, idTarea);
    
    return pedidos;
}

export async function buscarPedidoProfesor (idProf, idTarea){
    let pedidos = null;

    pedidos = await getPedidoProfesor(idProf, idTarea);
    
    return pedidos;
}

export async function actualizarPedido(id,idMenu,idProf,aula,pedidos){
    await updatePedido(id,idMenu,idProf,aula,pedidos);
}

export async function buscarPedidosTarea (idTarea){
    let pedidos = null;

    pedidos = await getPedidosTarea(idTarea);
    
    return pedidos;
}

export async function completarTarea(idTarea){
    await terminarTarea(idTarea);
}

export async function eliminarMenu(nombre){
    await deleteMenu(nombre);
}



