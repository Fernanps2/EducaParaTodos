import React from 'react'
import alumnos from '../Modelo/alumno'
import profesores from '../Modelo/profesor'
import administradores from '../Modelo/administrador'

export default function compruebaLogin ({username, password, tipo}) {
    const alumno = alumnos();
    const {profesor} = profesores();
    const {administrador} = administradores()

    //function esLogin() {
        let encontrado = false;
        let token = null;
        if (tipo == 'alumno') {
            for (let i = 0; i < alumno.length && !encontrado; i++) {
                if (username == alumno[i].username && password == alumno[i].password) {
                    encontrado = true;
                    
                    token = alumno[i].jwt;
                }
            }
        } else if (tipo == 'profesor') {
            for (let i = 0; i < profesor.length && !encontrado; i++) {
                if (username == profesor[i].username && password == profesor[i].password) {
                    encontrado = true;
                    
                    token = profesor[i].jwt;
                }
            }
        } else if (tipo == 'administrador') {
            for (let i = 0; i < administrador.length && !encontrado; i++) {
                if (username == administrador[i].username && password == administrador[i].password) {
                    encontrado = true;
                    
                    token = administrador[i].jwt;
                }
            }
        }

        return token;
    //}

    //return (esLogin());
}








// import React from 'react';
// import alumnos from '../Modelo/alumno';
// import profesores from '../Modelo/profesor';
// import administradores from '../Modelo/administrador';

// export default function compruebaLogin ({username, password, tipo}) {
//     const {alumno} = alumnos();
//     // const alumnosArray = Object.values(datos);   // Convertimos los datos un array
//     const {profesor} = profesores();
//     const {administrador} = administradores()

//     //function esLogin() {
//         let encontrado = false;
//         let token = null;
//         if (tipo == 'alumno') {
//             for (let i = 0; i <alumno.length && !encontrado; i++) {
//                 if (username ==alumno[i].username && password == alumno[i].password) {
//                     encontrado = true;
                    
//                     token = alumno[i].jwt;
//                 }
//             }
//         } else if (tipo == 'profesor') {
//             for (let i = 0; i < profesor.length && !encontrado; i++) {
//                 if (username == profesor[i].username && password == profesor[i].password) {
//                     encontrado = true;
                    
//                     token = profesor[i].jwt;
//                 }
//             }
//         } else if (tipo == 'administrador') {
//             for (let i = 0; i < administrador.length && !encontrado; i++) {
//                 if (username == administrador[i].username && password == administrador[i].password) {
//                     encontrado = true;
                    
//                     token = profesor[i].jwt;
//                 }
//             }
//         }

//         return token;
//     //}

//     //return (esLogin());
// }