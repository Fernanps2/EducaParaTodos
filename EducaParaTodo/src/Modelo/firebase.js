import React, {useEffect, useState} from 'react';
import {
  Platform,
  Alert,
} from "react-native";
import Swal from "sweetalert2";

import { getFirestore, collection, getDocs, doc, getDoc, updateDoc, query, where, deleteDoc } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import {getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject} from 'firebase/storage';
//import {v4} from 'uuid';
// import {getStorage, ref, uploadFile} from '@react-native-firebase/storage'


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
const storage = getStorage(AppFirebase);
const db = getFirestore(AppFirebase);


//valores de las colecciones en la base de datos
const COL_ALUMNOS = 'alumnos';
const COL_PROFESORES = 'profesores';
const COL_ADMINISTRADORES = 'administradores';
const COL_FOROS = 'foros';
const COL_PROFESORES_FOROS = 'profesoresForos';
const COL_ALUMNOS_FOROS = 'alumnosForos';
const COL_PROFESORES_TAREAS = 'profesoresTareas';
const COL_ALUMNOS_TAREAS = 'alumnosTareas';
const COL_MENSAJES = 'mensajes';

//valores para las carpetas de archivos
const IMAGENES = 'Imagenes/';
const PICTOGRAMAS = 'Pictogramas/';
const VIDEOS = 'Videos/';
const EMOTICONOS = 'Emoticonos/';
const PERSONAS = 'Personas/';
const LOGIN = 'ImagenesLogin/';
const MATERIALES = 'materiales/';
const TIPOS_MATERIAL = 'Tipo_Materiales/';

/**********  INICIO FUNCIONES ALUMNO ********/

export async function getAlumnos() {
    let docs = [];
    try {
        const queryFilter = (collection(db, COL_ALUMNOS));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { nombre, apellidos, visualizacionPreferente, foto} = doc.data();
            docs.push({
              id:doc.id,
              nombre,
              apellidos,
              visualizacionPreferente,
              foto,
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumno", error);
    }

    return docs;
}

export async function getAlumnosNombre(nombre) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_ALUMNOS), where('nombre', '==', nombre));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { nombre, apellidos, visualizacionPreferente, foto} = doc.data();
            docs.push({
              id:doc.id,
              nombre,
              apellidos,
              visualizacionPreferente,
              foto,
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumno", error);
    }

    return docs;
}

export async function getAlumnosApellidos(apellidos) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_ALUMNOS), where('apellidos', '==', apellidos));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { nombre, apellidos, visualizacionPreferente, foto} = doc.data();
            docs.push({
              id:doc.id,
              nombre,
              apellidos,
              visualizacionPreferente,
              foto,
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumno", error);
    }

    return docs;
}

export async function getAlumnosContrasenia(contrasenia) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_ALUMNOS), where('password', '==', contrasenia));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { nombre, apellidos, visualizacionPreferente, foto} = doc.data();
            docs.push({
              id:doc.id,
              nombre,
              apellidos,
              visualizacionPreferente,
              foto,
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumno", error);
    }

    return docs;
}

export async function getAlumnosVisualizacionPredefinida(visualizacion) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_ALUMNOS), where('visualizacionPredefinida', '==', visualizacion));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { nombre, apellidos, visualizacionPreferente, foto} = doc.data();
            docs.push({
              id:doc.id,
              nombre,
              apellidos,
              visualizacionPreferente,
              foto,
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumno", error);
    }

    return docs;
}

export async function getAlumnosLogin(nombre, contrasenia) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_ALUMNOS), where('nombre', '==', nombre), where('password', '==', contrasenia));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { nombre, apellidos, visualizacionPreferente, foto} = doc.data();
            docs.push({
              id:doc.id,
              nombre,
              apellidos,
              visualizacionPreferente,
              foto,
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumno", error);
    }

    return docs;
}

export async function getAlumnoID(id) {
    let instancia = null;
    try {
        const doc = doc(db, COL_ALUMNOS, id);
        const docSnapshot = await getDoc(doc);

        if (docSnapshot.exists()) {
            instancia = docSnapshot.data();
            console.log("Se ha recibido la información");
        } else {
            console.log("No existe la instancia");
        }
    } catch (error) {
        console.log(error);
    }

    return instancia;
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

    console.log(alumno);

    try {
        await addDoc(collection(db, COL_ALUMNOS), {
            ...alumno
        })
            .then(({id}) => identificacion = id);
    }
    catch (error) {
        console.log("Ha habido un error al subir los datos del alumno", error);
    }

    return identificacion;
}

export async function updateAlumno(id, nombre, apellidos, foto, visualizacionPreferente) {
    let editaAlumno = {
        nombre: nombre, 
        apellidos: apellidos, 
        visualizacionPreferente: visualizacionPreferente.split(',').map((item) => item.trim()), 
        foto: foto
    };
    let alumno = null;

    try {
        let docAlumno = doc(db, COL_ALUMNOS, id);
        const docSnapshot = await getDoc(docAlumno);
        
        if (docSnapshot.exists()) {
            alumno = docSnapshot.data();
            console.log(editaAlumno);
            //console.log(alumno.visualizacionPreferente);
            //console.log(editaAlumno.visualizacionPreferente);
            
            editaAlumno.nombre = editaAlumno.nombre == '' ? alumno.nombre : editaAlumno.nombre;
            editaAlumno.apellidos = editaAlumno.apellidos == '' ? alumno.apellidos : editaAlumno.apellidos;
            editaAlumno.visualizacionPreferente = editaAlumno.visualizacionPreferente == '' ? alumno.visualizacionPreferente : editaAlumno.visualizacionPreferente;
            editaAlumno.foto = editaAlumno.foto == '' ? alumno.foto : editaAlumno.foto;


            await updateDoc(docAlumno, {
                ...editaAlumno
            })
        }
    } catch (error) {
        console.log("Hubo un error al actualizar datos de alumno ", error);
    }
}

export async function deleteAlumno(id) {
    try {
        const docAlumno = doc(db, COL_ALUMNOS, id);
        const docSnapshot = await getDoc(docAlumno);

        if (docSnapshot.exists()) {
            await deleteDoc(docSnapshot.ref);
            console.log("Se ha borrado el alumno correctamente");
        }
        else {
            console.log("No existe el alumno");
        }
    } catch(error) {
        console.log("Error al borrar alumno", error);
    }
}

/**********  FINAL FUNCIONES ALUMNO ********/

/**********  INICIO FUNCIONES PROFESOR ********/

export async function getProfesores() {
    let docs = [];
    try {
        const queryFilter = collection(db, COL_PROFESORES);
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { nombre, apellidos, foto, aula} = doc.data();
            docs.push({
              id:doc.id,
              nombre,
              apellidos,
              foto,
              aula,
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesores", error);
    }

    return docs;
}

export async function getProfesoresNombre(nombre) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_PROFESORES), where('nombre', '==', nombre));
        const querySnapshot = await getDocs(queryFilter);
        
        for (const doc of querySnapshot.docs) {
            const { nombre, apellidos, foto} = doc.data();
            docs.push({
              id:doc.id,
              nombre,
              apellidos,
              foto,
            });
        } 

        console.log('los documentos son: ' + JSON.stringify(docs));
        return docs;       
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesores", error);
    }

    return docs;
}

export async function getProfesoresApellidos(apellidos) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_PROFESORES), where('apellidos', '==', apellidos));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { nombre, apellidos, foto} = doc.data();
            docs.push({
              id:doc.id,
              nombre,
              apellidos,
              foto,
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesores", error);
    }

    return docs;
}

export async function getProfesoresContrasenia(contrasenia) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_PROFESORES), where('password', '==', contrasenia));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { nombre, apellidos, foto} = doc.data();
            docs.push({
              id:doc.id,
              nombre,
              apellidos,
              foto,
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesores", error);
    }

    return docs;
}

export async function getProfesoresLogin(nombre, contrasenia) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_PROFESORES), where('nombre', '==', nombre), where('password', '==', contrasenia));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { nombre, apellidos, foto} = doc.data();
            docs.push({
              id:doc.id,
              nombre,
              apellidos,
              foto,
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesores", error);
    }

    return docs;
}

export async function getProfesorID(id) {
    let instancia = null;
    try {
        const docRef = doc(db, COL_PROFESORES, id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            instancia = docSnapshot.data();
            console.log("Se ha recibido la información");
        } else {
            console.log("No existe la instancia");
        }
    } catch (error) {
        console.log(error);
    }

    return instancia;
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
        addDoc(collection(db, COL_PROFESORES), {
            ...profesor
        })
            .then(({id}) => identificacion = id);
    }
    catch (error) {
        console.log("Ha habido un error al subir los datos del profesor");
    }

    return identificacion;
}

export async function updateProfesor(id, nombre, apellidos, password, foto) {
  console.log('id prof: ' + id);
    let editaProfesor = {
        nombre,
        apellidos: apellidos,
        password,
        foto
    };

    let profesor = null;

    try {
        let docProfesor = doc(db, COL_PROFESORES, id);
        const docSnapshot = await getDoc(docProfesor);
        
        if (docSnapshot.exists()) {
            profesor = docSnapshot.data();
            console.log('datos bd: ' + profesor.apellidos);
            console.log('edita apellidos: ' + editaProfesor.apellidos);

          
            editaProfesor.nombre = editaProfesor.nombre == '' ? profesor.nombre : editaProfesor.nombre;
            editaProfesor.apellidos = editaProfesor.apellidos == '' ? profesor.apellidos : editaProfesor.apellidos;
            editaProfesor.password = editaProfesor.password == '' ? profesor.password : editaProfesor.password;
            editaProfesor.foto = editaProfesor.foto == '' ? profesor.foto : editaProfesor.foto;

            console.log('nombre editado: ' + editaProfesor.nombre);
            console.log('apellidos editado: ' + editaProfesor.apellidos);
            console.log('password editado: ' + editaProfesor.password);
            console.log('foto editado: ' + editaProfesor.foto);

            await updateDoc(docProfesor, {
                ...editaProfesor
            });
        }
    } catch (error) {
        console.log("Problema al actualizar datos de profesor" + error);
    }
}

