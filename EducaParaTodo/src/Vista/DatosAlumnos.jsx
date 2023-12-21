import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { descargaFotoPersona } from '../Controlador/multimedia';

const DatosAlumnos = ({ alumno, navigation }) => {
    const [imagen, setImagen] = useState([]);

  // useEffect es un Hook de React que te permite sincronizar un componente con un sistema externo.
  useEffect(() => {
    const imagen = async () => {
      try {
        const imagen = await descargaFotoPersona(alumno.foto);
        setImagen(imagen);
        await console.log(imagen);
      } catch (error) {
        console.log(error);
      }
    };
    imagen();
  }, []);

    return (
            <View>
                <TouchableOpacity onPress={() => {
                                              if (alumno.tipoLogin == 'texto')
                                                navigation.navigate('LoginAlumno', { alumno: alumno });
                                              else if (alumno.tipoLogin == 'imagen')
                                                navigation.navigate('LoginAlumnoImagenes', {alumno: alumno});
                                              else
                                                console.log("No está definido tipoLogin");
                                          }}>
                    {/* Esto es muy importante mirarlo ya que aquí está cogiendo la ruta de una foto de internet no sé como hacer
                 para que la ruta sea de una foto que tenemos en una carpeta no se me muestra por pantalla */}
                    <Image style={styles.image} source={{uri: imagen.uri}} />
                    <Text style={styles.texto}> {alumno.nombre} </Text>
                </TouchableOpacity>
            </View>
    )
}
export default DatosAlumnos


const styles = StyleSheet.create({
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
    userIconPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#cccccc', // Un color de fondo para el placeholder
        // Otros estilos para el placeholder
      }
})