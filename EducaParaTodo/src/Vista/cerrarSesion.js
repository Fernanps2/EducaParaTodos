import React from 'react'
import {Image, Button} from 'react-native'

export function CerrarSesion ({navigation}) {
    return (
        <Button title='Cerrar Sesion' onPress={() => navigation.navigate('HomeLogin')}><Image src={require('../../Imagenes/salirIcon.png')}></Image></Button>
    );
}