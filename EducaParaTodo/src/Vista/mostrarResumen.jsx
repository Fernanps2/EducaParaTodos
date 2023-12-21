import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity, Platform } from 'react-native';
import { buscarPedido, buscarTComandas } from '../Controlador/tareas';
import { buscaAlumnoId } from '../Controlador/alumnos';
import { RFValue } from 'react-native-responsive-fontsize';
import { buscarMenus } from '../Controlador/tareas';
import { buscaProfesor } from '../Controlador/profesores';
import { descargarFotoPersona,descargarFotoMenu } from '../Modelo/firebase';



// A esta pagina se llega cuando el alumno realiza la comanda de todos los menús de una clase
// Aquí se muestran los datos recogidos en una tarea comanda en concreto

const DatosResumenDetalle = ({prof, menu, id}) => {
    console.log("el menu es: "+JSON.stringify(menu));

    const [pedido, setPedido] = useState([]);
    const [numeroPedidos, setNumeroPedidos] = useState("0");
    const [fotoMenu,setFotoMenu] = useState([]);
  
    
    useEffect(() => {
        const obtenerPedidos = async() => {
            try{
                const datosPedido = await buscarPedido(menu.id, prof.id, id);
                if(datosPedido && datosPedido.length > 0){
                    const primerPedido = datosPedido[0];

                    setPedido(primerPedido);
                    setNumeroPedidos(primerPedido.nPedidos); // Actualiza directamente
                }
            } catch(error){
                console.log("error: " + error);
            }
        }
        obtenerPedidos();
        // Esto hace que la función se ejecute cada vez que se cambie la combinación de 
        // id menu e id profesor, ya que si no pusiéramos esto solo se ejecutaría la primera vez
    },[menu.id]);

    useEffect(() => {
        const getFoto = async () => {
          try {
            const fotoMen = await descargarFotoMenu(menu.Imagen);
            setFotoMenu(fotoMen);
          } catch (error) {
            console.log("error: " + error);
          }
        }
        getFoto();
      }, [menu]);
    



    return (
        <View style={styles.container}>
            {numeroPedidos > 0 &&
            <View>
                <Text style={styles.textoNormal}> 
                    MENÚ: {menu.Nombre} CANTIDAD: {numeroPedidos} 
                </Text>        
                <Image style={styles.foto} source={{ uri: fotoMenu.uri }} />      
            </View>  
            }
        </View>
    )
}

const mostrarResumen = ({route}) => {
    const {id,prof,navigation} = route.params;

    const [menuArray, setMenuArray] = useState([]);
    const [fotoProfesor,setFotoProfesor] = useState([]);
    const indiceMenu=0;

    useEffect(() => {
        const getMenus = async () => {
            try {
                const menus = await buscarMenus();
                setMenuArray(menus);
                console.log(" array de menus es: " + menus);
            } catch (error) {
                console.log("error: " + error);
            }
        }
        getMenus();
    }, []);

    useEffect(() => {
        const getFoto = async () => {
          try {
            const fotoProf = await descargarFotoPersona(prof.foto);
            setFotoProfesor(fotoProf);
          } catch (error) {
            console.log("error: " + error);
          }
        }
        getFoto();
      }, [prof]);
    


    return (
        <ScrollView contentContainerStyle={styles.datos}>
        <View style={styles.container}>
            <View style={styles.datos}>
                <Text style={styles.title}> PEDIDOS AULA: {prof.aula}</Text>
                <Image style={styles.foto} source={{ uri: fotoProfesor.uri }} />
                <View style={styles.fotos}>
                {/* Tick verde */}
                    <TouchableOpacity onPress={() => navigation.navigate('seleccionAula',{id,navigation})}>
                        <Image style={styles.foto} source={{uri:"https://us.123rf.com/450wm/alonastep/alonastep1608/alonastep160800258/61775461-tick-elemento-de-se%C3%B1al-icono-de-marca-de-verificaci%C3%B3n-verde-aislado-en-el-fondo-blanco-simple.jpg"}}/>
                    </TouchableOpacity>
                    {/* Cruz roja */}
                    <TouchableOpacity onPress={() => navigation.navigate('seleccionCantidad',{prof,id,indiceMenu,navigation})}>
                        <Image style={styles.foto} source={{uri:"https://www.shutterstock.com/image-vector/cross-icon-simple-design-260nw-2187745095.jpg"}} />
                    </TouchableOpacity>
                 </View>

            </View>
            <ScrollView contentContainerStyle={styles.datos}>
                {menuArray.map((menu, index) => (
                    <View key={index}>
                        <DatosResumenDetalle prof = {prof} menu={menu} id={id}/>
                    </View>
                ))}
            </ScrollView>
        </View>
        </ScrollView>
    )
}

export default mostrarResumen;


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
    fotos:{
        flexDirection:'row',
        marginLeft:200,        
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
        marginLeft:20,


    },
    contenedor_tareas: {
        flexDirection: 'column',
        width: '33%',
        alignItems: 'center',
    },
    textoNormal:{
        fontWeight:'bold',
        fontSize: 20,
    }

});