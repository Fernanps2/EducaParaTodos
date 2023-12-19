//Variable y funciones para la tarea materiales
export var listaTareaMateriales = [];
export function isVaciaListaMateriales (){
    if (listaTareaMateriales.length === 0) {
        return true;
    }
    else return false;
}
export function inicializarmateriales (){
    listaTareaMateriales = [];
}
export function filtrar (id){
    listaTareaMateriales = listaTareaMateriales.filter((item) => item.id !== id);
}
export function get (){
    return listaTareaMateriales;
}
export function existeLista (id, tipo, origen, destino) {
    return listaTareaMateriales.some(material => material.origen === origen && material.destino === destino && material.id === id && material.caracteristica === tipo);
}

//Variable y funciones para ver los materiales disponibles para la tarea material
export var materialesBD = [];
export function set_materialesBD (materiales){
    materialesBD=materiales;
}
export function get_materialesBD () {
    return materialesBD;
}
export function modificarStock_materialesBD (id, cant, tipo){
    const material = materialesBD.find(item => item.id === id);
    material.stock -= Number(cant);
    const caract = material.caracteristicas.find(item => item.tipo === tipo);
    // Si tiene tipo lo encontrará, sino no hace nada, ya que no tiene tipos.
    if(caract){
        caract.cantidad -= Number(cant);
    }
}

export function modificarReduciendoStock_materialesBD (id, cant, tipo){
    const material = materialesBD.find(item => item.id === id);
        material.stock = Number(material.stock) + Number(cant);
        const caract = material.caracteristicas.find(item => item.tipo === tipo); 
        // Si tiene tipo se le suma, sino no.
        if(caract){
            caract.cantidad = Number(caract.cantidad) + Number(cant);
        }
}

// Comparamos el stock para que no supere el mmáximo permitido
export function isLargeItemMaterialesBD (id, tipo, cantidadElegida){
    const material = materialesBD.find(item => item.id === id);
    const caract = material.caracteristicas.find(item => item.tipo === tipo);
    return Number(cantidadElegida) > Number(caract.cantidad);
}

// 
export function  isHasTiposItemMaterialesBD (id){
    const material = materialesBD.find(item => item.id === id);
    return material.caracteristicas.length > 0;
}

// Variable para saber cuando entramos a la pantalla de la interfaz de crear Materiales.
export var inicioPantalla = false;
export function setInicioPantalla (valor){
  inicioPantalla = valor;
}
export function getInicioPantalla (){
    return inicioPantalla;
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Variables y funciones para la tarea comanda
// Tiene la relación entre menus y alimentos.
export var listaMenus =[];
export function isVaciaListaMenus (){
  if (listaMenus.length === 0) {
    return true;
  }else {
    return false;
  }
}

export function isVaciaAlgunListaMenus (){
    if (listaMenus.length === 0) {
      return true;
    }
    for (const menu in listaMenus) {
      if (menu !== 'Ninguno'){
          if (listaMenus[menu].length === 0) {
              // Si alguno de los menús está vacío, devolver true
              return true;
            }
      }
    }
    return false;
  }

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

export function actualizarListaMenus() {
    // Inicializar listaMenus con el menú "Ninguno" si aún no existe
    if (!listaMenus.hasOwnProperty("Ninguno")) {
        listaMenus["Ninguno"] = [];
    }

    // Añadir nuevos menús de soloMenus a listaMenus
    for (const menu of soloMenus) {
        if (!listaMenus.hasOwnProperty(menu)) {
            // Si el menú no existe en listaMenus, se añade con una lista de alimentos vacía
            listaMenus[menu] = [];
        }
    }

    // Eliminar menús de listaMenus que no están en soloMenus, excepto el menú "Ninguno"
    for (const menu in listaMenus) {
        if (!soloMenus.includes(menu) && menu !== "Ninguno") {
            // Si el menú no está en soloMenus y no es "Ninguno", se elimina de listaMenus
            delete listaMenus[menu];
        }
    }
}

// SOlo obtiene los menus selccionados sin las relaciones entre alimentos
export var soloMenus = [];
export function setSoloMenus (menus) {
    soloMenus = menus;
}
export function getSoloMenus () {
    return soloMenus;
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
    menusObjetos = [];
    alimentosObjetos = [];
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Variables para los pasos de la actividad
export var pasos = [];
export var idPasos = 0;
export function isVaciaPasos (){
    if (pasos.length === 0) {
        return true;
    }
    else return false;
}
export function inicializarPasos (){
    pasos = [];
}
export function pushPasos (setNombre, setTexto, setImagen, setPictograma, setVideo, setAudio){
    var textoNuevo = setTexto;
    if (setTexto === ''){
        textoNuevo = 'Ninguno';
    }

    var imagenNuevo = {
        nombre: 'Ninguno',
        uri: '',
        id: 0
    };
    if (setImagen !== ''){
        imagenNuevo = setImagen;
    }

    var pictogramaNuevo = {
        nombre: 'Ninguno',
        uri: '',
        id: 0
    };
    if (setPictograma !== ''){
        pictogramaNuevo = setPictograma;
    }

    var videoNuevo = {
        nombre: 'Ninguno',
        uri: '',
        id: 0
    };
    if (setVideo !== ''){
        videoNuevo = setVideo;
    }

    var audioNuevo = {
        nombre: 'Ninguno',
        uri: '',
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