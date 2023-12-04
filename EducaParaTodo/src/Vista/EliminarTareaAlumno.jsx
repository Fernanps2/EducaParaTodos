import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput,Image, Button, TouchableOpacity ,ActivityIndicator, Alert} from 'react-native';
import appFirebase, { deleteTareaId, getTareaId, getTareaIdCompletada } from '../Modelo/firebase';
//import { getFirestore, doc, getDoc } from 'firebase/firestore';

const EliminarTareaAlumno = ({route}) => {
  const {idAlumno} = route.params;
   const [Tareas, setTareasNombres] = useState([]);

  useEffect(() => {
    const fetchTareasNombres = async () => {
      try{
        const tareas = await getTareaId(idAlumno);
        setTareasNombres(tareas);
        console.log(tareas);
      } catch(error){
        console.error('Error al obtener los nombres de las tareas', error);
      }   
    };
    fetchTareasNombres();
  }, [idAlumno]);

  const [isLoading, setIsLoading] = useState(false);

  const deleteTarea = async (id) => {
    setIsLoading(true);
    try {
      // Eliminar la tarea
      await deleteTareaId(id);
      
      // Volver a obtener las tareas actualizadas después de eliminar
      const updatedTareas = await getTareaId(idAlumno);
      setTareasNombres(updatedTareas);
    } catch (error) {
      console.error('Error al eliminar la tarea', error);
    } finally {
      setIsLoading(false);
    }
  };

  const showAlertStore = (id) =>{
    Alert.alert(
      "¿Estas seguro de borrar la tarea?",
      "Pulsa una opcion",
      [
        {text: "Cancelar",},
        {text: "Confirmar", onPress: () => deleteTarea(id)}
      ],
      { cancelable: true}
    );
  };


  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <ScrollView contentContainerStyle={styles.datos}>
          {Tareas.map((tarea) => (
            <View key={tarea.id} style={styles.cardWithImage}>
              <Text>{tarea.titulo}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => showAlertStore(tarea.id)}>
                <Text style={{ color: 'black', textAlign: 'center' }}>Eliminar Tarea</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  cardWithImage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginVertical: 8,
    marginLeft: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  deleteButton:{
    marginRight: 10,
    padding: 8,
    backgroundColor: 'red',
    borderRadius: 5, 
  },
  datos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    marginLeft: 10,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
});


export default EliminarTareaAlumno;
