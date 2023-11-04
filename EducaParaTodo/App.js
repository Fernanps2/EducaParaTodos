import React from 'react';
import Main from "./src/Vista/main.jsx"
import AniadirAlumno from './src/Vista/aniadirAlumno.jsx';
import CrearTarea from './src/Vista/crearTarea.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Creamos una instancia del stack
const Stack = createStackNavigator();


export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={Main} />
      <Stack.Screen name="aniadirAlumno" component={AniadirAlumno} />
      <Stack.Screen name="crearTarea" component={CrearTarea} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

