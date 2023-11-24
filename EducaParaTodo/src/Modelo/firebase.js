import React, {useEffect, useState} from 'react';

import { getFirestore, collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
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

//valores de las colecciones en la base de datos
const COL_ALUMNOS = 'alumnos';
const COL_PROFESORES = 'profesores';
const COL_ADMINISTRADORES = 'administradores';
const COL_FOROS = 'foros';
const COL_PROFESORES_FOROS = 'profesoresForos';
const COL_PROFESORES_TAREAS = 'profesoresTareas';
const COL_ALUMNOS_TAREAS = 'alumnosTareas';


/**********  INICIO FUNCIONES ALUMNO ********/

export async function getAlumnos() {
    let alumnos = null;

    try {
        const querydb = getFirestore();
        const queryCollection = collection(querydb, COL_ALUMNOS);
        getDocs(queryCollection)
        .then(res => alumnos = res.docs.map(alumno => ({id: alumno.id, nombre: alumno.nombre,
                                                        apellidos: alumno.apellidos, foto: alumno.foto,
                                                        visualizacionPreferente: alumno.visualizacionPreferente})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumno");
    }

    return alumnos;
}

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

{/*export async function getProfesores() {
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
}*/}



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

export async function getProfesores() {
    let profesores = null;

    try {
        const querydb = getFirestore();
        const queryCollection = collection(querydb, COL_PROFESORES);
        getDocs(queryCollection)
        .then(res => profesores = res.docs.map(profesor => ({id: profesor.id, nombre: profesor.nombre,
                                                        apellidos: profesor.apellidos, password: profesor.data().password,
                                                        email: profesor.email, info: profesor.info, foto: profesor.foto})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesor");
    }

    return profesores;
}

export async function getProfesoresNombre(nombre) {
    try {
        const queryFilter = query(collection(getFirestore(), COL_PROFESORES), where('nombre', '==', nombre));
        const querySnapshot = await getDocs(queryFilter);
        return querySnapshot.docs.map(profesor => ({id: profesor.id, nombre: profesor.data().nombre, apellidos: profesor.data().apellidos, password: profesor.data().password,
                                                    email: profesor.email, info: profesor.info, foto: profesor.data().foto}));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesor", error);
        return null;
    }
}

export async function getProfesoresApellidos(apellidos) {
    try {
        const queryFilter = query(collection(getFirestore(), COL_PROFESORES), where('apellidos', '==', apellidos));
        const querySnapshot = await getDocs(queryFilter);
        return querySnapshot.docs.map(profesor => ({id: profesor.id, nombre: profesor.data().nombre, apellidos: profesor.data().apellidos, password: profesor.data().password,
                                                    email: profesor.email, info: profesor.info, foto: profesor.data().foto}));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesor", error);
        return null;
    }
}

export async function getProfesoresContrasenia(contrasenia) {
    try {
        const queryFilter = query(collection(getFirestore(), COL_PROFESORES), where('password', '==', contrasenia));
        const querySnapshot = await getDocs(queryFilter);
        return querySnapshot.docs.map(profesor => ({id: profesor.id, nombre: profesor.data().nombre, apellidos: profesor.data().apellidos, password: profesor.data().password,
                                                    email: profesor.email, info: profesor.info, foto: profesor.data().foto}));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesor", error);
        return null;
    }
}

export async function getProfesoresLogin(nombre, contrasenia) {
    try {
        const queryFilter = query(collection(getFirestore(), COL_PROFESORES), where('nombre', '==', nombre), where('password', '==', contrasenia));
        const querySnapshot = await getDocs(queryFilter);
        return querySnapshot.docs.map(profesor => ({id: profesor.id, nombre: profesor.data().nombre, apellidos: profesor.data().apellidos, password: profesor.data().password,
                                                    email: profesor.email, info: profesor.info, foto: profesor.data().foto}));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del profesor", error);
        return null;
    }
}

export async function addProfesor(nombre, apellidos, contrasenia, email, info, foto) {
    let profesor = {
        nombre: nombre,
        apellidos: apellidos,
        password: contrasenia,
        email: email,
        info: info,
        foto: foto
    }

    try {
        const docRef = await addDoc(collection(getFirestore(), COL_PROFESORES), profesor);
        return docRef.id;
    } catch (error) {
        console.log("Ha habido un error al subir los datos del profesor", error);
        return null;
    }
}

export async function updateProfesor(id, {nombre='', apellidos='', password='', email='', info='', foto=''}) {
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
/*
uploadImage= (uri, nameImage) => {
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
*/
export function almacenarImagen(imagen) {
  this.uploadImage(imagen)
    .then(resolve => {
      AppFirebase.storage()
        .ref()
        .child(`images/${nombre}`);
      ref.put(resolve);
    })
    .catch(error => {
      console.log(error);
    });
}

export function almacenarPictograma(imagen) {
  this.uploadImage(imagen)
    .then(resolve => {
      AppFirebase.storage()
        .ref()
        .child(`Pictogramas/${nombre}`);
      ref.put(resolve);
    })
    .catch(error => {
      console.log(error);
    });
}

export function cargarImagen(imagen) {
  let imagenCargada = null;

  AppFirebase
    .storage()
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