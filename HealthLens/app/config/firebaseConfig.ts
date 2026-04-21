// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
<<<<<<< HEAD:HealthLens/firebaseConfig.ts
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from "./firebaseKey";

=======
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../firebaseKey";
>>>>>>> origin/Frontend-Development:HealthLens/app/config/firebaseConfig.ts

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app, "user");
