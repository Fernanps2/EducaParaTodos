import Context from './userContext'
import compruebaLogin from './compruebaLogin'
import { useCallback, useContext } from 'react'

export default function useUser() {
    let {jwt} = useContext(Context)

    const login = useCallback((username, password, tipo) => {
        (jwt = (compruebaLogin({username, password, tipo})));
        return jwt != null;
    }, [jwt])

    const logout = useCallback(() => {
        jwt = null;
    }, [jwt])

    return {
        isLogged: Boolean(jwt),
        login,
        logout
    }
}