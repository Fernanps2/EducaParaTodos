import React from 'react';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import DatePicker from 'react-native-date-picker';

export default function crearTarea () {
  
  // VAriables para añadir paso
  const [showAddStep, setShowAddStep] = useState(false);
  const [showHideStep, setShowHideStep] = useState(false);
  const [showAllStep, setShowAllStep] = useState(false);
  const [showAddStepAddText, setShowAddStepAddText] = useState(false); // Opcion Añadir texto en pasos
  const [showAddStepAddPict, setShowAddStepAddPict] = useState(false); // Opcion Añadir pictograma en pasos
  const [showAddStepAddVideo, setShowAddStepAddVideo] = useState(false); // Opcion Añadir video en pasos
  const [showAddStepAddImage, setShowAddStepAddImage] = useState(false); // Opcion Añadir imagen en pasos
  // Variables de campo Lugar cuando es actividad
  const [showLugar, setShowLugar] = useState(false);
  // Variables añadir Paso cuando es comanda
  const [showMoreFieldsAddStep, setShowMoreFieldsAddStep] = useState(false);
  // Variables para añadir formulario
  const [showAddForm, setShowAddForm] = useState(false);
  const [showHideForm, setHideAddForm] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedValue, setSelectedValue] = useState('none'); // item seleccionable formulario
  // Variables para guardar input
  const [nombreTarea, setNombreTarea] = useState ('');
  // Variables para fechay hora
  const [date, setDate] = useState(new Date());

// Pulsamos boton añadir texto en añadir paso
const handleAnadirTexto = () => {
  setShowAddStepAddText(true);
  setShowAddStepAddPict(false);
  setShowAddStepAddVideo(false);
  setShowAddStepAddImage(false);
}
// Pulsamos boton añadir pictograma en añadir paso
const handleAnadirPicto = () => {
  setShowAddStepAddText(false);
  setShowAddStepAddPict(true);
  setShowAddStepAddVideo(false);
  setShowAddStepAddImage(false);
}
// Pulsamos boton añadir video en añadir paso
const handleAnadirVideo = () => {
  setShowAddStepAddText(false);
  setShowAddStepAddPict(false);
  setShowAddStepAddVideo(true);
  setShowAddStepAddImage(false);
}
// Pulsamos boton añadir imagen en añadir paso
const handleAnadirImagen = () => {
  setShowAddStepAddText(false);
  setShowAddStepAddPict(false);
  setShowAddStepAddVideo(false);
  setShowAddStepAddImage(true);
}

// Pulsamos boton actividad
  const handleActividadClick = () => {
  setShowAddStep(true); // This will toggle the visibility
  setShowHideStep(false);
  setShowLugar(true);
  setShowAllStep(false);
  setShowMoreFieldsAddStep(false);
  setShowAddForm(false); // This will toggle the visibility
  setShowForm(false);
  setHideAddForm(false);
};

// Pulsamos boton materiales
const handleMatearialesClick = () => {
  setShowAddStep(true); // This will toggle the visibility
  setShowHideStep(false);
  setShowLugar(false);
  setShowAllStep(false);
  setShowMoreFieldsAddStep(true);
  setShowAddForm(false); // This will toggle the visibility
  setShowForm(false);
  setHideAddForm(false);
};

// Pulsamos boton comanda
const handleComandaClick = () => {
  setShowAddStep(true); // This will toggle the visibility
  setShowHideStep(false);
  setShowLugar(false);
  setShowAllStep(false);
  setShowMoreFieldsAddStep(false);
  setShowAddForm(true); // This will toggle the visibility
  setShowForm(false);
  setHideAddForm(false);
};

// Pulsamos boton + añadir formulario
const handleAddFormClick = () => {
  setHideAddForm(true); // Muestra boton esconder formulario
  setShowForm(true); // Muestra elección formulario
  setShowAddForm(false); // Muestra boton esconder formulario
};

// Pulsamos boton + esconder formulario
const handleHideFormClick = () => {
  setHideAddForm(false); // Oculta boton esconder formulario
  setShowForm(false); // Oculta elección formulario
  setShowAddForm(true); // Oculta boton esconder formulario
};

