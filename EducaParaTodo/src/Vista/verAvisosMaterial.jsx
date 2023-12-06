import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { buscaMensaje } from '../Controlador/mensajes';
import DatosMensajeLista from './datosMensajeLista';


export default function VerAvisosMaterial({route,  navigation }) {

  const [lista, setLista] = useState([]);

  // useEffect es un Hook de React que te permite sincronizar un componente con un sistema externo.
  useEffect(() => {
    const listaMensajes = async () => {
      try {
        const mensajes = await buscaMensaje();
        setLista(mensajes);
        await console.log(mensajes);
      } catch (error) {
        console.log(error);
      }
    };
    listaMensajes();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Avisos Material</Text>
      </View>

      <ScrollView contentContainerStyle={styles.datos}>

        {lista.map((mensaje, index) => (
          <View key={index} style={styles.elementoList}>
            <DatosMensajeLista mensaje={mensaje} navigation={navigation} />
          </View>
        ))}
      </ScrollView>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  datos: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  elementoList: {
    width:'50%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'blue', // Color de los botones
    padding: 15,
    width: '100%', // Ajustar si es necesario
    borderRadius: 5,
    alignItems: 'right',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});