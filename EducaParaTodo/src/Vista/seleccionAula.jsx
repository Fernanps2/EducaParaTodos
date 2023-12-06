import React, { useEffect, useState } from 'react';
import { Alert, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { borraProfesor, buscaProfesor } from '../Controlador/profesores';
import { responsiveFontSize } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

const DatosProfesor = ({prof, id, navigation}) => {
  console.log("Seleccion aula idTarea: " + id);
  console.log("profesor funcion: " + JSON.stringify(prof));
  return (
    <View>
        <TouchableOpacity onPress={() => navigation.navigate('seleccionMenu', {id, prof})}>
            {/* Esto es muy importante mirarlo ya que aquí está cogiendo la ruta de una foto de internet no sé como hacer 
             para que la ruta sea de una foto que tenemos en una carpeta no se me muestra por pantalla */}
            <Image style={styles.foto} source={{ uri: prof.foto }} />
            <Text style={styles.texto}> Aula: {prof.aula} </Text>
        </TouchableOpacity>
    </View>
)
}


const seleccionAula = ({route, navigation}) => {

  const {id} = route.params;

  const [profesoresArray, setProfesoresArray] = useState([]);

  useEffect(() => {
    const getProfesores = async() => {
      try{
        const profesores = await buscaProfesor();
        setProfesoresArray(profesores);
        console.log("profesores: " + JSON.stringify(profesoresArray[0]));
      } catch(error){
        console.log("error: " + error);
      }
    }
    getProfesores();
  }, []);

    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Aulas</Text>
        </View>

        <ScrollView contentContainerStyle={styles.datos}>
                {profesoresArray.map((profesor, index) => (
                    <View key={index} style={styles.contenedor_tareas}>
                        <DatosProfesor prof={profesor} id={id} navigation={navigation} />
                    </View>
                ))}
            </ScrollView>

      </View>
    )
}

export default seleccionAula;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      marginBottom: 20,
      alignItems: 'center',
    },
    datos: {
      flexDirection: 'row',
      flexWrap: 'wrap',    
  },

    title: {
      fontSize: 50,
      fontWeight: 'bold',
      marginBottom:20,
    },
  texto: {
      fontWeight: 'bold',
      marginBottom: 50,
      marginTop: 5,
      flexWrap: 'wrap',  
      fontSize: RFValue(16),
  },
  foto: {
      width: RFValue(100),
      height: RFValue(100),
      borderRadius: 20,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: 'black',


  },
  contenedor_tareas: {
      flexDirection: 'column',
      width:'33%',
      alignItems: 'center',
  },

});