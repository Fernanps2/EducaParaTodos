// import React from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

// export default function aniadirAlumno () {
//     return (
//       <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>EducaParaTodos</Text>
//       </View>

//       <TextInput style={styles.input} placeholder="Nombre" />
//       <TextInput style={styles.input} placeholder="Apellidos" />
//       <TextInput style={styles.input} placeholder="Teléfono de contacto" />
//       <TextInput style={styles.input} placeholder="Visualización preferente" />

//       <View style={styles.photoSection}>
//         <Text>Foto del usuario:</Text>
//         <View style={styles.userIcon} />
//       </View>

//       <TouchableOpacity style={styles.addButton}>
//         <Text style={styles.addButtonText}>Añadir</Text>
//       </TouchableOpacity>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   header: {
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'grey',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   photoSection: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   userIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'grey',
//     marginBottom: 10,
//   },
//   addButton: {
//     backgroundColor: '#007BFF',
//     padding: 10,
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   addButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Swal from 'sweetalert2';

export default function AniadirAlumno () {

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ['video', 'pictogramas', 'audio', 'texto', 'imagenes'];

  const handleOptionPress = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    }
  };
  /*
  const handleStoreNotification = () =>{
    Swal.fire({
      title: '¿Quieres añadir al alumno?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Añadir',
      denyButtonText: `Cancelar`,
    }).then((result) => {
          if (result.isConfirmed) {
        Swal.fire('¡Alumno añadido!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Cancelado', '', 'info')
      }
     }).finally(() => {
      // Restablecer desplazamiento en todo el documento
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    })
    };
    */
    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EducaParaTodos</Text>
      </View>

      <TextInput style={styles.input} placeholder="Nombre" />
      <TextInput style={styles.input} placeholder="Apellidos" />
      <TextInput style={styles.input} placeholder="Teléfono de contacto" />
      <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.input}>
        <Text>{selectedOptions.join(', ') || 'Visualización preferente'}</Text>
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdownContainer}>
          <FlatList
            horizontal
            data={options}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleOptionPress(item)} style={styles.dropdownItem}>
                <Text style={{ fontSize: 18, color: selectedOptions.includes(item) ? 'blue' : 'black' }}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setDropdownVisible(false)}>
            <Text style={{ color: 'white' }}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.photoSection}>
        <Text>Foto del usuario:</Text>
        <View style={styles.userIcon} ></View>
      </View>

      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.addButton}
                  onPress={() => navigation.navigate('HomeAdmin')}>
            <Text style={styles.addButtonText}>Añadir</Text>
      </TouchableOpacity>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
    marginBottom: 10,
  },
  dropdownContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  dropdownItem: {
    padding: 15,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    // Ajusta el espacio como sea necesario
    marginBottom: 50,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});