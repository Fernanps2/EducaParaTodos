import React from 'react';
import gestionTareas from './src/Vista/gestionTareas.jsx';
import AniadirAlumno from './src/Vista/aniadirAlumno.jsx';
import tareaActividad from './src/Vista/tareaActividad.jsx';
import tareaComanda from './src/Vista/tareaComanda.jsx';
import tareaMateriales from './src/Vista/tareaMateriales.jsx';
import pasoActividad from './src/Vista/pasoActividad.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaPrincipal from './src/Vista/pantallaPrincipal.jsx';
import Tareas from './src/Vista/tareas.jsx';
import LoginScreen from './src/Vista/loginEducador.js';
import LoginScreenAlumno from './src/Vista/loginAlumno.js';
import HomeEducador from './src/Vista/homeEducador.jsx';
import AniadirProfesor from './src/Vista/aniadirProfesor.jsx';
import HomeAdmin from './src/Vista/homeAdmin.jsx';
import ListaAlumnos from './src/Vista/listaAlumnos.jsx';
import ListaProfesores from './src/Vista/listaProfesores.jsx';
import PantallaDatosAlumno from './src/Vista/pantallaDatosAlumno.jsx';
import pantallaDatosProfesor from './src/Vista/pantallaDatosProfesor.jsx';
import EliminarTarea from './src/Vista/eliminarTarea.jsx';
import { VerTarea } from './src/Vista/verTarea.jsx';
import { VerTareaPictogramas } from './src/Vista/verTareaPictogramas.jsx';
import { GestionarEstadoTareas } from './src/Vista/GestionarEstadoTareas.jsx';
//Contexto
import {UserContextProvider} from './src/Controlador/userContext'


// ESTA SECCIÓN DE CÓDIGO HAY QUE PONERLA EN TODAS LAS PAGINAS QUE VAYAIS A HACER USO DE LA BASE DE DATOS

import appFirebase from './src/Modelo/firebase.js';
import {getFirestore,collection,addDoc} from 'firebase/firestore'
const db = getFirestore(appFirebase);

// Creamos una instancia del stack
const Stack = createStackNavigator();
export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="pantallaPrincipal">
          <Stack.Screen name="pantallaPrincipal" component={PantallaPrincipal} />
          <Stack.Screen name="Tareas" component={Tareas} />
          <Stack.Screen name="LoginEducador" component={LoginScreen} />
          <Stack.Screen name="LoginAlumno" component={LoginScreenAlumno}/>
          <Stack.Screen name="aniadirAlumno" component={AniadirAlumno} />
          <Stack.Screen name="gestionTareas" component={gestionTareas} />
          <Stack.Screen name="tareaActividad" component={tareaActividad} />
          <Stack.Screen name="pasoActividad" component={pasoActividad} />
          <Stack.Screen name="tareaComanda" component={tareaComanda} />
          <Stack.Screen name="tareaMateriales" component={tareaMateriales} />
          <Stack.Screen name="HomeEducador" component={HomeEducador} />
          <Stack.Screen name="aniadirProfesor" component={AniadirProfesor} />
          <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
          <Stack.Screen name="pantallaAlumnos" component={ListaAlumnos} />
          <Stack.Screen name="pantallaDatosAlumno" component={PantallaDatosAlumno} />
          <Stack.Screen name="pantallaProfesores" component={ListaProfesores} />
          <Stack.Screen name="pantallaDatosProfesor" component={pantallaDatosProfesor} />
          <Stack.Screen name="eliminarTarea" component={EliminarTarea} />
          <Stack.Screen name="verTarea" component={VerTarea}/>      
          <Stack.Screen name="gestionarEstadoTareas" component={GestionarEstadoTareas} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'start',
//   },
//   text: {
//     fontSize: 50,
//     paddingTop: 30,
//     fontWeight: 'bold',
//   },
// });

