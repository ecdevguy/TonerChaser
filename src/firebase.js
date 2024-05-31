import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFgR8uFaETWH94td5Deuy5rWivTnyrqaQ",
  authDomain: "tonechaser-ae3eb.firebaseapp.com",
  projectId: "tonechaser-ae3eb",
  storageBucket: "tonechaser-ae3eb.appspot.com",
  messagingSenderId: "180871135836",
  appId: "1:180871135836:web:1cf92039d8752638c11c99",
  measurementId: "G-Y9PSR8LSN9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);



