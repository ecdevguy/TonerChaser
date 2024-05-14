// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFgR8uFaETWH94td5Deuy5rWivTnyrqaQ",
  authDomain: "tonechaser-ae3eb.firebaseapp.com",
  projectId: "tonechaser-ae3eb",
  storageBucket: "tonechaser-ae3eb.appspot.com",
  messagingSenderId: "180871135836",
  appId: "1:180871135836:web:1cf92039d8752638c11c99",
  measurementId: "G-Y9PSR8LSN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app); // Use getFirestore to initialize Firestore


export default db;
