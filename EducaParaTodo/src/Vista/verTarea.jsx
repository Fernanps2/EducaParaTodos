import React, { useState, useEffect} from 'react';
import Constants from 'expo-constants';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import tareas from '../Modelo/tareas';
import { buscarPasos, buscarTareaId, buscarTareaActividad, buscarTareasInventarioId, buscarTareasComandasId } from '../Controlador/tareas';
import {buscaProfesorAula} from '../Controlador/profesores';
import {buscaAlumnoId} from '../Controlador/alumnos';
import { Entypo } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export function VerTarea ({route, navigation}){
    const {id, idAlumno} = route.params;
    
    const [tareaAct, setTareaAct] = useState([]);
    const [pasos, setPasos] = useState([]);
    const [tarea, setTarea] = useState([]);
    const [profesor, setProfesor] = useState([]);
    const [alumno, setAlumno] = useState([]);
    /*const [tareaInv, setTareaInv] = useState([]);
    const [tareaCom, setTareaCom] = useState([]);*/

    useEffect(() => {
        const listaTarea = async () => {
            try {
                const Tarea = await buscarTareaId(id);
                setTarea(Tarea);

                console.log("tarea: " + JSON.stringify(Tarea));
            } catch (error) {
                console.log(error);
            }
        };
        listaTarea();
    }, []);   

    useEffect(() => {
        const listaTareas = async () => {
            try {
                const Tareas = await buscarTareaActividad(id);
                setTareaAct(Tareas);

                console.log("tareasL: " + JSON.stringify(Tareas));
            } catch (error) {
                console.log(error);
            }
        };
        listaTareas();
    }, []);    

    useEffect(() => {
        const listaPasos = async () => {
            try {
                const Pasos = await buscarPasos(id);
                setPasos(Pasos);

                console.log("Pasos: " + JSON.stringify(Pasos)); 
            } catch (error) {
                console.log(error);
            }
        };
        listaPasos();
    }, []);

    useEffect(() => {
        const listaProf = async () => {
            try {
                const Profe = await buscaProfesorAula(tareaActvidad.aula);
                setProfesor(Profe);

                console.log("Profesor: " + JSON.stringify(Profe)); 
            } catch (error) {
                console.log(error);
            }
        };
        listaProf();
    }, []);

    useEffect(() => {
        const listaAlum = async () => {
            try {
                const Alumn = await buscaAlumnoId(idAlumno);
                setAlumno(Alumn);

                console.log("Alumno: " + JSON.stringify(Alumn)); 
            } catch (error) {
                console.log(error);
            }
        };
        listaAlum();
    }, []);

    /*useEffect(() => {
        const listaTareas = async () => {
            try {
                const Tarea = await buscarTareasInventarioId(id);
                setTareaInv(Tarea);

                console.log("tareasInv: " + JSON.stringify(Tarea));
            } catch (error) {
                console.log(error);
            }
        };
        listaTareas();
    }, []);  
    
    useEffect(() => {
        const listaTareas = async () => {
            try {
                const Tarea = await buscarTareasComandasId(id);
                setTareaCom(Tarea);

                console.log("tareasCom: " + JSON.stringify(Tarea));
            } catch (error) {
                console.log(error);
            }
        };
        listaTareas();
    }, []); */ 

    const tareaActvidad = tareaAct[0];
    /*const tareaInventario = tareaInv[0];
    const tareaComanda = tareaCom[0];*/

    const [checkedStates, setCheckedStates] = useState([]);
    const [pasoActual, setPasoActual] = useState(0);

    useEffect(() => {
        // Inicializar los estados de los pasos
        const initialCheckedStates = Array(pasos.length).fill(false);
        setCheckedStates(initialCheckedStates);
    }, []);

    const handlePress = () => {
        // Actualizar el estado del paso actual al hacer clic en el botón de check
        const updatedCheckedStates = [...checkedStates];
        updatedCheckedStates[pasoActual] = !checkedStates[pasoActual];
        setCheckedStates(updatedCheckedStates);
    };

    const handleSiguiente = () => {
        if (pasoActual < pasos.length - 1) setPasoActual(pasoActual + 1);
    };

    const handleAnterior = () => {
        if (pasoActual > 0) setPasoActual(pasoActual - 1);
    };

    const pasosTarea = pasos;
    const pasoActualData = pasosTarea[pasoActual];

    return (
       /*} <View>
    {tarea && tarea.tipo == "actividad" ? (*/
                <View style={styles.container}>
                    <Text style={styles.tarea}>{tarea.titulo}</Text>
                    <Text style={styles.aula}>{tareaActvidad && tareaActvidad.aula}</Text>
                    <Image style={styles.foto} source={profesor.foto}/>
        
                    <View style={styles.pasos}>
                        {pasoActualData && pasoActualData.idImagen && pasoActualData.idImagen !== "Ninguno" && (
                        <Image source={pasoActualData.idImagen} style={{ width: 300, height: 300 }} />)}
        
                        {pasoActualData && pasoActualData.texto && (<Text style={styles.texto}>{pasoActualData.texto}</Text>)}
        
                        <View style={styles.botonesContainer}>
                                {pasoActual > 0 && (
                                    <TouchableOpacity onPress={handleAnterior} style={styles.botonAnterior}>
                                        <Entypo name="arrow-long-left" size={65} color="black" />
                                        <Text style={styles.botonTexto}>Anterior</Text>
                                    </TouchableOpacity> 
                                )}
                                <TouchableOpacity onPress={handleSiguiente} style={styles.botonSiguiente}>
                                    <Entypo name="arrow-long-right" size={65} color="black" />
                                    <Text style={styles.botonTexto}>Siguiente</Text>
                                </TouchableOpacity>
                        </View>
                    </View>
        
                    <View style={{margin: 20}}>
                        <TouchableOpacity style={styles.checkBox} onPress={handlePress}>
                            {checkedStates[pasoActual] ? <Text style={styles.check}>✔️</Text> : null}
                        </TouchableOpacity>
                    </View>
        
                    {/*<View style={{ alignItems: 'center' }}>
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
                                </View>*/}
            </View>
            /*) : tarea && tarea.tipo == "material" ? (
                <View style={styles.container}>
                    <Text style={styles.tarea}>{tarea.titulo}</Text>
                    <Text style={styles.aula}>{tareaInventario && tareaInventario.cantidad}</Text>
                </View>
            ) : ( //De tipo comanda
                <View>
                    <Text style={styles.tarea}>{tarea.titulo}</Text>
                    <Text style={styles.aula}>{tareaComanda && tareaComanda.menus[0]}</Text>
                </View>
            )}
        </View>*/
       
        
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
    aula: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20
    },
    pasos: {
        alignItems: 'center',
    },
    texto:{
        fontSize: 20,
        margin: Constants.statusBarHeight
    },
    botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 40
    },
    botonAnterior: {
        flex: 1,
        alignItems: 'flex-start',
    },
    botonSiguiente: {
        flex: 1,
        alignItems: 'flex-end',
    },
    botonTexto: {
        textAlign: 'center',
        fontSize: 20
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
        fontSize: 32
    },
    checkBox: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: 'green'
    },
    foto: {
        width: RFValue(100),
        height: RFValue(100),
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'black',
    }
})