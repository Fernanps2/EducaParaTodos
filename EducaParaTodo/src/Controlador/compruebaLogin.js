import React from 'react'
import alumno from '../Modelo/alumno'
import profesor from '../Modelo/profesor'

export default function compruebaLogin ({username, password, tipo}) {
    const arrayAlumnos = alumno;
    const arrayProfes = profesor;

    function esLogin() {
        let encontrado = false;
        let token = null;

        if (tipo == 'alumno') {
            /*for (let i in alumno && !encontrado) {
                if (username == i.username && password == i.password) {
                    encontrado = true;
                    token = i.jwt;
                }
            }*/
            if (username == alumno.username && password == alumno.password) {
                encontrado = true;
                token = alumno.jwt;
            }
        } /*else if (tipo == 'profesor') {
            for (let i in arrayProfes && !encontrado) {
                if (username == i.username && password == i.password) {
                    encontrado = true;
                    token = i.jwt;
                }
            }
        }*/

        return token;
    }

    return (esLogin());
}