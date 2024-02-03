// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS2DJxlD4rL8GlBenoESIbozLvupPbbj8",
  authDomain: "maktabet-zyad-project.firebaseapp.com",
  projectId: "maktabet-zyad-project",
  storageBucket: "maktabet-zyad-project.appspot.com",
  messagingSenderId: "770042523220",
  appId: "1:770042523220:web:bcfe8f8c2813d264cbc7c1",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export default db;
