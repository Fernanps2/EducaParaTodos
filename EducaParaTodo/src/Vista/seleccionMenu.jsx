import React, { useEffect, useState } from 'react';
import { Alert, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { borraProfesor, buscaProfesor } from '../Controlador/profesores';
import { buscarMenus } from '../Controlador/tareas';
import { RFValue } from 'react-native-responsive-fontsize';
import { buscarPedido } from '../Controlador/tareas';


// El id es el de la tarea
const DatosMenu = ({ prof, menu, id, navigation }) => {
  console.log("menu: " + menu.Nombre);
  
  const [seleccionado, setSeleccionado] = useState(false);
  
  useEffect(() => {
      const obtenerPedidos = async() => {
          try{
              const datosPedido = await buscarPedido(menu.id, prof.id,id);
              if(datosPedido && datosPedido.length > 0){
                setSeleccionado(true);
              }
          } catch(error){
              console.log("error: " + error);
          }
          console.log("otro menú");
      }
      obtenerPedidos();
      // Esto hace que la función se ejecute cada vez que se cambie la combinación de 
      // id menu e id profesor, ya que si no pusiéramos esto solo se ejecutaría la primera vez
  },[menu.id, prof.id]);

  return (
    <View>
      <TouchableOpacity onPress={() => {
         navigation.navigate('seleccionCantidad', { prof, menu, id, navigation })
         }}>
        {/* Esto es muy importante mirarlo ya que aquí está cogiendo la ruta de una foto de internet no sé como hacer 
             para que la ruta sea de una foto que tenemos en una carpeta no se me muestra por pantalla */}
        <Image style={[styles.foto, seleccionado && styles.selectedFoto]} source={{ uri: menu.Imagen }} />
        <Text style={[styles.texto, seleccionado && styles.textoSelected]}> Menú {menu.Nombre} </Text>
      </TouchableOpacity>
    </View>
  )
}


const SeleccionMenus = ({ route, navigation }) => {

  // El id es de la tarea
  const { id, prof } = route.params;
  const aula = prof.aula;

  const [menuArray, setMenuArray] = useState([]);

  useEffect(() => {
    const getMenus = async () => {
      try {
        const menus = await buscarMenus();
        setMenuArray(menus);
      } catch (error) {
        console.log("error: " + error);
      }
    }
    getMenus();
  }, []);


  return (
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

export default SeleccionMenus;

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
    marginTop: 50,
  },
  title: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    marginBottom: 20,
    marginRight: 50,
  },
  texto: {
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop: 5,
    flexWrap: 'wrap',
    fontSize: RFValue(16),
  },
  textoSelected:{
    backgroundColor: 'green',
  },
  foto: {
    width: RFValue(100),
    height: RFValue(100),
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'black',
  },
  selectedFoto:{
    borderWidth:8,
    borderColor: 'green', 
  },
  contenedor_tareas: {
    flexDirection: 'column',
    width: '33%',
    alignItems: 'center',
  },

});