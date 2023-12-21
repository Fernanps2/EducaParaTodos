import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity, Platform } from 'react-native';
import { buscarPedido, buscarTComandas } from '../Controlador/tareas';
import { buscaAlumnoId } from '../Controlador/alumnos';
import { RFValue } from 'react-native-responsive-fontsize';
import { buscarMenus } from '../Controlador/tareas';
import { buscaProfesor } from '../Controlador/profesores';



// A esta pagina se llega desde el homeAdmin > comandasCreadas > esta página.
// Aquí se muestran los datos recogidos en una tarea comanda en concreto
// Primero obtenemos todos los menús, luego por menú sacamos todos los aulas y por último
// se muestran los pedidos por menú y aula. Realmente solo se muestran los pedidos que se han hecho
// ya que si no se mostraría una línea por cada combinación posible de menú y aula

const DatosComandaDetalle = ({menu, id, prof}) => {

    const [pedido, setPedido] = useState([]);
    const [numeroPedidos, setNumeroPedidos] = useState("0");
    
    useEffect(() => {
        const obtenerPedidos = async() => {
            try{
                const datosPedido = await buscarPedido(menu.id, prof.id, id);
                if(datosPedido && datosPedido.length > 0){
                    const primerPedido = datosPedido[0];

                    setPedido(primerPedido);
                    setNumeroPedidos(primerPedido.nPedidos); // Actualiza directamente
                    console.log("numero de pedidos: " + primerPedido.nPedidos);
                }
            } catch(error){
                console.log("error: " + error);
            }
        }
        obtenerPedidos();
        // Esto hace que la función se ejecute cada vez que se cambie la combinación de 
        // id menu e id profesor, ya que si no pusiéramos esto solo se ejecutaría la primera vez
    },[menu.id, prof.id]);
 

    console.log("pedidos son: " + JSON.stringify(pedido));
    console.log("numero pedidos: " + numeroPedidos);


    return (
        <View>
            {numeroPedidos > 0 &&
            <Text> Menú: {menu.Nombre} Aula: {prof.aula} Cantidad: {numeroPedidos}</Text>
            }
        </View>
    )
}


const DatosAula = ({ menu, id }) => {

    const [profesoresArray, setProfesoresArray] = useState([]);

    useEffect(() => {
        const getProfesores = async () => {
            try {
                const profesores = await buscaProfesor();
                setProfesoresArray(profesores);
            } catch (error) {
                console.log("error: " + error);
            }
        }
        getProfesores();
    }, []);

    return (
        <View style={styles.container}>
            {/* <ScrollView contentContainerStyle={styles.datos}> */}
                {profesoresArray.map((profesor, index) => (
                    <View key={index}>
                        <DatosComandaDetalle menu={menu} id={id} prof={profesor} />
                    </View>
                ))}
            {/* </ScrollView> */}
        </View>
    )
}

const DatosComanda = ({route}) => {
    const {id} = route.params;
    console.log("idasjdfñas: " + id);

    const [menuArray, setMenuArray] = useState([]);

    useEffect(() => {
        const getMenus = async () => {
            try {
                const menus = await buscarMenus();
                setMenuArray(menus);
                console.log(menuArray);
            } catch (error) {
                console.log("error: " + error);
            }
        }
        getMenus();
    }, []);


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.datos}>
                {menuArray.map((menu, index) => (
                    <View key={index}>
                        <DatosAula menu={menu} id={id} />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default DatosComanda;


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
        width: '33%',
        alignItems: 'center',
    },

});