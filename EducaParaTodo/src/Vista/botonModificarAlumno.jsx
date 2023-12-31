import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity, Platform } from 'react-native';

const BotonModificarAlumno = ({ texto, alumno, navigation }) => {
    return (
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('modificarAlumno', { alumno: alumno })}>
                 <Text style={styles.buttonText}>{texto}</Text>
                </TouchableOpacity>
                
            </View>
    )
}
export default BotonModificarAlumno


const styles = StyleSheet.create({
    objeto:{
        flexDirection: 'column',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'black',
    },
    texto: {
        fontWeight: 'bold',
        marginBottom: 50,
        marginTop: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
})