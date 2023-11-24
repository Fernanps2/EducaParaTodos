import React, { useState} from 'react';
import Constants from 'expo-constants';
import { View, Text, Button, StyleSheet, FlatList, CheckBox } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export function AsignarTarea (props){

    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');

    const [alumnos, setAlumnos] = useState([

        { id: '1', nombre: 'Juan', asignado: false },
        { id: '2', nombre: 'María', asignado: false },
        { id: '3', nombre: 'Hector', asignado: false },
        { id: '4', nombre: 'Pablo', asignado: false },

    ]);

    const [tempSelectedValue2, setTempSelectedValue2] = useState('');

  const handlePickerChange = (itemValue, setItemValue) => {
    setItemValue(itemValue);
  };

   const handleAlumnoSelection = (id) => {
     const updatedAlumnos = alumnos.map((alumno) =>
         alumno.id === id ? { ...alumno, asignado: !alumno.asignado } : alumno
     );
     setAlumnos(updatedAlumnos);
   };

   const renderAlumnoItem = ({ item }) => (
     <View style={styles.alumnoItem}>
       <View style={styles.checkboxContainer}>
         <CheckBox
           value={item.asignado}
           onValueChange={() => handleAlumnoSelection(item.id)}
         />
       </View>
       <View style={styles.textContainer}>
         <Text>{item.nombre}</Text>
       </View>
     </View>
   );

    return(

        <View style={styles.container}>
            <Text style={styles.titulo}> Tareas disponibles: </Text>
            <View style={styles.pickerContainer}>
                <Picker style={styles.picker}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue) =>
                    setSelectedValue(itemValue)
                }>
                    <Picker.Item label="Seleccione una tarea a asignar" value="" />
                    <Picker.Item label="Tarea1" value="Tarea1" />
                    <Picker.Item label="Tarea2" value="Tarea2" />
                    <Picker.Item label="Tarea3" value="Tarea3" />
                </Picker>
            </View>

            <Text style={styles.selectedValue}> {selectedValue}</Text>

            <Text style={styles.titulo}> Alumnos disponibles: </Text>

            <FlatList
              data={alumnos}
              renderItem={renderAlumnoItem}
              keyExtractor={(item) => item.id}
            />

            <View style={styles.boton}>
                <Button
                   title="Guardar"
               />
            </View>
        </View>
    )


}


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
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
    boton: {
        padding: 75,
    },
    alumnoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    textContainer: {
      flex: 1, // Ocupa el espacio disponible
    },
    checkboxContainer: {
      marginRight: 10, // Ajusta el espacio entre el texto y el CheckBox
    },
});

export default AsignarTarea;