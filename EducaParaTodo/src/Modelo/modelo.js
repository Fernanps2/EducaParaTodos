
// CONEXIÓN CON BASE DE DATOS
import appFirebase from './firebase';
import {getFirestore,collection,addDoc, getDocs, where, query, getDoc,doc, DocumentReference,setDoc} from 'firebase/firestore'
const db = getFirestore(appFirebase);
import { Alert } from 'react-native';


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


// Funcion para añadir una tarea a la base de datos. PROBADA FUNCIONA CORRECTAMENTE
export const setTarea = async (titulo,completado,descripcion,fechaInicio,fechaFin,tipo,idAlumno) => {
  console.log('estoy haciendo la tarea');
  console.log(fechaInicio);
  console.log(completado);
    try{
        if(titulo === '' || completado === '' || descripcion === '' || fechaInicio === '' || fechaFin === '' || tipo === '' || idAlumno === ''){
          Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
          console.log('te faltan campos');
        }
        else{
          console.log('se crea el objeto');
          const objeto = {
            titulo,
            completado,
            descripcion,
            fechaFin,
            fechaInicio,
            idAlumno,
            tipo
          }
          console.log('se ha creado el objeto');
          console.log(objeto);

          
          await addDoc(collection(db,'Tarea'),{
            ...objeto
          })
        }
      }catch(error){
        console.log('error' + error);
      }  
}



// export const asignarTareaAlumno(idTarea,idAlumno){}
// export const asignarFeedback(idTarea,feedBack){}


// PROBADA Y FUNCIONA. SE OBTIENEN LOS DATOS DE LA TAREA PERO NO SE OBTIENE EL NOMBRE DEL ALUMNO QUE LA REALIZA SOLO SE OBTIENE EL ID DEL DOCUMENTO DE ESE ALUMNO
export const getTarea = async (idAlumno) => {

  idAlumno= "4X1lOV3mppVQgcxhaQcI";

  try{
    const querySnapshot = await getDocs(collection(db, 'Tarea'),where('IdAlumno','==',idAlumno));


    const docs = [];
    for(const doc of querySnapshot.docs) {
      const {Nombre,Completado,Descripción,FechaInicio, FechaFin, Tipo,IdAlumno} = doc.data();

      console.log(IdAlumno);
      const idDocumento = IdAlumno._path.segments[IdAlumno._path.segments.length - 1];      
      console.log(idDocumento);


      try {
        const alumnoDoc = await getDoc(db, 'alumnos', idDocumento);
      
        if (alumnoDoc.exists()) {
          const nombreAlumno = alumnoDoc.data().Nombre;
          console.log('Nombre del alumno:', nombreAlumno);
        } else {
          console.log('El documento del alumno no existe.');
        }
      } catch (error) {
        console.error('Error al obtener el documento del alumno:', error);
      }      


      docs.push({
        id:doc.id,
        Nombre,
        Completado,
        Descripción,
        FechaInicio,
        FechaFin,
        Tipo,
        IdAlumno
      });
    };
    return docs;
  } catch(error){
    console.log(error);
      Alert.alert(error);
  }
}

// EN LA VISTA CON ESTE CÓDIGO SE SACA LA LISTA DE TAREAS

  // const [tareas,setTareas] =useState([]);

  // useEffect(() => {
  //   const listaTareas = async () => {
  //     try{
  //       const Tareas = await getTarea(2);
  //       setTareas(Tareas);
  //       // console.log(Tareas);
  //     } catch(error){
  //       console.log(error);
  //     }
  //   };
  //   listaTareas();
  // }, []);



  // PRUEBA REALIZADA. FUNCIONA
export const setTareaActividad = async(nombre,aula,pasos,idTarea) => {
  try{

    if(nombre === '' || aula === '' || pasos === null || idTarea === ''){
      Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
      console.log('te faltan campos');
    }
    else{

      // Creamos las referencias 
      const pasosRef = doc(db, 'PasosActividad', String(pasos));
      const idTareaRef = doc(db, 'Tarea', String(idTarea));


      const objeto = {
        nombre,
        aula,
        pasos:pasosRef,
        idTarea:idTareaRef
      }

      // Comprobamos que las referencias son instancias de la clase DocumentReference
      if (!(pasosRef instanceof DocumentReference) || !(idTareaRef instanceof DocumentReference)) {
        throw new Error('pasosRef e idTareaRef deben ser instancias de DocumentReference');
      }
      
      await addDoc(collection(db,'Tarea-Actividad'),{
        ...objeto
      })
    }
  }catch(error){
    console.log(error);
  }  
}



