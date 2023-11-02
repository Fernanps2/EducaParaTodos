import React, { useState} from 'react';
import Constants from 'expo-constants';
import { View, Text, Button, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export function GestionarEstadoTareas (props){
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');

    const [tempSelectedValue2, setTempSelectedValue2] = useState('');

  const handlePickerChange = (itemValue, setItemValue) => {
    setItemValue(itemValue);
  };

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Tareas activas:</Text>
            <View style={styles.pickerContainer}>
                <Picker style={styles.picker}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue) =>
                    setSelectedValue(itemValue)
                }>
                    <Picker.Item label="Seleccione una tarea" value="" />
                    <Picker.Item label="Tarea1" value="Tarea1" />
                    <Picker.Item label="Tarea2" value="Tarea2" />
                    <Picker.Item label="Tarea3" value="Tarea3" />
                </Picker>
            </View>
            
            <Text style={styles.selectedValue}> {selectedValue}</Text>

            <Text style={styles.texto}>Alumno asignado: Nombre del alumno</Text>
            <Text style={styles.texto}>Estado: Completado, En curso, Sin hacer</Text>
            <Text style={styles.modificar}>Modificar estado:</Text>
            
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.picker}
                    selectedValue={tempSelectedValue2}
                    onValueChange={(itemValue2) =>
                        handlePickerChange(itemValue2, setTempSelectedValue2, setSelectedValue2)
                    }
                >
                    <Picker.Item label="Seleccione un estado" value="" />
                    <Picker.Item label="Completada" value="Completada" />
                    <Picker.Item label="En curso" value="En curso" />
                    <Picker.Item label="Sin hacer" value="Sin hacer" />
                </Picker>
            </View>
            
            <View style={styles.boton}>
                <Button 
                    title="Guardar"
                />
            </View>
            <View>

                <Button title= "eliminar tarea"
                    onPress={() => props.navigation.navigate('eliminarTarea')} />        
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingBottom: 30
    },
    pickerContainer: {
        borderColor: 'black', // Borde negro
        borderWidth: 1,
        borderRadius: 5, // Bordes redondeados
        width: 240,
        textAlign: 'center'
    },
    picker: {
        width: '100%',
        height: 40
    },
    selectedValue: {
        fontSize: 30,
        marginTop: 20,
        textAlign: 'center',
        padding: 20
    },
    texto: {
        fontWeight: 'bold', 
        fontSize: 20,
        padding: 5
    },
    modificar: {
        fontWeight: 'bold', 
        fontSize: 20,
        padding: 30
    },
    boton: {
        padding: 75,
    }
})