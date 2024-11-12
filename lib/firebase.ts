"use client";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChRVt3AfA9PlTW4IozFvRX1m64gqufSDA",
  authDomain: "collabease-78e40.firebaseapp.com",
  projectId: "collabease-78e40",
  storageBucket: "collabease-78e40.appspot.com",
  messagingSenderId: "777337956149",
  appId: "1:777337956149:web:9bc8b453b112f820bc4e7c",
  measurementId: "G-B0CYRK9QB1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
