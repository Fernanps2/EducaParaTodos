import React, {cloneElement, useEffect, useState} from 'react';

import { getFirestore, collection, getDocs, doc, getDoc, updateDoc, where, query } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import {getStorage, ref} from 'firebase/storage'

//import {v4} from 'uuid';

//import * as firebase from 'firebase';

// Importa solo lo necesario de firebase/app
import { initializeApp } from "firebase/app";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCm6Yg8zGnLR7XAc0tPYTZWK3Y9K3-Jt5I",
  authDomain: "educaparatodos-39692.firebaseapp.com",
  projectId: "educaparatodos-39692",
  storageBucket: "educaparatodos-39692.appspot.com",
  messagingSenderId: "253598049542",
  appId: "1:253598049542:web:d6c2d2c725f0b2713b2a87"
};


// Inicializa Firebase
export const AppFirebase = initializeApp(firebaseConfig);

export const storage = getStorage(AppFirebase);

const db = getFirestore(AppFirebase);


//valores de las colecciones en la base de datos
const COL_ALUMNOS = 'alumnos';
const COL_PROFESORES = 'profesores';
const COL_ADMINISTRADORES = 'administradores';
const COL_FOROS = 'foros';
const COL_PROFESORES_FOROS = 'profesoresForos';
const COL_PROFESORES_TAREAS = 'profesoresTareas';
const COL_ALUMNOS_TAREAS = 'alumnosTareas';


/**********  INICIO FUNCIONES ALUMNO ********/

// export async function getAlumnos() {
//     let alumnos = null;
    
//     try {
//         const querydb = getFirestore();
//         const queryCollection = collection(querydb, COL_ALUMNOS);
//         getDocs(queryCollection)
//         .then(res => alumnos = res.docs.map(alumno => ({id: alumno.id, nombre: alumno.nombre,
//                                                         apellidos: alumno.apellidos, foto: alumno.foto,
//                                                         visualizacionPreferente: alumno.visualizacionPreferente})));
//     } catch (error) {
//         console.log("Ha habido un error al recoger los datos del alumno");
//     }

//     return alumnos;
// }

