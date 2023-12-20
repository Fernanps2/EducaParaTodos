import React, {useState} from 'react';
import GestionMateriales from './src/Vista/gestionMaterialesAdmin.jsx';
import GestionItemActividad from './src/Vista/gestionItemsActividadAdmin.jsx';
import GestionItemMaterial from './src/Vista/gestionItemsMateriales.jsx';
import GestionFotoLugar from './src/Vista/gestionFotoTarea.jsx';
import GestionTareas from './src/Vista/gestionTareas.jsx';
import AniadirAlumno from './src/Vista/aniadirAlumno.jsx';
import TareaActividad from './src/Vista/tareaActividad.jsx';
import PasoActividad from './src/Vista/pasoActividad.jsx';
import VerPasosActividad from './src/Vista/VerPasosActividad.jsx';
import TareaComanda from './src/Vista/tareaComanda.jsx';
import AlimentosMenusComanda from './src/Vista/alimentosMenusComanda.jsx';
import TiposMenusComanda from './src/Vista/tiposMenusComanda.jsx';
import TareaMateriales from './src/Vista/tareaMateriales.jsx';
import AnadirMaterial from './src/Vista/anadirMaterial.jsx';
import VerTodosMateriales from './src/Vista/verTodosMateriales.jsx';
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
import PantallaDatosProfesor from './src/Vista/pantallaDatosProfesor.jsx';
import EliminarTarea from './src/Vista/eliminarTarea.jsx';
import EliminarTareaAlumno from './src/Vista/EliminarTareaAlumno.jsx';
import ModificarAlumno from './src/Vista/modificarAlumno.jsx';
import ModificarProfesor from './src/Vista/modificarProfesor.jsx';
import ModificarDatosProfesor from './src/Vista/ModificarDatosProfesor.jsx';
import { VerTarea } from './src/Vista/verTarea.jsx';
import VerTareaMaterial from './src/Vista/verTareaMaterial.jsx';
import { VerTareaPictogramas } from './src/Vista/verTareaPictogramas.jsx';
import { GestionarEstadoTareas } from './src/Vista/GestionarEstadoTareas.jsx';
import FeedbackAlumno from './src/Vista/FeedbackAlumno.jsx';
//Contexto
import {UserContextProvider} from './src/Controlador/userContext';
import AsignarTarea from './src/Vista/asignarTarea.jsx';
import AniadirPictograma from './src/Vista/aniadirPictograma.jsx';
import DatosProfesor from './src/Vista/datosProfesor.jsx';
import gestionItemMaterial from './src/Vista/gestionItemsMateriales.jsx';
// import DatosProfesor from './src/Vista/datosProfesor.jsx';
// import AsignarTarea from './src/Vista/asignarTarea.jsx';

// ESTA SECCIÓN DE CÓDIGO HAY QUE PONERLA EN TODAS LAS PAGINAS QUE VAYAIS A HACER USO DE LA BASE DE DATOS

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
          <Stack.Screen name="gestionMateriales" component={GestionMateriales} />
          <Stack.Screen name="gestionItemActividad" component={GestionItemActividad} />
          <Stack.Screen name="gestionItemMaterial" component={GestionItemMaterial} />
          <Stack.Screen name="gestionFotoLugar" component={GestionFotoLugar} />
          <Stack.Screen name="gestionTareas" component={GestionTareas} />
          <Stack.Screen name="tareaActividad" component={TareaActividad} />
          <Stack.Screen name="pasoActividad" component={PasoActividad} />
          <Stack.Screen name="verPasosActividad" component={VerPasosActividad} />
          <Stack.Screen name="tareaComanda" component={TareaComanda} />
          <Stack.Screen name="alimentosMenusComanda" component={AlimentosMenusComanda} />
          <Stack.Screen name="tiposMenusComanda" component={TiposMenusComanda} />
          <Stack.Screen name="tareaMateriales" component={TareaMateriales} />
          <Stack.Screen name="verTodosMateriales" component={VerTodosMateriales}/>
          <Stack.Screen name="anadirMaterial" component={AnadirMaterial} />
          <Stack.Screen name="HomeEducador" component={HomeEducador} />
          <Stack.Screen name="aniadirProfesor" component={AniadirProfesor} />
          <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
          <Stack.Screen name="listaAlumnos" component={ListaAlumnos} />
          <Stack.Screen name="pantallaDatosAlumno" component={PantallaDatosAlumno} />
          <Stack.Screen name="pantallaDatosProfesor" component={PantallaDatosProfesor} />
          <Stack.Screen name="datosProfesor" component={DatosProfesor} />


          <Stack.Screen name="listaProfesores" component={ListaProfesores} />
          {/* <Stack.Screen name="pantallaProfesores" component={ListaProfesores} /> */}


          <Stack.Screen name="eliminarTarea" component={EliminarTarea} />
          <Stack.Screen name="EliminarTareaAlumno" component={EliminarTareaAlumno}/>
          <Stack.Screen name= "FeedbackAlumno" component={FeedbackAlumno}/>
          <Stack.Screen name= "aniadirPictograma" component={AniadirPictograma}/>
          <Stack.Screen name="verTarea" component={VerTarea}/>
          <Stack.Screen name="verTareaMaterial" component={VerTareaMaterial}/>
          <Stack.Screen name="gestionarEstadoTareas" component={GestionarEstadoTareas} />
          <Stack.Screen name="modDatosProfesor" component={ModificarDatosProfesor} />
          <Stack.Screen name="asignarTarea" component={AsignarTarea} />
          <Stack.Screen name="modificarAlumno" component={ModificarAlumno} />
          <Stack.Screen name="modificarProfesor" component={ModificarProfesor} />
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

