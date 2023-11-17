import React from 'react';
import { View, Text } from 'react-native';

const EliminarTareaAlumno = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pantalla EliminarTareaAlumno</Text>
      <Text>Item ID: {item.id}</Text>
      <Text>Nombre: {item.nombre}</Text>
      <Text>Apellidos: {item.apellidos}</Text>
      {/* Agrega más detalles del item si es necesario */}
    </View>
  );
};

export default EliminarTareaAlumno;
