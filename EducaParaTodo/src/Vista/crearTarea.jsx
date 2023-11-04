import React from 'react';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';

export default function crearTarea () {

  const [showAddStep, setShowAddStep] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showHideForm, setHideAddForm] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showAllStep, setShowAllStep] = useState(false);
  const [showAddStepAddText, setShowAddStepAddText] = useState(false); // Opcion Añadir texto en pasos
  const [showAddStepAddPict, setShowAddStepAddPict] = useState(false); // Opcion Añadir pictograma en pasos
  const [showAddStepAddVideo, setShowAddStepAddVideo] = useState(false); // Opcion Añadir video en pasos
  const [showAddStepAddImage, setShowAddStepAddImage] = useState(false); // Opcion Añadir imagen en pasos
  const [selectedValue, setSelectedValue] = useState('none'); // item seleccionable formulario

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

// Pulsamos boton actividad o materiales
  const handleActividad_MatearialesClick = () => {
  setShowAddStep(true); // This will toggle the visibility
  setShowAddForm(false); // This will toggle the visibility
  setShowForm(false);
  setHideAddForm(false);
};

// Pulsamos boton comanda
const handleComandaClick = () => {
  setShowAddStep(true); // This will toggle the visibility
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


    return (
      <View style={styles.container}>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButtonDelete}>
            <Text style={styles.addButtonText}>Eliminar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addButtonGuardar}>
            <Text style={styles.addButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>

      <Text style={styles.title}>Crear Tarea</Text>

      <Text style={styles.text}>Nombre Tarea</Text>
      <TextInput style={styles.input} placeholder="Elija Nombre" />
    
      <Text style={styles.text}>Inicio Tarea</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.inputFecha}
          placeholder="(dd/mm/aaaa)"
        />

        <TextInput
          style={styles.inputFecha}
          placeholder="(HH:MM)"
        />
      </View>

      <Text style={styles.text}>Fin Tarea</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.inputFecha}
          placeholder="(dd/mm/aaaa)"
        />

        <TextInput
          style={styles.inputFecha}
          placeholder="(HH:MM)"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.textTipoTarea}>Tipo Tarea</Text>
        <TouchableOpacity style={styles.addButton}>
          <TouchableOpacity onPress={handleActividad_MatearialesClick}>
            <Text style={styles.addButtonText}>Actividad</Text>
          </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton}>
        <TouchableOpacity onPress={handleComandaClick}>
          <Text style={styles.addButtonText}>Comandas</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton}>
        <TouchableOpacity onPress={handleActividad_MatearialesClick}>
          <Text style={styles.addButtonText}>Materiales</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      </View>
      
      {showAddForm && (
          <TouchableOpacity style={styles.addButtonEmergentes}>
            <TouchableOpacity onPress={handleAddFormClick}>
              <Text style={styles.addButtonEmergenteText}>+ Añadir Formulario</Text>
            </TouchableOpacity>
          </TouchableOpacity>
      )}

      {showForm && (
        <View>
          <TouchableOpacity style={styles.addButtonEmergentes}>
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

      {(showAddStep || !showForm ) && (
          <TouchableOpacity style={styles.addButtonEmergentes} onPress={handleAddStepClick}>
              <Text style={styles.addButtonEmergenteText}>+ Añadir paso</Text>
          </TouchableOpacity>
      )}

      {
        (showAllStep) } // BAMOSS POR AQUIIIIIIIIIIIIIIIIIIIIIIIIIII
      
      <View style={styles.row}>
        <Text style={{fontSize: 15,  translateX: -20 }}>Nombre Paso</Text>
        <TextInput style={[styles.input, {width: 130},{transform: [{ translateX: 20 }]}]} placeholder="Elija Nombre" />
      </View>

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
        <View style={[styles.rectangle, {transform: [{ translateY: -4 }]}]}></View>
      )
      }

      {(showAddStepAddText) && (
        <View>
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
            <Image source={require('../../Imagenes/CrearTarea/speak.png')} style={styles.image}></Image>
            <Image source={require('../../Imagenes/CrearTarea/drink.png')} style={styles.image}></Image>
            <Image source={require('../../Imagenes/CrearTarea/eat.png')} style={styles.image}></Image>
          </View>

          <TouchableOpacity style={[styles.addButtonGuardar, {height: 18},{width: 105} ,{transform: [{ translateY: 73}]}]}>
            <Text style={[styles.addButtonEmergenteText, {fontSize: 8,},{color: 'white'},{transform: [{ translateY: -8 }]}]}>Guardar Pictograma</Text>
          </TouchableOpacity>
        </View>
      )}

      {(showAddStepAddVideo) && (
        <View>
          <View style={[styles.rectangle, {justifyContent: 'space-around'}, {flexDirection: 'row'}, {transform: [{ translateY: -4 }]}]}>
            <Image source={require('../../Imagenes/CrearTarea/videoMicroondas.png')} style={styles.image}></Image>
            <Image source={require('../../Imagenes/CrearTarea/videoOrdenarHabitacion.png')} style={styles.image}></Image>
          </View>

          <TouchableOpacity style={[styles.addButtonGuardar, {height: 18},{width: 105} ,{transform: [{ translateY: 73}]}]}>
            <Text style={[styles.addButtonEmergenteText, {fontSize: 10},{color: 'white'},{transform: [{ translateY: -8 }]}]}>Guardar Video</Text>
          </TouchableOpacity>
        </View>
      )}

      {(showAddStepAddImage) && (
        <View>
          <View style={[styles.rectangle, {justifyContent: 'space-around'}, {flexDirection: 'row'}, {transform: [{ translateY: -4 }]}]}>
            <Image source={require('../../Imagenes/CrearTarea/fregarSuelo.png')} style={styles.image}></Image>
            <Image source={require('../../Imagenes/CrearTarea/habitacionOrdenada.png')} style={styles.image}></Image>
          </View>

          <TouchableOpacity style={[styles.addButtonGuardar, {height: 18},{width: 105} ,{transform: [{ translateY: 73}]}]}>
            <Text style={[styles.addButtonEmergenteText, {fontSize: 10},{color: 'white'},{transform: [{ translateY: -8 }]}]}>Guardar Imagen</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={[styles.row, { marginBottom: 12 }]}>
        <Text style={styles.text}>Texto Añadido</Text>
        <Image source={require('../../Imagenes/CrearTarea/iconoBasura.png')} 
          style={[
            styles.image, 
            {height: 15}, 
            {width: 15},
            {transform: [{ translateX: 50 }]}
          ]}
        ></Image>
      </View>

      <View style={[styles.rectangle, {width: 190}, {height: 60}, {justifyContent: 'space-around'}, {flexDirection: 'row'}, {transform: [{ translateY: -4 }]}]}></View>
   
      <View style={[styles.row, { marginBottom: 12 }]}>
        <Text style={[styles.text,{transform: [{ translateX: -40 }]}]}>Pictograma Añadido</Text>
        <Image source={require('../../Imagenes/CrearTarea/iconoBasura.png')} 
          style={[
            styles.image, 
            {height: 15}, 
            {width: 15},
            {transform: [{ translateX: 30 }]}
          ]}
        ></Image>
      </View>

      <View style={[styles.rectangle, {width: 190}, {height: 60}, {justifyContent: 'space-around'}, {flexDirection: 'row'}, {transform: [{ translateY: -4 }]}]}></View>
   
      <View style={[styles.row, { marginBottom: 12 }]}>
        <Text style={styles.text}>Video Añadido</Text>
        <Image source={require('../../Imagenes/CrearTarea/iconoBasura.png')} 
          style={[
            styles.image, 
            {height: 15}, 
            {width: 15},
            {transform: [{ translateX: 50 }]}
          ]}
        ></Image>
      </View>

      <View style={[styles.rectangle, {width: 190}, {height: 60}, {justifyContent: 'space-around'}, {flexDirection: 'row'}, {transform: [{ translateY: -4 }]}]}></View>
   
      <View style={[styles.row, { marginBottom: 12 }]}>
        <Text style={[styles.text,{transform: [{ translateX: -55 }]}]}>Imagen Añadido</Text>
        <Image source={require('../../Imagenes/CrearTarea/iconoBasura.png')} 
          style={[
            styles.image, 
            {height: 15}, 
            {width: 15},
            {transform: [{ translateX:  45 }]}
          ]}
        ></Image>
      </View>

      <View style={[styles.rectangle, {width: 190}, {height: 60}, {justifyContent: 'space-around'}, {flexDirection: 'row'}, {transform: [{ translateY: -4 }]}]}></View>
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    justifyContent: 'center',
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
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 2,
    marginBottom: 10,
    transform: [{ translateX: -20 }],
  },
  inputFecha: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 2,
    marginBottom: 10,
    transform: [{ translateX: -20 }],
    width: 100,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginBottom: 50,
  },
  addButton: {
    backgroundColor: '#808080',
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonDelete: {
    backgroundColor: '#FF0000',
    padding: 10,
    alignItems: 'center',
    borderRadius: 4,
    width: 60,
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -100 }],
  },
  addButtonGuardar: {
    backgroundColor: '#0000FF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 4,
    width: 60,
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: 25 }],
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
  },
  image: {
    width: 50, // Ancho de la imagen
    height: 50, // Altura de la imagen
    resizeMode: 'contain', // Asegura que escale
  }
});