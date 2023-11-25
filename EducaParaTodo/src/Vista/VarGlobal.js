//Variable y funciones para la tarea materiales
export var listaTareaMateriales = [];
export function filtrar (id){
    listaTareaMateriales = listaTareaMateriales.filter((item) => item.id !== id);
}
export function get (){
    return listaTareaMateriales;
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Variables y funciones para la tarea comanda
export var listaMenus =[];
export function setListaMenus (lista){
    listaMenus = lista;
}
export function getMenus (){
    return listaMenus;
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Variables para los pasos de la actividad
export var pasos = [];
export var idPasos = 0;
export function pushPasos (setNombre, setTexto, setImagen, setPictograma, setVideo, setAudio){
    var textoNuevo = setTexto;
    if (setTexto === ''){
        textoNuevo = 'Ninguno';
    }

    var imagenNuevo = {
        Titulo: 'Ninguno',
        URL: ''
    };
    if (setImagen !== ''){
        imagenNuevo = setImagen;
    }

    var pictogramaNuevo = {
        Titulo: 'Ninguno',
        URL: ''
    };
    if (setPictograma !== ''){
        pictogramaNuevo = setPictograma;
    }

    var videoNuevo = {
        Titulo: 'Ninguno',
        URL: ''
    };
    if (setVideo !== ''){
        videoNuevo = setVideo;
    }

    var audioNuevo = {
        Titulo: 'Ninguno',
        URL: ''
    };
    if (setAudio !== ''){
        audioNuevo = setAudio;
    }

    pasos.push({
        id: idPasos+1,
        nombre: setNombre,
        texto: textoNuevo,
        imagen: imagenNuevo,
        pictograma: pictogramaNuevo,
        video: videoNuevo,
        audio: audioNuevo
    })
    idPasos = idPasos + 1;
}
export function filtrarPasos (id){
    pasos = pasos.filter((item) => item.id !== id);
}
export function getPasos (){
    return pasos;
}