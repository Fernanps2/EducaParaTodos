import React, { useEffect, useState } from 'react';
import { Alert, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Platform} from 'react-native';
import { borraProfesor, buscaProfesor } from '../Controlador/profesores';
import { aniadirPedido, buscarMenu, buscarPictogramasNumero,buscarPedido, actualizarPedido } from '../Controlador/tareas';
import { RFValue } from 'react-native-responsive-fontsize';
import Swal from "sweetalert2";
import seleccionAula from './seleccionAula';

const showAlertGuardar = (id, idMenu, prof, pedidos,existePedido,navigation) => {
  if(navigation)
  console.log("la navegacion es correcta231");
  if (Platform.OS === "web") {
    Swal.fire({
      title: "¿Guardar menus?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        if(existePedido){
          console.log("actualizamos pedido");
          actualizarPedido(id,idMenu,prof.id,prof.aula,pedidos);

        } else{
          console.log("añadimos pedido");
          aniadirPedido(id,idMenu,prof.id, prof.aula,pedidos);
        }
        navigation.navigate('seleccionAula',{id}); // Navegar a la página SeleccionAula

      }
    });

  } else {
    Alert.alert(
      "¿Quiere guardar?", // Título
      "Pulsa una opción", // Mensaje
      [
        { text: "Cancelar" },
        { text: "Confirmar",
        onPress: () => {
          if(existePedido){
            actualizarPedido(id,idMenu,prof.id,prof.aula,pedidos);
          } else{
            aniadirPedido(id,idMenu,prof.id, prof.aula, pedidos);
          }
          if(navigation)
          navigation.navigate('seleccionAula',{id}); // Navegar a la página SeleccionAula
        }
      },
      ],
      { cancelable: false } // Si se puede cancelar tocando fuera de la alerta
    );
  }
};


const SeleccionCantidad = ({route, navigation}) => {
  if(navigation)
  console.log("la navegacion es correcta");

  const {prof, menu, id} = route.params;
  const idMenu = menu.id
  const [Menu, setMenu] = useState([]);
  const [pictogramasNumero, setPictogramasNumero] = useState([]);
  const [existePedido, setExistePedido] = useState(false);
  let idPedido;

useEffect(() => {
  const cargarDatos = async () => {
    try {
      const menuData = await buscarMenu(idMenu);
      setMenu(menuData);

      const pictogramasData = await buscarPictogramasNumero();
      setPictogramasNumero(pictogramasData);

      const datosPedido = await buscarPedido(menu.id, prof.id, id);
      setExistePedido(datosPedido && datosPedido.length > 0);
      idPedido = datosPedido.id;

    } catch (error) {
      console.log("error: " + error);
    }
  };

  cargarDatos();
}, [menu.id, prof.id]);
console.log("existe pedido fuera useEFFECT: " + existePedido);

if(navigation)
console.log("la navegaciondos es correcata");

    return(
      <ScrollView contentContainerStyle={styles.datos}>

      <View style={styles.container}>
          <View style={styles.header}>
          <View style={styles.centro}>
            <Text style={styles.titleDerecha}>Estoy en el aula: {prof.aula},   Seleccionando el menu: {menu.Nombre}</Text>
          </View>
            <View style={styles.fotos}>
              <Image style={styles.fotoIzquierda} source={{ uri: prof.foto }} />
              <Image style={styles.foto} source={{ uri: menu.Imagen }} />
            </View>
        </View>

        <View style={styles.datos}>
                {pictogramasNumero.map((pictograma, index) => (
                    <View key={index} style={styles.contenedor_tareas}>
                      <TouchableOpacity onPress={ () => {
                        showAlertGuardar(id,idMenu,prof,pictograma.Numero,existePedido,navigation);
                        }}>
                        <Text> Cantidad: {pictograma.Numero}</Text>
                        <Image style={styles.foto} source={{ uri: pictograma.Url }} />
                      </TouchableOpacity>
                    </View>
                ))}
            </View>
      </View>
      </ScrollView>

    )
}

export default SeleccionCantidad;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      flex:1,
      flexWrap: 'wrap',  
    },
    centro:{
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    izquierda:{
      alignContent: 'flex-start',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
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
      fontSize: RFValue(16),

    },
    titleDerecha:{
      fontSize: 50,
      fontWeight: 'bold',
      marginBottom:20,
      marginRight: 50,
      textAlign: 'right',
      fontSize: RFValue(16),

    },
  texto: {
      fontWeight: 'bold',
      marginBottom: 50,
      marginTop: 5,
      flexWrap: 'wrap',  
      fontSize: 50,
      fontSize: RFValue(16),
  },
  fotos:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  foto: {
      width: 200,
      height: 200,
      borderRadius: 20,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: 'black',
      width: RFValue(100),
      height: RFValue(100),
  },
  fotoIzquierda: {
    width: 200,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'black',
    width: RFValue(100),
    height: RFValue(100),

  },

  contenedor_tareas: {
      flexDirection: 'column',
      width:'33%',
      alignItems: 'center',
  },

});