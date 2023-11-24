import Context from './userContext'
import compruebaLogin from './compruebaLogin'
import { useCallback, useContext } from 'react'

export default function useUser() {
    let {jwt} = useContext(Context);

    const login = useCallback((username, password, tipo) => {
        jwt = compruebaLogin({username, password, tipo});
        console.log(jwt);
        return jwt != null;
    }, [jwt])

    const logout = useCallback(() => {
        jwt = null;
    }, [jwt])

    const actualizaJWT = async(username, password, tipo)=>{
        try {
            jwt = await compruebaLogin({username, password, tipo});
        } catch (error) {
            console.log(error);
        }
    }

    return {
        isLogged: Boolean(jwt),
        login,
        logout
    }
}