// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "pinterest-app-88c10.firebaseapp.com",
  projectId: "pinterest-app-88c10",
  storageBucket: "pinterest-app-88c10.appspot.com",
  messagingSenderId: "454131582601",
  appId: "1:454131582601:web:872c4eb9954b99a4a16858",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
