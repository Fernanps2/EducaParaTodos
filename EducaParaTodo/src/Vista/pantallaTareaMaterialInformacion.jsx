import React from "react";
import { View, Text, Image, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

// Mostramos el número de lugar origen que quedan
export const mostrarNumeroRecogidas = (
  quedan,
  estilos = {},
  esPrimeraVez,
  visualizacion,
  lugaresOrigen,
  aulas,
  indice
) => {
  const resultado = lugaresOrigen.map((lugar) => {
    const aulaCorrespondiente = aulas.find((aula) => aula.aula === lugar.id);
    return aulaCorrespondiente
      ? { aula: aulaCorrespondiente.aula, foto: aulaCorrespondiente.foto }
      : null;
  });
  const resultadoFinal = resultado.filter((elemento, index) => {
    return index >= indice;
  });

  return (
    <View style={estilos.container}>
      <Image
        style={estilos.imageLarge}
        source={require("../../Imagenes/animar.png")}
      />
      <Text style={estilos.felicitacionText}>
        {quedan === 1
          ? `Solo tienes que coger objetos en:`
          : esPrimeraVez
          ? `Tienes que coger objetos en:`
          : `Te falta coger objetos en:`}
      </Text>

      <View style={estilos.separador}></View>
      <View style={estilos.separador}></View>

      <View style={estilos.row}>
        {resultadoFinal.map((item, index) => {
          if (item) {
            return (
              <View key={index} style={[{ alignItems: "center" }]}>
                {visualizacion === "imagenes" ||
                visualizacion === "pictogramas" ? (
                  <>
                    {item.aula === "Almacen" ? (
                      <>
                        <Image
                          source={{ uri: item.foto.uri }}
                          style={[
                            {
                              width: Platform.OS === "web" ? RFValue(50) : RFValue(70),
                              height: Platform.OS === "web" ? RFValue(50) : RFValue(70),
                              marginHorizontal: 10,
                            },
                          ]}
                        />
                      </>
                    ) : (
                      <>
                        <Image
                          source={{ uri: item.foto.uri }}
                          style={[
                            {
                              width: Platform.OS === "web" ? RFValue(50) : RFValue(70),
                              height: Platform.OS === "web" ? RFValue(50) : RFValue(70),
                              marginHorizontal: 10,
                            },
                          ]}
                        />
                      </>
                    )}

                    <Text style={estilos.text}>
                      {item.aula === "Almacen"
                        ? `${item.aula} `
                        : `Aula ${item.aula} `}
                    </Text>
                  </>
                ) : (
                  <Text style={[estilos.text, { marginHorizontal: 10 }]}>
                    {item.aula === "Almacen"
                      ? `${item.aula} `
                      : `Aula ${item.aula} `}
                  </Text>
                )}
              </View>
            );
          }
        })}
      </View>
    </View>
  );
};

// Mostramos el número de lugares destino que quedan para llevar materiales de un lugar origen
export const mostrarNumeroLugaresDestino = (
  quedan,
  estilos = {},
  visualizacion,
  aulas,
  tareas,
  indice
) => {
  // Mapear cada tarea a su correspondiente aula.
  const resultado = tareas.map((tarea) => {
    // Buscar la aula correspondiente basada en el lugar de destino de la tarea.
    const aulaCorrespondiente = aulas.find(
      (aula) => aula.aula === tarea.lugarDestino
    );
    // Si se encuentra una aula correspondiente, se devuelve un objeto con esa aula y su foto.
    // De lo contrario, se devuelve null.
    return aulaCorrespondiente
      ? { aula: aulaCorrespondiente.aula, foto: aulaCorrespondiente.foto }
      : null;
  });

  // Crear un conjunto para rastrear las aulas que ya han aparecido en índices anteriores.
  const aulasPrevias = new Set();

  // Llenar el conjunto aulasPrevias con las aulas de los índices anteriores al actual.
  // Esto evita que las aulas que ya han aparecido se repitan en índices posteriores.
  for (let i = 0; i < indice; i++) {
    const elemento = resultado[i];
    if (elemento) {
      aulasPrevias.add(elemento.aula);
    }
  }

  // Filtrar los elementos de resultado a partir del índice actual.
  // Solo se incluyen los elementos cuyas aulas no están en el conjunto aulasPrevias,
  // lo que asegura que no haya duplicados de aulas en índices posteriores.
  const resultadoFinal = resultado.slice(indice).filter((elemento) => {
    if (elemento && !aulasPrevias.has(elemento.aula)) {
      // Si el aula del elemento actual no ha aparecido antes, se agrega al conjunto y se incluye en resultadoFinal.
      aulasPrevias.add(elemento.aula);
      return true;
    }
    // Si el aula del elemento actual ya ha aparecido, se omite.
    return false;
  });

  return (
    <View style={estilos.container}>
      <Image
        style={estilos.imageLarge}
        source={require("../../Imagenes/animo2.png")}
      />

      <Text style={estilos.felicitacionText}>
        {quedan === 1
          ? `Te falta llevar los materiales a las clases:`
          : `Te falta llevar los materiales a las clases:`}
      </Text>

      <View style={estilos.separador} />
      <View style={estilos.separador} />

      <View style={estilos.row}>
        {resultadoFinal.map((item, index) => {
          if (item) {
            return (
              <View key={index} style={[{ alignItems: "center" }]}>
                {visualizacion === "imagenes" ||
                visualizacion === "pictogramas" ? (
                  <>
                  {item.aula === "Almacen" ? (
                      <>
                        <Image
                          source={item.foto.uri}
                          style={[
                            {
                              width: Platform.OS === "web" ? RFValue(50) : RFValue(70),
                              height: Platform.OS === "web" ? RFValue(50) : RFValue(70),
                              marginHorizontal: 10,
                            },
                          ]}
                        />
                      </>
                    ) : (
                      <>
                        <Image
                          source={{ uri: item.foto.uri }}
                          style={[
                            {
                              width: Platform.OS === "web" ? RFValue(50) : RFValue(70),
                              height: Platform.OS === "web" ? RFValue(50) : RFValue(70),
                              marginHorizontal: 10,
                            },
                          ]}
                        />
                      </>
                    )}
                    <Text style={estilos.text}>
                      {item.aula === "Almacen"
                        ? `${item.aula} `
                        : `Aula ${item.aula} `}
                    </Text>
                  </>
                ) : (
                  <Text style={[estilos.text, { marginHorizontal: 10 }]}>
                    {item.aula === "Almacen"
                      ? `${item.aula} `
                      : `Aula ${item.aula} `}
                  </Text>
                )}
              </View>
            );
          }
        })}
      </View>
    </View>
  );
};