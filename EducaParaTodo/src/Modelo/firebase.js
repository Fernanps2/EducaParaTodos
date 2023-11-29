import React, {useEffect, useState} from 'react';

import { getFirestore, collection, getDocs, doc, getDoc, updateDoc, query, where, deleteDoc, limit } from 'firebase/firestore';
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

export async function getProfesoresNombre(nombreProfesor) {
    try {
        const queryFilter = query(collection(db, COL_PROFESORES), where('nombre', '==', nombreProfesor), limit(1));
        const querySnapshot = await getDocs(queryFilter);

        let profesorEncontrado = null;

        querySnapshot.forEach(doc => {
            const { nombre, apellidos, password, email, info, foto} = doc.data();
            profesorEncontrado = {
                id: doc.id,
                nombre,
                apellidos,
                password,
                email,
                info,
                foto,
            };
        });

        return profesorEncontrado;
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesor", error);
        return null;
    }
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

export async function getProfesorPorId(idProfesor) {
    try {
        const profesorRef = doc(collection(getFirestore(), COL_PROFESORES), idProfesor);
        const profesorSnapshot = await getDoc(profesorRef);

        if (profesorSnapshot.exists()) {
            const data = profesorSnapshot.data();
            return {
                id: profesorSnapshot.id,
                nombre: data.nombre,
                apellidos: data.apellidos,
                password: data.password,
                email: data.email,
                info: data.info,
                foto: data.foto
            };
        } else {
            console.log("No se encontró ningún profesor con ese ID");
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el profesor por ID:", error);
        return null;
    }
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

export async function updateProfesor(id, nombre, apellidos, password, email, info, foto) {
    let editaProfesor = {
        nombre: nombre,
        apellidos: apellidos,
        password: password,
        email: email,
        info: info,
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
            editaProfesor.email = editaProfesor.email == '' ? profesor.email : editaProfesor.email;
            editaProfesor.info = editaProfesor.info == '' ? profesor.info : editaProfesor.info;
            editaProfesor.foto = editaProfesor.foto == '' ? profesor.foto : editaProfesor.foto;

            await updateDoc(docProfesor, {
                ...editaProfesor
            });
        }
    } catch (error) {
        console.log("Problema al actualizar datos de profesor");
    }
}

export async function updateProfesorv2(id, {nombre='', apellidos='', password='', email='', info='', foto=''}) {
    try {
        const docProfesor = doc(collection(getFirestore(), COL_PROFESORES), id);
        await updateDoc(docProfesor, {
            nombre: nombre,
            apellidos: apellidos,
            password: password,
            email: email,
            info: info,
            foto: foto
        });
    } catch (error) {
        console.log("Problema al actualizar datos de profesor", error);
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

// uploadImage= async(uri) => {
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

// Obtener todas las tareas
export const getTarea = async () => {

    try {
      const q = query(collection(db,"Tarea"));
      const querySnapshot = await getDocs(q);
      // const querySnapshot = await getDocs(collection(db, 'Tarea'), where('IdAlumno', '==', idAlumno));

      const docs = [];

      for (const tareaDoc of querySnapshot.docs) {
        const { titulo, tipo, completado, Feedback, periodicidad, fechaInicio, fechaFin, idAlumno } = tareaDoc.data();

        docs.push({
          id: tareaDoc.id,
          titulo,
          tipo,
          completado,
          Feedback,
          periodicidad,
          fechaInicio,
          fechaFin,
          idAlumno,
        });
      }

      return docs;
    } catch (error) {
      console.log(error);
      Alert.alert(error);
    }
};


// función para obtener las 4 imágenes del login del alumno

export const getAlumnoImagenesLogin = async (idAlumno) => {
  try {
    const q = query(collection(db, 'loginAlumnoImagenes'), where('idAlumno', '==', idAlumno));
    const querySnapshot = await getDocs(q);

    const docs = [];

    for (const doc of querySnapshot.docs) {
      const { img1, img2, img3, img4 } = doc.data();

      console.log('Datos de imágenes obtenidos:', { img1, img2, img3, img4 });

      docs.push({
        id: doc.id,
        img1,
        img2,
        img3,
        img4,
      });
    }

    return docs;
  } catch (error) {
    console.error('Error al obtener imágenes:', error);
    throw error;
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



// Esta función se usa para cuando el alumno vaya añadiendo los pedidos de cada
// menú se cree una fila/documento por menú

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
      idMenu,
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
export const setMenu = async(nombreMenu,idAlimentos) => {
try{

  if(nombreMenu === '' || idAlimentos === null){
    Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
  }
  else{
    const objeto = {
      idAlimentos
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

    const objeto = {
      idMaterial,
      lugarLlevar,
      recogida,
      idTarea
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
export const getMaterialId = async(id) => {
  try {
    const materialQuery = query(collection(db, 'Material'), where('id', '==', id));
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