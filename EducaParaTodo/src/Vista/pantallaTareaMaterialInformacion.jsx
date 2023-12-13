import React from "react";
import { View, Text, Image } from "react-native";

// Mostramos el número de lugar origen que quedan
export const mostrarNumeroRecogidas = (
  quedan,
  estilos = {},
  esPrimeraVez,
  visualizacion
) => {
  return (
    <View style={estilos.container}>
      <Image
        style={estilos.imageLarge}
        source={require("../../Imagenes/animar.png")}
      />
      <View style={estilos.separador} />
      <View style={estilos.separador} />
      <View style={estilos.separador} />

      {(visualizacion === "imagenes" || visualizacion === "pictogramas") && (
        <>
          {quedan >= 1 && quedan <= 10 ? (
            <Image
              source={require(`../../Imagenes/Numeros/${quedan}.png`)}
              style={estilos.image}
            />
          ) : (
            <Text style={estilos.numeroImagen}>{quedan}</Text>
          )}
        </>
      )}

      <View style={estilos.separador} />

      <Text style={estilos.felicitacionText}>
        {quedan === 1
          ? `Solo tienes que coger objetos en ${quedan} lugar. ¡Ánimo!`
          : esPrimeraVez
          ? `Tienes que coger objetos en ${quedan} lugares.`
          : `Te falta coger objetos en ${quedan} lugares.`}
      </Text>
    </View>
  );
};

// Mostramos el número de lugares destino que quedan para llevar materiales de un lugar origen
export const mostrarNumeroLugaresDestino = (quedan, estilos = {}, visualizacion) => {
  return (
    <View style={estilos.container}>
      <Image
        style={estilos.imageLarge}
        source={require("../../Imagenes/animo2.png")}
      />
      <View style={estilos.separador} />
      <View style={estilos.separador} />
      <View style={estilos.separador} />

      {(visualizacion === "imagenes" || visualizacion === "pictogramas") && (
        <>
          {quedan >= 1 && quedan <= 10 ? (
            <Image
              source={require(`../../Imagenes/Numeros/${quedan}.png`)}
              style={estilos.image}
            />
          ) : (
            <Text style={estilos.numeroImagen}>{quedan}</Text>
          )}
        </>
      )}

      <View style={estilos.separador} />

      <Text style={estilos.felicitacionText}>
        {quedan === 1
          ? `Te falta llevar los materiales a ${quedan} clase.`
          : `Te falta llevar los materiales a ${quedan} clases.`}
      </Text>
    </View>
  );
};

export const mostrarNumeroCosasOrigen = (texto) => {
  return (
    <View>
      <Text>{texto}</Text>
    </View>
  );
};

export const mostrarNumeroCosasDestino = (texto) => {
  return (
    <View>
      <Text>{texto}</Text>
    </View>
  );
};
