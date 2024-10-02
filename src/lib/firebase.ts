// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTg-YTKhpOQwviC9xu2ugTEMIJ8FyKpRE",
  authDomain: "pomodoro-together-30249.firebaseapp.com",
  projectId: "pomodoro-together-30249",
  storageBucket: "pomodoro-together-30249.appspot.com",
  messagingSenderId: "726804462804",
  appId: "1:726804462804:web:9fa430d2eeba4e9b254f41"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
