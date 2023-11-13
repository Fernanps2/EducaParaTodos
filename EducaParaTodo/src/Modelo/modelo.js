
// CONEXIÓN CON BASE DE DATOS
import appFirebase from './firebase';
import {getFirestore,collection,addDoc} from 'firebase/firestore'
const db = getFirestore(appFirebase);


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