export async function updateProfesorAdmin(id, nombre, apellidos, foto) {
    let editaProfesor = {
        nombre: nombre, 
        apellidos: apellidos, 
        foto: foto
    };
    let profesor = null;

    try {
        let docProfesor = doc(db, COL_PROFESORES, id);
        const docSnapshot = await getDoc(docProfesor);
        
        if (docSnapshot.exists()) {
            profesor = docSnapshot.data();

            editaProfesor.nombre = editaProfesor.nombre == '' ? profesor.nombre : editaProfesor.nombre;
            editaProfesor.apellidos = editaProfesor.apellidos == '' ? profesor.apellidos : editaProfesor.apellidos;
            editaProfesor.foto = editaProfesor.foto == '' ? profesor.foto : editaProfesor.foto;

            await updateDoc(docProfesor, {
                ...editaProfesor
            });
        }
    } catch (error) {
        console.log("Problema al actualizar datos de profesor");
    }
}

export async function deleteProfesor(id) {
    try {
        const docProfesor = doc(db, COL_PROFESORES, id);
        const docSnapshot = await getDoc(docProfesor);

        if (docSnapshot.exists()) {
            await deleteDoc(docSnapshot.ref);
            console.log("Se ha borrado el profesor correctamente");
        }
        else {
            console.log("No existe el profesor");
        }
    } catch(error) {
        console.log("Error al borrar profesor", error);
    }
}

/**********  FINAL FUNCIONES PROFESOR ********/

/**********  INICIO FUNCIONES ADMINISTRADOR ********/

export async function getAdministradores() {
    let docs = [];
    try {
        const queryFilter = collection(db, COL_ADMINISTRADORES);
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { nombre, apellidos, foto} = doc.data();
            docs.push({
              id:doc.id,
              nombre,
              apellidos,
              foto,
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del administrador", error);
    }

    return docs;
}

export async function getAdministradoresNombre(nombre) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_ADMINISTRADORES), where('nombre', '==', nombre));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { nombre, apellidos, foto} = doc.data();
            docs.push({
              id:doc.id,
              nombre,
              apellidos,
              foto,
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del administrador", error);
    }

    return docs;
}

export async function getAdministadoresApellidos(apellidos) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_ADMINISTRADORES), where('apellidos', '==', apellidos));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { nombre, apellidos, foto} = doc.data();
            docs.push({
              id:doc.id,
              nombre,
              apellidos,
              foto,
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del administrador", error);
    }

    return docs;
}

export async function getAdministradoresContrasenia(contrasenia) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_ADMINISTRADORES), where('password', '==', contrasenia));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { nombre, apellidos, foto} = doc.data();
            docs.push({
              id:doc.id,
              nombre,
              apellidos,
              foto,
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del administrador", error);
    }

    return docs;
}

export async function getAdministradoresLogin(nombre, contrasenia) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_ADMINISTRADORES), where('nombre', '==', nombre), where('password', '==', contrasenia));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { nombre, apellidos, foto} = doc.data();
            docs.push({
              id:doc.id,
              nombre,
              apellidos,
              foto,
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del administrador", error);
    }

    return docs;
}

export async function getAdministradorID(id) {
    let instancia = null;
    try {
        const doc = doc(db, COL_ADMINISTRADORES, id);
        const docSnapshot = await getDoc(doc);

        if (docSnapshot.exists()) {
            instancia = docSnapshot.data();
            console.log("Se ha recibido la información");
        } else {
            console.log("No existe la instancia");
        }
    } catch (error) {
        console.log(error);
    }

    return instancia;
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
        addDoc(collection(db, COL_ADMINISTRADORES), {
            ...admin
        })
            .then(({id}) => identificacion = id);
    }
    catch (error) {
        console.log("Ha habido un error al subir los datos del administrador");
    }

    return identificacion;
}

export async function updateAdministrador(id, nombre, apellidos, password, foto) {
    let editaAdministrador = {
        nombre: nombre, 
        apellidos: apellidos, 
        password: password, 
        foto: foto
    };
    let Administrador = null;

    try {
        let docAdministrador = doc(db, COL_ADMINISTRADORES, id);
        const docSnapshot = await getDoc(docAdministrador);
        
        if (docSnapshot.exists()) {
            Administrador = docSnapshot.data();
            editaAdministrador.nombre = editaAdministrador.nombre == '' ? Administrador.nombre : editaAdministrador.nombre;
            editaAdministrador.apellidos = editaAdministrador.apellidos == '' ? Administrador.apellidos : editaAdministrador.apellidos;
            editaAdministrador.password = editaAdministrador.password == '' ? Administrador.password : editaAdministrador.password;
            editaAdministrador.foto = editaAdministrador.foto == '' ? Administrador.foto : editaAdministrador.foto;

            await updateDoc(docAdministrador, {
                ...editaAdministrador
            });
        }
    } catch (error) {
        console.log("Problema al actualizar datos de Administrador");
    }
}

export async function deleteAdministrador(id) {
    try {
        const docAdministrador = doc(db, COL_ADMINISTRADORES, id);
        const docSnapshot = await getDoc(docAdministrador);

        if (docSnapshot.exists()) {
            await deleteDoc(docSnapshot.ref);
            console.log("Se ha borrado el administrador correctamente");
        }
        else {
            console.log("No existe el administrador");
        }
    } catch(error) {
        console.log("Error al borrar administrador", error);
    }
}

/**********  FINAL FUNCIONES ADMINISTRADOR ********/

/**********  INICIO FUNCIONES FORO ********/

export async function getForos() {
    let docs = [];
    try {
        const queryFilter = collection(db, COL_FOROS);
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { nombre } = doc.data();
            docs.push({
              id:doc.id,
              nombre
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del foro", error);
    }

    return docs;
}

export async function getForosNombre(nombre) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_FOROS), where('nombre', '==', nombre));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { nombre } = doc.data();
            docs.push({
              id:doc.id,
              nombre
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del foro", error);
    }

    return docs;
}

export async function getForoID(id) {
    let instancia = null;
    try {
        const doc = doc(db, COL_FOROS, id);
        const docSnapshot = await getDoc(doc);

        if (docSnapshot.exists()) {
            instancia = docSnapshot.data();
            console.log("Se ha recibido la información");
        } else {
            console.log("No existe la instancia");
        }
    } catch (error) {
        console.log(error);
    }

    return instancia;
}

export async function addForo(nombre) {
    let foro = {
        nombre: nombre
    }

    let identificacion = null;

    try {
        addDoc(collection(db, COL_FOROS), {
            ...foro
        })
            .then(({id}) => identificacion = id);
    }
    catch (error) {
        console.log("Ha habido un error al subir los datos del foro");
    }

    return identificacion;
}

export async function updateForo(id, nombre) {
    let editaForo = {
        nombre:nombre
    };

    let foro = null;

    try {
        let docForo = doc(db, COL_FOROS, id);
        const docSnapshot = await getDoc(docForo);
        
        if (docSnapshot.exists()) {
            foro = docSnapshot.data();

            editaForo.nombre = editaForo.nombre == '' ? foro.nombre : editaForo.nombre;

            updateDoc(docForo, {
                ...editaForo
            });
        }
    } catch (error) {
        console.log("Problema al actualizar datos de foro");
    }
}

export async function deleteForo(id) {
    try {
        const docForo = doc(db, COL_FOROS, id);
        const docSnapshot = await getDoc(docForo);

        if (docSnapshot.exists()) {
            await deleteDoc(docSnapshot.ref);
            console.log("Se ha borrado el foro correctamente");
        }
        else {
            console.log("No existe el foro");
        }
    } catch(error) {
        console.log("Error al borrar foro", error);
    }
}

/**********  FINAL FUNCIONES FORO ********/

/**********  FINAL FUNCIONES PROFESOR_TAREA ********/

export async function getProfesorTarea() {
    let docs = [];
    try {
        const queryFilter = collection(db, COL_PROFESORES_TAREAS);
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { profesor, tarea } = doc.data();
            docs.push({
              id:doc.id,
              profesor,
              tarea
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesorTarea", error);
    }

    return docs;
}

export async function getProfesorTarea_Profesor(id_profesor) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_PROFESORES_TAREAS), where('profesor', '==', id_profesor));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { profesor, tarea } = doc.data();
            docs.push({
              id:doc.id,
              profesor,
              tarea
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesorTarea", error);
    }

    return docs;
}

export async function getProfesorTarea_Tarea(id_tarea) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_PROFESORES_TAREAS), where('tarea', 'in', id_tarea));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { profesor, tarea } = doc.data();
            docs.push({
              id:doc.id,
              profesor,
              tarea
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesorTarea", error);
    }

    return docs;
}

export async function getProfesorTareaID(id) {
    let instancia = null;
    try {
        const doc = doc(db, COL_PROFESORES_TAREAS, id);
        const docSnapshot = await getDoc(doc);

        if (docSnapshot.exists()) {
            instancia = docSnapshot.data();
            console.log("Se ha recibido la información");
        } else {
            console.log("No existe la instancia");
        }
    } catch (error) {
        console.log(error);
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
        addDoc(collection(db, COL_PROFESORES_TAREAS), {
            ...instancia
        })
            .then(({id}) => identificacion = id);
    }
    catch (error) {
        console.log("Ha habido un error al subir los datos del profesorTarea");
    }

    return identificacion;
}

export async function updateProfesorTarea(id, profesor, tarea) {
    let editaInstancia = {
        profesor: profesor, 
        tarea: tarea
    };
    let instancia = null;

    try {
        let docInstancia = doc(db, COL_PROFESORES_TAREAS, id);
        const docSnapshot = await getDoc(docInstancia);
        
        if (docSnapshot.exists()) {
            instancia = docSnapshot.exists();
            editaInstancia.profesor = editaInstancia.profesor == '' ? instancia.profesor : editaInstancia.profesor;
            editaInstancia.tarea = editaInstancia.tarea == '' ? instancia.tarea : editaInstancia.tarea;

            updateDoc(docInstancia, {
                ...editaInstancia
            });
        }
    } catch (error) {
        console.log("Problema al actualizar datos de profesorTarea");
    }
}

