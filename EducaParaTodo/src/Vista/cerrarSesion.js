import React from 'react'
import {Image, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import useUser from '../Controlador/useUser';

export function CerrarSesion () {
    const navigation = useNavigation();
    const {logout} = useUser();

    const handleLogout = () => {
        logout();
    }

    return (
        <Button 
            title='Cerrar Sesion' 
            onPress={() => {
                handleLogout();
                navigation.navigate('HomeLogin');
            }}>
                <Image src={require('../../Imagenes/salirIcon.png')}></Image>
        </Button>
    );
}