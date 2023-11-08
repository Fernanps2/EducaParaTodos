import Context from './userContext'
import compruebaLogin from './compruebaLogin'
import { useCallback, useContext } from 'react'

export default function useUser() {
    const {jwt, setJWT} = useContext(Context)

    const login = useCallback((username, password, tipo) => {
        setJWT(compruebaLogin({username, password, tipo}));
    }, [setJWT])

    const logout = useCallback(() => {
        setJWT(null);
    }, [setJWT])

    return {
        isLogged: Boolean(jwt),
        login,
        logout
    }
}