
// CONEXIÓN CON BASE DE DATOS
import appFirebase from './firebase';
import {getFirestore,collection,addDoc, getDocs, where, query, getDoc,doc, DocumentReference,setDoc, updateDoc, firestore} from 'firebase/firestore'
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

          await addDoc(collection(db,'Tarea'),{
            ...objeto
          })
        }
      }catch(error){
        console.log('error' + error);
      }
}



// export const asignarTareaAlumno = async (idTarea,idAlumno) => {





// }


// PRUEBA REALIZADA. FUNCIONA
export const asignarFeedback = async (idTarea,feedBack) => {
  try{
    if(idTarea === '' || feedBack === ''){
      Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
      console.log('te faltan campos');
    }
    else{

      // Creamos las referencias
      const tareaRef = doc(db, 'Tarea', String(idTarea));

      await updateDoc(tareaRef,{
        Feedback: feedBack,
      })
    }
  }catch(error){
    console.log(error);
  }
}


// PROBADA Y FUNCIONA. SE OBTIENEN LOS DATOS DE LA TAREA PERO NO SE OBTIENE EL NOMBRE DEL ALUMNO QUE LA REALIZA SOLO SE OBTIENE EL ID DEL DOCUMENTO DE ESE ALUMNO

export const getTarea = async (idAlumno) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Tarea'), where('IdAlumno', '==', idAlumno));

    const docs = [];

    for (const tareaDoc of querySnapshot.docs) {
      const { Nombre, Completado, Descripción, FechaInicio, FechaFin, Tipo, IdAlumno } = tareaDoc.data();
      console.log(tareaDoc);

      // console.log(IdAlumno);

      // Con esto estamos cogiendo el id del documento que corresponde a ese alumno ya que IdAlumno es un documento de referencia
      const idDocumento = IdAlumno.id; // Usamos id en lugar de _path.segments


      console.log(idDocumento);

      try {
        // const alumnoDocRef = doc(db, 'alumnos', idDocumento);
        // console.log(alumnoDocRef);
        // const alumnoDoc = await getDoc(alumnoDocRef);
        const alumnosRef = db.collection('alumnos');
        const alumnoDoc = await alumnosRef.where('IdAlumno','==',idDocumento).get();

        // console.log(alumnoDoc);

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
        id: tareaDoc.id,
        Nombre,
        Completado,
        Descripción,
        FechaInicio,
        FechaFin,
        Tipo,
        IdAlumno:idDocumento,
      });
    }

    return docs;
  } catch (error) {
    console.log(error);
    Alert.alert(error);
  }
};


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



export const getTareasActividad = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Tarea-Actividad'));
    const docs=[];

    for (const docu of querySnapshot.docs) {
      const tareaActividadDatos = docu.data();

      docs.push(tareaActividadDatos);
      }

      return docs;
    } catch (error) {
      console.log(error);
  }
};


// PRUEBA REALIZADA.FUNCIONA
export const setTareaComanda = async(idTarea,idMenu,pedidos) => {
  try{

    if(menu === '' || pedidos === '' || idMenu === null || idTarea === ''){
      Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
      console.log('te faltan campos');
    }
    else{

      // Creamos las referencias
      const idMenuRef = doc(db, 'Menu', String(idMenu));
      const idTareaRef = doc(db, 'Tarea', String(idTarea));


      const objeto = {
        nombre,
        aula,
        idMenu:idMenuRef,
        idTarea:idTareaRef
      }

      // Comprobamos que las referencias son instancias de la clase DocumentReference
      if (!(idMenuRef instanceof DocumentReference) || !(idTareaRef instanceof DocumentReference)) {
        throw new Error('idMenuRef e idTareaRef deben ser instancias de DocumentReference');
      }

      await addDoc(collection(db,'Tarea-Comanda'),{
        ...objeto
      })
    }
  }catch(error){
    console.log(error);
  }
}

