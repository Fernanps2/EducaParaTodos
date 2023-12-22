import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';


const PantallaFelicitacion = ({route,navigation}) => {
    const {alumno} = route.params;
    console.log("el alumno en pantalla felicitacion es: " + JSON.stringify(alumno));

    return (
        <ScrollView contentContainerStyle={styles.datos}>
        <View style={styles.container}>
            <View style={styles.datos}>
                <Text style={styles.title}> ! FELICIDADES ! HAS REALIZADO LA TAREA</Text>
                <Image style={styles.fotoGrande} source={{ uri: "https://globalsymbols.com/uploads/production/image/imagefile/14767/17_14768_802f22db-240c-489d-91e8-abab8d3b6992.png" }} />
                <View style={styles.fotos}>
                {/* Tick verde */}
                    <TouchableOpacity onPress={() => navigation.navigate('Tareas', {usuario: alumno})}>
                        <Image style={styles.foto} source={{uri:"https://us.123rf.com/450wm/alonastep/alonastep1608/alonastep160800258/61775461-tick-elemento-de-se%C3%B1al-icono-de-marca-de-verificaci%C3%B3n-verde-aislado-en-el-fondo-blanco-simple.jpg"}}/>
                    </TouchableOpacity>
                    {/* Cruz roja */}
                    {/* <TouchableOpacity onPress={() => navigation.navigate('seleccionCantidad',{prof,id,indiceMenu,navigation})}>
                        <Image style={styles.foto} source={{uri:"https://www.shutterstock.com/image-vector/cross-icon-simple-design-260nw-2187745095.jpg"}} />
                    </TouchableOpacity> */}
                 </View>

            </View>
        </View>
        </ScrollView>
    )
}

export default PantallaFelicitacion;


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
    fotoGrande:{
        width: RFValue(200),
        height: RFValue(200),
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'black',
        marginLeft:20,
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

});