import React, { useEffect, useState } from 'react';
import { Alert, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { borraProfesor, buscaProfesor } from '../Controlador/profesores';
import { buscarMenus } from '../Controlador/tareas';
import { RFValue } from 'react-native-responsive-fontsize';


// El id es el de la tarea
const DatosMenu= ({prof, menu, id, navigation}) => {
  console.log("Seleccion menu id: " + id);
  console.log("nombre menu: " + menu.Nombre);
  console.log("id menu: " + menu.id);

  return (
    <View>
        <TouchableOpacity onPress={() => navigation.navigate('seleccionCantidad', {prof, menu, id,navigation})}>
            {/* Esto es muy importante mirarlo ya que aquí está cogiendo la ruta de una foto de internet no sé como hacer 
             para que la ruta sea de una foto que tenemos en una carpeta no se me muestra por pantalla */}
            <Image style={styles.foto} source={{ uri: menu.foto }} />
            <Text style={styles.texto}> Menú {menu.Nombre} </Text>
        </TouchableOpacity>
    </View>
)
}


const seleccionMenus = ({route, navigation}) => {

  const {id, prof} = route.params;
  console.log("profesor: " + JSON.stringify(prof.nombre));
  const aula = prof.aula;

  const [menuArray, setMenuArray] = useState([]);

  useEffect(() => {
    const getMenus = async() => {
      try{
        const menus = await buscarMenus();
        setMenuArray(menus);
        console.log(menuArray);
      } catch(error){
        console.log("error: " + error);
      }
    }
    getMenus();
  }, []);

    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Estoy en el aula: {aula}</Text>

          <Image style={styles.foto} source={{ uri: prof.foto }} />
        </View>

        <ScrollView contentContainerStyle={styles.datos}>
                {menuArray.map((menu, index) => (
                    <View key={index} style={styles.contenedor_tareas}>
                        <DatosMenu prof={prof} menu={menu} id={id} navigation={navigation} />
                    </View>
                ))}
            </ScrollView>

      </View>
    )
}

export default seleccionMenus;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
        flexDirection: 'row', // Alinea los elementos en fila (horizontal)
        alignItems: 'center', // Alinea los elementos verticalmente en el centro
        justifyContent: 'center'
    },
    datos: {
      flexDirection: 'row',
      flexWrap: 'wrap',    
      marginTop:50,
  },
    title: {
      fontSize: RFValue(16),
      fontWeight: 'bold',
      marginBottom:20,
      marginRight: 50,
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