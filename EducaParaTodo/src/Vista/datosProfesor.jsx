import React, { useState, useEffect } from 'react';
import { Image, Alert, View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
//import profesores from '../Modelo/profesor';
import { getProfesorPorId, updateProfesor } from '../Modelo/firebase';
import { buscaProfesorId } from '../Controlador/profesores';

export default function DatosProfesor ({ profesor, navigation }) {

    const idProf = profesor.id;
    const nombreProf = profesor.nombre

      const [profesorData, setProfesorData] = useState(null); // Estado para almacenar los datos del profesor
      const [nombre, setNombre] = useState('');
      const [apellidos, setApellidos] = useState('');
      const [contrasenia, setContrasenia] = useState('');
      const [email, setEmail] = useState('');
      const [aula, setAula] = useState('');

      useEffect(() => {
        // Obtener datos del profesor al cargar el componente
        const obtenerDatosProfesor = async () => {
          const datosProfesor = await buscaProfesorId(idProf);
          console.log('datosProf: ' + datosProfesor);
          setProfesorData(datosProfesor);
          // Asignar los valores iniciales para la edición
        //   if (datosProfesor) {
        //     setNombre(datosProfesor.nombre);
        //     setApellidos(datosProfesor.apellidos);
        //     setContrasenia(datosProfesor.password);
        //     setEmail(datosProfesor.email);
        //     setInfo(datosProfesor.info);
        //   }
        };
        obtenerDatosProfesor();
      }, []);


      // Función para actualizar los datos del profesor
      const guardarCambios = async () => {
        // Lógica para guardar los cambios en la base de datos usando updateProfesor
        await updateProfesor(idProf, nombre, apellidos, contrasenia, email, aula);
        // Puedes agregar lógica adicional después de actualizar los datos, como mostrar una confirmación
      };

    const showAlertStore = () => {
        Alert.alert(
          "¿Quiere guardar?", // Título
          "Pulsa una opción", // Mensaje
          [
            { text: "Cancelar", onPress: () => console.log("Cancelar presionado"), style: "cancel" },
            { text: "Confirmar", onPress: () => navigation.navigate('HomeAdmin')}
          ],
          { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
        );
      };



      return (
          <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>EducaParaTodos</Text>
          </View>

          <Text style={styles.title}> Modificar mis datos </Text>

          <View style={styles.profileContainer}>
            <Image
              source={{ uri: 'path_to_your_image' }} // Deberías reemplazar esto con la imagen real
              style={styles.profileImage}
            />
            <Text style={styles.roleText}>{nombreProf}</Text>
          </View>

                <TextInput
                  style={styles.input}
                  placeholder="Nombre"
                  value={nombre}
                  onChangeText={(text) => setNombre(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Apellidos"
                  value={apellidos}
                  onChangeText={(text) => setApellidos(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  value={contrasenia}
                  onChangeText={(text) => setContrasenia(text)}
                  secureTextEntry // Esto oculta los caracteres ingresados para la contraseña
                />

                <TextInput
                  style={styles.input}
                  placeholder="Correo electrónico"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Aula"
                  value={aula}
                  onChangeText={(text) => setAula(text)}
                />

{/* 
                <TextInput
                  style={styles.input}
                  placeholder="Información adicional"
                  value={info}
                  onChangeText={(text) => setInfo(text)}
                /> */}


          <Text style={styles.roleText}>Foto</Text>
          <Image
             source={{ uri: 'path_to_your_image' }}
             style={styles.profileImage}
          />

          {/* <Text style={styles.roleText}>Correo electrónico</Text>
          <TextInput style={styles.input} placeholder= {profe?.email} />
          <Text style={styles.roleText}>Información adicional</Text>
          <TextInput style={styles.input} placeholder= {profe?.info} /> */}


          <TouchableOpacity style={styles.addButton} onPress={guardarCambios}>
            <Text style={styles.addButtonText}>Modificar</Text>
          </TouchableOpacity>

        </View>
      );
    }



    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white' // Cambiar si es necesario
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
      },
      profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
      },
      profileImage: {
        width: 100, // Ajustar según tus necesidades
        height: 100, // Ajustar según tus necesidades
        borderRadius: 50, // Esto hará que la imagen sea redonda
        marginBottom: 10,
        backgroundColor: 'grey' // Color temporal para simular la imagen
      },
      profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
      },
      roleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      button: {
        backgroundColor: 'blue', // Color de los botones
        padding: 15,
        width: '100%', // Ajustar si es necesario
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
      },
      input: {
          borderWidth: 1,
          borderColor: 'grey',
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        },
      addButton: {
          backgroundColor: '#007BFF',
          padding: 10,
          alignItems: 'center',
          borderRadius: 5,
          marginTop: 20,
        }
    });