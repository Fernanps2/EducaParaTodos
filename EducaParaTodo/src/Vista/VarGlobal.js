//Variable y funciones para la tarea materiales
export var listaTareaMateriales = [];
export function inicializarmateriales (){
    listaTareaMateriales = [];
}
export function filtrar (id){
    listaTareaMateriales = listaTareaMateriales.filter((item) => item.id !== id);
}
export function get (){
    return listaTareaMateriales;
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Variables y funciones para la tarea comanda
// Tiene la relación entre menus y alimentos.
export var listaMenus =[];
export function setListaMenus (lista){
    listaMenus = lista;
}
export function getMenus (){
    return listaMenus;
}
export function filtroID (nombreMenu){
    const idAlimentos = [];
  const alimentos = listaMenus[nombreMenu];
  for (const item of alimentosObjetos) {
    if (alimentos.includes(item.Nombre)) {
        idAlimentos.push(item.id);
    }
  }
  return idAlimentos;
}

// SOlo obtiene los menus selccionados sin las relaciones entre alimentos
export var soloMenus = [];
export var cambiadoSoloMenus = false;
export function setSoloMenus (menus) {
    soloMenus = menus;
    cambiadoSoloMenus = true;
}
export function getSoloMenus () {
    return soloMenus;
}
export function setChangedSoloMenus (status){
    cambiadoSoloMenus = status;
}
export function isChangedSoloMenus (){
    return cambiadoSoloMenus;
}

// Objetos se los menus seleccionados
export var menusObjetos = [];
export function setMenusObjetos (objetos, nombreObjetos){
    menusObjetos = objetos;
    const objetosFiltrados = menusObjetos.filter(obj => nombreObjetos.includes(obj.Nombre));
    menusObjetos = objetosFiltrados;
}
export function getIdMenusSeleccionados (){
    const idMenus = [];
    for (const item of menusObjetos) {
        idMenus.push(item.id);
    }
    return idMenus;
}
export function getObjMenusSeleccionados (){
    return menusObjetos;
}

// Objetos de los alimentos seleccioandos
export var alimentosObjetos = [];
export function setAlimentosObjetos (objetos){
    alimentosObjetos = objetos;
}

export function inicializarMenus (){
    listaMenus = [];
    soloMenus = [];
    cambiadoSoloMenus = false;
    menusObjetos = [];
    alimentosObjetos = [];
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Variables para los pasos de la actividad
export var pasos = [];
export var idPasos = 0;
export function inicializarPasos (){
    pasos = [];
}
export function pushPasos (setNombre, setTexto, setImagen, setPictograma, setVideo, setAudio){
    var textoNuevo = setTexto;
    if (setTexto === ''){
        textoNuevo = 'Ninguno';
    }

    var imagenNuevo = {
        Titulo: 'Ninguno',
        URL: '',
        id: 0
    };
    if (setImagen !== ''){
        imagenNuevo = setImagen;
    }

    var pictogramaNuevo = {
        Titulo: 'Ninguno',
        URL: '',
        id: 0
    };
    if (setPictograma !== ''){
        pictogramaNuevo = setPictograma;
    }

    var videoNuevo = {
        Titulo: 'Ninguno',
        URL: '',
        id: 0
    };
    if (setVideo !== ''){
        videoNuevo = setVideo;
    }

    var audioNuevo = {
        Titulo: 'Ninguno',
        URL: '',
        id: 0
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