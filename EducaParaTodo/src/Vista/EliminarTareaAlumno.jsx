import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { FlatList } from 'react-native-web';
import appFirebase from '../Modelo/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const EliminarTareaAlumno = ({ route }) => {
  const { item } = route.params;
  const idsTareas = item.Tareas.map(tarea => tarea.id);
  console.log(idsTareas);

  const [Tareas, setTareasNombres] = useState([]);

  useEffect(() => {
    const fetchTareasNombres = async () => {
      try{
        const querydb = getFirestore(appFirebase);
        
        const tareasData = await Promise.all(
          idsTareas.map(async (idTarea) => {
            const docRef = doc(querydb, 'Tarea' , idTarea);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            return data.nombre;
          })
        );

        setTareasNombres(tareasData);
      } catch(error){
        console.error('Error al obtener los nombres de las tareas', error);
      }   
    };
    fetchTareasNombres();
  }, []);


  return (
    <View>
      <Text>Navega bien cabron brr</Text>
    </View>
  );
};

export default EliminarTareaAlumno;
