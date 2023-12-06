import React, { useEffect, useState } from 'react';
import { Alert, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { borraProfesor, buscaProfesor } from '../Controlador/profesores';
import { buscarMenus } from '../Controlador/tareas';


const DatosMenu= ({menu, id, navigation}) => {
  console.log("Seleccion menu id: " + id);
  return (
    <View>
        {/* <TouchableOpacity onPress={() => navigation.navigate('seleccionCantidad', {id, menu,navigation})}>
            <Image style={styles.foto} source={{ uri: menu.foto }} />
            <Text style={styles.texto}> Menú {menu.Nombre} </Text>
        </TouchableOpacity> */}
      <Text style={styles.texto}>Seleccion de cantidad del menú </Text>
    </View>
)
}


const seleccionCantidad = ({route, navigation}) => {

  const {prof, menu, id} = route.params;
  const idMenu = menu.id

  const [Menu, setMenu] = useState([]);

  useEffect(() => {
    const getMenu = async() => {
      try{
        const menus = await buscarMenu(idMenu);
        setMenu(menu);
        console.log(menu);
      } catch(error){
        console.log("error: " + error);
      }
    }
    getMenu();
  }, []);

    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Estoy en el aula: {prof.aula}</Text>
          <Image style={styles.foto} source={{ uri: prof.foto }} />
        </View>
        <View>
          <Text style={styles.title}>Estoy seleccionando el menu: {menu.Nombre}</Text>
          <Image style={styles.foto} source={{ uri: menu.foto }} />
        </View>
{/* 
        <ScrollView contentContainerStyle={styles.datos}>
                {menuArray.map((menu, index) => (
                    <View key={index} style={styles.contenedor_tareas}>
                        <DatosMenu menu={menu} id={id} navigation={navigation} />
                    </View>
                ))}
            </ScrollView> */}

      </View>
    )
}

export default seleccionCantidad;

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
      fontSize: 50,
      fontWeight: 'bold',
      marginBottom:20,
      marginRight: 50,
    },
  texto: {
      fontWeight: 'bold',
      marginBottom: 50,
      marginTop: 5,
      flexWrap: 'wrap',  
      fontSize: 50,
  },
  foto: {
      width: 200,
      height: 200,
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