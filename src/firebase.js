// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuWRilNXQtCZTzNnuqHc80xkKVaX0uxwA",
  authDomain: "doc-app-a7284.firebaseapp.com",
  projectId: "doc-app-a7284",
  storageBucket: "doc-app-a7284.firebasestorage.app",
  messagingSenderId: "36262915979",
  appId: "1:36262915979:web:b875eae3a73a32a070098e",
  measurementId: "G-YDT715E89M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Export the database instance
export { db };



