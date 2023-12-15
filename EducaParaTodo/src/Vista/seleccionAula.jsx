import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { borraProfesor, buscaProfesor } from '../Controlador/profesores';
import { responsiveFontSize } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { buscarPedidoProfesor, buscarMenus, buscarPedidosTarea, buscarTarea } from '../Controlador/tareas';
import { useFocusEffect } from '@react-navigation/native';
import { completarTarea } from '../Controlador/tareas';
import Swal from 'sweetalert2';
import { buscaAlumnoId } from '../Controlador/alumnos';
import Tareas from './tareas';
import { descargarFotoPersona } from '../Modelo/firebase';

const showAlert = async (id, alumno, navigation) => {
  if (navigation)
    console.log("la navegacion es correcta231");
  if (Platform.OS === "web") {
    Swal.fire({
      title: "¿Finalizar tarea?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await completarTarea(id);
        navigation.navigate('Tareas', { alumno }); // Navegar a la página tareas
      }
    });

  } else {
    Alert.alert(
      "¿Quiere finalizar la tarea?", // Título
      "Pulsa una opción", // Mensaje
      [
        { text: "Cancelar" },
        {
          text: "Confirmar",
          onPress: async () => {
            await completarTarea(id);
            navigation.navigate('Tareas', { alumno }); // Navegar a la página SeleccionAula
          }
        },
      ],
      { cancelable: false } // Si se puede cancelar tocando fuera de la alerta
    );
  }
};

const DatosProfesor = ({ prof, id, navigation }) => {

  const [seleccionado, setSeleccionado] = useState(false);
  const [foto, setFoto] = useState([]);

  // Obtenemos todos los menús para ver los menús que tenemos en la base de datos
  // Usamos useFocusEffect con useCallback para que así se renderice cada vez que se abra la pestaña
  useFocusEffect(
    useCallback(() => {
      const getDatos = async () => {
        try {
          const menus = await buscarMenus();
          const numeroMenus = menus.length;

          const datosPedido = await buscarPedidoProfesor(prof.id, id);
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
        console.log("nombre profesor: " + prof.nombre);
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
        <TouchableOpacity onPress={() => navigation.navigate('seleccionMenu', { id, prof })}>
          {/* Esto es muy importante mirarlo ya que aquí está cogiendo la ruta de una foto de internet no sé como hacer 
             para que la ruta sea de una foto que tenemos en una carpeta no se me muestra por pantalla */}
          <Image style={[styles.foto, seleccionado && styles.selectedFoto]} source={{ uri: foto.uri }} />
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

  useEffect(() => {
    const getProfesores = async () => {
      try {
        const profesores = await buscaProfesor();
        const datosTarea = await buscarTarea(id);
        const idAlumno = datosTarea.idAlumno;
        const alumnoDatos = await buscaAlumnoId(idAlumno);
        setAlumno(alumnoDatos);
        setProfesoresArray(profesores);
      } catch (error) {
        console.log("error: " + error);
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
          const menus = await buscarMenus();

          if (pedidos.length == profesores.length * menus.length) {
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
            <DatosProfesor prof={profesor} id={id} navigation={navigation} />
          </View>

        ))}
        <TouchableOpacity onPress={() => {
          if (tareaFinalizada)
            showAlert(id, alumno, navigation);
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
    borderWidth: 8,
    borderColor: 'green',
  },
  contenedor_tareas: {
    flexDirection: 'column',
    width: '33%',
    alignItems: 'center',
  },

});