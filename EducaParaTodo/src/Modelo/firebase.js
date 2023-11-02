// Importa solo lo necesario de firebase/app
import { initializeApp } from "firebase/app";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCm6Yg8zGnLR7XAc0tPYTZWK3Y9K3-Jt5I",
  authDomain: "educaparatodos-39692.firebaseapp.com",
  projectId: "educaparatodos-39692",
  storageBucket: "educaparatodos-39692.appspot.com",
  messagingSenderId: "253598049542",
  appId: "1:253598049542:web:d6c2d2c725f0b2713b2a87"
};

// Inicializa Firebase y exporta la instancia
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;