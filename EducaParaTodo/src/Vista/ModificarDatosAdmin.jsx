import React, { useState, useEffect } from 'react';
import { Image, Alert, View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { buscaAdministradorNombre, actualizaAdministrador } from '../Controlador/administradores';
import { descargaFotoPersona } from '../Controlador/multimedia';
import Swal from "sweetalert2";

// Se usa para cambiar los datos del propio administrador
// HomeAdmin > modificar mis datos

export default function ModificarDatosAdmin ({ route, navigation }) {

      const {nombreAdm} = route.params;

      const [adminData, setAdminData] = useState(null); // Estado para almacenar los datos del admin
      const [adminId, setAdminId] = useState('');
      const [nombre, setNombre] = useState('');
      const [apellidos, setApellidos] = useState('');
      const [contrasenia, setContrasenia] = useState('');
      const [imagen, setImagen] = useState([]);

      useEffect(() => {
        // Obtener datos del admin al cargar el componente
        const obtenerDatosAdmin = async () => {

          const datosAdmin = await buscaAdministradorNombre(nombreAdm);
          const imagenUri = await descargaFotoPersona(datosAdmin.foto);
          setImagen(imagenUri);
          setAdminData(datosAdmin);
          // Asignar los valores iniciales para la edición
          if (datosAdmin) {
            setAdminId(datosAdmin.id);
            setNombre(datosAdmin.nombre);
            setApellidos(datosAdmin.apellidos);
            setContrasenia(datosAdmin.password);
          }

        };
        obtenerDatosAdmin();
      }, []);



      // Función para actualizar los datos del Admin
      const guardarCambios = async () => {
        // Lógica para guardar los cambios en la base de datos usando updateAdmin

        await actualizaAdministrador(adminId,nombre, apellidos, contrasenia/*,foto*/);
        // Puedes agregar lógica adicional después de actualizar los datos, como mostrar una confirmación
        navigation.navigate('pantallaPrincipal');
      };

    const showAlertStore = () => {
      if (Platform.OS === "web") {
        Swal.fire({
          title: "Subida completada",
          text: "Los datos han sido modificados con exito",
          icon: "success",
          confirmButtonText: "De acuerdo",
        }).then((result) => {
          if(result.isConfirmed){
            guardarCambios();
          }
        })
      }else {
        Alert.alert(
          "¿Quiere guardar?", // Título
          "Pulsa una opción", // Mensaje
          [
            { text: "Cancelar", onPress: () => console.log("Cancelar presionado"), style: "cancel" },
            { text: "Confirmar", onPress: () => guardarCambios()}
          ],
          { cancelable: true } // Si se puede cancelar tocando fuera de la alerta
        );
      };

    }


      return (
          <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>EducaParaTodos</Text>
          </View>

          <Text style={styles.title}> Modificar mis datos </Text>

        <ScrollView>
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: nombreAdm.foto }} // Deberías reemplazar esto con la imagen real
              style={styles.profileImage}
            />

            <Text style={styles.roleText}>{nombreAdm}</Text>
          </View>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre"
                  value={nombre || ''}
                  onChangeText={(text) => setNombre(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Apellidos"
                  value={apellidos || ''}
                  onChangeText={(text) => setApellidos(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  value={contrasenia || ''}
                  onChangeText={(text) => setContrasenia(text)}
                  secureTextEntry // Esto oculta los caracteres ingresados para la contraseña
                />

                {/*<TextInput
                  style={styles.input}
                  placeholder="Correo electrónico"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />*/}

                {/* <TextInput
                  style={styles.input}
                  placeholder="Información adicional"
                  value={info}
                  onChangeText={(text) => setInfo(text)}
                /> */}

          <Text style={styles.roleText}>Foto</Text>
            <Image
              source={{ uri: nombreAdm.foto }} // Deberías reemplazar esto con la imagen real
              style={styles.profileImage}
            />
          {/* <Text style={styles.roleText}>Correo electrónico</Text>
          <TextInput style={styles.input} placeholder= {profe?.email} />
          <Text style={styles.roleText}>Información adicional</Text>
          <TextInput style={styles.input} placeholder= {profe?.info} /> */}


          <TouchableOpacity style={styles.addButton} onPress={showAlertStore}>
            <Text style={styles.addButtonText}>Modificar</Text>
          </TouchableOpacity>
        </ScrollView>

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