export async function getAlumnosNombre(nombre) {
    let alumnos = null;
    try {
        const queryFilter = query(collection(getFirestore(), COL_ALUMNOS), where('nombre', '==', nombre));
        getDocs(queryFilter)
        .then(res => alumnos = res.docs.map(alumno => ({id: alumno.id, nombre: alumno.nombre,
                                                        apellidos: alumno.apellidos, foto: alumno.foto,
                                                        visualizacionPreferente: alumno.visualizacionPreferente})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumno");
    }

    return alumnos;
}

export async function getAlumnosApellidos(apellidos) {
    let alumnos = null;
    try {
        const queryFilter = query(collection(getFirestore(), COL_ALUMNOS), where('apellidos', '==', apellidos));
        getDocs(queryFilter)
        .then(res => alumnos = res.docs.map(alumno => ({id: alumno.id, nombre: alumno.nombre,
                                                        apellidos: alumno.apellidos, foto: alumno.foto,
                                                        visualizacionPreferente: alumno.visualizacionPreferente})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumno");
    }

    return alumnos;
}

export async function getAlumnosContrasenia(contrasenia) {
    let alumnos = null;
    try {
        const queryFilter = query(collection(getFirestore(), COL_ALUMNOS), where('password', '==', contrasenia));
        getDocs(queryFilter)
        .then(res => alumnos = res.docs.map(alumno => ({id: alumno.id, nombre: alumno.nombre,
                                                        apellidos: alumno.apellidos, foto: alumno.foto, 
                                                        visualizacionPreferente: alumno.visualizacionPreferente})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumno");
    }

    return alumnos;
}

export async function getAlumnosVisualizacionPredefinida(visualizacion) {
    let alumnos = null;
    try {
        const queryFilter = query(collection(getFirestore(), COL_ALUMNOS), where('visualizacionPreferente', '==', visualizacion));
        getDocs(queryFilter)
        .then(res => alumnos = res.docs.map(alumno => ({id: alumno.id, nombre: alumno.nombre,
                                                        apellidos: alumno.apellidos, foto: alumno.foto, 
                                                        visualizacionPreferente: alumno.visualizacionPreferente})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumno");
    }

    return alumnos;
}

export async function getAlumnosLogin(nombre, contrasenia) {
    let alumnos = null;
    try {    
        const queryFilter = query(collection(getFirestore(), COL_ALUMNOS), where('nombre', '==', nombre), where('password', '==', contrasenia));
        getDocs(queryFilter)
        .then(res => alumnos = res.docs.map(alumno => ({id: alumno.id, nombre: alumno.nombre,
                                                        apellidos: alumno.apellidos, foto: alumno.foto, 
                                                        visualizacionPreferente: alumno.visualizacionPreferente})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumno");
    }    

    return alumnos;
}

export async function addAlumno(nombre, apellidos, contrasenia, foto, visualizacion) {
    let alumno = {
        nombre: nombre,
        apellidos: apellidos,
        password: contrasenia,
        foto: foto,
        visualizacionPreferente: visualizacion,
    }

    let identificacion = null;

    try {
        addDoc(collection(getFirestore(), COL_ALUMNOS), alumno)
            .then(({id}) => identificacion = id);
    }
    catch (error) {
        console.log("Ha habido un error al subir los datos del alumno");
    }

    return identificacion;
}

export async function updateAlumno(id, {nombre='', apellidos='', visualizacionPreferente='', password='', foto=''}) {
    let editaAlumno = {nombre, apellidos, visualizacionPreferente, password, foto};
    let alumno = null;

    try {
        let docAlumno = doc(getFirestore(), COL_ALUMNOS);
        alumno = getDoc(docAlumno, id);
        
        editaAlumno = editaAlumno.nombre == '' ? alumno.nombre : editaAlumno.nombre;
        editaAlumno = editaAlumno.apellidos == '' ? alumno.apellidos : editaAlumno.apellidos;
        editaAlumno = editaAlumno.visualizacionPreferente == '' ? alumno.visualizacionPreferente : editaAlumno.visualizacionPreferente;
        editaAlumno = editaAlumno.password == '' ? alumno.password : editaAlumno.password;
        editaAlumno = editaAlumno.foto == '' ? alumno.foto : editaAlumno.foto;

        updateDoc(docAlumno, {
            ...editaAlumno
        })
    } catch (error) {
        console.log("Hubo un error al actualizar datos de alumno");
    }
}

/**********  FINAL FUNCIONES ALUMNO ********/

/**********  INICIO FUNCIONES PROFESOR ********/

export async function getProfesores() {
    let profesores = null;
    
    try {
        const querydb = getFirestore();
        const queryCollection = collection(querydb, COL_PROFESORES);
        getDocs(queryCollection)
        .then(res => profesores = res.docs.map(profesor => ({id: profesor.id, nombre: profesor.nombre,
                                                        apellidos: profesor.apellidos, foto: profesor.foto})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesor");
    }

    return profesores;
}

export async function getProfesoresNombre(nombre) {
    let profesores = null;
    try {
        const queryFilter = query(collection(getFirestore(), COL_PROFESORES), where('nombre', '==', nombre));
        getDocs(queryFilter)
        .then(res => profesores = res.docs.map(profesor => ({id: profesor.id, nombre: profesor.nombre,
                                                        apellidos: profesor.apellidos, foto: profesor.foto})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesor");
    }

    return profesores;
}

export async function getProfesoresApellidos(apellidos) {
    let profesores = null;
    try {
        const queryFilter = query(collection(getFirestore(), COL_PROFESORES), where('apellidos', '==', apellidos));
        getDocs(queryFilter)
        .then(res => profesores = res.docs.map(profesor => ({id: profesor.id, nombre: profesor.nombre,
                                                        apellidos: profesor.apellidos, foto: profesor.foto})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesor");
    }

    return profesores;
}

export async function getProfesoresContrasenia(contrasenia) {
    let profesores = null;
    try {
        const queryFilter = query(collection(getFirestore(), COL_PROFESORES), where('passwprd', '==', contrasenia));
        getDocs(queryFilter)
        .then(res => profesores = res.docs.map(profesor => ({id: profesor.id, nombre: profesor.nombre,
                                                        apellidos: profesor.apellidos, foto: profesor.foto})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesor");
    }

    return profesores;
}

export async function getProfesoresLogin(nombre, contrasenia) {
    let profesores = null;
    try {
        const queryFilter = query(collection(getFirestore(), COL_PROFESORES), where('nombre', '==', nombre), where('password', '==', contrasenia));
        getDocs(queryFilter)
        .then(res => profesores = res.docs.map(profesor => ({id: profesor.id, nombre: profesor.nombre,
                                                        apellidos: profesor.apellidos, foto: profesor.foto})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesor");
    }

    return profesores;
}

export async function addProfesor(nombre, apellidos, contrasenia, foto) {
    let profesor = {
        nombre: nombre,
        apellidos: apellidos,
        password: contrasenia,
        foto: foto
    }

    let identificacion = null;

    try {
        addDoc(collection(getFirestore(), COL_PROFESORES), profesor)
            .then(({id}) => identificacion = id);
    }
    catch (error) {
        console.log("Ha habido un error al subir los datos del profesor");
    }

    return identificacion;
}

export async function updateProfesor(id, {nombre='', apellidos='', password='', foto=''}) {
    let editaProfesor = {nombre, apellidos, password, foto};
    let profesor = null;

    try {
        let docProfesor = doc(getFirestore(), COL_PROFESORES);
        profesor = getDoc(docProfesor, id);
        
        editaProfesor = editaProfesor.nombre == '' ? profesor.nombre : editaProfesor.nombre;
        editaProfesor = editaProfesor.apellidos == '' ? profesor.apellidos : editaProfesor.apellidos;
        editaProfesor = editaProfesor.password == '' ? profesor.password : editaProfesor.password;
        editaProfesor = editaProfesor.foto == '' ? profesor.foto : editaProfesor.foto;

        updateDoc(docProfesor, {
            ...editaProfesor
        });
    } catch (error) {
        console.log("Problema al actualizar datos de profesor");
    }
}

/**********  FINAL FUNCIONES PROFESOR ********/

/**********  INICIO FUNCIONES ADMINISTRADOR ********/

export async function getAdministradores() {
    let administradores = null;
    
    try {
        const querydb = getFirestore();
        const queryCollection = collection(querydb, COL_ADMINISTRADORES);
        getDocs(queryCollection)
        .then(res => administradores = res.docs.map(admin => ({id: admin.id, nombre: admin.nombre,
                                                        apellidos: admin.apellidos, foto: admin.foto})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del administrador");
    }

    return administradores;
}

export async function getAdministradoresNombre(nombre) {
    let administradores = null;
    try {
        const queryFilter = query(collection(getFirestore(), COL_ADMINISTRADORES), where('nombre', '==', nombre));
        getDocs(queryFilter)
        .then(res => administradores = res.docs.map(admin => ({id: admin.id, nombre: admin.nombre,
                                                        apellidos: admin.apellidos, foto: admin.foto})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del administrador");
    }

    return administradores;
}

export async function getAdministadoresApellidos(apellidos) {
    let administradores = null;
    try {
        const queryFilter = query(collection(getFirestore(), COL_ADMINISTRADORES), where('apellidos', '==', apellidos));
        getDocs(queryFilter)
        .then(res => administradores = res.docs.map(admin => ({id: admin.id, nombre: admin.nombre,
                                                        apellidos: admin.apellidos, foto: admin.foto})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del administrador");
    }

    return administradores;
}

export async function getAdministradoresContrasenia(contrasenia) {
    let administradores = null;
    try {
        const queryFilter = query(collection(getFirestore(), COL_ADMINISTRADORES), where('password', '==', contrasenia));
        getDocs(queryFilter)
        .then(res => administradores = res.docs.map(admin => ({id: admin.id, nombre: admin.nombre,
                                                        apellidos: admin.apellidos, foto: admin.foto})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del administrador");
    }

    return administradores;
}

export async function getAdministradoresLogin(nombre, contrasenia) {
    let administradores = null;
    try {
        const queryFilter = query(collection(getFirestore(), COL_ADMINISTRADORES), where('nombre', '==', nombre), where('password', '==', contrasenia));
        getDocs(queryFilter)
        .then(res => administradores = res.docs.map(admin => ({id: admin.id, nombre: admin.nombre,
                                                        apellidos: admin.apellidos, foto: admin.foto})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del administrador");
    }

    return administradores;
}

export async function addAdministrador(nombre, apellidos, contrasenia, foto) {
    let admin = {
        nombre: nombre,
        apellidos: apellidos,
        password: contrasenia,
        foto: foto
    }

    let identificacion = null;

    try {
        addDoc(collection(getFirestore(), COL_ADMINISTRADORES), admin)
            .then(({id}) => identificacion = id);
    }
    catch (error) {
        console.log("Ha habido un error al subir los datos del administrador");
    }

    return identificacion;
}

export async function updateAdministrador(id, {nombre='', apellidos='', password='', foto=''}) {
    let editaAdministrador = {nombre, apellidos, password, foto};
    let Administrador = null;

    try {
        let docAdministrador = doc(getFirestore(), COL_ADMINISTRADORES);
        Administrador = getDoc(docAdministrador, id);
        
        editaAdministrador = editaAdministrador.nombre == '' ? Administrador.nombre : editaAdministrador.nombre;
        editaAdministrador = editaAdministrador.apellidos == '' ? Administrador.apellidos : editaAdministrador.apellidos;
        editaAdministrador = editaAdministrador.password == '' ? Administrador.password : editaAdministrador.password;
        editaAdministrador = editaAdministrador.foto == '' ? Administrador.foto : editaAdministrador.foto;

        updateDoc(docAdministrador, {
            ...editaAdministrador
        });
    } catch (error) {
        console.log("Problema al actualizar datos de Administrador");
    }
}

/**********  FINAL FUNCIONES ADMINISTRADOR ********/

/**********  INICIO FUNCIONES FORO ********/

export async function getForos() {
    let foros = null;
    
    try {
        const querydb = getFirestore();
        const queryCollection = collection(querydb, COL_FOROS);
        getDocs(queryCollection)
        .then(res => foros = res.docs.map(foro => ({id: foro.id, nombre: foro.nombre})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del foro");
    }

    return foros;
}

export async function getForosNombre(nombre) {
    let foros = null;

    try {
        const queryFilter = query(collection(getFirestore(), COL_FOROS), where('nombre', '==', nombre));
        getDocs(queryFilter)
        .then(res => foros = res.docs.map(foro => ({id: foro.id, nombre: foro.nombre})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del foro");
    }

    return foros;
}

export async function addForo(nombre) {
    let foro = {
        nombre: nombre
    }

    let identificacion = null;

    try {
        addDoc(collection(getFirestore(), COL_FOROS), foro)
            .then(({id}) => identificacion = id);
    }
    catch (error) {
        console.log("Ha habido un error al subir los datos del foro");
    }

    return identificacion;
}

export async function updateForo(id, {nombre=''}) {
    let editaForo = {nombre};
    let foro = null;

    try {
        let docForo = doc(getFirestore(), COL_FOROS);
        foro = getDoc(docForo, id);
        
        editaForo = editaForo.nombre == '' ? foro.nombre : editaForo.nombre;

        updateDoc(docForo, {
            ...editaForo
        });
    } catch (error) {
        console.log("Problema al actualizar datos de foro");
    }
}

/**********  FINAL FUNCIONES FORO ********/

/**********  FINAL FUNCIONES PROFESOR_TAREA ********/

export async function getProfesorTarea() {
    let profesorTarea = null;
    
    try {
        const querydb = getFirestore();
        const queryCollection = collection(querydb, COL_PROFESORES_TAREAS);
        getDocs(queryCollection)
        .then(res => profesorTarea = res.docs.map(i => ({id: i.id, ...i})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesorTarea");
    }

    return profesorTarea;
}

export async function getProfesorTarea_Profesor(id_profesor) {
    let instancia = null;

    try {
        const queryFilter = query(collection(getFirestore(), COL_PROFESORES_TAREAS), where('profesor', '==', id_profesor));
        getDocs(queryFilter)
        .then(res => instancia = res.docs.map(i => ({id: i.id, ...i})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesorTarea");
    }

    return instancia;
}

export async function getProfesorTarea_Tarea(id_tarea) {
    let instancia = null;

    try {
        const queryFilter = query(collection(getFirestore(), COL_PROFESORES_TAREAS), where('tarea', 'in', id_tarea));
        getDocs(queryFilter)
        .then(res => instancia = res.docs.map(i => ({id: i.id, ...i})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesorTarea");
    }

    return instancia;
}

export async function addProfesorTarea(id_profesor, id_tarea) {
    let instancia = {
        profesor: id_profesor,
        tarea: id_tarea
    }

    let identificacion = null;

    try {
        addDoc(collection(getFirestore(), COL_PROFESORES_TAREAS), instancia)
            .then(({id}) => identificacion = id);
    }
    catch (error) {
        console.log("Ha habido un error al subir los datos del profesorTarea");
    }

    return identificacion;
}

export async function updateProfesorTarea(id, {profesor='', tarea=''}) {
    let editaInstancia = {profesor, tarea};
    let instancia = null;

    try {
        let docInstancia = doc(getFirestore(), COL_PROFESORES_TAREAS);
        instancia = getDoc(docInstancia, id);
        
        editaInstancia = editaInstancia.profesor == '' ? instancia.profesor : editaInstancia.profesor;
        editaInstancia = editaInstancia.tarea == '' ? instancia.tarea : editaInstancia.tarea;

        updateDoc(docInstancia, {
            ...editaInstancia
        });
    } catch (error) {
        console.log("Problema al actualizar datos de profesorTarea");
    }
}

/**********  FINAL FUNCIONES PROFESOR_TAREA ********/

/**********  FINAL FUNCIONES ALUMNO_TAREA ********/

export async function getAlumnoTarea() {
    let instancia = null;
    
    try {
        const querydb = getFirestore();
        const queryCollection = collection(querydb, COL_ALUMNOS_TAREAS);
        getDocs(queryCollection)
        .then(res => instancia = res.docs.map(i => ({id: i.id, ...i})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumnoTarea");
    }

    return instancia;
}

export async function getAlumnoTarea_Alumno(id_alumno) {
    let instancia = null;

    try {
        const queryFilter = query(collection(getFirestore(), COL_ALUMNOS_TAREAS), where('alumno', '==', id_alumno));
        getDocs(queryFilter)
        .then(res => instancia = res.docs.map(i => ({id: i.id, ...i})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumnoTarea");
    }

    return instancia;
}

export async function getAlumnoTarea_Tarea(id_tarea) {
    let instancia = null;

    try {
        const queryFilter = query(collection(getFirestore(), COL_ALUMNOS_TAREAS), where('tarea', 'in', id_tarea));
        getDocs(queryFilter)
        .then(res => instancia = res.docs.map(i => ({id: i.id, ...i})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumnoTarea");
    }

    return instancia;
}

export async function addAlumnoTarea(id_alumno, id_tarea) {
    let instancia = {
        alumno: id_alumno,
        tarea: id_tarea
    }

    let identificacion = null;

    try {
        addDoc(collection(getFirestore(), COL_ALUMNOS_TAREAS), instancia)
            .then(({id}) => identificacion = id);
    }
    catch (error) {
        console.log("Ha habido un error al subir los datos del alumnoTarea");
    }

    return identificacion;
}

export async function updateAlumnoTarea(id, {alumno='', tarea=''}) {
    let editaInstancia = {alumno, tarea};
    let instancia = null;

    try {
        let docInstancia = doc(getFirestore(), COL_ALUMNOS_TAREAS);
        instancia = getDoc(docInstancia, id);
        
        editaInstancia = editaInstancia.alumno == '' ? instancia.alumno : editaInstancia.alumno;
        editaInstancia = editaInstancia.tarea == '' ? instancia.tarea : editaInstancia.tarea;

        updateDoc(docInstancia, {
            ...editaInstancia
        });
    } catch (error) {
        console.log("Problema al actualizar datos de alumnoTarea");
    }
}

/**********  FINAL FUNCIONES ALUMNO_TAREA ********/

/**********  INICIO FUNCIONES PROFESOR-FORO ********/

export async function getProfesoresForo() {
    let profesoresForos = null;
    
    try {
        const querydb = getFirestore();
        const queryCollection = collection(querydb, COL_PROFESORES_FOROS);
        getDocs(queryCollection)
        .then(res => profesoresForos = res.docs.map(profesoresForo => ({id: profesoresForo.id, ...profesoresForo})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos de profesoresForo");
    }

    return profesoresForos;
}

export async function getProfesoresForo_Foro(id_foro) {
    let profesoresForos = null;

    try {
        const queryFilter = query(collection(getFirestore(), COL_PROFESORES_FOROS), where('foro', '==', id_foro));
        getDocs(queryFilter)
        .then(res => profesoresForos = res.docs.map(profesoresForo => ({id: profesoresForo.id, ...profesoresForo})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesorForo");
    }

    return profesoresForos
}

export async function getProfesoresForo_Profesores(id_profesores) {
    let profesoresForos = null;

    try {
        const queryFilter = query(collection(getFirestore(), COL_PROFESORES_FOROS), where('profesores', 'in', id_profesores));
        getDocs(queryFilter)
        .then(res => profesoresForos = res.docs.map(profesoresForo => ({id: profesoresForo.id, ...profesoresForo})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesorForo");
    }

    return profesoresForos
}

export async function addProfesoresForo(id_foro, id_profesores) {
    let profesorForo = {
        foro: id_foro,
        profesores: id_profesores
    }

    let identificacion = null;

    try {
        addDoc(collection(getFirestore(), COL_PROFESORES_FOROS), profesorForo)
            .then(({id}) => identificacion = id);
    }
    catch (error) {
        console.log("Ha habido un error al subir los datos del profesorForo");
    }

    return identificacion;
}

export async function updateProfesoresForo(id_foro, {id_profesores=''}) {
    let editaForo = {id_profesores};
    let foro = null;

    try {
        let docForo = doc(getFirestore(), COL_PROFESORES_FOROS);
        foro = getDoc(docForo, id);
        
        editaForo = editaForo.id_profesores == '' ? foro.profesores : editaForo.id_profesores;

        updateDoc(docForo, {
            ...editaForo
        });
    } catch (error) {
        console.log("Problema al actualizar datos de profesorForo");
    }
}

/**********  FINAL FUNCIONES PROFESOR-FORO ********/

/********** INICIO FUNCIONES PARA MULTIMEDIA ********/

// uploadImage= (uri) => {
//   return new Promise((resolve, reject) => {
//     let xhr = new XMLHttpRequest();
//     xhr.onerror = reject;
//     xhr.onreadystatechange = () => {
//       if (xhr.readyState === 4) {
//         resolve(xhr.response);
//       }
//     };

//     xhr.open("GET", uri);
//     xhr.responseType = "blob";
//     xhr.send();
//   });
// };

export function almacenarImagen(imagen) {

    let num_imagenes = storage.child('images').size();
    let nombre_imagen = 'imagen_' + (num_imagenes+1);

  this.uploadImage(imagen)
    .then(resolve => {
      storage
        .ref()
        .child(`images/${nombre_imagen}`);
      ref.put(resolve);
    })
    .catch(error => {
      console.log(error);
    });
}

export function almacenarPictograma(imagen) {
  this.uploadImage(imagen)
    .then(resolve => {
      storage
        .ref()
        .child(`Pictogramas/${nombre}`);
      ref.put(resolve).then(resolve => {
        console.log("Imagen subida correctamente");
      }). catch(error => {
        console.log("Error al subir la imagen");
      });
    })
    .catch(error => {
      console.log(error);
    });
}

export function cargarImagen(imagen) {
  let imagenCargada = null;

  storage
    .ref(`images/${imagen}`)
    .getDownloadURL()
    .then(resolve => {
      imagenCargada = resolve;
    })
    .catch(error => {
      console.log(error);
    })

    return imagenCargada;
}

/********** FINAL FUNCIONES PARA MULTIMEDIA ********/

export const almacenarAlumno = async(nombre,apellidos,visualizacionPreferente)=>{

    try{
      if(nombre === '' || apellidos === '' || visualizacionPreferente === null)
        Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido')
      else{
        const alumno = {
          nombre,
          apellidos,
          visualizacionPreferente
        }
        
        await addDoc(collection(db,'alumnos'),{
          ...alumno
        })
      }
    }catch(error){

    }
  }

export const getAlumnos = async () => {
  try{
    const querySnapshot = await getDocs(collection(db, 'alumnos'));
    const docs = [];
    querySnapshot.forEach((doc) => {
      const { nombre, apellidos, password, jwt, fotoUrl} = doc.data();
      docs.push({
        id:doc.id,
        nombre,
        apellidos,
        password,
        jwt,
        fotoUrl,
      });
    });
    return docs;
  } catch(error){
    console.log(error);
      Alert.alert(error);
  }
}


// Funcion para añadir una tarea a la base de datos. PROBADA FUNCIONA CORRECTAMENTE
export const setTarea = async (titulo,completado,descripcion,fechaInicio,fechaFin,tipo,idAlumno) => {
    try{
        if(titulo === '' || completado === '' || descripcion === '' || fechaInicio === '' || fechaFin === '' || tipo === '' || idAlumno === ''){
          Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
          console.log('te faltan campos');
        }
        else{
          console.log('se crea el objeto');
          const objeto = {
            titulo,
            completado,
            descripcion,
            fechaFin,
            fechaInicio,
            idAlumno,
            tipo
          }
          
          await addDoc(collection(db,'Tarea'),{
            ...objeto
          })
        }
      }catch(error){
        console.log('error' + error);
      }  
}



// export const asignarTareaAlumno = async (idTarea,idAlumno) => {





// }


// PRUEBA REALIZADA. FUNCIONA
export const asignarFeedback = async (idTarea,feedBack) => {
  try{
    if(idTarea === '' || feedBack === ''){
      Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
      console.log('te faltan campos');
    }
    else{

      // Creamos las referencias 
      const tareaRef = doc(db, 'Tarea', String(idTarea));
      
      await updateDoc(tareaRef,{
        Feedback: feedBack,
      })
    }
  }catch(error){
    console.log(error);
  }  
}


// PROBADA Y FUNCIONA. 

export const getTareaId = async (idAlumno) => {

  console.log(idAlumno);

  try {
    const q = query(collection(db,"Tarea"),where("IdAlumno", "==", idAlumno));
    const querySnapshot = await getDocs(q);
    // const querySnapshot = await getDocs(collection(db, 'Tarea'), where('IdAlumno', '==', idAlumno));

    const docs = [];

    for (const tareaDoc of querySnapshot.docs) {
      const { Nombre, Completado, Descripción, FechaInicio, FechaFin, Tipo, IdAlumno, fotoURL } = tareaDoc.data();

      docs.push({
        id: tareaDoc.id,
        Nombre,
        Completado,
        Descripción,
        FechaInicio,
        FechaFin,
        Tipo,
        IdAlumno,
        fotoURL,
      });
    }

    return docs;
  } catch (error) {
    console.log(error);
    Alert.alert(error);
  }
};

export const getTarea = async (idAlumno) => {

  console.log(idAlumno);

  try {
    const q = query(collection(db,"Tarea"),where("IdAlumno", "==", idAlumno));
    const querySnapshot = await getDocs(q);
    // const querySnapshot = await getDocs(collection(db, 'Tarea'), where('IdAlumno', '==', idAlumno));

    const docs = [];

    for (const tareaDoc of querySnapshot.docs) {
      const { Nombre, Completado, Descripción, FechaInicio, FechaFin, Tipo, IdAlumno, fotoURL } = tareaDoc.data();

      docs.push({
        id: tareaDoc.id,
        Nombre,
        Completado,
        Descripción,
        FechaInicio,
        FechaFin,
        Tipo,
        IdAlumno,
        fotoURL,
      });
    }

    return docs;
  } catch (error) {
    console.log(error);
    Alert.alert(error);
  }
};


// EN LA VISTA CON ESTE CÓDIGO SE SACA LA LISTA DE TAREAS

  // const [tareas,setTareas] =useState([]);

  // useEffect(() => {
  //   const listaTareas = async () => {
  //     try{
  //       const Tareas = await getTarea(2);
  //       setTareas(Tareas);
  //       // console.log(Tareas);
  //     } catch(error){
  //       console.log(error);
  //     }
  //   };
  //   listaTareas();
  // }, []);



  // PRUEBA REALIZADA. FUNCIONA
export const setTareaActividad = async(nombre,aula,pasos,idTarea) => {
  try{

    if(nombre === '' || aula === '' || pasos === null || idTarea === ''){
      Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
      console.log('te faltan campos');
    }
    else{

      // Creamos las referencias 
      const pasosRef = doc(db, 'PasosActividad', String(pasos));
      const idTareaRef = doc(db, 'Tarea', String(idTarea));


      const objeto = {
        nombre,
        aula,
        pasos:pasosRef,
        idTarea:idTareaRef
      }

      // Comprobamos que las referencias son instancias de la clase DocumentReference
      if (!(pasosRef instanceof DocumentReference) || !(idTareaRef instanceof DocumentReference)) {
        throw new Error('pasosRef e idTareaRef deben ser instancias de DocumentReference');
      }
      
      await addDoc(collection(db,'Tarea-Actividad'),{
        ...objeto
      })
    }
  }catch(error){
    console.log(error);
  }  
}



export const getTareasActividad = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Tarea-Actividad'));
    const docs=[];

    for (const docu of querySnapshot.docs) {
      const tareaActividadDatos = docu.data();

      docs.push(tareaActividadDatos);
      }

      return docs;
    } catch (error) {
      console.log(error);
  }
};

export const getTareasActividadId = async (idTarea) => {
  try {

    const q = query(collection(db,"Tarea-Actividad"),where("idTarea","==",idTarea));
    const querySnapshot = await getDocs(q);
    const docs=[];

    for (const docu of querySnapshot.docs) {
      const tareaActividadDatos = docu.data();

      docs.push(tareaActividadDatos);
      }

      return docs;
    } catch (error) {
      console.log(error);
  }
};

export const getPasos = async (idActividad) => {
  try {

    const q = query(collection(db,"PasosActividad"),where("idActividad","==",idActividad));
    const querySnapshot = await getDocs(q);
    const docs=[];

    for (const docu of querySnapshot.docs) {
      const tareaActividadDatos = docu.data();

      docs.push(tareaActividadDatos);
      }

      return docs;
    } catch (error) {
      console.log(error);
  }
};




// PRUEBA REALIZADA.FUNCIONA
export const setTareaComanda = async(idTarea,idMenu,pedidos) => {
  try{

    if(menu === '' || pedidos === '' || idMenu === null || idTarea === ''){
      Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
      console.log('te faltan campos');
    }
    else{

      // Creamos las referencias 
      const idMenuRef = doc(db, 'Menu', String(idMenu));
      const idTareaRef = doc(db, 'Tarea', String(idTarea));


      const objeto = {
        nombre,
        aula,
        idMenu:idMenuRef,
        idTarea:idTareaRef
      }

      // Comprobamos que las referencias son instancias de la clase DocumentReference
      if (!(idMenuRef instanceof DocumentReference) || !(idTareaRef instanceof DocumentReference)) {
        throw new Error('idMenuRef e idTareaRef deben ser instancias de DocumentReference');
      }
      
      await addDoc(collection(db,'Tarea-Comanda'),{
        ...objeto
      })
    }
  }catch(error){
    console.log(error);
  }  
}

// ESTA FUNCIÓN SIRVE PARA OBTENER TODAS LAS TAREAS DE COMANDA
// PRUEBA REALIZADA. FUNCIONA
export const getTareasComanda = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Tarea-Comanda'));
    const docs=[];

    for (const docu of querySnapshot.docs) {
      const tareaActividadDatos = docu.data();
      console.log(tareaActividadDatos);

      docs.push(tareaActividadDatos);
      }

      return docs;
    } catch (error) {
      console.log(error);
  }
}


// PRUEBA REALIZADA. FUNCIONA
export const setMenu = async(nombreMenu,idAlimentos) => {
  try{

    if(nombreMenu === '' || idAlimentos === null){
      Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
    }
    else{

      // Hacemos que los idAlimentos sean referencias
      const referenciasAlimentos = idAlimentos.map((idAlimento) => {
        return doc(db, 'Alimentos', idAlimento);
      });

      const objeto = {
        idAlimentos:referenciasAlimentos
      }
      

      // Lo hacemos así para establecer el nombreMenú como el id del documento
      const menuDocRef = doc(db, 'Menu', nombreMenu);

      // Necesitamos poner setDoc para especificar el ID del documento
      await setDoc(menuDocRef, {
        ...objeto
      });
    }
  }catch(error){
    console.log(error);
  }  
}



// PRUEBA REALIZADA. FUNCIONA
export const setAlimento = async (nombreAlimento,imagen) => {
  try{

    if(nombreAlimento === '' || imagen === ''){
      Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
    }
    else{

      const objeto = {
        nombreAlimento,
        imagen
      }
      

      // Lo hacemos así para establecer el nombreMenú como el id del documento
      const menuDocRef = doc(db, 'Alimentos', nombreAlimento);

      // Necesitamos poner setDoc para especificar el ID del documento
      await setDoc(menuDocRef, {
        ...objeto
      });
    }
  }catch(error){
    console.log(error);
  }  
}


// ESTA FUNCION SIRVE PARA OBTENER UN ALIMENTO A TRAVÉS DE SU NOMBRE
// PRUEBA REALIZADA. FUNCIONA
export const getAlimento = async (nombre) => {
  try {
    const alimentosQuery = query(collection(db, 'Alimentos'), where('Nombre', '==', nombre));
    const querySnapshot = await getDocs(alimentosQuery);

    const docs = [];

    querySnapshot.forEach((docu) => {
      const alimentoDatos = docu.data();
      console.log(alimentoDatos);

      docs.push(alimentoDatos);
    });

    return docs;
  } catch (error) {
    console.log(error);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};



export const setTareaInventario = async(idMaterial,lugarLlevar,recogida,idTarea) => {
  try{

    if(idMaterial === '' || lugarLlevar === '' || recogida === null || idTarea === ''){
      Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
      console.log('te faltan campos');
    }
    else{

      // Creamos las referencias 
      const idMaterialRef = doc(db, 'Material', String(idMaterial));
      const idTareaRef = doc(db, 'Tarea', String(idTarea));


      const objeto = {
        idMaterial:idMaterialRef,
        lugarLlevar,
        recogida,
        idTarea:idTareaRef
      }

      // Comprobamos que las referencias son instancias de la clase DocumentReference
      if (!(idMaterialRef instanceof DocumentReference) || !(idTareaRef instanceof DocumentReference)) {
        throw new Error('pasosRef e idTareaRef deben ser instancias de DocumentReference');
      }
      
      await addDoc(collection(db,'Tarea-Inventario'),{
        ...objeto
      })
    }
  }catch(error){
    console.log(error);
  }  
}


// PRUEBA REALIZADA. FUNCIONA
export const setMaterial = async (foto,nombre,stock)=> {
  try{

    if(nombre === '' || foto === '' || stock === ''){
      Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
    }
    else{

      const objeto = {
        nombre,
        foto,
        stock
      }
      
      // Necesitamos poner setDoc para especificar el ID del documento
      await addDoc(collection(db,'Material'),{
        ...objeto
      });
    }
  }catch(error){
    console.log(error);
  }  
}



// FUNCION QUE DEVUELVE EL MATERIAL QUE COINCIDE CON EL NOMBRE DADO
export const getMaterial = async(nombre) => {
  try {
    const materialQuery = query(collection(db, 'Material'), where('nombre', '==', nombre));
    const querySnapshot = await getDocs(materialQuery);

    const docs = [];

    querySnapshot.forEach((docu) => {
      const materialDatos = docu.data();
      console.log(materialDatos);

      docs.push(materialDatos);
    });

    return docs;
  } catch (error) {
    console.log(error);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
}


// FUNCION QUE DEVUELVE LOS DATOS DE UN MATERIAL CORRESPONDIENTE A UN ID
// PRUEBA REALIZADA. FUNCIONA
// export const getMaterialId = async(id) => {
//   try {
//     const materialQuery = query(collection(db, 'Material'), where('id', '==', id));
//     const querySnapshot = await getDocs(materialQuery);

//     const docs = [];

//     querySnapshot.forEach((docu) => {
//       const materialDatos = docu.data();
//       console.log(materialDatos);

//       docs.push(materialDatos);
//     });

//     return docs;
//   } catch (error) {
//     console.log(error);
//     throw error; // Lanza el error para que pueda ser manejado por el llamador
//   }
// }



// FUNCION QUE DEVUELVE TODOS LOS MATERIALES QUE TENEMOS EN LA BASE DE DATOS
// PRUEBA REALIZADA. FUNCIONA
export const getMateriales = async() => {
  try {
    const materialQuery = query(collection(db, 'Material'));
    const querySnapshot = await getDocs(materialQuery);

    const docs = [];

    querySnapshot.forEach((docu) => {
      const materialDatos = docu.data();
      console.log(materialDatos);

      docs.push(materialDatos);
    });

    return docs;
  } catch (error) {
    console.log(error);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
}


// FUNCIONA QUE DEVULEVE TODAS LAS TAREAS DEL INVENTARIO
// PRUEBA REALIZADA. FUNCIONA
export const getTareasInventario = async() => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Tarea-Inventario'));
    const docs=[];

    for (const docu of querySnapshot.docs) {
      const tareaActividadDatos = docu.data();
      console.log(tareaActividadDatos);

      docs.push(tareaActividadDatos);
      }

      return docs;
    } catch (error) {
      console.log(error);
  }
}
