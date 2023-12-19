import React, { useState, useEffect, useRef } from 'react';
import Constants from 'expo-constants';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { buscarPasos, buscarTareaId, buscarTareaActividad, buscaVisualizacion} from '../Controlador/tareas';
import {buscaProfesorAula} from '../Controlador/profesores';
import {buscaAlumnoId} from '../Controlador/alumnos';
import { descargaFotoPersona, descargaImagen, descargaPictograma, descargaVideo } from '../Controlador/multimedia';
import { Entypo } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Video, ResizeMode } from 'expo-av';

export function VerTarea ({route, navigation}){
    const {id, idAlumno} = route.params;
    
    const [tareaAct, setTareaAct] = useState([]);
    const [pasos, setPasos] = useState([]);
    const [tarea, setTarea] = useState([]); 
    const [profesor, setProfesor] = useState([]);
    const [alumno, setAlumno] = useState([]);
    const [visualizacion, setVisualizacion] = useState();
    const [imagen, setImagen] = useState([]);
    const [pictograma, setPictograma] = useState([]);
    const [video, setVideo] = useState([]);
    //const [imagenCargada, setImagenCargada] = useState(false);
    const [foto, setFoto] = useState([]);

    const vid = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const profesorRef = useRef(profesor);

    useEffect(() => {
        const listaTarea = async () => {
            try {
                const Tarea = await buscarTareaId(id);
                setTarea(Tarea);

                //console.log("tarea: " + JSON.stringify(Tarea));
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

                //console.log("tareasL: " + JSON.stringify(Tareas));
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

                //console.log("Pasos: " + JSON.stringify(Pasos)); 
            } catch (error) {
                console.log(error);
            }
        };
        listaPasos(); 
    }, []); 

    const tareaActvidad = tareaAct[0];

    useEffect(() => {
        const listaProf = async () => {
            try {
                const Profe = await buscaProfesorAula(tareaActvidad.aula);
                setProfesor(Profe);
                profesorRef.current = Profe;
                //console.log("Profesor: " + JSON.stringify(Profe)); 
            } catch (error) {
                console.log(error);
            }
        };
        listaProf(); 
    }, [tareaActvidad]);

    useEffect(() => {
        const getFoto = async () => {
            try {
                const currentProfesor = profesorRef.current;
                //console.log("CurrentProfesor: ", currentProfesor);
     
                if (Array.isArray(currentProfesor) && currentProfesor.length > 0) {
                    const primerProfesor = currentProfesor[0];
                    
                    if (primerProfesor.foto && typeof primerProfesor.foto === "string" && primerProfesor.foto.trim() !== "") {
                        //console.log("foto profesor: ", primerProfesor.foto);
                        const fotoDescargada = await descargaFotoPersona(primerProfesor.foto);
                        setFoto(fotoDescargada);
                        //console.log("foto descargada: ", fotoDescargada);
                    } else {
                        //console.log("La propiedad 'foto' en el primer profesor no es una cadena válida o está vacía.");
                    }
                } else {
                    //console.log("currentProfesor es un array vacío o no es un array.");
                }
            } catch (error) {
                //console.log("Error al obtener la foto: ", error);
            }
        };
    
        getFoto();
    }, [profesor]);     

    useEffect(() => {
        const listaAlum = async () => {
            try {
                const Alumn = await buscaAlumnoId(idAlumno);
                setAlumno(Alumn);
 
                //console.log("Alumno: " + JSON.stringify(Alumn)); 
            } catch (error) {
                console.log(error);
            }
        };
        listaAlum();
    }, []);

    useEffect(() => {
        const listaVis = async () => {
            try {
                const Visuali = await buscaVisualizacion(id);
                setVisualizacion(Visuali);

                //console.log("Visualizacion: " + JSON.stringify(Visuali)); 
            } catch (error) {
                console.log(error);
            }
        };
        listaVis();
    }, []);

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

    useEffect(() => {
        const listaImagen = async () => {
            try {
                
                if(pasoActualData && pasoActualData.imagen){
                    const Imagen = await descargaImagen(pasoActualData.imagen);
                    setImagen(Imagen);
                    setImagenCargada(true);
                    //console.log("Imagen: " + JSON.stringify(Imagen)); 
                }
            } catch (error) {
                console.log(error);
            }
        }; 
        listaImagen();  
    }, [pasoActualData]); 

    useEffect(() => {
        const listaPictograma = async () => {
            try {
                
                if(pasoActualData && pasoActualData.pictograma){
                    const Pictograma = await descargaPictograma(pasoActualData.pictograma);
                    setPictograma(Pictograma);
                    //console.log("Pictograma: " + JSON.stringify(Pictograma)); 
                }
            } catch (error) {
                console.log(error);
            }
        }; 
        listaPictograma();  
    }, [pasoActualData]);

    useEffect(() => {
        const listaVideo = async () => {
            try {
                
                if(pasoActualData && pasoActualData.video){
                    const Video = await descargaVideo(pasoActualData.video);
                    setVideo(Video);
                    //console.log("Video: " + JSON.stringify(Video)); 
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
        //marginTop: Constants.statusBarHeight,
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
        //marginTop: 0
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
       // marginTop: 0,
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