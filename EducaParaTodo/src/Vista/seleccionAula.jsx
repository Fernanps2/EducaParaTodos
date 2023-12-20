import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { borraProfesor, buscaProfesor } from '../Controlador/profesores';
import { responsiveFontSize } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { buscarPedidoProfesor, buscarMenus, buscarPedidosTarea, buscarTarea, buscarMenusComanda } from '../Controlador/tareas';
import { useFocusEffect } from '@react-navigation/native';
import { completarTarea } from '../Controlador/tareas';
import Swal from 'sweetalert2';
import { buscaAlumnoId } from '../Controlador/alumnos';
import Tareas from './tareas';
import { descargarFotoPersona } from '../Modelo/firebase';

// const showAlert = async (id, alumno, navigation) => {
//   if (navigation)
//     console.log("la navegacion es correcta231");
//   if (Platform.OS === "web") {
//     Swal.fire({
//       title: "¿Finalizar tarea?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#008000",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Guardar",
//       cancelButtonText: "Cancelar",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         await completarTarea(id);
//         navigation.navigate('Tareas', { alumno }); // Navegar a la página tareas
//       }
//     });

//   } else {
//     Alert.alert(
//       "¿Quiere finalizar la tarea?", // Título
//       "Pulsa una opción", // Mensaje
//       [
//         { text: "Cancelar" },
//         {
//           text: "Confirmar",
//           onPress: async () => {
//             await completarTarea(id);
//             navigation.navigate('Tareas', { alumno }); // Navegar a la página SeleccionAula
//           }
//         },
//       ],
//       { cancelable: false } // Si se puede cancelar tocando fuera de la alerta
//     );
//   }
// };

const DatosProfesor = ({ prof, id, indiceMenu,navigation }) => {

  const [seleccionado, setSeleccionado] = useState(false);
  const [foto, setFoto] = useState([]);

  // Obtenemos todos los menús para ver los menús que tenemos en la base de datos
  // Esto lo  queremos hacer para ver si hemos recogido la comanda para todos los menús disponibles en un aula en
  // Usamos useFocusEffect con useCallback para que así se renderice cada vez que se abra la pestaña
  useFocusEffect(
    useCallback(() => {
      const getDatos = async () => {
        try {
          const menus = await buscarMenusComanda(id);
          const numeroMenus = menus.length;

          const datosPedido = await buscarPedidoProfesor(prof.id, id);
          if(datosPedido)
            if (datosPedido.length >= numeroMenus) {
              setSeleccionado(true);
            }
        } catch (error) {
          console.log("error: " + error);
        }
      }
      getDatos();
    }, [])
  );

  useEffect(() => {
    const getFoto = async () => {
      try {
        const fotoDescargada = await descargarFotoPersona(prof.foto);
        setFoto(fotoDescargada);
      } catch (error) {
        console.log("error: " + error);
      }
    }
    getFoto();
  }, [prof]);



  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('seleccionCantidad', { prof,id,indiceMenu,navigation })}>
          <View style={styles.selected}>
            {seleccionado && (
              <Image style={[styles.foto, seleccionado && styles.selectedFoto]} source={{uri:"https://us.123rf.com/450wm/alonastep/alonastep1608/alonastep160800258/61775461-tick-elemento-de-se%C3%B1al-icono-de-marca-de-verificaci%C3%B3n-verde-aislado-en-el-fondo-blanco-simple.jpg" }} />
            )}
            <Image style={[styles.foto, seleccionado && styles.selectedFoto]} source={{ uri: foto.uri }} />
          </View>
          <Text style={[styles.texto, seleccionado && styles.textoSelected]}> Aula: {prof.aula} </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const SeleccionAula = ({ route, navigation }) => {

  // Este id es el id de la tarea a la que corresponde
  const { id } = route.params;

  const [profesoresArray, setProfesoresArray] = useState([]);
  const [tareaFinalizada, setTareaFinalizada] = useState(false);
  const [alumno, setAlumno] = useState([]);
  let indiceMenu = 0;

  useEffect(() => {
    const getProfesores = async () => {
      try {
        const profesores = await buscaProfesor();
        const datosTarea = await buscarTarea(id);
        console.log("los datos de la tarea son: " + JSON.stringify(datosTarea));
        const idAlumno = datosTarea.idAlumno;
        console.log("el id del alumno es: " + idAlumno);
        const alumnoDatos = await buscaAlumnoId(idAlumno);
        console.log("los datos del alumno son: " + JSON.stringify(alumnoDatos));
        setAlumno(alumnoDatos);
        setProfesoresArray(profesores);
      } catch (error) {
        console.log("error en aula: " + error);
      }
    }
    getProfesores();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const getPedidos = async () => {
        try {
          const profesores = await buscaProfesor();
          const pedidos = await buscarPedidosTarea(id);
          const menus = await buscarMenusComanda(id);
          const primerElemento = menus[0];
          const claves = Object.keys(primerElemento);
          const numeroMenus = claves.length;
          console.log("menus es: " + JSON.stringify(menus));

          console.log("el numero de menus es: " + numeroMenus);
          console.log("el numero de pedidos es: " + pedidos.length);
          console.log("el numero de profesores es: " + profesores.length);

          if (pedidos.length == profesores.length * numeroMenus) {
            setTareaFinalizada(true);
          }

        } catch (error) {
          console.log("error: " + error);
        }
      }
      getPedidos();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aulas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.datos}>
        {profesoresArray.map((profesor, index) => (
          <View key={index} style={styles.contenedor_tareas}>
            <DatosProfesor prof={profesor} id={id} indiceMenu={indiceMenu} navigation={navigation} />
          </View>

        ))}
        <TouchableOpacity onPress={() => {
          if (tareaFinalizada){
            completarTarea(id);
            navigation.navigate('pantallaFelicitacion',{alumno,navigation});
          }
          else
            console.log("No ha finalizado la tarea");
        }}>
          <Image
            style={styles.foto}
            source={{ uri: "https://dgafprofesorado.catedu.es/wp-content/uploads/sites/222/2020/12/image17.jpg" }}
            accessibilityLabel='Tarea terminada'
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default SeleccionAula;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  datos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selected:{
    flexDirection:'row',
    flexWrap:'wrap',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  texto: {
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop: 5,
    flexWrap: 'wrap',
    fontSize: RFValue(16),
  },
  textoSelected: {
    backgroundColor: 'green',
  },
  foto: {
    width: RFValue(70),
    height: RFValue(70),
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'black',
  },
  selectedFoto: {
    width: RFValue(70),
    height: RFValue(70),
    borderWidth: 8,
    borderColor: 'green',
  },
  contenedor_tareas: {
    flexDirection: 'column',
    width: '25%',
    alignItems: 'center',
  },

});