import React, {useState} from 'react';
import GestionMateriales from './src/Vista/gestionMaterialesAdmin.jsx';
import GestionItemActividad from './src/Vista/gestionItemsActividadAdmin.jsx';
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
import LoginScreenAlumnoImagenes from './src/Vista/loginAlumnoImagenes.js';
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
import AvisoMaterial from './src/Vista/avisoMaterial.jsx';
import VerAvisosMaterial from './src/Vista/verAvisosMaterial.jsx';
import { VerTarea } from './src/Vista/verTarea.jsx';
import FeedbackAlumno from './src/Vista/FeedbackAlumno.jsx';
//Contexto
import {UserContextProvider} from './src/Controlador/userContext';
import AsignarTarea from './src/Vista/asignarTarea.jsx';
import AniadirPictograma from './src/Vista/aniadirPictograma.jsx';
import SeguimientoAlumno from './src/Vista/SeguimientoAlumno.jsx';
import seleccionAula from './src/Vista/seleccionAula.jsx';
import seleccionCantidad from './src/Vista/seleccionCantidad.jsx';
import ComandasCreadas from './src/Vista/comandasCreadas.jsx';
import DatosComandas from './src/Vista/datosComanda.jsx';
import mostrarResumen from './src/Vista/mostrarResumen.jsx';
import PantallaFelicitacion from './src/Vista/pantallaFelicitacion.jsx';
import GestionMenus from './src/Vista/gestionMenus.jsx';
import AniadirMenu from './src/Vista/aniadirMenu.jsx';
import { aniadeMenu } from './src/Controlador/tareas.js';
import eliminarMenu from './src/Vista/eliminarMenu.jsx';
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
          <Stack.Screen name="LoginAlumnoImagenes" component={LoginScreenAlumnoImagenes}/>
          <Stack.Screen name="aniadirAlumno" component={AniadirAlumno} />
          <Stack.Screen name="gestionMateriales" component={GestionMateriales} />
          <Stack.Screen name="gestionItemActividad" component={GestionItemActividad} />
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
          <Stack.Screen name="avisarMaterial" component={AvisoMaterial} />
          <Stack.Screen name="verAvisosMaterial" component={VerAvisosMaterial} />
          <Stack.Screen name="HomeEducador" component={HomeEducador} />
          <Stack.Screen name="aniadirProfesor" component={AniadirProfesor} />
          <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
          <Stack.Screen name="listaAlumnos" component={ListaAlumnos} />
          <Stack.Screen name="pantallaDatosAlumno" component={PantallaDatosAlumno} />
          <Stack.Screen name="pantallaDatosProfesor" component={PantallaDatosProfesor} />
          <Stack.Screen name="seguimientoAlumno" component={SeguimientoAlumno}/>


          <Stack.Screen name="listaProfesores" component={ListaProfesores} />
          {/* <Stack.Screen name="pantallaProfesores" component={ListaProfesores} /> */}


          <Stack.Screen name="eliminarTarea" component={EliminarTarea} />
          <Stack.Screen name="EliminarTareaAlumno" component={EliminarTareaAlumno}/>
          <Stack.Screen name= "FeedbackAlumno" component={FeedbackAlumno}/>
          <Stack.Screen name= "aniadirPictograma" component={AniadirPictograma}/>
          <Stack.Screen name="verTarea" component={VerTarea}/>
          <Stack.Screen name="modDatosProfesor" component={ModificarDatosProfesor} />
          <Stack.Screen name="asignarTarea" component={AsignarTarea} />
          <Stack.Screen name="modificarAlumno" component={ModificarAlumno} />
          <Stack.Screen name="modificarProfesor" component={ModificarProfesor} />
          <Stack.Screen name="seleccionAula" component={seleccionAula} />
          <Stack.Screen name="seleccionCantidad" component={seleccionCantidad} />
          <Stack.Screen name="comandasCreadas" component={ComandasCreadas} />
          <Stack.Screen name="datosComandas" component={DatosComandas} />
          <Stack.Screen name="mostrarResumen" component={mostrarResumen} />
          <Stack.Screen name="pantallaFelicitacion" component={PantallaFelicitacion} />
          <Stack.Screen name="gestionMenus" component={GestionMenus} />
          <Stack.Screen name="aniadirMenu" component={AniadirMenu} />
          <Stack.Screen name="eliminarMenu" component={eliminarMenu} />


        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}