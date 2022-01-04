// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAFREPxMWKXcOVWNLcAMS3AwCBdPTVZbTc",
    authDomain: "app-chat-basic.firebaseapp.com",
    projectId: "app-chat-basic",
    storageBucket: "app-chat-basic.appspot.com",
    messagingSenderId: "838717590792",
    appId: "1:838717590792:web:c4e935a58f72778ccb30bd",
    measurementId: "G-L2X89J1HW7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore();
export { auth, db };