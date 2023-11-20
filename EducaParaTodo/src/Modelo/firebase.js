import React, {useEffect, useState} from 'react';

import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';
//import {}

export function getAlumnos() {
    let alumnos;
    const querydb = getFirestore();
    const queryDoc = doc(querydb, 'alumnos', '4kdUqZKobEDBh1Eh2d1x');
    getDoc(queryDoc)
    .then(res => alumnos = res);

    return alumnos;
}

export function getAlumnosNombre(nombre) {}

export function getAlumnosApellidos(apellidos) {}

export function getAlumnosContrasenia(contrasenia) {}

export function getAlumnosVisualizacionPredefinida(visualizacion) {}

export function getAlumnosLogin(nombre, contrasenia) {}

export function addAlumno(nombre, apellidos, contrasenia, foto, visualizacion) {}