export async function deleteProfesorTarea(id) {
    try {
        const doc = doc(db, COL_PROFESORES_TAREAS, id);
        const docSnapshot = await getDoc(doc);

        if (docSnapshot.exists()) {
            await deleteDoc(docSnapshot.ref);
            console.log("Se ha borrado el profesorTarea correctamente");
        }
        else {
            console.log("No existe el profesorTarea");
        }
    } catch(error) {
        console.log("Error al borrar profesorTarea", error);
    }
}

/**********  FINAL FUNCIONES PROFESOR_TAREA ********/

/**********  FINAL FUNCIONES ALUMNO_TAREA ********/

export async function getAlumnoTarea() {
    let docs = [];
    try {
        const queryFilter = collection(db, COL_ALUMNOS_TAREAS);
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { alumno, tarea } = doc.data();
            docs.push({
              id:doc.id,
              alumno,
              tarea
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumnosTarea", error);
    }

    return docs;
}

export async function getAlumnoTarea_Alumno(id_alumno) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_ALUMNOS_TAREAS), where('alumno', '==', id_alumno));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { alumno, tarea } = doc.data();
            docs.push({
              id:doc.id,
              alumno,
              tarea
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumnoTarea", error);
    }

    return docs;
}

export async function getAlumnoTarea_Tarea(id_tarea) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_ALUMNOS_TAREAS), where('tarea', 'in', id_tarea));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { alumno, tarea } = doc.data();
            docs.push({
              id:doc.id,
              alumno,
              tarea
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumnoTarea", error);
    }

    return docs;
}

export async function getAlumnoTareaID(id) {
    let instancia = null;
    try {
        const doc = doc(db, COL_ALUMNOS_TAREAS, id);
        const docSnapshot = await getDoc(doc);

        if (docSnapshot.exists()) {
            instancia = docSnapshot.data();
            console.log("Se ha recibido la información");
        } else {
            console.log("No existe la instancia");
        }
    } catch (error) {
        console.log(error);
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
        addDoc(collection(db, COL_ALUMNOS_TAREAS), {
            ...instancia
        })
            .then(({id}) => identificacion = id);
    }
    catch (error) {
        console.log("Ha habido un error al subir los datos del alumnoTarea");
    }

    return identificacion;
}

export async function updateAlumnoTarea(id, alumno, tarea) {
    let editaInstancia = {
        alumno: alumno, 
        tarea: tarea
    };
    let instancia = null;

    try {
        let docInstancia = doc(db, COL_ALUMNOS_TAREAS, id);
        const docSnapshot = await getDoc(docInstancia);
        
        if (docSnapshot.exists()) {
            instancia = docSnapshot.data();
            editaInstancia.alumno = editaInstancia.alumno == '' ? instancia.alumno : editaInstancia.alumno;
            editaInstancia.tarea = editaInstancia.tarea == '' ? instancia.tarea : editaInstancia.tarea;

            updateDoc(docInstancia, {
                ...editaInstancia
            });
        }
    } catch (error) {
        console.log("Problema al actualizar datos de alumnoTarea");
    }
}

export async function deleteAlumnoTarea(id) {
    try {
        const doc = doc(db, COL_ALUMNOS_TAREAS, id);
        const docSnapshot = await getDoc(doc);

        if (docSnapshot.exists()) {
            await deleteDoc(docSnapshot.ref);
            console.log("Se ha borrado el alumnoTarea correctamente");
        }
        else {
            console.log("No existe el alumnoTarea");
        }
    } catch(error) {
        console.log("Error al borrar alumnoTarea", error);
    }
}

export async function getAlumnoVisualizacionTarea (id){
    let dato = '';
    try {
        const docu = doc(db, COL_TAREAS, id);
        const docSnapshot = await getDoc(docu);

        if (docSnapshot.exists()) {
            const {visualizacion} = docSnapshot.data();
            dato = visualizacion;            
        } else {
            console.log("No existe la instancia");
        }
    } catch (error) {
        console.log(error);
    }

    return dato;
}

/**********  FINAL FUNCIONES ALUMNO_TAREA ********/

/**********  INICIO FUNCIONES PROFESOR-FORO ********/

export async function getProfesoresForo() {
    let docs = [];
    try {
        const queryFilter = collection(db, COL_PROFESORES_FOROS);
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { foro, profesor } = doc.data();
            docs.push({
              id:doc.id,
              foro,
              profesor
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesorForo", error);
    }

    return docs;
}

export async function getProfesoresForo_Foro(id_foro) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_PROFESORES_FOROS), where('foro', '==', id_foro));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { foro, profesor } = doc.data();
            docs.push({
              id:doc.id,
              foro,
              profesor
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesorForo", error);
    }

    return docs;
}

export async function getProfesoresForo_Profesores(id_profesores) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_PROFESORES_FOROS), where('profesor', 'in', id_profesores));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { foro, profesor } = doc.data();
            docs.push({
              id:doc.id,
              foro,
              profesor
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesorForo", error);
    }

    return docs;
}

export async function getProfesorForoID(id) {
    let instancia = null;
    try {
        const doc = doc(db, COL_PROFESORES_FOROS, id);
        const docSnapshot = await getDoc(doc);

        if (docSnapshot.exists()) {
            instancia = docSnapshot.data();
            console.log("Se ha recibido la información");
        } else {
            console.log("No existe la instancia");
        }
    } catch (error) {
        console.log(error);
    }

    return instancia;
}

export async function addProfesoresForo(id_foro, id_profesores) {
    let profesorForo = {
        foro: id_foro,
        profesores: id_profesores
    }

    let identificacion = null;

    try {
        addDoc(collection(db, COL_PROFESORES_FOROS), {
            ...profesorForo
        })
            .then(({id}) => identificacion = id);
    }
    catch (error) {
        console.log("Ha habido un error al subir los datos del profesorForo");
    }

    return identificacion;
}

export async function updateProfesoresForo(id, profesores, foro) {
    let editaForo = {
        foro: foro,
        profesores: profesores
    };
    let foroDoc = null;

    try {
        let docForo = doc(db, COL_PROFESORES_FOROS, id);
        const docSnapshot = await getDoc(docForo);
        
        if (docSnapshot.exists()) {
            foroDoc = docSnapshot.data();
            editaForo.foro = editaForo.foro == '' ? foroDoc.foro : editaForo.foro;
            editaForo.profesores = editaForo.profesores == '' ? foroDoc.profesores : editaForo.profesores;

            updateDoc(docForo, {
                ...editaForo
            });
        }
    } catch (error) {
        console.log("Problema al actualizar datos de profesorForo");
    }
}

export async function deleteProfesorForo(id) {
    try {
        const doc = doc(db, COL_PROFESORES_FOROS, id);
        const docSnapshot = await getDoc(doc);

        if (docSnapshot.exists()) {
            await deleteDoc(docSnapshot.ref);
            console.log("Se ha borrado el profesorForo correctamente");
        }
        else {
            console.log("No existe el profesorForo");
        }
    } catch(error) {
        console.log("Error al borrar profesorForo", error);
    }
}

/**********  FINAL FUNCIONES PROFESOR-FORO ********/

/********** INICIO FUNCIONES ALUMNO-FORO *********/

export async function getAlumnosForo() {
    let docs = [];
    try {
        const queryFilter = collection(db, COL_ALUMNOS_FOROS);
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { foro, alumno } = doc.data();
            docs.push({
              id:doc.id,
              foro,
              alumno
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumnoForo", error);
    }

    return docs;
}

export async function getAlumnosForo_Foro(id_foro) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_ALUMNOS_FOROS), where('foro', '==', id_foro));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { foro, alumno } = doc.data();
            docs.push({
              id:doc.id,
              foro,
              alumno
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumnoForo", error);
    }

    return docs;
}

export async function getAlumnosForo_Alumnos(id_alumnos) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_ALUMNOS_FOROS), where('alumno', 'in', id_alumnos));
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { foro, alumno } = doc.data();
            docs.push({
              id:doc.id,
              foro,
              alumno
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumnoForo", error);
    }

    return docs;
}

export async function getAlumnoForoID(id) {
    let instancia = null;
    try {
        const doc = doc(db, COL_ALUMNOS_FOROS, id);
        const docSnapshot = await getDoc(doc);

        if (docSnapshot.exists()) {
            instancia = docSnapshot.data();
            console.log("Se ha recibido la información");
        } else {
            console.log("No existe la instancia");
        }
    } catch (error) {
        console.log(error);
    }

    return instancia;
}

export async function addAlumnosForo(id_foro, id_alumnos) {
    let alumnoForo = {
        foro: id_foro,
        alumno: id_alumnos
    }

    let identificacion = null;

    try {
        addDoc(collection(db, COL_ALUMNOS_FOROS), {
            ...alumnoForo
        })
            .then(({id}) => identificacion = id);
    }
    catch (error) {
        console.log("Ha habido un error al subir los datos del alumnoForo");
    }

    return identificacion;
}

export async function updateAlumnosForo(id, alumno, foro) {
    let editaForo = {
        foro: foro, 
        alumno: alumno
    };
    let foroDoc = null;

    try {
        let docForo = doc(db, COL_ALUMNOS_FOROS, id);
        const docSnapshot = await getDoc(docForo);
        
        if (docSnapshot.exists()) {
            docForo = docSnapshot.data();
            editaForo.foro = editaForo.foro == '' ? foro.foro : editaForo.foro;
            editaForo.alumno = editaForo.alumno == '' ? foroDoc.alumno : editaForo.alumno;

            updateDoc(docForo, {
                ...editaForo
            });
        }
    } catch (error) {
        console.log("Problema al actualizar datos de alumnoForo");
    }
}

