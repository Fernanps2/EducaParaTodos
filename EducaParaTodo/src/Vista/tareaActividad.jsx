import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, View, Text, TextInput, StyleSheet, Button } from 'react-native';


// Uso base de datos
import appFirebase from '../Modelo/firebase';
import {getFirestore, collection, getDocs} from 'firebase/firestore'
const db = getFirestore(appFirebase);

export default function TareaActividad ({navigation}) {
  
  // Variables para guardar nombre de la actividad
  const [nombreTarea, setNombreTarea] = useState ('');
  // Variables para guardar fecha y hora
  const [inicioFecha, setInicioFecha] = useState ('');
  const [inicioHora, setInicioHora] = useState ('');
  const [finFecha, setFinFecha] = useState ('');
  const [finHora, setFinHora] = useState ('');
  // Variable para guardar el lugar
  const [lugar, setLugar] = useState ();

  //Variables para logo de guardar
  const [guardando, setGuardando] = useState(false);

// Borramos toda la información cuando pulsamos borrar
const handleDeleteInformation = () => {
  setNombreTarea("");
  setFinFecha("");
  setFinHora("");
  setInicioFecha("");
  setInicioHora("");
  setLugar("");
}

const guardarDatos = () => {
  setGuardando(true);
  // Simula una operación de guardado que tarda 2 segundos.
  setTimeout(() => {
    setGuardando(false);
    // Aquí iría tu lógica de guardado real
  }, 5000);
  navigation.navigate('gestionTareas');
};

const showAlertDelete = () => {
  Alert.alert(
    "¿Quiere borrar?", // Título
    "Pulsa una opción", // Mensaje
    [
      { text: "Cancelar"},
      { text: "Confirmar", onPress: () => handleDeleteInformation() }
    ],
    { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
  );
};

const showAlertStore = () => {
  Alert.alert(
    "¿Quiere guardar?", // Título
    "Pulsa una opción", // Mensaje
    [
      { text: "Cancelar"},
      { text: "Confirmar", onPress: () => guardarDatos() }
    ],
    { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
  );
};

    return (
      <>
     
     <View style={styles.separador} />
     <View style={styles.separador} />

      <Text style={styles.title}>Actividad</Text>

      <View style={styles.container}>

      <View style={styles.separador} />

      <Text style={styles.text}>Nombre Tarea</Text>

      <View style={styles.separador} />

      <TextInput style={[styles.input]} 
      placeholder="Elija Nombre" 
      value={nombreTarea}
      onChangeText={setNombreTarea}
      />

      <View style={styles.separador} />

      <Text style={styles.text}>Inicio Tarea </Text>

      <View style={styles.separador} />

      <View style={[styles.row]}>
      <TextInput style={[styles.inputFechaHora]} 
        placeholder="dd/mm/aaaa" 
        value={inicioFecha}
        onChangeText={setInicioFecha}
      />
      <TextInput style={[styles.inputFechaHora]} 
        placeholder="hh/mm" 
        value={inicioHora}
        onChangeText={setInicioHora}
      />
      </View>

      <View style={styles.separador} />

      <Text style={styles.text}>Fin Tarea </Text>

      <View style={styles.separador} />

      <View style={[styles.row]}>
      <TextInput style={[styles.inputFechaHora]} 
        placeholder="dd/mm/aaaa" 
        value={finFecha}
        onChangeText={setFinFecha}
      />
      <TextInput style={[styles.inputFechaHora]} 
        placeholder="hh/mm" 
        value={finHora}
        onChangeText={setFinHora}
      />
      </View>

      <View style={styles.separador} />

      <Text style={styles.text}>Lugar </Text>

      <View style={styles.separador} />

      <TextInput style={[styles.input]} 
        placeholder="Elija Lugar"
        value={lugar} 
        onChangeText={setLugar}
      />
      
      <View style={styles.separador} />
      <View style={styles.separador} />
      <View style={styles.separador} />
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
        onPress={() => navigation.navigate('verPasosActividad')} 
        color='#90EE90'        />

      <View style={styles.separador} />
      <View style={styles.separador} />
      <View style={styles.separador} />
      <View style={styles.separador} />

      <View style={[styles.buttonContainer]}>
        <View style={[styles.button]}>
          <Button 
            title="Borrar" 
            onPress={() => showAlertDelete ()} 
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
            onPress={() => showAlertStore ()
            } 
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