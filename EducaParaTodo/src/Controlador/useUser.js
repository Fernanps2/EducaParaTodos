import { useState } from 'react';
import Context from './userContext'
import compruebaLogin from './compruebaLogin'
import { useCallback, useContext } from 'react'

export default function useUser() {
    let {jwt, setJWT} = useContext(Context);
    //const [jwt2, setJWT2] = useState(null);
    let jwt2 = null;

    async function handleLogin(username, password, tipo) {
        jwt2 = (await compruebaLogin(username, password, tipo));
        setJWT(jwt2);
        console.log("jwt:",jwt2);
        return jwt2!=null;
    }

    /*const login = useCallback((username, password, tipo) => {
        return handleLogin(username, password, tipo);
        //console.log(jwt);
    }, [jwt2])*/

    const login = async (username, password, tipo) => {
        const logueado = await handleLogin(username, password, tipo);
        console.log("logueado:", logueado);
        return logueado;
    } 

    const logout = useCallback(() => {
        setJWT(null);
        jwt2 = null;
    }, [jwt, jwt2])

    /*const actualizaJWT = async(username, password, tipo)=>{
        try {
            jwt = await compruebaLogin({username, password, tipo});
        } catch (error) {
            console.log(error);
        }
    }*/

    return {
        isLogged: Boolean(jwt),
        login,
        logout,
        jwt
    }
}