import React from 'react';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function crearTarea () {

  const [showAddStep, setShowAddStep] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showHideForm, setHideAddForm] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedValue, setSelectedValue] = useState('none'); // item seleccionable formulario

// Pulsamos boton actividad o materiales
  const handleActividad_MatearialesClick = () => {
  setShowAddStep(true); // This will toggle the visibility
  setShowAddForm(false); // This will toggle the visibility
  setShowForm(false);
  setHideAddForm(false);
};

// Pulsamos boton comanda
const handleComandaClick = () => {
  setShowAddStep(true); // This will toggle the visibility
  setShowAddForm(true); // This will toggle the visibility
  setShowForm(false);
  setHideAddForm(false);
};

// Pulsamos boton + añadir formulario
const handleAddFormClick = () => {
  setHideAddForm(true); // Muestra boton esconder formulario
  setShowForm(true); // Muestra elección formulario
  setShowAddForm(false); // Muestra boton esconder formulario
};

// Pulsamos boton + esconder formulario
const handleHideFormClick = () => {
  setHideAddForm(false); // Oculta boton esconder formulario
  setShowForm(false); // Oculta elección formulario
  setShowAddForm(true); // Oculta boton esconder formulario
};

    return (
      <View style={styles.container}>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButtonDelete}>
            <Text style={styles.addButtonText}>Eliminar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addButtonGuardar}>
            <Text style={styles.addButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>

      <Text style={styles.title}>Crear Tarea</Text>

      <Text style={styles.text}>Nombre Tarea</Text>
      <TextInput style={styles.input} placeholder="Elija Nombre" />
    
      <Text style={styles.text}>Inicio Tarea</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.inputFecha}
          placeholder="(dd/mm/aaaa)"
        />

        <TextInput
          style={styles.inputFecha}
          placeholder="(HH:MM)"
        />
      </View>

      <Text style={styles.text}>Fin Tarea</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.inputFecha}
          placeholder="(dd/mm/aaaa)"
        />

        <TextInput
          style={styles.inputFecha}
          placeholder="(HH:MM)"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.textTipoTarea}>Tipo Tarea</Text>
        <TouchableOpacity style={styles.addButton}>
          <TouchableOpacity onPress={handleActividad_MatearialesClick}>
            <Text style={styles.addButtonText}>Actividad</Text>
          </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton}>
        <TouchableOpacity onPress={handleComandaClick}>
          <Text style={styles.addButtonText}>Comandas</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton}>
        <TouchableOpacity onPress={handleActividad_MatearialesClick}>
          <Text style={styles.addButtonText}>Materiales</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      </View>
      
      {showAddForm && (
          <TouchableOpacity style={styles.addButtonEmergentes}>
            <TouchableOpacity onPress={handleAddFormClick}>
              <Text style={styles.addButtonEmergenteText}>+ Añadir Formulario</Text>
            </TouchableOpacity>
          </TouchableOpacity>
      )}

      {showForm && (
        <View>
          <TouchableOpacity style={styles.addButtonEmergentes}>
            <TouchableOpacity onPress={handleHideFormClick}>
              <Text style={styles.addButtonEmergenteText}>+ Ocultar Formulario</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <View style={styles.row}>
            <Text style={styles.textFormulario}>Formulario</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
                <Picker.Item label="Ninguno" value="none" />
                <Picker.Item label="Formulario1" value="form1" />
                <Picker.Item label="Formulario2" value="form2" />
                <Picker.Item label="Formulario3" value="form3" />
            </Picker>
          </View>
        </View>
      )}

      {(showAddStep || !showForm ) && (
          <TouchableOpacity style={styles.addButtonEmergentes}>
              <Text style={styles.addButtonEmergenteText}>+ Añadir paso</Text>
          </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
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
    padding: 2,
    marginBottom: 10,
    transform: [{ translateX: -20 }],
  },
  inputFecha: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 2,
    marginBottom: 10,
    transform: [{ translateX: -20 }],
    width: 100,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text:{
    transform: [{ translateX: -60 }],
    fontSize: 15,
  },
  textTipoTarea:{
    transform: [{ translateX: -10 }],
    fontSize: 15,
  },
  textFormulario:{
    transform: [{ translateX: -20 }],
    fontSize: 15,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
    marginBottom: 10,
  },
  buttonContainer: {
    // Asumiendo que quieres que los botones estén uno al lado del otro
    flexDirection: 'row',
    // Ajusta el espacio como sea necesario
    marginBottom: 50,
  },
  addButton: {
    backgroundColor: '#808080',
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonDelete: {
    backgroundColor: '#FF0000',
    padding: 10,
    alignItems: 'center',
    borderRadius: 4,
    width: 60,
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -100 }],
  },
  addButtonGuardar: {
    backgroundColor: '#0000FF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 4,
    width: 60,
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: 25 }],
  },
  addButtonEmergentes: {
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
    transform: [{ translateX: 50 }],
  },
  addButtonEmergenteText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 12,
    transform: [{ translateX: -130 }],
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  picker: {
    height: 30, // Altura del picker
    width: 120, // Ancho del picker
    margin: 0, // Margen alrededor del picker
    padding: 5, // Relleno interno del picker
    borderWidth: 1, // Grosor del borde
    borderColor: 'gray', // Color del borde
    borderRadius: 4, // Redondeo de las esquinas
  },
});