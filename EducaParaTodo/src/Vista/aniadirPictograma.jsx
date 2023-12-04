import React, { useEffect, useState } from 'react';
import { View, Button,Image, Text } from 'react-native';
import appFirebase from '../Modelo/firebase';
//import ImagePicker from 'react-native-image-picker';
import { getDownloadURL, getStorage, ref, uploadString, UploadTask } from 'firebase/storage';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
//import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { useNavigation } from '@react-navigation/native';

export default function AniadirPictograma() {
 /*   useEffect(() => {

    const storage = getStorage(appFirebase);
    const firestore = getFirestore(appFirebase);

    const selectImage = () => {
        const options = {
          title: 'Seleccionar imagen',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
  
        ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel) {
            console.log('La selección de la imagen fue cancelada');
          } else if (response.error) {
            console.error('Error al seleccionar la imagen:', response.error);
          } else {
            const imageURI = response.uri;
            subirImagen(imageURI);
          }
        });
      };

    const subirImagen = async (imageURI) =>  {
        try {
            const storageRef = ref(storage,'Pictogramas/' + imagenURI, 'data_url');

            const snapshot = await uploadString(storageRef, imageURI, 'data_url');

            const downloadURL = await getDownloadURL(snapshot.ref);

            const docRef = await addDoc(collection(firestore, 'Pictogramas'), {
                imageURL: downloadURL,
                Timestamp: Timestamp.fromDate(new Date()),
            });


            console.log('Imagen subida correctamente. URL:', downloadURL);
            return docRef.id;
        } catch (error) { 
            console.error('Error al subir la imagen:' , error);
            return null;
        }
    };

    selectImage();
    }, []);
*/
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           <Button title="Añadir Pictograma"><Text>Añadir pictograma</Text></Button>
      </View>
    );
  };