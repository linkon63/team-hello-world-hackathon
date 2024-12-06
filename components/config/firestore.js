// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBejeKnBzwH7_KbMIY2DrHvAtKgfkmsUCY",
  authDomain: "devkon63.firebaseapp.com",
  projectId: "devkon63",
  storageBucket: "devkon63.firebasestorage.app",
  messagingSenderId: "337133988120",
  appId: "1:337133988120:web:14f8d7c6278b29099d166d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
