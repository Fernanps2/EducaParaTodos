//Variable y funciones para la tarea materiales
export var listaTareaMateriales = [];

// Función que nos dice si la lista de materiales esta vacía
export function isVaciaListaMateriales (){
    if (listaTareaMateriales.length === 0) {
        return true;
    }
    else return false;
}

// Función de inicializa la lista de materiales
export function inicializarmateriales (){
    listaTareaMateriales = [];
}

// Función que filtra la lista de materiales por el id
export function filtrar (id){
    listaTareaMateriales = listaTareaMateriales.filter((item) => item.id !== id);
}

// Get de la lista de materiales
export function get (){
    return listaTareaMateriales;
}

// Nos dice si en la lista de materiales existe un material específico.
export function existeLista (id, tipo, origen, destino) {
    return listaTareaMateriales.some(material => material.origen === origen && material.destino === destino && material.id === id && material.caracteristica === tipo);
}

//Variable y funciones para ver los materiales disponibles para la tarea material
export var materialesBD = [];

// Set para establecer el valor de materiales
export function set_materialesBD (materiales){
    materialesBD=materiales;
}

// Get de materiales
export function get_materialesBD () {
    return materialesBD;
}

// Modifica el stock de un material
export function modificarStock_materialesBD (id, cant, tipo){
    const material = materialesBD.find(item => item.id === id);
    material.stock -= Number(cant);
    const caract = material.caracteristicas.find(item => item.tipo === tipo);
    // Si tiene tipo lo encontrará, sino no hace nada, ya que no tiene tipos.
    if(caract){
        caract.cantidad -= Number(cant);
    }
}

// Recude el stock de un material.
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

// Nos dice si tiene tipo el material 
export function  isHasTiposItemMaterialesBD (id){
    const material = materialesBD.find(item => item.id === id);
    return material.caracteristicas.length > 0;
}

// Variable para saber cuando entramos a la pantalla de la interfaz de crear Materiales.
export var inicioPantalla = false;

// se inicializa inicioPantalla
export function setInicioPantalla (valor){
  inicioPantalla = valor;
}

// se obtiene el valor de inicio pantalla
export function getInicioPantalla (){
    return inicioPantalla;
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Variables y funciones para la tarea comanda
// Tiene la relación entre menus y alimentos.
export var listaMenus =[];

// Nos dice si la lista de menús esta vacía
export function isVaciaListaMenus (){
  if (listaMenus.length === 0) {
    return true;
  }else {
    return false;
  }
}

// Nos dice si están vacía de alimentos algún menú.
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

// Inicializamos la lista de menús.
export function setListaMenus (lista){
    listaMenus = lista;
}

// Obtenemos la lista de menús.
export function getMenus (){
    return listaMenus;
}

// Nos devuelve los ids de los alimentos de un menú 
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

// Actualiza el valor de lista menús.
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

// Set de menús
export function setSoloMenus (menus) {
    soloMenus = menus;
}

// Get de menús
export function getSoloMenus () {
    return soloMenus;
}

// Objetos se los menus seleccionados
export var menusObjetos = [];

/**
 * Establece y filtra los objetos de menús basándose en un conjunto de nombres.
 * @param {Array} objetos - Array de objetos de menús a establecer.
 * @param {Array} nombreObjetos - Nombres de los objetos de menús a filtrar.
 */
export function setMenusObjetos (objetos, nombreObjetos){
    // Establece menusObjetos con el array de objetos proporcionado.
    menusObjetos = objetos;

    // Filtra los objetos de menús para incluir solo aquellos cuyos nombres están en nombreObjetos.
    const objetosFiltrados = menusObjetos.filter(obj => nombreObjetos.includes(obj.Nombre));

    // Actualiza menusObjetos con los objetos filtrados.
    menusObjetos = objetosFiltrados;
}

/**
 * Obtiene los identificadores de los menús seleccionados.
 * @returns {Array} Un array de identificadores de los menús seleccionados.
 */
export function getIdMenusSeleccionados (){
    // Array para almacenar los identificadores de los menús.
    const idMenus = [];

    // Recorre cada objeto de menú y agrega su identificador al array idMenus.
    for (const item of menusObjetos) {
        idMenus.push(item.id);
    }

    // Retorna el array de identificadores.
    return idMenus;
}

// Get de menus objetos
export function getObjMenusSeleccionados (){
    return menusObjetos;
}

// Objetos de los alimentos seleccioandos
export var alimentosObjetos = [];

// set de los alimentos seleccionados
export function setAlimentosObjetos (objetos){
    alimentosObjetos = objetos;
}

// Se inicializa todo lo respectivo a la comanda.
export function inicializarMenus (){
    listaMenus = [];
    soloMenus = [];
    menusObjetos = [];
    alimentosObjetos = [];
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Variables para los pasos de la actividad
export var pasos = [];

// El index de cada paso creado
export var idPasos = 0;

// Nos dice si hay algún paso creado o no.
export function isVaciaPasos (){
    if (pasos.length === 0) {
        return true;
    }
    else return false;
}

// Inicializamos los pasos
export function inicializarPasos (){
    pasos = [];
}

// Añadimos un paso
export function pushPasos (setNombre, setTexto, setImagen, setPictograma, setVideo, setAudio){
    var textoNuevo = setTexto;
    // si no hay texto en el paso se informa
    if (setTexto === ''){
        textoNuevo = 'Ninguno';
    }

    var imagenNuevo = {
        nombre: 'Ninguno',
        uri: '',
        id: 0
    };
    // si hay una imagen en el paso se informa
    if (setImagen !== ''){
        imagenNuevo = setImagen;
    }

    var pictogramaNuevo = {
        nombre: 'Ninguno',
        uri: '',
        id: 0
    };
    // si hay un pictograma en el paso se informa
    if (setPictograma !== ''){
        pictogramaNuevo = setPictograma;
    }

    var videoNuevo = {
        nombre: 'Ninguno',
        uri: '',
        id: 0
    };
    // si hay un video en el paso se informa
    if (setVideo !== ''){
        videoNuevo = setVideo;
    }

    var audioNuevo = {
        nombre: 'Ninguno',
        uri: '',
        id: 0
    };
    // si hay un audio en el paso se informa
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
    // Actualizamos el indice de los pasos.
    idPasos = idPasos + 1;
}

// Se filtra los pasos por un id. Se usa cuando se borrar un paso
export function filtrarPasos (id){
    pasos = pasos.filter((item) => item.id !== id);
} 
// Se devuelve todos los pasos creados en una Tarea - actividad.
export function getPasos (){
    return pasos;
}