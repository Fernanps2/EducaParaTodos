import React, {useEffect, useState} from 'react';

import { getFirestore, collection, getDocs, doc, getDoc, updateDoc, query, where, deleteDoc } from 'firebase/firestore';
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

export async function updateAlumno(id, nombre, apellidos, password, foto, visualizacionPreferente) {
    let editaAlumno = {
        nombre: nombre, 
        apellidos: apellidos, 
        visualizacionPreferente: visualizacionPreferente, 
        password: password, 
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
            editaAlumno.password = editaAlumno.password == '' ? alumno.password : editaAlumno.password;
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

export async function getProfesoresNombre(nombre) {
    let docs = [];
    try {
        const queryFilter = query(collection(db, COL_PROFESORES), where('nombre', '==', nombre));
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
        const doc = doc(db, COL_PROFESORES, id);
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
    let editaProfesor = {
        nombre: nombre, 
        apellidos: apellidos, 
        password: password, 
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
            editaProfesor.password = editaProfesor.password == '' ? profesor.password : editaProfesor.password;
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
        console.log("Error al borrar allumnoForo", error);
    }
}

/********** FINAL FUNCIONES ALUMNO-FORO **********/

/********** INICIO FUNCIONES PARA MULTIMEDIA ********/

const contarArchivos = async(nombreCarpeta) => {

}

uploadImage= async(uri) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };

    xhr.open("GET", uri);
    xhr.responseType = "blob";
    xhr.send();
  });
};

export async function almacenarImagen(imagen) {

    //let num_imagenes = storage.child('images').size();
    let nombre_imagen = 'imagen_1';

  await uploadImage(imagen)
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

export async function almacenarPictograma(imagen) {
  await uploadImage(imagen)
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