export async function deleteAlumnoForo(id) {
    try {
        const doc = doc(db, COL_ALUMNOS_FOROS, id);
        const docSnapshot = await getDoc(doc);

        if (docSnapshot.exists()) {
            await deleteDoc(docSnapshot.ref);
            console.log("Se ha borrado el alumnoForo correctamente");
        }
        else {
            console.log("No existe el alumnoForo");
        }
    } catch(error) {
        console.log("Error al borrar alumnoForo", error);
    }
}

/********** FINAL FUNCIONES ALUMNO-FORO **********/

/**********  INICIO FUNCIONES MENSAJES ********/

export async function getMensajes() {
    let docs = [];
    try {
        const queryFilter = collection(db, COL_MENSAJES);
        const querySnapshot = await getDocs(queryFilter)
        
        for (const doc of querySnapshot.docs) {
            const { profesor, mensaje, aula, fecha, hora } = doc.data();
            docs.push({
              id:doc.id,
              profesor,
              mensaje,
              aula,
              fecha,
              hora
            });
        }        
    } catch (error) {
        console.log("Ha habido un error al recoger los datos de mensajes", error);
    }

    return docs;
}

export async function getMensajeID(id) {
    let instancia = null;
    try {
        const doc = doc(db, COL_MENSAJES, id);
        const docSnapshot = await getDoc(doc);

        if (docSnapshot.exists()) {
            instancia = docSnapshot.data();
            console.log("Se ha recibido la información");
        } else {
            console.log("No existe la instancia");
        }
    } catch (error) {
        console.log(error);
    }

    return instancia;
}

export async function addMensaje(id_profesor, mensaje, aula, fecha, hora) {
    let mensajeDoc = {
        profesor: id_profesor,
        mensaje: mensaje,
        aula: aula,
        fecha: fecha,
        hora: hora
    }

    let identificacion = null;

    try {
        addDoc(collection(db, COL_MENSAJES), {
            ...mensajeDoc
        })
            .then(({id}) => identificacion = id);
    }
    catch (error) {
        console.log("Ha habido un error al subir los datos de mensaje");
    }

    return identificacion;
}

export async function updateMensaje(id, id_profe, mensajeA, aula, fecha, hora) {
    let editaMensaje = {
        profesor: id_profe,
        mensaje: mensajeA,
        aula: aula,
        fecha: fecha,
        hora: hora
    };

    let mensaje = null;

    try {
        let docMensaje = doc(db, COL_MENSAJES, id);
        const docSnapshot = await getDoc(docMensaje);
        
        if (docSnapshot.exists()) {
            mensaje = docSnapshot.data();

            editaMensaje.profesor = editaMensaje.profesor == '' ? mensaje.profesor : editaMensaje.profesor;
            editaMensaje.mensaje = editaMensaje.mensaje == '' ? mensaje.mensaje : editaMensaje.mensaje;
            editaMensaje.aula = editaMensaje.aula == '' ? mensaje.aula : editaMensaje.aula;
            editaMensaje.fecha = editaMensaje.fecha == '' ? mensaje.fecha : editaMensaje.fecha;
            editaMensaje.hora = editaMensaje.hora == '' ? mensaje.hora : editaMensaje.hora;

            updateDoc(docMensaje, {
                ...editaMensaje
            });
        }
    } catch (error) {
        console.log("Problema al actualizar datos de mensaje");
    }
}

export async function deleteMensaje(id) {
    try {
        const docMensaje = doc(db, COL_MENSAJES, id);
        const docSnapshot = await getDoc(docMensaje);

        if (docSnapshot.exists()) {
            await deleteDoc(docSnapshot.ref);
            console.log("Se ha borrado el mensaje correctamente");
        }
        else {
            console.log("No existe el mensaje");
        }
    } catch(error) {
        console.log("Error al borrar mensaje", error);
    }
}

/**********  FINAL FUNCIONES MENSAJES ********/

//********** INICIO FUNCIONES PARA MULTIMEDIA ********/

export async function almacenarImagen(imagen, nombreImagen) {
    
  try {
      //Comprobamos si existe la imagen
      if (descargarImagen(nombreImagen) != null) {
          const refImagenes = ref(storage, IMAGENES+nombreImagen)
          const file = await(await fetch(imagen)).blob();
          uploadBytes(refImagenes, file).then((snapshot) => {
              console.log('Se ha subido la imagen');
          });
      } else {
          if (Platform.OS === "web") {
              Swal.fire({
                title: "ERROR",
                text: "El nombre del archivo ya existe, elija uno diferente",
                icon: "warning",
                confirmButtonText: "De acuerdo",
              });
          } else {
              Alert.alert('Mensaje importante,', 'El nombre del archivo ya existe, elija uno diferente');
          }
      }
  } catch(error) {
      console.log(error);
  }
}

export async function almacenarPictograma(imagen, nombreImagen) {

  try {
      //Comprobamos si existe el pictograma
      if (descargarPictograma(nombreImagen) != null) {
          const refImagenes = ref(storage, PICTOGRAMAS+nombreImagen)
          const file = await(await fetch(imagen)).blob();
          uploadBytes(refImagenes, file).then((snapshot) => {
              console.log('Se ha subido el pictograma');
          });
      } else {
          if (Platform.OS === "web") {
              Swal.fire({
                title: "ERROR",
                text: "El nombre del archivo ya existe, elija uno diferente",
                icon: "warning",
                confirmButtonText: "De acuerdo",
              });
          } else {
              Alert.alert('Mensaje importante,', 'El nombre del archivo ya existe, elija uno diferente');
          }
      }
  } catch(error) {
      console.log(error);
  }
}

export async function almacenarVideo(video, nombreVideo) {

  try {
      if (descargarVideo(nombreVideo) != null ) {
          const refImagenes = ref(storage, VIDEOS+nombreVideo)
          const file = await(await fetch(video)).blob();
          uploadBytes(refImagenes, file).then((snapshot) => {
              console.log('Se ha subido el video');
          });
      } else {
          if (Platform.OS === "web") {
              Swal.fire({
              title: "ERROR",
              text: "El nombre del archivo ya existe, elija uno diferente",
              icon: "warning",
              confirmButtonText: "De acuerdo",
              });
          } else {
              Alert.alert('Mensaje importante,', 'El nombre del archivo ya existe, elija uno diferente');
          }
      }
  } catch(error) {
      console.log(error);
  }
}

export async function almacenarFotoPersona(foto, nombreFoto) {
  //Si no tiene un nombre, se coge el nombre de la propia uri de la foto
  if (nombreFoto == null || nombreFoto == '') nombreFoto = foto.split('/')[foto.split('/').length-1];

  try {
      if (descargarFotoPersona(nombreFoto) != null) {
          const refFoto = ref(storage, PERSONAS+nombreFoto)
          const file = await(await fetch(foto)).blob();
          uploadBytes(refFoto, file).then((snapshot) => {
              console.log('Se ha subido la foto');
          });
      } else {
          if (Platform.OS === "web") {
              Swal.fire({
                title: "ERROR",
                text: "El nombre del archivo ya existe, elija uno diferente",
                icon: "warning",
                confirmButtonText: "De acuerdo",
              });
          } else {
              Alert.alert('Mensaje importante,', 'El nombre del archivo ya existe, elija uno diferente');
          }
      }
  } catch(error) {
      console.log(error);
  }
}

export async function almacenarImagenLogin(imagen, nombreImagen) {
  
  try {
      if (descargarImagenLogin(nombreImagen) != null) {
          const refImagenes = ref(storage, LOGIN+nombreImagen)
          const file = await(await fetch(imagen)).blob();
          uploadBytes(refImagenes, file).then((snapshot) => {
              console.log('Se ha subido la imagen para login');
          });
      } else {
          if (Platform.OS === "web") {
              Swal.fire({
              title: "ERROR",
              text: "El nombre del archivo ya existe, elija uno diferente",
              icon: "warning",
              confirmButtonText: "De acuerdo",
              });
          } else {
              Alert.alert('Mensaje importante,', 'El nombre del archivo ya existe, elija uno diferente');
          }
      }
  } catch(error) {
      console.log(error);
  }
}

export async function almacenarMaterial(imagen, nombreImagen) {
  
  try {
      if (descargarMaterial(nombreImagen) != null) {
          const refImagenes = ref(storage, MATERIALES+nombreImagen)
          const file = await(await fetch(imagen)).blob();
          uploadBytes(refImagenes, file).then((snapshot) => {
              console.log('Se ha subido el material');
          });
      } else {
          if (Platform.OS === "web") {
              Swal.fire({
              title: "ERROR",
              text: "El nombre del archivo ya existe, elija uno diferente",
              icon: "warning",
              confirmButtonText: "De acuerdo",
              });
          } else {
              Alert.alert('Mensaje importante,', 'El nombre del archivo ya existe, elija uno diferente');
          }
      }
  } catch(error) {
      console.log(error);
  }
}

export async function almacenarTipoMaterial(imagen, nombreImagen) {
  
  try {
      if (descargarTipoMaterial(nombreImagen) != null) {
        const refImagenes = ref(storage, TIPOS_MATERIAL+nombreImagen)
          const file = await(await fetch(imagen)).blob();
          uploadBytes(refImagenes, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              console.log('URL de descarga disponible en', downloadURL);
              // Aquí puedes usar downloadURL para mostrar la vista previa
          });
          });
      } else {
          if (Platform.OS === "web") {
              Swal.fire({
              title: "ERROR",
              text: "El nombre del archivo ya existe, elija uno diferente",
              icon: "warning",
              confirmButtonText: "De acuerdo",
              });
          } else {
              Alert.alert('Mensaje importante,', 'El nombre del archivo ya existe, elija uno diferente');
          }
      }
  } catch(error) {
      console.log(error);
  }
}

