import React, { useEffect, useState } from 'react';
import { Alert, View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';
import { buscarMenus } from '../Controlador/tareas';
import { eliminarMenu } from '../Controlador/tareas';
import { RFValue } from 'react-native-responsive-fontsize';
import { descargarFotoMenu } from '../Modelo/firebase';



const DatosMenuEliminar = ({menu, navigation }) => {

    const [fotoMenu, setFotoMenu] = useState([]);

    useEffect(() => {
        const getFoto = async () => {
          try {
            const fotoMen = await descargarFotoMenu(menu.Imagen);
            setFotoMenu(fotoMen);
          } catch (error) {
            console.log("error en get fotos: " + error);
          }
        }
        getFoto();
      }, [menu]);
    
    return (
      <View>
          <Text> Menú: {menu.Nombre} </Text>
          <Image style={styles.foto} source={{ uri:fotoMenu.uri }} />
          <View style={styles.botonEliminar}>
          <Button title="Eliminar" onPress={() => {
            eliminarMenu(menu.Nombre);
                navigation.navigate('gestionMenus');
            }}
            > Eliminar
            </Button>
          </View>
      </View>
    )
  }
  

const EliminarMenu = ({navigation}) => {

    const [menuArray, setMenuArray] = useState([]);

    useEffect(() => {
        const getMenus = async () => {
          try {
            const menus = await buscarMenus();
            setMenuArray(menus);
          } catch (error) {
            console.log("El error es: " + error);
          }
        }
        getMenus();
      }, []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ELIMINAR MENÚS</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contenedor_tareas}>
        {menuArray.map((menu, index) => (
          <View key={index} style={styles.contenedor_tareas}>
            <DatosMenuEliminar menu={menu} navigation={navigation} />
          </View>
        ))}
      </ScrollView>

    </View>
  )
}

export default EliminarMenu;


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
    title: {
        fontWeight: 'bold',
        marginBottom: 20,
        marginRight: 50,
    },
    texto: {
        fontWeight: 'bold',
        marginBottom: 50,
        marginTop: 5,
        flexWrap: 'wrap',
    },
    foto: {
        width: RFValue(100),
        height: RFValue(100),    
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'black',
        marginLeft:20,
    },
    contenedor_tareas: {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
    },
    botonEliminar:{
    }
});



    

