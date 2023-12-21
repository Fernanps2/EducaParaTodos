import React, { useState, useEffect, useRef } from 'react';
import Constants from 'expo-constants';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { buscarPasos, buscarTareaId, buscarTareaActividad, getvisualizacion} from '../Controlador/tareas';
import {buscaProfesorAula} from '../Controlador/profesores';
import {buscaAlumnoId} from '../Controlador/alumnos';
import { descargaFotoPersona, descargaImagen, descargaPictograma, descargaVideo } from '../Controlador/multimedia';
import { Entypo } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Video, ResizeMode } from 'expo-av';

export function VerTarea ({route, navigation}){
    const {id, idAlumno} = route.params;
    
    //Variables que almacenan los datos sacados de la base de datos
    const [tareaAct, setTareaAct] = useState([]);
    const [pasos, setPasos] = useState([]);
    const [tarea, setTarea] = useState([]); 
    const [profesor, setProfesor] = useState([]);
    const [visualizacion, setVisualizacion] = useState();
    const [imagen, setImagen] = useState([]);
    const [pictograma, setPictograma] = useState([]);
    const [video, setVideo] = useState([]);
    const [foto, setFoto] = useState([]);

    //Variables para poder reproducir los videos
    const vid = React.useRef(null);
    const [status, setStatus] = React.useState({});

    //Variable para almacenar temporalmente el profesor y poder sacar información de la base de datos
    const profesorRef = useRef(profesor);

    //Función que obtiene la tarea a partir del id que se pasa en la routa de navegación
    useEffect(() => {
        const listaTarea = async () => {
            try {
                const Tarea = await buscarTareaId(id);
                setTarea(Tarea);
            } catch (error) {
                console.log(error);
            }
        };
        listaTarea();
    }, []);     

    //Función que busca en la bd una tarea de tipo actividad con el id de la tarea
    useEffect(() => {
        const listaTareas = async () => {
            try {
                const Tareas = await buscarTareaActividad(id);
                setTareaAct(Tareas);
            } catch (error) {
                console.log(error);
            }
        };
        listaTareas();
    }, []);    

    //Función que obtiene los distintos pasos de una tarea de tipo actividad
    useEffect(() => {
        const listaPasos = async () => {
            try {
                const Pasos = await buscarPasos(id);
                setPasos(Pasos); 
            } catch (error) {
                console.log(error);
            }
        };
        listaPasos(); 
    }, []); 

    const tareaActvidad = tareaAct[0];

    //Función que obtiene un profesor a partir del aula que tiene asignada
    useEffect(() => {
        const listaProf = async () => {
            try {
                const Profe = await buscaProfesorAula(tareaActvidad.aula);
                setProfesor(Profe);
                profesorRef.current = Profe; //Guardamos el estado actual para usarlo en la siguiente función
            } catch (error) {
                console.log(error);
            }
        };
        listaProf(); 
    }, [tareaActvidad]);

    //Función que obtiene y descarga la foto del profesor
    useEffect(() => {
        const getFoto = async () => {
            try {
                const currentProfesor = profesorRef.current;
     
                if (Array.isArray(currentProfesor) && currentProfesor.length > 0) {
                    const primerProfesor = currentProfesor[0];
                    
                    if (primerProfesor.foto && typeof primerProfesor.foto === "string" && primerProfesor.foto.trim() !== "") {
                        const fotoDescargada = await descargaFotoPersona(primerProfesor.foto);
                        setFoto(fotoDescargada);
                    }
                }
            } catch (error) {
                console.log("Error al obtener la foto: ", error);
            }
        };
    
        getFoto();
    }, [profesor]);     

    //Función que obtiene la visualización que tiene una tarea
    useEffect(() => {
        const listaVis = async () => {
            try {
                const Visuali = await getvisualizacion(id);
                setVisualizacion(Visuali);
            } catch (error) {
                console.log(error);
            }
        };
        listaVis();
    }, []);

    //Varibles para gestionar los pasos de una tarea
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

    //Pasa al siguiente paso al pulsar el botón siguiente
    const handleSiguiente = () => {
        if (pasoActual < pasos.length - 1) setPasoActual(pasoActual + 1);
    };

    //Vuelve al paso anterior al pulsar el botón anterior
    const handleAnterior = () => {
        if (pasoActual > 0) setPasoActual(pasoActual - 1);
    };

    const pasosTarea = pasos;
    const pasoActualData = pasosTarea[pasoActual];

    //Descarga la imagen del paso actual de una tarea
    useEffect(() => {
        const listaImagen = async () => {
            try {
                
                if(pasoActualData && pasoActualData.imagen){
                    const Imagen = await descargaImagen(pasoActualData.imagen);
                    setImagen(Imagen);
                    setImagenCargada(true);
                }
            } catch (error) {
                console.log(error);
            }
        }; 
        listaImagen();  
    }, [pasoActualData]); 

    //Descarga el pictograma del paso actual de una tarea
    useEffect(() => {
        const listaPictograma = async () => {
            try {
                
                if(pasoActualData && pasoActualData.pictograma){
                    const Pictograma = await descargaPictograma(pasoActualData.pictograma);
                    setPictograma(Pictograma);
                }
            } catch (error) {
                console.log(error);
            }
        }; 
        listaPictograma();  
    }, [pasoActualData]);

    //Descarga el video del paso actual de una tarea
    useEffect(() => {
        const listaVideo = async () => {
            try {
                
                if(pasoActualData && pasoActualData.video){
                    const Video = await descargaVideo(pasoActualData.video);
                    setVideo(Video); 
                }
            } catch (error) {
                console.log(error);
            }
        }; 
        listaVideo();  
    }, [pasoActualData]);

    useEffect(() => {
        // Función para reproducir el video automáticamente
        const playVideo = async () => {
          if (vid.current) {
            await vid.current.playAsync();
          }
        };
    
        playVideo();
      }, [video]);
    
    
    return (
        <View style={styles.container}> 
            <Text style={styles.tarea}>{tarea.titulo}</Text>
            <Text style={styles.aula}>Aula {tareaActvidad && tareaActvidad.aula}</Text> 
            <Image style={styles.fotoProfe} source={{uri: foto.uri}} accessibilityLabel={profesor.nombre}/>
    
            <View style={styles.pasos}>
                {/*En función de la visualización, se muestra una cosa u otra*/}
                {pasoActualData && pasoActualData.imagen && pasoActualData.imagen !== "Ninguno" && 
                visualizacion == "imagenes" && (
                    <Image source={{uri: imagen.uri}} style={styles.foto} accessibilityLabel={pasoActualData.texto}/>
                )} 

                {pasoActualData && pasoActualData.pictograma && pasoActualData.pictograma !== "Ninguno" && 
                visualizacion == "pictogramas" && (
                    <Image source={{uri: pictograma.uri}} style={styles.foto} />
                )}  

                {pasoActualData && pasoActualData.video && pasoActualData.video !== "Ninguno" && 
                visualizacion == "video" && (
                    <Video ref={vid} style={styles.video}
                    source={{uri: video.uri}}
                    useNativeControls resizeMode={ResizeMode.CONTAIN} isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}/>
                )} 

                {/*El texto se muestra siempre*/}
                {pasoActualData && pasoActualData.texto && (<Text style={styles.texto}>{pasoActualData.texto}</Text>)}

                <View style={styles.botonesContainer}>
                        {pasoActual > 0 && (
                            <TouchableOpacity onPress={handleAnterior} style={styles.botonAnterior}>
                                <Entypo name="arrow-long-left" size={120} color="black" />
                                <Text style={styles.botonTexto}>Anterior</Text>
                            </TouchableOpacity> 
                        )}
                        <TouchableOpacity onPress={handleSiguiente} style={styles.botonSiguiente}>
                            <Entypo name="arrow-long-right" size={120} color="black" />
                            <Text style={styles.botonTexto}>Siguiente</Text> 
                        </TouchableOpacity>
                </View> 
            </View>

            <View style={{margin: 20}}>
                <TouchableOpacity style={styles.checkBox} onPress={handlePress}>
                    {checkedStates[pasoActual] ? <Text style={styles.check}>✔️</Text> : null}
                </TouchableOpacity>
            </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tarea: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: RFValue(20)
    },
    aula: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: RFValue(13), 
    },
    pasos: {
        flex:1,
        alignItems: 'center',        
    },
    texto:{
        fontSize: RFValue(15),
        margin: RFValue(10)
    }, 
    botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: RFValue(40)
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
        fontSize: RFValue(19)
    },
    check: {
        alignSelf: 'center',
        fontSize: RFValue(30)
    },
    checkBox: {
        width: RFValue(50),
        height: RFValue(50),
        borderWidth: RFValue(2),
        borderColor: 'green'
    },
    fotoProfe: {
        width: RFValue(55),
        height: RFValue(55),
        borderRadius: RFValue(10),
        overflow: 'hidden',
        borderWidth: RFValue(1),
        borderColor: 'black',
    },
    foto: {
        marginTop: RFValue(15),
        width: RFValue(240),
        height: RFValue(140),
        borderRadius: RFValue(5),
        overflow: 'hidden',
        borderWidth: RFValue(1),
        borderColor: 'black',
    },
    video: {
        marginTop: RFValue(15),
        width: RFValue(240),
        height: RFValue(120),
        borderRadius: RFValue(5),
        overflow: 'hidden',
        borderWidth: RFValue(1),
        borderColor: 'black',
    }
})