

import React, { useState } from 'react';
import { Alert, View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

export default function AniadirAlumno ({ navigation }) {

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

      <TextInput style={styles.input} placeholder="Nombre" />
      <TextInput style={styles.input} placeholder="Apellidos" />
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
                  onPress={showAlertStore}>
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