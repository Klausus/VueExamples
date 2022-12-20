// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwXYxwh4TzwnfJKQqcpv9vIxQiDfY_8Lw",
  authDomain: "klausus-vue3-firebase-practise.firebaseapp.com",
  projectId: "klausus-vue3-firebase-practise",
  storageBucket: "klausus-vue3-firebase-practise.appspot.com",
  messagingSenderId: "667559717919",
  appId: "1:667559717919:web:5b9a5026d4c9f9fd20792a"
};


// Initialize Firebase
const app   = initializeApp(firebaseConfig);
const auth  = getAuth(app);
const db    = getFirestore();

export { 
    auth,
    db
};

