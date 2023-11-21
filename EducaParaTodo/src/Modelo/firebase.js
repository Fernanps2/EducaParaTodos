import React, {useEffect, useState} from 'react';

import { getFirestore, collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';

//valores de las colecciones en la base de datos
const COL_ALUMNOS = 'alumnos';
const COL_PROFESORES = 'profesores';
const COL_ADMINISTRADORES = 'administradores';
const COL_FOROS = 'foros';


/**********  INICIO FUNCIONES ALUMNO ********/

export function getAlumnos() {
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

export function getAlumnosNombre(nombre) {
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

export function getAlumnosApellidos(apellidos) {
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

export function getAlumnosContrasenia(contrasenia) {
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

export function getAlumnosVisualizacionPredefinida(visualizacion) {
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

export function getAlumnosLogin(nombre, contrasenia) {
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

export function addAlumno(nombre, apellidos, contrasenia, foto, visualizacion) {
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

export function updateAlumno(id, {nombre='', apellidos='', visualizacionPreferente='', password='', foto=''}) {
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

export function getProfesores() {
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

export function getProfesoresNombre(nombre) {
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

export function getProfesoresApellidos(apellidos) {
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

export function getProfesoresContrasenia(contrasenia) {
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

export function getProfesoresLogin(nombre, contrasenia) {
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

export function addProfesor(nombre, apellidos, contrasenia, foto) {
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

export function updateProfesor(id, {nombre='', apellidos='', password='', foto=''}) {
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

export function getAdministradores() {
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

export function getAdministradoresNombre(nombre) {
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

export function getAdministadoresApellidos(apellidos) {
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

export function getAdministradoresContrasenia(contrasenia) {
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

export function getAdministradoresLogin(nombre, contrasenia) {
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

export function addAdministrador(nombre, apellidos, contrasenia, foto) {
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

export function updateAdministrador(id, {nombre='', apellidos='', password='', foto=''}) {
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

export function getForos() {
    let foros = null;
    
    try {
        const querydb = getFirestore();
        const queryCollection = collection(querydb, COL_FOROS);
        getDocs(queryCollection)
        .then(res => foros = res.docs.map(foro => ({id: foro.id, nombre: foro.nombre})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del alumno");
    }

    return foros;
}

export function getForosNombre(nombre) {
    let foros = null;

    try {
        const queryFilter = query(collection(getFirestore(), COL_FOROS), where('nombre', '==', nombre));
        getDocs(queryFilter)
        .then(res => foros = res.docs.map(foro => ({id: foro.id, nombre: foro.nombre})));
    } catch (error) {
        console.log("Ha habido un error al recoger los datos del foro");
    }
}

export function addForo(nombre) {
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

export function updateAdministrador(id, {nombre=''}) {
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

/**********  INICIO FUNCIONES PROFESOR-FORO ********/

export function getProfesoresForo() {
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

/**********  FINAL FUNCIONES PROFESOR-FORO ********/