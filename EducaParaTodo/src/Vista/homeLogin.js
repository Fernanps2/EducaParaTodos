import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Title, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: 1, name: 'Pepito', image: '' },
  { id: 2, name: 'Jane Smith', image: '' },
  // Agrega más datos según sea necesario
];

const Header = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text style={styles.title}>EducaParaTodos</Text>
            <View style={styles.container}>
                <Button title="Soy profesor" onPress={() => navigation.navigate('LoginEducador', {tipo: 'profesor'})} />
                <Button title="Soy administrador" onPress={() => navigation.navigate('LoginEducador', {tipo: 'administrador'})} />
            </View>
        </View>
    );
}

const homeLogin = ({ navigation }) => {
  return (
    <View>
        <Header></Header>
        <View style={styles.container}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={styles.box}
          onPress={() => navigation.navigate('LoginAlumno', {nombreAlumno: item.name})}
        >
          <Image source={item.image} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>

      ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  box: {
    width: '45%', // 2 cuadros por fila (con un poco de espacio)
    margin: 5,
    padding: 10,
    backgroundColor: '#ececec',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    marginTop: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
  }
});

export default homeLogin;