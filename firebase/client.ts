import { initializeApp ,getApp , getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCJJEtuoSfZrTHeCzE3Tw_i6oc0Jj4dQns",
    authDomain: "prepwise-58f92.firebaseapp.com",
    projectId: "prepwise-58f92",
    storageBucket: "prepwise-58f92.firebasestorage.app",
    messagingSenderId: "1062045390076",
    appId: "1:1062045390076:web:c2068e072e8f5412857379",
    measurementId: "G-KB2XLGJP4J"
};

// Initialize Firebase
const app =!getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