export async function descargarImagen(nombreImagen) {
  let imagenUri = {
      uri: null,
      nombre: null
  };

  const refImagen = ref(storage, IMAGENES+nombreImagen);

  await getDownloadURL(refImagen)
      .then((url) => {
          imagenUri = {
              uri: url,
              nombre: refImagen.name
          };
      })
      .catch((error) => {
          console.log("No se ha podido descargar la imagen");
      });

  return imagenUri;
}

export async function descargarImagenes() {
  let entidad = [];
  let resultado;

  const listRef = ref(storage, IMAGENES);

  await listAll(listRef)
      .then((res) => {
          resultado = res;
      }).catch((error) => {
          console.log("Error en el listado de base de datos, " + error);
      });
  
  for (let i = 0; i < resultado.items.length; i++) {
      await getDownloadURL(resultado.items[i])
      .then((url) => {
          imagenUri = {
              uri: url,
              nombre: resultado.items[i].name
          };

          entidad.push(imagenUri);
      })
      .catch((error) => {
          console.log("No se ha podido descargar la imagen");
      });
  }

  return entidad;
}

export async function descargarPictograma(nombreImagen) {
  let imagenUri = {
      uri: null,
      nombre: null
  };

  const refImagen = ref(storage, PICTOGRAMAS+nombreImagen);

  await getDownloadURL(refImagen)
      .then((url) => {
          imagenUri = {
              uri: url,
              nombre: refImagen.name
          };
      })
      .catch((error) => {
          console.log("No se ha podido descargar el pictograma");
      });

  return imagenUri;
}

export async function descargarPictogramas() {
  let entidad = [];
  let resultado;

  const listRef = ref(storage, PICTOGRAMAS);

  await listAll(listRef)
      .then((res) => {
          resultado = res;
      }).catch((error) => {
          console.log("Error en el listado de base de datos, " + error);
      });
  
  for (let i = 0; i < resultado.items.length; i++) {
      await getDownloadURL(resultado.items[i])
      .then((url) => {
          imagenUri = {
              uri: url,
              nombre: resultado.items[i].name
          };

          entidad.push(imagenUri);
      })
      .catch((error) => {
          console.log("No se ha podido descargar el pictograma");
      });
  }

  return entidad;
}

export async function descargarVideo(nombreVideo) {
  let videoUri = {
      uri: null,
      nombre: null
  };

  const refVideo = ref(storage, VIDEOS+nombreVideo);

  await getDownloadURL(refVideo)
      .then((url) => {
          videoUri = {
              uri: url,
              nombre: refVideo.name
          };
      })
      .catch((error) => {
          console.log("No se ha podido descargar el video");
      });

  return videoUri;
}

export async function descargarVideos() {
  let entidad = [];
  let resultado;

  const listRef = ref(storage, VIDEOS);

  await listAll(listRef)
      .then((res) => {
          resultado = res;
      }).catch((error) => {
          console.log("Error en el listado de base de datos, " + error);
      });
  
  for (let i = 0; i < resultado.items.length; i++) {
      await getDownloadURL(resultado.items[i])
      .then((url) => {
          imagenUri = {
              uri: url,
              nombre: resultado.items[i].name
          };

          entidad.push(imagenUri);
      })
      .catch((error) => {
          console.log("No se ha podido descargar el video");
      });
  }

  return entidad;
}

export async function descargarEmoticono(nombreEmoticono) {
  let emoticUri = {
      uri: null,
      nombre: null
  };

  const refEmotic = ref(storage, EMOTICONOS+nombreEmoticono);

  await getDownloadURL(refEmotic)
      .then((url) => {
          emoticUri = {
              uri: url,
              nombre: refEmotic.name
          };
      })
      .catch((error) => {
          console.log("No se ha podido descargar el emoticono");
      });

  return emoticUri;
}

export async function descargarEmoticonos() {
  let entidad = [];
  let resultado;

  const listRef = ref(storage, EMOTICONOS);

  await listAll(listRef)
      .then((res) => {
          resultado = res;
      }).catch((error) => {
          console.log("Error en el listado de base de datos, " + error);
      });
  
  for (let i = 0; i < resultado.items.length; i++) {
      await getDownloadURL(resultado.items[i])
      .then((url) => {
          imagenUri = {
              uri: url,
              nombre: resultado.items[i].name
          };

          entidad.push(imagenUri);
      })
      .catch((error) => {
          console.log("No se ha podido descargar el emoticono");
      });
  }

  return entidad;
}

export async function descargarFotoPersona(nombreFoto) {
  let imagenUri = {
      uri: null,
      nombre: null
  };

  const refImagen = ref(storage, PERSONAS+nombreFoto);

  await getDownloadURL(refImagen)
      .then((url) => {
          imagenUri = {
              uri: url,
              nombre: refImagen.name
          };
      })
      .catch((error) => {
          console.log("No se ha podido descargar la foto");
      });

  return imagenUri;
}

export async function descargarFotosPersonas() {
  let entidad = [];
  let resultado;

  const listRef = ref(storage, PERSONAS);

  await listAll(listRef)
      .then((res) => {
          resultado = res;
      }).catch((error) => {
          console.log("Error en el listado de base de datos, " + error);
      });
  
  for (let i = 0; i < resultado.items.length; i++) {
      await getDownloadURL(resultado.items[i])
      .then((url) => {
          imagenUri = {
              uri: url,
              nombre: resultado.items[i].name
          };

          entidad.push(imagenUri);
      })
      .catch((error) => {
          console.log("No se ha podido descargar la foto");
      });
  }

  return entidad;
}

export async function descargarImagenLogin(nombreImagen) {
  let imagenUri = {
      uri: null,
      nombre: null
  };

  const refImagen = ref(storage, LOGIN+nombreImagen);

  await getDownloadURL(refImagen)
      .then((url) => {
          imagenUri = {
              uri: url,
              nombre: refImagen.name
          };
      })
      .catch((error) => {
          console.log("No se ha podido descargar la imagen para login");
      });

  return imagenUri;
}

export async function descargarImagenesLogin() {
  let entidad = [];
  let resultado;

  const listRef = ref(storage, LOGIN);

  await listAll(listRef)
      .then((res) => {
          resultado = res;
      }).catch((error) => {
          console.log("Error en el listado de base de datos, " + error);
      });
  
  for (let i = 0; i < resultado.items.length; i++) {
      await getDownloadURL(resultado.items[i])
      .then((url) => {
          imagenUri = {
              uri: url,
              nombre: resultado.items[i].name
          };

          entidad.push(imagenUri);
      })
      .catch((error) => {
          console.log("No se ha podido descargar la imagen para login");
      });
  }

  return entidad;
}

export async function descargarMaterial(nombreImagen) {
  let imagenUri = {
      uri: null,
      nombre: null
  };

  const refImagen = ref(storage, MATERIALES+nombreImagen);

  await getDownloadURL(refImagen)
      .then((url) => {
          imagenUri = {
              uri: url,
              nombre: refImagen.name
          };
      })
      .catch((error) => {
          console.log("No se ha podido descargar el material");
      });

  return imagenUri;
}

export async function descargarMateriales() {
  let entidad = [];
  let resultado;

  const listRef = ref(storage, MATERIALES);

  await listAll(listRef)
      .then((res) => {
          resultado = res;
      }).catch((error) => {
          console.log("Error en el listado de base de datos, " + error);
      });
  
  for (let i = 0; i < resultado.items.length; i++) {
      await getDownloadURL(resultado.items[i])
      .then((url) => {
          imagenUri = {
              uri: url,
              nombre: resultado.items[i].name
          };

          entidad.push(imagenUri);
      })
      .catch((error) => {
          console.log("No se ha podido descargar los materiales");
      });
  }

  return entidad;
}

export async function descargarTipoMaterial(nombreImagen) {
  let imagenUri = {
      uri: null,
      nombre: null
  };

  const refImagen = ref(storage, TIPOS_MATERIAL+nombreImagen);

  await getDownloadURL(refImagen)
      .then((url) => {
          imagenUri = {
              uri: url,
              nombre: refImagen.name
          };
      })
      .catch((error) => {
          console.log("No se ha podido descargar el tipo de material");
      });

  return imagenUri;
}

export async function descargarTipoMateriales() {

  let entidad = [];

  try {
    const listRef = ref(storage, TIPOS_MATERIAL);
    const resultado = await listAll(listRef);

    for (const item of resultado.items) {
      try {
        const url = await getDownloadURL(item);
        entidad.push({
          uri: url,
          nombre: item.name
        });
      } catch (error) {
        console.error("Error al descargar la URL del material: ", error);
      }
    }
  } catch (error) {
    console.error("Error al listar los materiales en Firebase Storage: ", error);
  }

  return entidad;
}

export async function eliminarImagen(nombreArchivo) {
  const refArchivo = ref(storage, IMAGENES+nombreArchivo);

  await deleteObject(refArchivo).then(() => {
      console.log("Se ha borrado el archivo correctamente")
  }).catch((error) => {
      console.log(error);
  });
}

export async function eliminarPictograma(nombreArchivo) {
  const refArchivo = ref(storage, PICTOGRAMAS+nombreArchivo);

  await deleteObject(refArchivo).then(() => {
      console.log("Se ha borrado el archivo correctamente")
  }).catch((error) => {
      console.log(error);
  });
}

export async function eliminarVideo(nombreArchivo) {
  const refArchivo = ref(storage, VIDEOS+nombreArchivo);

  await deleteObject(refArchivo).then(() => {
      console.log("Se ha borrado el archivo correctamente")
  }).catch((error) => {
      console.log(error);
  });
}

export async function eliminarFotoPersona(nombreArchivo) {
  const refArchivo = ref(storage, PERSONAS+nombreArchivo);

  await deleteObject(refArchivo).then(() => {
      console.log("Se ha borrado el archivo correctamente")
  }).catch((error) => {
      console.log(error);
  });
}

export async function eliminarImagenLogin(nombreArchivo) {
  const refArchivo = ref(storage, LOGIN+nombreArchivo);

  await deleteObject(refArchivo).then(() => {
      console.log("Se ha borrado el archivo correctamente")
  }).catch((error) => {
      console.log(error);
  });
}