// export const getTareaActividad(){}

// PRUEBA REALIZADA.FUNCIONA
export const setTareaComanda = async(idTarea,menu,pedidos) => {
  try{

    if(menu === '' || pedidos === '' || pasos === null || idTarea === ''){
      Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
      console.log('te faltan campos');
    }
    else{

      // Creamos las referencias 
      const pasosRef = doc(db, 'PasosActividad', String(pasos));
      const idTareaRef = doc(db, 'Tarea', String(idTarea));


      const objeto = {
        nombre,
        aula,
        pasos:pasosRef,
        idTarea:idTareaRef
      }

      // Comprobamos que las referencias son instancias de la clase DocumentReference
      if (!(pasosRef instanceof DocumentReference) || !(idTareaRef instanceof DocumentReference)) {
        throw new Error('pasosRef e idTareaRef deben ser instancias de DocumentReference');
      }
      
      await addDoc(collection(db,'Tarea-Actividad'),{
        ...objeto
      })
    }
  }catch(error){
    console.log(error);
  }  
}


// export const getTareaComanda(){}


// PRUEBA REALIZADA. FUNCIONA
export const setMenu = async(nombreMenu,idAlimentos) => {
  try{

    if(nombreMenu === '' || idAlimentos === null){
      Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
    }
    else{

      // Hacemos que los idAlimentos sean referencias
      const referenciasAlimentos = idAlimentos.map((idAlimento) => {
        return doc(db, 'Alimentos', idAlimento);
      });

      const objeto = {
        idAlimentos:referenciasAlimentos
      }
      

      // Lo hacemos así para establecer el nombreMenú como el id del documento
      const menuDocRef = doc(db, 'Menu', nombreMenu);

      // Necesitamos poner setDoc para especificar el ID del documento
      await setDoc(menuDocRef, {
        ...objeto
      });
    }
  }catch(error){
    console.log(error);
  }  
}



// PRUEBA REALIZADA. FUNCIONA
export const setAlimento = async (nombreAlimento,imagen) => {
  try{

    if(nombreAlimento === '' || imagen === ''){
      Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
    }
    else{

      const objeto = {
        nombreAlimento,
        imagen
      }
      

      // Lo hacemos así para establecer el nombreMenú como el id del documento
      const menuDocRef = doc(db, 'Alimentos', nombreAlimento);

      // Necesitamos poner setDoc para especificar el ID del documento
      await setDoc(menuDocRef, {
        ...objeto
      });
    }
  }catch(error){
    console.log(error);
  }  
}


// export const getAlimento(nombre){}



export const setTareaInventario = async(idMaterial,lugarLlevar,recogida,idTarea) => {
  try{

    if(idMaterial === '' || lugarLlevar === '' || recogida === null || idTarea === ''){
      Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
      console.log('te faltan campos');
    }
    else{

      // Creamos las referencias 
      const idMaterialRef = doc(db, 'PasosActividad', String(idMaterial));
      const idTareaRef = doc(db, 'Tarea', String(idTarea));


      const objeto = {
        idMaterial:idMaterialRef,
        lugarLlevar,
        recogida,
        idTarea:idTareaRef
      }

      // Comprobamos que las referencias son instancias de la clase DocumentReference
      if (!(idMaterialRef instanceof DocumentReference) || !(idTareaRef instanceof DocumentReference)) {
        throw new Error('pasosRef e idTareaRef deben ser instancias de DocumentReference');
      }
      
      await addDoc(collection(db,'Tarea-Inventario'),{
        ...objeto
      })
    }
  }catch(error){
    console.log(error);
  }  





}


// PRUEBA REALIZADA. FUNCIONA
export const setMaterial = async (foto,nombre,stock)=> {
  try{

    if(nombre === '' || foto === '' || stock === ''){
      Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
    }
    else{

      const objeto = {
        nombre,
        foto,
        stock
      }
      
      // Necesitamos poner setDoc para especificar el ID del documento
      await addDoc(collection(db,'Material'),{
        ...objeto
      });
    }
  }catch(error){
    console.log(error);
  }  
}


// export const getMaterial(nombre){}
// export const getTareaInventario(){}




