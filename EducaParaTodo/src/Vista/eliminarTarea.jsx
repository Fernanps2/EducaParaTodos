import React, { useState, useEffect } from 'react';
import {Alert, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';


// Simulación de datos de tareas
const mockTasks = [
  { id: 1, title: 'Recoger la mesa' },
  { id: 2, title: 'Hacer la comanda' },
  { id: 3, title: 'Atarse los cordones' },
];

export default function EliminarTarea() {
    const [tasks, setTasks] = useState(mockTasks);

    const eliminarTarea = (id) => {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
    };
  
    const MostrarTarea = ({ item }) => (
      <View style={styles.taskItem}>
        <Text>{item.title}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => showAlertStore(item.id)}
        >
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    );
  

    const showAlertStore = (id) =>{
      Alert.alert(
        "¿Estas seguro de eliminar la tarea?",
        "Pulsa una opcion",
        [
          {text: "Cancelar"},
          {text: "Confirmar", onPress: () =>  eliminarTarea(id)}
        ],
        { cancelable: true}
      );
    };

  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Eliminar Tareas</Text>
        </View>
          <FlatList
            data={tasks}
            renderItem={ MostrarTarea } 
            KeyExtractor = {task => task.id.toString()}   
          />
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
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    paddingVertical: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});