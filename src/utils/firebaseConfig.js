// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpOOSEFyStQRv1PhJxVwbDSGr-6uV2_Lk",
  authDomain: "netflix-gpt-a68a7.firebaseapp.com",
  projectId: "netflix-gpt-a68a7",
  storageBucket: "netflix-gpt-a68a7.firebasestorage.app",
  messagingSenderId: "918705823237",
  appId: "1:918705823237:web:45698181e997c1c964866c",
  measurementId: "G-SY67BWY18E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();