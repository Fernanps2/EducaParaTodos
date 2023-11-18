import React, { useState } from 'react';
import { ActivityIndicator, Alert, View, Text, TextInput, StyleSheet, Button } from 'react-native';


// Uso base de datos
import appFirebase from '../Modelo/firebase';
import {getFirestore, collection, getDocs} from 'firebase/firestore'
const db = getFirestore(appFirebase);

export default function VerPasosActividad ({navigation}) {
  
  // Variables para nombre de paso
  const [nombrePaso, setNombrePaso] = useState('');

  //Variables para logo de guardar
  const [guardando, setGuardando] = useState(false);

const guardarDatos = () => {
  setGuardando(true);
  // Simula una operación de guardado que tarda 2 segundos.
  setTimeout(() => {
    setGuardando(false);
    // Aquí iría tu lógica de guardado real
  }, 2000);
};

const showAlertDelete = () => {
  Alert.alert(
    "¿Quiere borrar?", // Título
    "Pulsa una opción", // Mensaje
    [
      { text: "Cancelar", onPress: () => console.log("Cancelar presionado"), style: "cancel" },
      { text: "Confirmar", onPress: () => console.log("Aceptar presionado") }
    ],
    { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
  );
};

const showAlertStore = () => {
  Alert.alert(
    "¿Quiere guardar?", // Título
    "Pulsa una opción", // Mensaje
    [
      { text: "Cancelar", onPress: () => console.log("Cancelar presionado"), style: "cancel" },
      { text: "Confirmar", onPress: (guardarDatos)}
    ],
    { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
  );
};

    return (
      <>
     
     <View style={styles.separador} />
     <View style={styles.separador} />

      <Text style={styles.title}>Paso de Actividad</Text>

      <View style={styles.container}>

      <View style={styles.separador} />

      <Text style={styles.text}>Nombre Paso</Text>
      <TextInput style={[styles.input]} 
        placeholder="Elija Nombre" 
        onChangeText={setNombrePaso}
        value={nombrePaso}
      />

      <View style={styles.separador} />
      
      <Button 
        title="Añadir Paso" 
        onPress={() => navigation.navigate('pasoActividad')}
        color='#D3D3D3'
        />

      <View style={styles.separador} />
      <View style={styles.separador} />
      <View style={styles.separador} />
      <View style={styles.separador} />

      <Button 
        title="Ver todos los pasos" 
        onPress={() => console.log('Botón 2 presionado')} 
        color='#90EE90'        />

      <View style={styles.separador} />
      <View style={styles.separador} />
      <View style={styles.separador} />
      <View style={styles.separador} />

      <View style={[styles.buttonContainer]}>
        <View style={[styles.button]}>
          <Button 
            title="Borrar" 
            onPress={() => showAlertDelete} 
            color= '#FF0000'
            />
        </View>
          
          {guardando && (
            
            <ActivityIndicator size="large" color="#0000ff" />
            
            )
          }

        <View style={[styles.button]}>
          <Button 
            title="Guardar" 
            onPress={() => showAlertStore} 
            color='#0000FF'
            />
        </View>

        </View>

    
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    height: 30,
  },
  inputFechaHora: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    marginBottom: 10,
    width: 100,
    height: 30,
  },
  row: {
    flexDirection: 'row',
  },
  text:{
    textAlign: 'center',
    fontSize: 15,
  },
  buttonContainer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  button:{
    marginHorizontal: 10,
  },
  separador:{
    height: 10
  }
});