// Pulsamos Añadir Paso
const handleAddStepClick = () => {
  setShowAllStep(true);
  setShowHideStep(true);
  setShowAddStep(false);
};

// Pulsamos Esconder Paso
const handleHideStepClick = () => {
  setShowAllStep(false);
  setShowHideStep(false);
  setShowAddStep(true);
};

// Que pasa si clica en Picto Speak
const handlePictoPressSpeak = (image) => {

};

// Que pasa si clica en Picto Drink
const handlePictoPressDrink = (image) => {
  
};

// Que pasa si clica en Picto Eat
const handlePictoPressEat = (image) => {

};


// Borramos toda la información cuando pulsamos borrar
const handleDeleteInformation = () => {
  setNombreTarea('');
  //setInicioTareaFecha('');
  //setInicioTareaHora('');
  //setFinTareaFecha('');
  //setFinTareaHora('');
}

    return (
      <View style={styles.container}>

        <View style={[styles.buttonContainer]}>
          <TouchableOpacity style={[styles.addButtonDelete, {marginHorizontal: 50}]} >
            <Text style={styles.addButtonText}>Borrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.addButtonGuardar, {marginHorizontal: 50}]}>
            <Text style={styles.addButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>

      <Text style={styles.title}>Crear Tarea</Text>

      <Text style={[styles.text,{position: 'relative', left: 0}]}>Nombre Tarea</Text>
      <TextInput style={[styles.input, {width: 200}, {position: 'relative', left: 12}]} 
        placeholder="Elija Nombre" 
        onChangeText={setNombreTarea}
        value={nombreTarea}
      />

      <Text style={[styles.text, {position: 'relative', left: -10}]}>Inicio Tarea</Text>
      <View style={[styles.row, {position: 'relative', left: 15, marginBottom: 15, marginTop: 10}]}>
        
      </View>

      <Text style={[styles.text, {position: 'relative', left: -15}]}>Fin Tarea</Text>
      <View style={[styles.row, {position: 'relative', left: 15, marginBottom: 15, marginTop: 10}]}>
        
      </View>

      <View style={[styles.row, {marginBottom: 5}]}>
        <Text style={styles.textTipoTarea}>Tipo Tarea</Text>
        <TouchableOpacity style={[styles.addTypeTask]}>
          <TouchableOpacity onPress={handleActividadClick}>
            <Text style={styles.addButtonText}>Actividad</Text>
          </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.addTypeTask]}>
        <TouchableOpacity onPress={handleComandaClick}>
          <Text style={styles.addButtonText}>Comandas</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.addTypeTask]}>
        <TouchableOpacity onPress={handleMatearialesClick}>
          <Text style={styles.addButtonText}>Materiales</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      </View>
      
      {showAddForm && (
          <TouchableOpacity style={[styles.addButtonEmergentes, {position: 'relative', left: 10}]}>
            <TouchableOpacity onPress={handleAddFormClick}>
              <Text style={styles.addButtonEmergenteText}>+ Añadir Formulario</Text>
            </TouchableOpacity>
          </TouchableOpacity>
      )}

      {showForm && (
        <View>
          <TouchableOpacity style={[styles.addButtonEmergentes,  {position: 'relative', left: 10}]}>
            <TouchableOpacity onPress={handleHideFormClick}>
              <Text style={styles.addButtonEmergenteText}>+ Ocultar Formulario</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <View style={styles.row}>
            <Text style={styles.textFormulario}>Formulario</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
                <Picker.Item label="Ninguno" value="none" />
                <Picker.Item label="Formulario1" value="form1" />
                <Picker.Item label="Formulario2" value="form2" />
                <Picker.Item label="Formulario3" value="form3" />
            </Picker>
          </View>
        </View>
      )}

      {
        (showLugar) && (
          <View style={[styles.row,{marginTop: 15}]}>
              <Text style={{fontSize: 15}}>Lugar:</Text>
              <TextInput style={[styles.input, {width: 130},{transform: [{ translateX: 47 }]}]} placeholder="Elige Lugar" />
          </View>
        )
      }

      {(showAddStep && !showHideStep) && (
        <View style={[styles.row ,{marginBottom: 15},{alignItems: 'center'}]}>
          <TouchableOpacity style={styles.addButtonEmergentes} onPress={handleAddStepClick}>
              <Text style={styles.addButtonEmergenteText}>+ Añadir paso</Text>
          </TouchableOpacity>
          <TouchableOpacity>
             <Image source={require('../../Imagenes/CrearTarea/eliminarPaso.png')} 
             style={[{marginTop: 5},{height: 15}, {width: 15}]}></Image>
          </TouchableOpacity>
        </View>
      )}

      {(!showAddStep && showHideStep) && (
        <View style={[styles.row, {marginBottom: 15},{alignItems: 'center'}]}>
          <TouchableOpacity style={styles.addButtonEmergentes} onPress={handleHideStepClick}>
              <Text style={styles.addButtonEmergenteText}>+ Ocultar paso</Text>
          </TouchableOpacity>
          <Image source={require('../../Imagenes/CrearTarea/eliminarPaso.png')} 
          style={[{marginTop: 5}, {height: 15}, {width: 15}]}></Image>
        </View>
      )}

      {
        (showAllStep) && (

      <View>
      <View style={[styles.row, {marginBottom: 15}]}>
        <Text style={[styles.textItemAnadido]}>Nombre Paso:</Text>
        <TextInput style={[styles.input,{fontSize: 12}, {width: 130},{transform: [{ translateX: 20 }]}]} placeholder="Elija Nombre" />
      </View>

      {
        (showMoreFieldsAddStep) && (
          <View>
            <View style={[styles.row,{marginBottom: 15}]}>
              <Text style={{fontSize: 15,  translateX: -20 }}>Recoger en:</Text>
              <TextInput style={[styles.input, {width: 130},{transform: [{ translateX: 33 }]}]} placeholder="Lugar origen" />
            </View>

            <View style={styles.row}>
              <Text style={{fontSize: 15,  translateX: -20 }}>Llevar a:</Text>
              <TextInput style={[styles.input, {width: 130},{transform: [{ translateX: 58 }]}]} placeholder="Lugar destino" />
            </View>

            <View style={[styles.row, {justifyContent: 'center'},{margin: 10}]}>
              <TouchableOpacity style={[styles.addButton, {marginHorizontal: 10}]}>
                  <Text style={styles.addButtonText}>Folios</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.addButton, {marginHorizontal: 10}]}>
                  <Text style={styles.addButtonText}>Lapices</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.addButton, {marginHorizontal: 10}]}>
                <Text style={styles.addButtonText}>Gomas</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.row, {alignItems: 'center'}, {marginTop: 10}, {marginBottom:10}]}>
                <Text style={[{height: 28},{fontSize: 12}]}>Cantidad total: </Text>
                <View style={[styles.rectangle, {width: 25}, {height: 18}]}>
                <Text>X</Text>
              </View>
              <Text style={{fontSize: 12}}>  </Text>
              <Text style={[{height: 28},{fontSize: 12}]}>Cantidad a recoger: </Text>
              <TextInput style={[styles.rectangle, {height: 18},{width: 25}]} />
            </View>

          </View>
        )
      }

      <View style={styles.row}>
        <TouchableOpacity style={styles.addButtonAñadirPaso} onPress={handleAnadirTexto}>
          <Text style={styles.addButtonAñadirPasoText}>Texto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButtonAñadirPaso} onPress={handleAnadirPicto}>
          <Text style={styles.addButtonAñadirPasoText}>Pictograma</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButtonAñadirPaso} onPress={handleAnadirVideo}>
          <Text style={styles.addButtonAñadirPasoText}>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButtonAñadirPaso} onPress={handleAnadirImagen}>
          <Text style={styles.addButtonAñadirPasoText}>Imagen</Text>
        </TouchableOpacity>
      </View>
      
      {
      (!showAddStepAddText && !showAddStepAddPict && !showAddStepAddVideo && !showAddStepAddImage) && (
        <View style={[styles.rectangle, {transform: [{ translateY: -4 }]}]}>
           <Text>Elija que item añadir</Text>
        </View>
      )
      }

      {(showAddStepAddText) && (
        <View>Date:   Fri Oct 27 13:05:14 2023 +0200

        Update README.md
        
        Finalizacion del README
          <View style={[styles.rectangle, {transform: [{ translateY: -4 }]}]}>
          <TextInput 
            multiline 
            textAlignVertical='top'
            style={[styles.input, {fontSize: 10},{transform: [{ translateX: 0 }]},{width: 190}, {height: 60}, {maxHeight: 200}]} 
            placeholder="Escribe aquí..." 
          />
          </View>

          <TouchableOpacity style={[styles.addButtonGuardar, {height: 18},{width: 100}, {transform: [{ translateY: 73}]}]}>
            <Text style={[styles.addButtonEmergenteText, {color: 'white'},{transform: [{ translateY: -8 }]}]}>Guardar Texto</Text>
          </TouchableOpacity>
        </View>
      )}

      {(showAddStepAddPict) && (
        <View>
          <View style={[styles.rectangle, {justifyContent: 'space-around'}, {flexDirection: 'row'}, {transform: [{ translateY: -4 }]}]}>
            <TouchableOpacity>
              <Image source={require('../../Imagenes/CrearTarea/speak.png')} style={styles.image}></Image>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../Imagenes/CrearTarea/drink.png')} style={styles.image}></Image>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../Imagenes/CrearTarea/eat.png')} style={styles.image}></Image>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.addButtonGuardar, {height: 18},{width: 105} ,{transform: [{ translateY: 73}]}]}>
            <Text style={[styles.addButtonEmergenteText, {fontSize: 8,},{color: 'white'},{transform: [{ translateY: -8 }]}]}>Guardar Pictograma</Text>
          </TouchableOpacity>
        </View>
      )}

      {(showAddStepAddVideo) && (
        <View>
          <View style={[styles.rectangle, {justifyContent: 'space-around'}, {flexDirection: 'row'}, {transform: [{ translateY: -4 }]}]}>
            <TouchableOpacity>
              <Image source={require('../../Imagenes/CrearTarea/videoMicroondas.png')} style={styles.image}></Image>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../Imagenes/CrearTarea/videoOrdenarHabitacion.png')} style={styles.image}></Image>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.addButtonGuardar, {height: 18},{width: 105} ,{transform: [{ translateY: 73}]}]}>
            <Text style={[styles.addButtonEmergenteText, {fontSize: 10},{color: 'white'},{transform: [{ translateY: -8 }]}]}>Guardar Video</Text>
          </TouchableOpacity>
        </View>
      )}

      {(showAddStepAddImage) && (
        <View>
          <View style={[styles.rectangle, {justifyContent: 'space-around'}, {flexDirection: 'row'}, {transform: [{ translateY: -4 }]}]}>
            <TouchableOpacity>
              <Image source={require('../../Imagenes/CrearTarea/fregarSuelo.png')} style={styles.image}></Image>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../Imagenes/CrearTarea/habitacionOrdenada.png')} style={styles.image}></Image>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.addButtonGuardar, {height: 18},{width: 105} ,{transform: [{ translateY: 73}]}]}>
            <Text style={[styles.addButtonEmergenteText, {fontSize: 10},{color: 'white'},{transform: [{ translateY: -8 }]}]}>Guardar Imagen</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={[styles.row, { marginBottom: 12 }]}>
        <Text style={styles.textItemAnadido}>Texto Añadido</Text>
        <TouchableOpacity>
          <Image source={require('../../Imagenes/CrearTarea/iconoBasura.png')} 
            style={[
              styles.imageTrash,
              {transform: [{ translateX: 70 }]}
            ]}
          ></Image>
        </TouchableOpacity>
      </View>

      <View style={[styles.rectangle, {width: 190}, {height: 60}, {justifyContent: 'space-around'}, {flexDirection: 'row'}, {transform: [{ translateY: -4 }]}]}>
        <Text>Ninguno</Text>
      </View>
   
      <View style={[styles.row, { marginBottom: 12 }]}>
        <Text style={styles.textItemAnadido}>Pictograma Añadido</Text>
        <TouchableOpacity>
          <Image source={require('../../Imagenes/CrearTarea/iconoBasura.png')} 
            style={[
              styles.imageTrash,
              {transform: [{ translateX: 32 }]}
            ]}
          ></Image>
        </TouchableOpacity>
      </View>

      <View style={[styles.rectangle, {width: 190}, {height: 60}, {justifyContent: 'space-around'}, {flexDirection: 'row'}, {transform: [{ translateY: -4 }]}]}>
        <Text>Ninguno</Text>
      </View>
   
      <View style={[styles.row, { marginBottom: 12 }]}>
        <Text style={styles.textItemAnadido}>Video Añadido</Text>
        <TouchableOpacity>
        <Image source={require('../../Imagenes/CrearTarea/iconoBasura.png')} 
          style={[
            styles.imageTrash,
            {transform: [{ translateX: 70 }]}
          ]}
        ></Image>
        </TouchableOpacity>
      </View>

      <View style={[styles.rectangle, {width: 190}, {height: 60}, {justifyContent: 'space-around'}, {flexDirection: 'row'}, {transform: [{ translateY: -4 }]}]}>
        <Text>Ninguno</Text>
      </View>
   
      <View style={[styles.row, { marginBottom: 12 }]}>
        <Text style={styles.textItemAnadido}>Imagen Añadido</Text>
        <TouchableOpacity>
        <Image source={require('../../Imagenes/CrearTarea/iconoBasura.png')} 
          style={[
            styles.imageTrash,
            {transform: [{ translateX:  59 }]}
          ]}
        ></Image>
        </TouchableOpacity>
      </View>

      <View style={[styles.rectangle, {width: 190}, {height: 60}, {justifyContent: 'space-around'}, {flexDirection: 'row'}, {transform: [{ translateY: -4 }]}]}>
        <Text>Ninguno</Text>
      </View>
      </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    padding: 10,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 2,
    marginBottom: 10,
    transform: [{ translateX: -20 }],
    width: 100,
    height: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  text:{
    transform: [{ translateX: -60 }],
    fontSize: 15,
  },
  textTipoTarea:{
    transform: [{ translateX: -10 }],
    fontSize: 15,
  },
  textFormulario:{
    transform: [{ translateX: -20 }],
    fontSize: 15,
  },
  textItemAnadido:{
    position: 'relative', 
    left: 0,
    fontSize: 15
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
  buttonContainer: {
    // Asumiendo que quieres que los botones estén uno al lado del otro
    flexDirection: 'row',
    // Ajusta el espacio como sea necesario
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#808080',
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  addTypeTask:{
    borderWidth: 1,
    backgroundColor: '#808080',
    padding: 5,
    alignItems: 'center',
  },
  addButtonDelete: {
    backgroundColor: '#FF0000',
    padding: 10,
    alignItems: 'center',
    borderRadius: 4,
    width: 60,
  },
  addButtonGuardar: {
    backgroundColor: '#0000FF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 4,
    width: 60,
  },
  addButtonEmergentes: {
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
    transform: [{ translateX: 50 }],
  },
  addButtonEmergenteText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 12,
    transform: [{ translateX: -130 }],
  },
  addButtonAñadirPaso: {
    backgroundColor: '#808080',
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,  
    borderWidth: 1, // Grosor del borde
  },
  addButtonAñadirPasoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  picker: {
    height: 30, // Altura del picker
    width: 120, // Ancho del picker
    margin: 0, // Margen alrededor del picker
    padding: 5, // Relleno interno del picker
    borderWidth: 1, // Grosor del borde
    borderColor: 'gray', // Color del borde
    borderRadius: 4, // Redondeo de las esquinas
  },
  rectangle: {
    width: 219, // Ancho del rectángulo
    height: 100, // Altura del rectángulo
    backgroundColor: 'white', // Color de fondo del rectángulo
    justifyContent: 'center', // Centra el texto verticalmente
    alignItems: 'center', // Centra el texto horizontalmente
    borderWidth: 1, // Grosor del borde
    marginBottom: 10
  },
  image: {
    width: 50, // Ancho de la imagen
    height: 50, // Altura de la imagen
    resizeMode: 'contain', // Asegura que escale
  },
  imageTrash: {
    width: 15, // Ancho de la imagen
    height: 15, // Altura de la imagen
  }
});