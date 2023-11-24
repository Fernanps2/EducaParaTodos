import React, { useState, useEffect} from 'react';
import Constants from 'expo-constants';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import tareas from '../Modelo/tareas';
import { Entypo } from '@expo/vector-icons';

export function VerTarea (){
    const [checkedStates, setCheckedStates] = useState([]);
    const [pasoActual, setPasoActual] = useState(0);

    useEffect(() => {
        // Inicializar los estados de los pasos
        const initialCheckedStates = Array(datos[2].length).fill(false);
        setCheckedStates(initialCheckedStates);
    }, []);

    const datos = tareas();

    const handlePress = () => {
        // Actualizar el estado del paso actual al hacer clic en el botón de check
        const updatedCheckedStates = [...checkedStates];
        updatedCheckedStates[pasoActual] = !checkedStates[pasoActual];
        setCheckedStates(updatedCheckedStates);
    };

    const handleSiguiente = () => {
        if (pasoActual < datos[2].length - 1) setPasoActual(pasoActual + 1);
    };

    const handleAnterior = () => {
        if (pasoActual > 0) setPasoActual(pasoActual - 1);
    };

    const pasosTarea = datos[2];
    const pasoActualData = pasosTarea[pasoActual];

    return (
        <View style={styles.container}>
            <Text style={styles.tarea}>{datos[0]}</Text>

            <View style={styles.pasos}>
                <Text style={styles.texto}>{pasoActualData.title}</Text>
                <Image source={pasoActualData.imagen} style={{ width: 300, height: 300 }} />
                <Text style={styles.texto}>{pasoActualData.data[0]}</Text>

                <View style={styles.botonesContainer}>
                        {pasoActual > 0 && (
                            <TouchableOpacity onPress={handleAnterior} style={styles.botonAnterior}>
                                <Entypo name="arrow-long-left" size={36} color="black" />
                                <Text style={styles.botonTexto}>Anterior        </Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={handleSiguiente} style={styles.botonSiguiente}>
                            <Entypo name="arrow-long-right" size={36} color="black" />
                            <Text style={styles.botonTexto}>        Siguiente</Text>
                        </TouchableOpacity>
                    </View>
            </View>

            <View style={{margin: 20}}>
                <TouchableOpacity style={styles.checkBox} onPress={handlePress}>
                    {checkedStates[pasoActual] ? <Text style={styles.check}>✔️</Text> : null}
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center' }}>
                <Text style={styles.opciones}>Opciones:</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    <View style={{marginHorizontal: 1}}>
                        <Button
                            // onPress={onPressLearnMore}
                            title="Texto"
                            color="#509594"
                        />
                    </View>
                    <View style={{marginHorizontal: 1}}>
                        <Button
                            // onPress={onPressLearnMore}
                            title="Imágenes"
                            color="#509594"
                        />
                    </View>
                    <View style={{marginHorizontal: 1}}>
                        <Button
                            // onPress={onPressLearnMore}
                            title="Vídeo"
                            color="#509594"
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                    <View style={{marginHorizontal: 1}}>
                        <Button
                            // onPress={onPressLearnMore}
                            title="Pictogramas"
                            color="#509594"
                        />
                    </View>
                    <View style={{marginHorizontal: 1}}>
                        <Button
                            // onPress={onPressLearnMore}
                            title="Audio"
                            color="#509594"
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        //marginTop: Constants.statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tarea: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 40
    },
    pasos: {
        alignItems: 'center',
    },
    texto:{
        fontSize: 20,
        //marginTop: Constants.statusBarHeight
    },
    botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    botonAnterior: {
        alignItems: 'flex-start',
        marginRight: 'auto'
    },
    botonSiguiente: {
        alignItems: 'flex-end',
        marginLeft: 'auto'
    },
    botonTexto: {
        textAlign: 'center',
    },
    opciones: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 10
    },
    descripcion: {
        fontSize: 17,
        padding: 20,
        textAlign: 'center'
    },
    title: {
        fontSize: 20,
        textDecorationLine: 'underline'
    },
    data: {
        fontSize: 17, padding: 20
    },
    check: {
        alignSelf: 'center',
        fontSize: 25
    },
    checkBox: {
        width: 40,
        height: 40,
        borderWidth: 2,
        borderColor: 'green'
    }
})