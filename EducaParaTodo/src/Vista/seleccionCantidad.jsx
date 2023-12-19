import React, { Profiler, useEffect, useState, useCallback } from 'react';
import { Alert, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Platform, Button} from 'react-native';
import { borraProfesor, buscaProfesor } from '../Controlador/profesores';
import { aniadirPedido, buscarMenu, buscarPictogramasNumero,buscarPedido, actualizarPedido } from '../Controlador/tareas';
import { RFValue } from 'react-native-responsive-fontsize';
import Swal from "sweetalert2";
import seleccionAula from './seleccionAula';
import { descargarFotoMenu, descargarFotoPersona } from '../Modelo/firebase';
import { buscarMenus } from '../Controlador/tareas';
import { useFocusEffect } from '@react-navigation/native';
// import Spinner from 'react-native-loading-spinner-overlay'; // Importa el componente de carga

const SeleccionCantidadMenu = ({menu, prof, id,siguienteMenu, navigation}) => {

  const [pictogramasNumero, setPictogramasNumero] = useState([]);
  const [fotoProfesor, setFotoProfesor] = useState([]);
  const [fotoMenu, setFotoMenu] = useState([]);
  const [existePedido, setExistePedido] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [cargandoFoto, setCargandoFoto] = useState(true);

  // const showAlertGuardar = async (id, idMenu, prof, pedidos, existePedido, navigation) => {
  //   console.log("alerta id: " + id);
  //   if (Platform.OS === "web") {
  //     try {
  //       const result = await Swal.fire({
  //         title: "¿Guardar menus?",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonColor: "#008000",
  //         cancelButtonColor: "#d33",
  //         confirmButtonText: "Guardar",
  //         cancelButtonText: "Cancelar",
  //       });
  
  //       if (result.isConfirmed) {
  //         setCargando(true);

  //         if (existePedido) {
  //           console.log("actualizamos pedido");
  //           await actualizarPedido(id, idMenu, prof.id, prof.aula, pedidos);
  //         } else {
  //           console.log("añadimos pedido");
  //           await aniadirPedido(id, idMenu, prof.id, prof.aula, pedidos);
  //         }
  
  //         return true;
  //       } else {

  //         return false;
  //       }
  //     } catch (error) {
  //       console.error("Error en showAlertGuardar:", error);
  //       return false;
  //     }
  //   } else {
  //     try {
  //       const confirmed = await new Promise((resolve, reject) => {
  //         Alert.alert(
  //           "¿Quiere guardar?", // Título
  //           "Pulsa una opción", // Mensaje
  //           [
  //             {
  //               text: "Cancelar",
  //               onPress: () => resolve(false),
  //             },
  //             {
  //               text: "Confirmar",
  //               onPress: async() => {
  //                 setCargando(true);

  //                 if (existePedido) {
  //                   await actualizarPedido(id, idMenu, prof.id, prof.aula, pedidos);
  //                 } else {
  //                   await aniadirPedido(id, idMenu, prof.id, prof.aula, pedidos);
  //                 }
  //                 resolve(true);
  //               },
  //             },
  //           ],
  //           { cancelable: false } // Si se puede cancelar tocando fuera de la alerta
  //         );
  //       });
  
  //       return confirmed;
  //     } catch (error) {
  //       console.error("Error en showAlertGuardar:", error);
  //       return false;
  //     } finally {
  //       setCargando(false);
  //     }
  //   }
  // };
  

  const showAlertGuardar = async (id, idMenu, prof, pedidos, existePedido, navigation) => {  
          setCargando(true);
      try{
          if (existePedido) {
            console.log("actualizamos pedido");
            await actualizarPedido(id, idMenu, prof.id, prof.aula, pedidos);
          } else {
            console.log("añadimos pedido");
            await aniadirPedido(id, idMenu, prof.id, prof.aula, pedidos);
          }
        } catch (error) {
        console.error("Error en showAlertGuardar:", error);
      }
    }

  if(menu != null){
    const idMenu = menu.id;
    console.log("el id del menud es: " + idMenu);
  }else{
    console.log("menu es null");
  }  

useFocusEffect(
  useCallback(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const pictogramasData = await buscarPictogramasNumero();
        setPictogramasNumero(pictogramasData);

        console.log("busando pedidos: " );
        if(menu != null){
          console.log("dnetor del if");
          const idMenu = menu.id;
          const datosPedido = await buscarPedido(idMenu, prof.id, id);
          console.log("losd atos del pedido son: " + datosPedido);
          setExistePedido(datosPedido && datosPedido.length > 0);
        }
        setCargando(false);
      } catch (error) {
        console.log("error en cargar Datos: " + error);
      }
    };
  
    cargarDatos();
  }, [menu])
);


  useEffect(() => {
    const getFoto = async () => {
      try {
        setCargandoFoto(true);
        const fotoProf = await descargarFotoPersona(prof.foto);
        setFotoProfesor(fotoProf);
        const fotoMen = await descargarFotoMenu(menu.Imagen);
        setFotoMenu(fotoMen);
        setCargandoFoto(false);
      } catch (error) {
        console.log("error en get fotos: " + error);
      }
    }
    getFoto();
  }, [prof,menu]);


  
  if(menu){
  return(
  <ScrollView>
    {cargando || cargandoFoto ? (
      <Text style={styles.textoGrande}> Cargando... </Text>
    ) : (
    <View style={styles.container}>
        <View style={styles.header}>
            
          <View style={styles.centro}>
            <Text style={styles.titleDerecha}>Estoy en el aula: {prof.aula},   Seleccionando el menu: {menu.Nombre}</Text>
          </View>
            <View style={styles.fotos}>
              <Image style={styles.fotoIzquierda} source={{ uri: fotoProfesor.uri }} />
              <Image style={styles.foto} source={{ uri: fotoMenu.uri }} />
            </View>
        </View>

      <View style={styles.datos}>
              {pictogramasNumero.map((pictograma, index) => (
                  <View key={index} style={styles.contenedor_tareas}>
                    <TouchableOpacity onPress={async () => {
                        await showAlertGuardar(id,menu.id,prof,pictograma.Numero,existePedido,navigation);
                        siguienteMenu();
                      }}>
                      <Text> Cantidad: {pictograma.Numero}</Text>
                      <Image style={styles.foto} source={{ uri: pictograma.Url }} />
                    </TouchableOpacity>
                  </View>
              ))}
          </View>
    </View>
    )}
  </ScrollView>

  )
}
}

