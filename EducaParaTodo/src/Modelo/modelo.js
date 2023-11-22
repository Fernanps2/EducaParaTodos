
// CONEXIÓN CON BASE DE DATOS
import appFirebase from './firebase';
import {getFirestore,collection,addDoc, getDocs} from 'firebase/firestore'
const db = getFirestore(appFirebase);
import { Alert } from 'react-native';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';


export const almacenarAlumno = async(nombre,apellidos,visualizacionPreferente)=>{

    try{
      if(nombre === '' || apellidos === '' || visualizacionPreferente === null)
        Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido')
      else{
        const alumno = {
          nombre,
          apellidos,
          visualizacionPreferente
        }
        
        await addDoc(collection(db,'alumnos'),{
          ...alumno
        })
      }
    }catch(error){

    }
  }

export const getAlumnos = async () => {
  try{
    const querySnapshot = await getDocs(collection(db, 'alumnos'));
    const docs = [];
    querySnapshot.forEach((doc) => {
      const { nombre, apellidos, password, jwt, fotoUrl} = doc.data();
      docs.push({
        id:doc.id,
        nombre,
        apellidos,
        password,
        jwt,
        fotoUrl,
      });
    });
    return docs;
  } catch(error){
    console.log(error);
      Alert.alert(error);
  }
}
/*
export const uploadImage = async(imageUri) => {
  const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;

  const task = storage()
    .ref(filename)
    .putFile(uploadUri);

  try {
    await task;
  } catch (e) {
    console.error(e);
  }
};

export const selectAndUploadImage = () => {
  ImagePicker.showImagePicker(response => {
    if (response.didCancel) {
      console.log('El usuario canceló la selección de imagen');
    } else if (response.error) {
      console.log('Error de ImagePicker:', response.error);
    } else {
      const source = { uri: response.uri };
      uploadImage(source.uri);
    }
  });
};
*/