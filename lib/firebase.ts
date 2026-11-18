// Firebase configuration for ET 617 Exam App
// Project: et617-exam
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXFXEbj26HMSPhiWIyvEcDW00DTqksY00",
  authDomain: "et617-exam.firebaseapp.com",
  projectId: "et617-exam",
  storageBucket: "et617-exam.firebasestorage.app",
  messagingSenderId: "547357810448",
  appId: "1:547357810448:web:a22f295fe35cce323bcf95",
  measurementId: "G-G0VNXNP25B",
};

// Initialize Firebase (prevent duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
