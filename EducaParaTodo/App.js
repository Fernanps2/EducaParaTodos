import React from 'react';
import Main from "./src/Vista/main.jsx"
import AniadirAlumno from './src/Vista/aniadirAlumno.jsx';
import CrearTarea from './src/Vista/crearTarea.jsx';
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
import PantallaDatos from './src/Vista/pantallaDatos.jsx';
import EliminarTarea from './src/Vista/eliminarTarea.jsx';
// import { VerTarea } from './src/Vista/verTarea.jsx';
import { VerTareaPictogramas } from './src/Vista/verTareaPictogramas.jsx';
import { GestionarEstadoTareas } from './src/Vista/GestionarEstadoTareas.jsx';

// Creamos una instancia del stack
const Stack = createStackNavigator();


export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={Main} />
      <Stack.Screen name="pantallaPrincipal" component={PantallaPrincipal} />
      <Stack.Screen name="Tareas" component={Tareas} />
      <Stack.Screen name="LoginEducador" component={LoginScreen} />
      <Stack.Screen name="LoginAlumno" component={LoginScreenAlumno}/>
      <Stack.Screen name="aniadirAlumno" component={AniadirAlumno} />
      <Stack.Screen name="crearTarea" component={CrearTarea} />
      <Stack.Screen name="HomeEducador" component={HomeEducador} />
      <Stack.Screen name="aniadirProfesor" component={AniadirProfesor} />
      <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
      <Stack.Screen name="pantallaAlumnos" component={ListaAlumnos} />
      <Stack.Screen name="pantallaDatos" component={PantallaDatos} />
      <Stack.Screen name="eliminarTarea" component={EliminarTarea} />
      <Stack.Screen name="verTareaPictogramas" component={VerTareaPictogramas} />
      <Stack.Screen name="gestionarEstadoTareas" component={GestionarEstadoTareas} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

