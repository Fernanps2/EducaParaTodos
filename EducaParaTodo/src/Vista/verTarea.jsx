// import React, { useState} from 'react';
// import Constants from 'expo-constants';
// import { View, Text, StyleSheet, FlatList } from 'react-native';
// // import { CheckBox } from 'react-native-elements';


// export function VerTarea ({nombreTarea, descripcion, pasos}){
//     const [isChecked, setIsChecked] = useState(false);

//     const toggleCheck = () => {
//         setIsChecked(!isChecked);
//     };

//     return (
//         <FlatList
//             data={[{ key: 'content' }]}
//             renderItem={() => (
//                 <View style={styles.container}>
//                     <Text style={styles.tarea}>{nombreTarea}</Text>
//                     <Text style={styles.descripcion}>{descripcion}</Text>
//                     <Text style={styles.pasos}>Pasos a seguir:</Text>

//                     <FlatList style={{padding: 20}}   
//                         data={pasos}
//                         renderItem={({item}) => 
//                         <View style={{padding: 0}}>
//                             <Text style={styles.title}>{item.title}</Text>
//                             <Text style={styles.data}>{item.data}</Text>
//                         </View>                
//                         }
//                     />

//                     <CheckBox textStyle={styles.check} 
//                         title="Marca la casilla para completar la tarea"
//                         checked={isChecked}
//                         onPress={toggleCheck}
//                     />
//                 </View>                
//             )}
//         />              
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         marginTop: Constants.statusBarHeight
//     },
//     tarea: {
//         textAlign: 'center',
//         fontWeight: 'bold', 
//         fontSize: 30
//     },
//     descripcion: {
//         fontSize: 17, 
//         padding: 20, 
//         textAlign: 'center'
//     },
//     pasos: {
//         left: 30, 
//         fontSize: 25, 
//         fontWeight: 'bold', 
//         paddingTop: 20
//     },
//     title: {
//         fontSize: 20, 
//         textDecorationLine: 'underline'
//     },
//     data: {
//         fontSize: 17, padding: 20
//     },
//     check: {
//         fontSize: 20, 
//         textAlign: 'center'
//     }
// })