// ESTA FUNCIÓN SIRVE PARA OBTENER TODAS LAS TAREAS DE COMANDA
// PRUEBA REALIZADA. FUNCIONA
export const getTareasComanda = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Tarea-Comanda'));
    const docs=[];

    for (const docu of querySnapshot.docs) {
      const tareaActividadDatos = docu.data();
      console.log(tareaActividadDatos);

      docs.push(tareaActividadDatos);
      }

      return docs;
    } catch (error) {
      console.log(error);
  }
}


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


// ESTA FUNCION SIRVE PARA OBTENER UN ALIMENTO A TRAVÉS DE SU NOMBRE
// PRUEBA REALIZADA. FUNCIONA
export const getAlimento = async (nombre) => {
  try {
    const alimentosQuery = query(collection(db, 'Alimentos'), where('Nombre', '==', nombre));
    const querySnapshot = await getDocs(alimentosQuery);

    const docs = [];

    querySnapshot.forEach((docu) => {
      const alimentoDatos = docu.data();
      console.log(alimentoDatos);

      docs.push(alimentoDatos);
    });

    return docs;
  } catch (error) {
    console.log(error);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};



export const setTareaInventario = async(idMaterial,lugarLlevar,recogida,idTarea) => {
  try{

    if(idMaterial === '' || lugarLlevar === '' || recogida === null || idTarea === ''){
      Alert.alert('Mensaje importante,', 'Debes rellenar el campo requerido');
      console.log('te faltan campos');
    }
    else{

      // Creamos las referencias
      const idMaterialRef = doc(db, 'Material', String(idMaterial));
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



// FUNCION QUE DEVUELVE EL MATERIAL QUE COINCIDE CON EL NOMBRE DADO
export const getMaterial = async(nombre) => {
  try {
    const materialQuery = query(collection(db, 'Material'), where('nombre', '==', nombre));
    const querySnapshot = await getDocs(materialQuery);

    const docs = [];

    querySnapshot.forEach((docu) => {
      const materialDatos = docu.data();
      console.log(materialDatos);

      docs.push(materialDatos);
    });

    return docs;
  } catch (error) {
    console.log(error);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
}


// FUNCION QUE DEVUELVE LOS DATOS DE UN MATERIAL CORRESPONDIENTE A UN ID
// PRUEBA REALIZADA. FUNCIONA
// export const getMaterialId = async(id) => {
//   try {
//     const materialQuery = query(collection(db, 'Material'), where('id', '==', id));
//     const querySnapshot = await getDocs(materialQuery);

//     const docs = [];

//     querySnapshot.forEach((docu) => {
//       const materialDatos = docu.data();
//       console.log(materialDatos);

//       docs.push(materialDatos);
//     });

//     return docs;
//   } catch (error) {
//     console.log(error);
//     throw error; // Lanza el error para que pueda ser manejado por el llamador
//   }
// }



// FUNCION QUE DEVUELVE TODOS LOS MATERIALES QUE TENEMOS EN LA BASE DE DATOS
// PRUEBA REALIZADA. FUNCIONA
export const getMateriales = async() => {
  try {
    const materialQuery = query(collection(db, 'Material'));
    const querySnapshot = await getDocs(materialQuery);

    const docs = [];

    querySnapshot.forEach((docu) => {
      const { nombre, stock } = docu.data(); // Extraemos nombre y stock
      const id = docu.id; // Extraemos el ID del documento
      docs.push({ id, nombre, stock }); // Añadimos un objeto con el ID, nombre y stock al array
    });

    return docs;
  } catch (error) {
    console.log(error);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
}


// FUNCIONA QUE DEVULEVE TODAS LAS TAREAS DEL INVENTARIO
// PRUEBA REALIZADA. FUNCIONA
export const getTareasInventario = async() => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Tarea-Inventario'));
    const docs=[];

    for (const docu of querySnapshot.docs) {
      const tareaActividadDatos = docu.data();
      console.log(tareaActividadDatos);

      docs.push(tareaActividadDatos);
      }

      return docs;
    } catch (error) {
      console.log(error);
  }
}