export async function eliminarMaterial(nombreArchivo) {
  const refArchivo = ref(storage, MATERIALES+nombreArchivo);

  await deleteObject(refArchivo).then(() => {
      console.log("Se ha borrado el archivo correctamente")
  }).catch((error) => {
      console.log(error);
  });
}

export async function eliminarTipoMaterial(nombreArchivo) {
  const refArchivo = ref(storage, TIPOS_MATERIAL+nombreArchivo);

  await deleteObject(refArchivo).then(() => {
      console.log("Se ha borrado el archivo correctamente")
  }).catch((error) => {
      console.log(error);
  });
}

/******** FINAL FUNCIONES PARA MULTIMEDIA ********/

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

// export const getAlumnos = async () => {
//   try{
//     const querySnapshot = await getDocs(collection(db, 'alumnos'));
//     const docs = [];
//     querySnapshot.forEach((doc) => {
//       const { nombre, apellidos, password, jwt, fotoUrl} = doc.data();
//       docs.push({
//         id:doc.id,
//         nombre,
//         apellidos,
//         password,
//         jwt,
//         fotoUrl,
//       });
//     });
//     return docs;
//   } catch(error){
//     console.log(error);
//       Alert.alert(error);
//   }
// }


// Obtener todas las tareas
export const getUrlTipoTarea = async (tipo) => {

  try {
    const q = query(collection(db,"FotoTipoTarea"),where("tipo", "==", tipo));
    const querySnapshot = await getDocs(q);

    let docs = '';
  
    for (const tareaDoc of querySnapshot.docs) {
      const datos = tareaDoc.data();
  
      docs = datos.url;
    }
  
    return docs;
  } catch (error) {
    Alert.alert(error);
  }
  };


