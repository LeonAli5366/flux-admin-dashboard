// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-wwxnaveKepP_JejzNUmNmbz4niLhYSw",
  authDomain: "flux-car-admin.firebaseapp.com",
  projectId: "flux-car-admin",
  storageBucket: "flux-car-admin.appspot.com",
  messagingSenderId: "1098413630038",
  appId: "1:1098413630038:web:1b7e35a83d67c1b8a851f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
