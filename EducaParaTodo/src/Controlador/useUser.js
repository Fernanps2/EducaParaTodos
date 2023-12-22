import { useState } from 'react';
import Context from './userContext'
import compruebaLogin from './compruebaLogin'
import { useCallback, useContext } from 'react'

export default function useUser() {
    let {jwt, setJWT} = useContext(Context);
    let jwt2 = null;

    async function handleLogin(username, password, tipo) {
        jwt2 = (await compruebaLogin(username, password, tipo));
        setJWT(jwt2);
        console.log("jwt:",jwt2);
        return jwt2!=null;
    }

    /**
     * @name login
     * 
     * @description Comprueba si el usuario está identificado en el sistema y guarda el identificador
     * 
     * @param {String} username Nombre de usuario
     * @param {String} password Contraseña del usuario
     * @param {String} tipo Tipo de usuario: 'alumno', 'profesor' o 'administrador'
     * @returns @true si es correcto, @false si no
     */
    const login = async (username, password, tipo) => {
        const logueado = await handleLogin(username, password, tipo);
        console.log("logueado:", logueado);
        return logueado;
    } 

    /**
     * @name logout
     * 
     * @description Sirve para borrar el identificador del usuario, cerrar sesión
     */
    const logout = useCallback(() => {
        setJWT(null);
        jwt2 = null;
    }, [jwt, jwt2])

    return {
        isLogged: Boolean(jwt),
        login,
        logout,
        jwt
    }
}