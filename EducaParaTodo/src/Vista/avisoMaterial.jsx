import React from 'react';
import { Alert, View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { buscaProfesorId } from '../Controlador/profesores';
import { aniadeMensaje } from '../Controlador/mensajes';
import useUser from '../Controlador/useUser';




export default function AvisoMaterial ({ navigation }) {

  const {jwt} = useUser();
  const profesor = buscaProfesorId(jwt);
  const nombreUsuario = profesor.nombre;

  const [datosMensaje, setDatosMensaje] = useState({
    idProfesor: profesor.id, //profesor[0].id,
    mensaje: "",
    aula: "",
    fecha: new Date(),
    hora: new Date()
  });

  /* Gestion de Fecha y hora mediante el mostrado de un calendario*/
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || (mode === 'date' ? datosMensaje.fecha : datosMensaje.hora);
    setShow(false);  // Esconde el selector después de seleccionar o cancelar
    if (mode === 'date') {
      setDatosMensaje({...datosMensaje, fecha: currentDate});
    } else {
      setDatosMensaje({...datosMensaje, hora: currentDate});
    }

  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  /* Fin gestion de fecha y hora*/

  const handeChangeText = (value, name) => {
    setDatosMensaje(prevState => ({
      ...prevState,
      [name]: value
    }));
  }



  const showAlertStore = () => {
    Alert.alert(
      "¿Quiere guardar?", // Título
      "Pulsa una opción", // Mensaje
      [
        { text: "Cancelar", onPress: () => console.log("Cancelar presionado"), style: "cancel" },
        { text: "Confirmar", onPress: () =>{
            //Prueba de funcionamiento
            console.log(datosMensaje.aula);
            console.log(format(datosMensaje.fecha, 'dd/MM/yyyy'));
            console.log(format(datosMensaje.hora, 'HH:mm'));
            console.log(datosMensaje.idProfesor);
            console.log(datosMensaje.mensaje);
            aniadeMensaje(datosMensaje.idProfesor, datosMensaje.mensaje, datosMensaje.aula, format(datosMensaje.fecha, 'dd/MM/yyyy'), format(datosMensaje.hora, 'HH:mm'));
            navigation.navigate('HomeEducador', { nombreUsuario });
          }
        }
      ],
      { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
    );
  };

    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EducaParaTodos</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Aula"
        value={datosMensaje.aula}
        onChangeText={(value)=>handeChangeText(value,'aula')}
        />
      
      <Text style={styles.dateText}>
        Fecha seleccionada: {format(datosMensaje.fecha, 'dd/MM/yyyy')}
      </Text>
      <Text style={styles.dateText}>
        Hora seleccionada: {format(datosMensaje.hora, 'HH:mm')}
      </Text>

      <View style={styles.buttonContainer}>
        <Button onPress={() => showMode('date')} title="Seleccionar fecha" />
        <Button onPress={() => showMode('time')} title="Seleccionar hora" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={mode === 'date' ? datosMensaje.fecha : datosMensaje.hora}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>


      <TextInput
        style={styles.input}
        placeholder="Mensaje"
        value={datosMensaje.mensaje}
        onChangeText={(value)=>handeChangeText(value,'mensaje')}
        />


      <TouchableOpacity style={styles.addButton}
                  onPress={showAlertStore}>
        <Text style={styles.addButtonText}>Añadir</Text>
      </TouchableOpacity>

    </View>
  );
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
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dateText: {
    // Estilos para que se parezca a tus TextInput
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    lineHeight: 40, // Ajusta la altura de la línea al centro del contenedor
    backgroundColor: '#FFFFFF', 
  },
  buttonContainer: {
    // Estilos para los botones y su contenedor
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20, // Aumenta la separación vertical con respecto a otros elementos
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});