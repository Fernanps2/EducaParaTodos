import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { Alert, View, Text, Button, StyleSheet, FlatList, CheckBox } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { buscarTareas, asignarUnaTarea } from '../Controlador/tareas.js';
import { buscaAlumno, buscaVisualizacionesPreferentesAlumno } from '../Controlador/alumnos.js';


export function AsignarTarea ({props, navigation}){

    const [selectedValue, setSelectedValue] = useState('');
    const [visualizaciones, setVisualizaciones] = useState([]);
    const [selectedVisualization, setSelectedVisualization] = useState('');
    const [visualizacionesPreferentes, setVisualizacionesPreferentes] = useState([]);
    const [selectedVisualizationType, setSelectedVisualizationType] = useState('');
    const [alumnos, setAlumnos] = useState([]);
    const [tareas, setTareas] = useState([]);

    const handleVisualizationSelection = (id) => {
      setSelectedVisualization(id);
    };

   useEffect(() => {
     const cargarTareas = async () => {
       try {
         const tareas = await buscarTareas();
         setTareas(tareas);
       } catch (error) {
         console.log(error);
         Alert.alert('Error al cargar las tareas');
       }
     };

     cargarTareas();

     const cargarAlumnos = async () => {
       try {
         const alumnos = await buscaAlumno();
         const alumnosConAsignado = alumnos.map(alumno => ({ ...alumno, asignado: false }));
         setAlumnos(alumnosConAsignado);
       } catch (error) {
         console.log(error);
         Alert.alert('Error al cargar los alumnos');
       }
     };

     cargarAlumnos();
   }, []);

    const handlePickerChange = (itemValue, setItemValue) => {
      setItemValue(itemValue);
    };

    const handleAlumnoSelection = async (id) => {
      const updateAlumnos = async (alumnoId) => {
        const updatedAlumnos = alumnos.map((alumno) => ({
          ...alumno,
          asignado: alumno.id === alumnoId,
        }));
        setAlumnos(updatedAlumnos);

        // Obtener las visualizaciones preferentes del alumno seleccionado
        const fetchedVisualizaciones = await buscaVisualizacionesPreferentesAlumno(alumnoId);
        setVisualizacionesPreferentes(fetchedVisualizaciones);
      };

      updateAlumnos(id);
    };


    const handleGuardar = async () => {
        try {
            const alumnosAsignados = alumnos.filter((alumno) => alumno.asignado);
            const promises = alumnosAsignados.map((alumno) =>
                alumno.asignado ? asignarUnaTarea(selectedValue, alumno.id, selectedVisualization) : null
            );
            await Promise.all(promises); // Espera a que todas las asignaciones se completen
            Alert.alert('Tareas asignadas con éxito');
            navigation.navigate('pantallaPrincipal');
        } catch (error) {
            console.log(error);
            Alert.alert('Error al asignar las tareas');
        }
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
                {/* Adaptar según la estructura actualizada */}
                <Text>{item.apellidos}</Text>
                {/* Otros campos si son necesarios */}
            </View>
        </View>
    );

    const renderVisualizacionItem = ({ item }) => (
      <View style={styles.visualizacionItem} key={item}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={selectedVisualizationType === item}
            onValueChange={() => {
              setSelectedVisualizationType(item === selectedVisualizationType ? '' : item);
              handleVisualizationSelection(item);
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text>{item}</Text>
        </View>
      </View>
    );



    return(

        <View style={styles.container}>
            <Text style={styles.titulo}> Tareas disponibles: </Text>
            <View style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={selectedValue}
                  onValueChange={(itemValue) => setSelectedValue(itemValue)}
                >
                  <Picker.Item label="Seleccione una tarea a asignar" value="" />
                  {tareas.map((tarea) => (
                    <Picker.Item key={tarea.id} label={tarea.titulo} value={tarea.id} />
                  ))}
                </Picker>
            </View>


            <Text style={styles.titulo}> Alumnos disponibles: </Text>

            <FlatList
                data={alumnos}
                renderItem={renderAlumnoItem}
                keyExtractor={(item) => item.id}
            />

            <Text style={styles.titulo}> Visualización preferente: </Text>

            <FlatList
              data={visualizacionesPreferentes}
              renderItem={renderVisualizacionItem}
              keyExtractor={(item, index) => index.toString()}
            />


            <View style={styles.boton}>
                <Button
                   title="Guardar"
                   onPress={handleGuardar}
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
        paddingBottom: 30,
        marginTop: 20,
    },
    pickerContainer: {
        borderColor: 'black', // Borde negro
        borderWidth: 1,
        borderRadius: 5, // Bordes redondeados
        width: 240,
        textAlign: 'center',
        marginBotom: 20,
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
    visualizacionItem: {
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