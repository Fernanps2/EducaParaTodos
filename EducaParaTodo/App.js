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
    </Stack.Navigator>
  </NavigationContainer>
  );
}

