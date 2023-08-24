// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "pinterest-clone-59257.firebaseapp.com",
  projectId: "pinterest-clone-59257",
  storageBucket: "pinterest-clone-59257.appspot.com",
  messagingSenderId: "699569313721",
  appId: "1:699569313721:web:b3dc6006d0a43bc5450868",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