const SeleccionCantidad = ({route, navigation}) => {

  const {prof,id,indiceMenu} = route.params;
  const [menusArray, setMenusArray] = useState([]);
  let [indiceMenus, setIndiceMenus] = useState(indiceMenu);
  let [menu, setMenu] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [cargandoFoto, setCargandoFoto] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const cargarDatos = async () => {
      try {
        setCargando(true);
        const menus = await buscarMenus();
        setMenusArray(menus);
        setIndiceMenus(indiceMenu);
        let menuSeleccionado = menus[0];
        setMenu(menuSeleccionado);

        setCargando(false);
      } catch (error) {
        console.log("error: " + error);
      }
    };
    cargarDatos();
    }, [])
  );

const siguienteMenu = () => {
  if(indiceMenus < menusArray.length - 1){
    let indice = indiceMenus+1;
    setIndiceMenus(indice);
    setMenu(menusArray[indice]);
  }else{
    console.log(indiceMenus);
    navigation.navigate('mostrarResumen',{id,prof,navigation});
  }
}

    return(
      <ScrollView contentContainerStyle={styles.datos}>

      {cargando ? (
            <Text style={styles.textoGrande}> Cargando... </Text>
      ) : (
      <View style={styles.container}>
          <View style={styles.header}>
          <View style={styles.centro}>
                <SeleccionCantidadMenu menu={menu} prof={prof} id={id} siguienteMenu = {siguienteMenu} navigation={navigation} />
          </View>
        </View>
      </View>
      )}
      </ScrollView>
    )
}

export default SeleccionCantidad;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    textoGrande:{
      fontSize: 200,
      fontWeight: 'bold',
      marginBottom:20,
      marginRight: 50,
      fontSize: RFValue(50),
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
      width:'20%',
      alignItems: 'center',
  },

});