// Funcion para añadir una tarea a la base de datos. PROBADA FUNCIONA CORRECTAMENTE
export const setTarea = async (titulo,fechaInicio,fechaFin,tipo,periocidad) => {
    try{
        if(titulo === '' || fechaInicio === '' || fechaFin === '' || tipo === '' || periocidad == ''){
          if (Platform.OS === "web"){
            Swal.fire({
              title: "Mensaje Importante",
              text: "Debes rellenar los campos requeridos",
              icon: "warning",
              confirmButtonText: "De acuerdo",
            })
          }else{
            Alert.alert('Mensaje importante,', 'Debes rellenar los campos requeridos');
          }
        }
        else{
          var idAlumno = '';
          var completado = 'false';
          var fotoURL = await getUrlTipoTarea (tipo);

          const objeto = {
            titulo,
            completado,
            fechaFin,
            fechaInicio,
            idAlumno,
            tipo,
            periocidad,
            fotoURL,
          }
          
          // Hacemos que nos devuelva el id de la tarea para luego referenciarlo con el tipo de tarea que hemos creado.
          const docRef = await addDoc(collection(db,'Tarea'),{
            ...objeto
          })
          console.log('Buscamos el id',docRef.id);
          return docRef.id;
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
        if (Platform.OS === "web"){
          Swal.fire({
            title: "Mensaje Importante",
            text: "Debes rellenar los campos requeridos",
            icon: "warning",
            confirmButtonText: "De acuerdo",
          })
        }else{
          Alert.alert('Mensaje importante,', 'Debes rellenar los campos requeridos');
        }
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
    
    try {
      if(idAlumno === ''){
        if (Platform.OS === "web"){
          Swal.fire({
            title: "Mensaje Importante",
            text: "Debes rellenar los campos requeridos",
            icon: "warning",
            confirmButtonText: "De acuerdo",
          })
        }else{
          Alert.alert('Mensaje importante,', 'Debes rellenar los campos requeridos');
        }
      }else
      {
        const q = query(collection(db,"Tarea"),where("idAlumno", "==", idAlumno), where('completado','==','false'));
        const querySnapshot = await getDocs(q);
      // const querySnapshot = await getDocs(collection(db, 'Tarea'), where('IdAlumno', '==', idAlumno));
    
        const docs = [];
    
        for (const tareaDoc of querySnapshot.docs) {
          const { titulo, completado, fechaInicio, fechaFin, tipo, idAlumno, fotoURL } = tareaDoc.data();
    
          docs.push({
            id: tareaDoc.id,
            titulo,
            completado,
            fechaInicio,
            fechaFin,
            tipo,
            idAlumno,
            fotoURL,
        });
        }
    
        return docs;
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error);
    }
};

export const getTareaIdCompletada = async (idAlumno) => {

  console.log(idAlumno);
  
  try {
    const q = query(collection(db,"Tarea"),where("idAlumno", "==", idAlumno), where("completado","==" , "true"));
    const querySnapshot = await getDocs(q);
    // const querySnapshot = await getDocs(collection(db, 'Tarea'), where('IdAlumno', '==', idAlumno));
  
    const docs = [];
  
    for (const tareaDoc of querySnapshot.docs) {
      const { titulo, completado, fechaInicio, fechaFin, tipo, idAlumno } = tareaDoc.data();
  
      docs.push({
        id: tareaDoc.id,
        titulo,
        completado,
        fechaInicio,
        fechaFin,
        tipo,
        idAlumno,
        fotoURL,
      });
    }
  
    return docs;
  } catch (error) {
    console.log(error);
    Alert.alert(error);
  }
};

// Obtener todas las tareas
export const getTareas = async () => {

try {
  const q = query(collection(db,"Tarea"));
  const querySnapshot = await getDocs(q);
  // const querySnapshot = await getDocs(collection(db, 'Tarea'), where('IdAlumno', '==', idAlumno));

  const docs = [];

  for (const tareaDoc of querySnapshot.docs) {
    const { titulo, completado, fechaInicio, fechaFin, tipo, idAlumno } = tareaDoc.data();

    docs.push({
      id: tareaDoc.id,
      titulo,
      completado,
      fechaInicio,
      fechaFin,
      tipo,
      idAlumno,
      fotoURL,
    });
  }

  return docs;
} catch (error) {
  console.log(error);
  Alert.alert(error);
}
};

// export const deleteTareaId = async (idTarea) => {
//     try {
//         console.log("borrando tarea");
//         // Borramos la tarea principal que queremos
//         const q = query(collection(db,"Tarea"), where("idTarea","==",idTarea));
//         const querySnapshot = await getDoc(q);

//         const q2 = query(collection(db,"Tarea-Actividad"),where("idTarea","==",idTarea));
//         const querySnapshot2 = await getDoc(q2);

//         const q5 = query(collection(db,"PasosActividad",where("idTarea","==",idTarea)));
//         const querySnapshot5 = await getDoc(q5);

//         const q3 = query(collection(db,"Tarea-Inventario"),where("idTarea","==",idTarea));
//         const querySnapshot3 = await getDoc(q3);

//         const q4 = query(collection(db,"Tarea-Comanda"),where("idTarea","==",idTarea));
//         const querySnapshot4 = await getDoc(q4);

//         console.log(querySnapshot3);

//         if (!querySnapshot.empty()) {
//             await deleteDoc(querySnapshot.ref);
//             console.log("Se ha borrado la tarea correctamente");
//         }
//         else {
//             console.log("No existe la tarea");
//         }

//         if(!querySnapshot2.empty()){
//             await deleteDoc(querySnapshot2.ref);
//             if(!querySnapshot5.empty())
//                 await deleteDoc(querySnapshot5.ref);
//             console.log("Se ha borrado la tarea actividad");
//         } else{
//             console.log("NO existe la tarea actividad");
//         }

//         if(!querySnapshot3.empty()){
//             await deleteDoc(querySnapshot3.ref);
//             console.log("Se ha borrado la tarea inventario");
//         } else{
//             console.log("No existe la tarea inventario");
//         }

//         if(!querySnapshot4.empty()){
//             await deleteDoc(querySnapshot4.ref);
//         } else{
//             console.log("No existe la tarea comanda")
//         }

//     } catch(error) {
//         console.log("Error al borrar la tarea", error);
//     }

// }



// Funcion que borra la tarea con ese id
// Borra tanto la tarea, como el documento de la colección del 
// tipo de tarea que sea y los pasos de esa tarea en caso de que sea tarea-actividad
export const deleteTareaId = async (idTarea) => {
    try {
      if(idTarea != ''){
        if (Platform.OS === "web"){
          Swal.fire({
            title: "Mensaje Importante",
            text: "Debes rellenar los campos requeridos",
            icon: "warning",
            confirmButtonText: "De acuerdo",
          })
        }else{
          Alert.alert('Mensaje importante,', 'Debes rellenar los campos requeridos');
        }
      }else{
        await deleteDoc(doc(db,"Tarea",idTarea));
        const q2 = query(collection(db,"Tarea-Actividad"),where("idTarea","==",idTarea));
        const Snapshot2 = await getDocs(q2);
        Snapshot2.forEach(async(doc) =>{
            await deleteDoc(doc.ref);
        })

        const q = query(collection(db, "PasosActividad"), where("idTarea", "==", idTarea));

        const Snapshot = await getDocs(q);

        Snapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });

        const q3 = query(collection(db,"Tarea-Invetario"),where("idTarea","==",idTarea));
        const Snapshot3 = await getDocs(q3);
        Snapshot3.forEach(async(doc) =>{
            await deleteDoc(doc.ref);
        })

        const q4 = query(collection(db,"Tarea-Comanda"),where("idTarea","==",idTarea));
        const Snapshot4 = await getDocs(q4);
        Snapshot4.forEach(async(doc) =>{
            await deleteDoc(doc.ref);
        })
      }

    } catch(error) {
        console.log("Error al borrar la tarea", error);
    }
}



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
  export const setTareaActividad = async(aula,pasos,idTarea) => {
    try{
  
      if( aula === '' || pasos === null || idTarea === ''){
        if (Platform.OS === "web"){
          Swal.fire({
            title: "Mensaje Importante",
            text: "Debes rellenar los campos requeridos",
            icon: "warning",
            confirmButtonText: "De acuerdo",
          })
        }else{
          Alert.alert('Mensaje importante,', 'Debes rellenar los campos requeridos');
        }
      }
      else{
  
        const objeto = {
          aula,
          pasos,
          idTarea
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
  if(idTarea != ''){
    if (Platform.OS === "web"){
      Swal.fire({
        title: "Mensaje Importante",
        text: "Debes rellenar los campos requeridos",
        icon: "warning",
        confirmButtonText: "De acuerdo",
      })
    }else{
      Alert.alert('Mensaje importante,', 'Debes rellenar los campos requeridos');
    }
  }else{

  const q = query(collection(db,"Tarea-Actividad"),where("idTarea","==",idTarea));
  const querySnapshot = await getDocs(q);
  const docs=[];

  for (const docu of querySnapshot.docs) {
    const tareaActividadDatos = docu.data();

    docs.push(tareaActividadDatos);
    }

    return docs;
  }
  } catch (error) {
    console.log(error);
}
};

export const getPasos = async (idActividad) => {
try {
  if(idActividad != ''){
    if (Platform.OS === "web"){
      Swal.fire({
        title: "Mensaje Importante",
        text: "Debes rellenar los campos requeridos",
        icon: "warning",
        confirmButtonText: "De acuerdo",
      })
    }else{
      Alert.alert('Mensaje importante,', 'Debes rellenar los campos requeridos');
    }
  }else{
  const q = query(collection(db,"PasosActividad"),where("idActividad","==",idActividad));
  const querySnapshot = await getDocs(q);
  const docs=[];

  for (const docu of querySnapshot.docs) {
    const tareaActividadDatos = docu.data();

    docs.push(tareaActividadDatos);
    }

    return docs;
  }
  } catch (error) {
    console.log(error);
}
};

  // PRUEBA REALIZADA. FUNCIONA
  export const setPasoActividad = async(audio, imagen, pictograma, video, texto, nombre, idTarea) => {
    try{

      if( audio === '' || imagen === '' || pictograma === '' || video === '' || texto === '' || nombre === '' || idTarea === ''){
        if (Platform.OS === "web"){
          Swal.fire({
            title: "Mensaje Importante",
            text: "Debes rellenar los campos requeridos",
            icon: "warning",
            confirmButtonText: "De acuerdo",
          })
        }else{
          Alert.alert('Mensaje importante,', 'Debes rellenar los campos requeridos');
        }
      }
      else{

        const objeto = {
          Audio,
          imagen,
          pictograma,
          video,
          texto,
          nombre,
          idTarea
        }
        
        const idPaso = await addDoc(collection(db,'PasosActividad'),{
          ...objeto
        })
        return idPaso.id;
      }
    }catch(error){
      console.log(error);
    }  
  }


// Esta función se usa para cuando el alumno vaya añadiendo los pedidos de cada
// menú se cree una fila/documento por menú

// PRUEBA REALIZADA.FUNCIONA
export const setTareaComanda = async(idTarea,menus) => {
    try{
  
      if( menus === null || idTarea === ''){
        if (Platform.OS === "web"){
          Swal.fire({
            title: "Mensaje Importante",
            text: "Debes rellenar los campos requeridos",
            icon: "warning",
            confirmButtonText: "De acuerdo",
          })
        }else{
          Alert.alert('Mensaje importante,', 'Debes rellenar los campos requeridos');
        }
      }
      else{
        var pedidos = '';
  
        const objeto = {
          pedidos,
          menus,
          idTarea
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

    docs.push(tareaActividadDatos);
    }

    return docs;
  } catch (error) {
    console.log(error);
}
}


// PRUEBA REALIZADA. FUNCIONA
export const setMenu = async(idTarea, idMenu, idAlimentos) => {
  try{

    if(idTarea === '' || idMenu === '' || idAlimentos === null){
      if (Platform.OS === "web"){
        Swal.fire({
          title: "Mensaje Importante",
          text: "Debes rellenar los campos requeridos",
          icon: "warning",
          confirmButtonText: "De acuerdo",
        })
      }else{
        Alert.alert('Mensaje importante,', 'Debes rellenar los campos requeridos');
      }
    }
    else{

      const objeto = {
        idTarea,
        idMenu,
        idAlimentos,
      }
      
      // Necesitamos poner setDoc para especificar el ID del documento
      await addDoc(collection(db,'Menus-Comanda'), {
        ...objeto
      });
    }
  }catch(error){
    console.log(error);
  }  
}


// Devolvemos todos los menus.
export const getMenus = async() => {
    try {
      const menuQuery = query(collection(db, 'Menu'));
      const querySnapshot = await getDocs(menuQuery);
  
      const docs = [];
  
      querySnapshot.forEach((docu) => {
        const menu = docu.data(); // Extraemos nombre
        const id = docu.id; // Extraemos el ID del documento
        docs.push({id, ...menu});
      });
  
      return docs;
    } catch (error) {
      console.log(error);
      throw error; // Lanza el error para que pueda ser manejado por el llamador
    }
  }




// PRUEBA REALIZADA. FUNCIONA
export const setAlimento = async (nombreAlimento,imagen) => {
    try{
  
      if(nombreAlimento === '' || imagen === ''){
        if (Platform.OS === "web"){
          Swal.fire({
            title: "Mensaje Importante",
            text: "Debes rellenar los campos requeridos",
            icon: "warning",
            confirmButtonText: "De acuerdo",
          })
        }else{
          Alert.alert('Mensaje importante,', 'Debes rellenar los campos requeridos');
        }
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
  if(nombre != ''){
    if (Platform.OS === "web"){
      Swal.fire({
        title: "Mensaje Importante",
        text: "Debes rellenar los campos requeridos",
        icon: "warning",
        confirmButtonText: "De acuerdo",
      })
    }else{
      Alert.alert('Mensaje importante,', 'Debes rellenar los campos requeridos');
    }
  }else{
  const alimentosQuery = query(collection(db, 'Alimentos'), where('Nombre', '==', nombre));
  const querySnapshot = await getDocs(alimentosQuery);

  const docs = [];

  querySnapshot.forEach((docu) => {
    const alimentoDatos = docu.data();
    console.log(alimentoDatos);

    docs.push(alimentoDatos);
  });

  return docs;
}
} catch (error) {
  console.log(error);
  throw error; // Lanza el error para que pueda ser manejado por el llamador
}
};

// FUNCION QUE DEVUELVE TODOS LOS MATERIALES QUE TENEMOS EN LA BASE DE DATOS
// PRUEBA REALIZADA. FUNCIONA
export const getAlimentos = async() => {
  try {
    const materialQuery = query(collection(db, 'Alimentos'));
    const querySnapshot = await getDocs(materialQuery);
  
    const docs = [];
  
    querySnapshot.forEach((docu) => {
      const alimentosDatos = docu.data();  
      const id = docu.id;
      docs.push({id, ...alimentosDatos});
    });
  
    return docs;
  } catch (error) {
    console.log(error);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
  }



export const setTareaInventario = async(idMaterial,caracteristica,cantidad,lugarOrigen,lugarDestino,idTarea) => {
    try{
  
      if(idMaterial === '' || lugarOrigen === '' || lugarDestino === null || idTarea === '' || cantidad === '' || caracteristica === ''){
        if (Platform.OS === "web"){
          Swal.fire({
            title: "Mensaje Importante",
            text: "Debes rellenar los campos requeridos",
            icon: "warning",
            confirmButtonText: "De acuerdo",
          })
        }else{
          Alert.alert('Mensaje importante,', 'Debes rellenar los campos requeridos');
        }
      }
      else{
  
  
        const objeto = {
          idMaterial,
          caracteristica,
          cantidad,
          lugarOrigen,
          lugarDestino,
          idTarea
        }

        console.log(objeto);
        
        await addDoc(collection(db,'Tarea-Inventario'),{
          ...objeto
        })
      }
    }catch(error){
      console.log(error);
    }  
  }


// PRUEBA REALIZADA. FUNCIONA
export const setMaterial = async (nombreMaterial, fotoMaterial, stockMaterial, caracteristicasMaterial)=> {
    try{
  
      if(nombreMaterial === '' || fotoMaterial === '' || stockMaterial === ''){
        if (Platform.OS === "web"){
          Swal.fire({
            title: "Mensaje Importante",
            text: "Debes rellenar los campos requeridos",
            icon: "warning",
            confirmButtonText: "De acuerdo",
          })
        }else{
          Alert.alert('Mensaje importante,', 'Debes rellenar los campos requeridos');
        }
      }
      else{
  
        const objeto = {
          nombre: nombreMaterial,
          foto: fotoMaterial,
          stock: stockMaterial,
          caracteristicas: caracteristicasMaterial,
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
  if(nombre != ''){
    if (Platform.OS === "web"){
      Swal.fire({
        title: "Mensaje Importante",
        text: "Debes rellenar los campos requeridos",
        icon: "warning",
        confirmButtonText: "De acuerdo",
      })
    }else{
      Alert.alert('Mensaje importante,', 'Debes rellenar los campos requeridos');
    }
  }else{

  const materialQuery = query(collection(db, 'Material'), where('nombre', '==', nombre));
  const querySnapshot = await getDocs(materialQuery);

  const docs = [];

  querySnapshot.forEach((docu) => {
    const materialDatos = docu.data();

    docs.push(materialDatos);
  });

  return docs;
}
} catch (error) {
  console.log(error);
  throw error; // Lanza el error para que pueda ser manejado por el llamador
}
}


// FUNCION QUE DEVUELVE LOS DATOS DE UN MATERIAL CORRESPONDIENTE A UN ID
// PRUEBA REALIZADA. FUNCIONA
export const getMaterialId = async(id) => {
  try {
    if(id == ''){
      if (Platform.OS === "web"){
        Swal.fire({
          title: "Mensaje Importante",
          text: "Debes rellenar los campos requeridos",
          icon: "warning",
          confirmButtonText: "De acuerdo",
        })
      }else{
        Alert.alert('Mensaje importante,', 'Debes rellenar los campos requeridos');
      }
    }else{
      const docRef = doc(db, 'Material', id);
      const docSnapshot = await getDoc(docRef);
      
      if (docSnapshot.exists()) {
        const materialDatos = docSnapshot.data();

        // Agrega el ID del documento al objeto
        return [{id:docSnapshot.id, ...materialDatos}];
      } else {
        // Manejar el caso en que el documento no existe
        console.log("No se encontró ningún documento con ese ID");
        return []; // Retorna un array vacío o lo que consideres apropiado
      }
  }
  } catch (error) {
    console.log(error);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
}



// FUNCION QUE DEVUELVE TODOS LOS MATERIALES QUE TENEMOS EN LA BASE DE DATOS
// PRUEBA REALIZADA. FUNCIONA
export const getMateriales = async() => {
try {
  const materialQuery = query(collection(db, 'Material'));
  const querySnapshot = await getDocs(materialQuery);

  const docs = [];

  querySnapshot.forEach((docu) => {
    const materialDatos = docu.data();
    const id = docu.id;
    docs.push({id, ...materialDatos});
  });

  return docs;
} catch (error) {
  console.log(error);
  throw error; // Lanza el error para que pueda ser manejado por el llamador
}
}

export async function deleteMaterial(id) {
  try {
      const docu = doc(db, "Material", id);
      const docSnapshot = await getDoc(docu);

      if (docSnapshot.exists()) {
          await deleteDoc(docSnapshot.ref);
          console.log("Se ha borrado el material correctamente");
      }
      else {
          console.log("No existe el material");
      }
  } catch(error) {
      console.log("Error al borrar material", error);
  }
}

export async function updateMaterial(id, nombreMaterial, fotoMaterial, stockMaterial, caracteristicasMaterial) {
  
  let editaMaterial = {
      caracteristicas:  caracteristicasMaterial,
      foto: fotoMaterial,
      nombre: nombreMaterial, 
      stock: stockMaterial, 
  };

  try {
      let docMaterial = doc(db, "Material", id);
      const docSnapshot = await getDoc(docMaterial);
      
      if (docSnapshot.exists()) {
          await updateDoc(docMaterial, {
              ...editaMaterial
          })
      }
  } catch (error) {
      console.log("Hubo un error al actualizar datos del material ", error);
  }
}

export const setTipoMaterial = async (nombreTipoMaterial)=> {
  try{

    if(nombreTipoMaterial === ''){
      if (Platform.OS === "web"){
        Swal.fire({
          title: "Mensaje Importante",
          text: "Debes rellenar los campos requeridos",
          icon: "warning",
          confirmButtonText: "De acuerdo",
        })
      }else{
        Alert.alert('Mensaje importante,', 'Debes rellenar los campos requeridos');
      }
    }
    else{

      const objeto = {
        nombre: nombreTipoMaterial,
      }
      
      // Necesitamos poner setDoc para especificar el ID del documento
      await addDoc(collection(db,'Tipo_Material'),{
        ...objeto
      });
    }
  }catch(error){
    console.log(error);
  }  
}

// FUNCION QUE DEVUELVE TODOS LOS TIPOS DE MATERIALES QUE TENEMOS EN LA BASE DE DATOS
// PRUEBA REALIZADA. FUNCIONA
export const getTipoMateriales = async() => {
  try {
    const materialQuery = query(collection(db, 'Tipo_Material'));
    const querySnapshot = await getDocs(materialQuery);
  
    const docs = [];
  
    querySnapshot.forEach((docu) => {
      const materialDatos = docu.data();
      const id = docu.id;
      docs.push({id, ...materialDatos});
    });
  
    return docs;
  } catch (error) {
    console.log(error);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
  }
  
  export async function deleteTipoMaterial(id) {
    try {
        const docu = doc(db, "Tipo_Material", id);
        const docSnapshot = await getDoc(docu);
  
        if (docSnapshot.exists()) {
            await deleteDoc(docSnapshot.ref);
            console.log("Se ha borrado el material correctamente");
        }
        else {
            console.log("No existe el material");
        }
    } catch(error) {
        console.log("Error al borrar material", error);
    }
  }
  
  export async function updateTipoMaterial(id, nombreTipo) {
    
    let editaMaterial = {
        nombre:  nombreTipo, 
    };
  
    try {
        let docMaterial = doc(db, "Tipo_Material", id);
        const docSnapshot = await getDoc(docMaterial);
        
        if (docSnapshot.exists()) {
            await updateDoc(docMaterial, {
                ...editaMaterial
            })
        }
    } catch (error) {
        console.log("Hubo un error al actualizar datos del material ", error);
    }
  }

// FUNCION QUE DEVULEVE TODAS LAS TAREAS DEL INVENTARIO
// PRUEBA REALIZADA. FUNCIONA
export const getTareasInventario = async() => {
try {
  const querySnapshot = await getDocs(collection(db, 'Tarea-Inventario'));
  const docs=[];

  for (const docu of querySnapshot.docs) {
    const tareaActividadDatos = docu.data();

    docs.push(tareaActividadDatos);
    }

    return docs;
  } catch (error) {
    console.log(error);
  }
}

// FUNCION QUE DEVULEVE LAS TAREAS DEL INVENTARIO CON UN ID DE TAREA ESPECIFICO
// PRUEBA REALIZADA. FUNCIONA
export const getTareaIdTareasInventario = async(id) => {
  try {
    
    const InventarioQuery = query(collection(db, 'Tarea-Inventario'), where('idTarea', '==', id));
    const querySnapshot = await getDocs(InventarioQuery);

    const docs=[];
  
    for (const docu of querySnapshot.docs) {
      const tareaActividadDatos = docu.data();
      const id = docu.id;
      docs.push({id, ...tareaActividadDatos});
      }
  
      return docs;
    } catch (error) {
      console.log(error);
    }
  }

// PRUEBA REALIZADA. FUNCIONA
export const setVideo = async (nombreVideo, urlVideo)=> {
  try{

    if(nombreVideo === '' || urlVideo === ''){
      if (Platform.OS === "web"){
        Swal.fire({
          title: "Mensaje Importante",
          text: "Debes rellenar los campos requeridos",
          icon: "warning",
          confirmButtonText: "De acuerdo",
        })
      }else{
        Alert.alert('Mensaje importante,', 'Debes rellenar los campos requeridos');
      }
    }
    else{

      const objeto = {
        nombreVideo,
        urlVideo,
      }
      
      // Necesitamos poner setDoc para especificar el ID del documento
      await addDoc(collection(db,'Videos'),{
        ...objeto
      });
    }
  }catch(error){
    console.log(error);
  }  
}

  // Funcion para mostrar los pictogramas de la base de datos
  export const cargarPictogramas = async () => {

    try {
    const pictogramaQuery = collection(db, "Pictogramas");
    const querySnapshot = await getDocs(pictogramaQuery);
    const datos = [];
    querySnapshot.forEach((docu) => {
      const pictogramaDatos = docu.data(); 
      const id = pictogramaDatos.id; // Extraemos el ID del documento
      datos.push({id, ...pictogramaDatos});
    });

    return datos;
  }catch(error){
    if (Platform.OS === "web"){
      Swal.fire({
        title: "Fallo de carga",
        text: "Intentelo de nuevo.",
        icon: "warning",
        confirmButtonText: "De acuerdo",
      })
    }else{
      Alert.alert('Fallo de carga,', 'Intentelo de nuevo.');
    }
  }  
  }

  // Funcion para mostrar los videos de la base de datos
  export const cargarVideos = async () => {

    try {
    const videoQuery = collection(db, "Videos");
    const querySnapshot = await getDocs(videoQuery);
    const datos = [];
    querySnapshot.forEach((docu) => {
      const videoDatos = docu.data(); 
      const id = videoDatos.id; // Extraemos el ID del documento
      datos.push({id, ...videoDatos});
    });

    return datos;
  }catch(error){
    if (Platform.OS === "web"){
      Swal.fire({
        title: "Fallo de carga",
        text: "Intentelo de nuevo.",
        icon: "warning",
        confirmButtonText: "De acuerdo",
      })
    }else{
      Alert.alert('Fallo de carga,', 'Intentelo de nuevo.');
    }
  }  
  }

  // Funcion para mostrar los pictogramas de la base de datos
  export const cargarImagenes = async () => {

    try {
    const imagenQuery = collection(db, "Imagen");
    const querySnapshot = await getDocs(imagenQuery);
    const datos = [];
    querySnapshot.forEach((docu) => {
      const imagenDatos = docu.data(); 
      const id = imagenDatos.id; // Extraemos el ID del documento
      datos.push({id, ...imagenDatos});
    });

    return datos;
  }catch(error){
    if (Platform.OS === "web"){
      Swal.fire({
        title: "Fallo de carga",
        text: "Intentelo de nuevo.",
        icon: "warning",
        confirmButtonText: "De acuerdo",
      })
    }else{
      Alert.alert('Fallo de carga,', 'Intentelo de nuevo.');
    }
  }  
  }

  
  // Funcion para mostrar los pictogramas de la base de datos
  export const cargarAudios = async () => {

    try {
    const AudioQuery = collection(db, "Audio");
    const querySnapshot = await getDocs(AudioQuery);
    const datos = [];
    querySnapshot.forEach((docu) => {
      const audioDatos = docu.data(); 
      const id = audioDatos.id; // Extraemos el ID del documento
      datos.push({id, ...audioDatos});
    });

    return datos;
  }catch(error){
    if (Platform.OS === "web"){
      Swal.fire({
        title: "Fallo de carga",
        text: "Intentelo de nuevo.",
        icon: "warning",
        confirmButtonText: "De acuerdo",
      })
    }else{
      Alert.alert('Fallo de carga,', 'Intentelo de nuevo.');
    }
  }  
  }