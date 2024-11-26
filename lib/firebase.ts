"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChRVt3AfA9PlTW4IozFvRX1m64gqufSDA",
  authDomain: "collabease-78e40.firebaseapp.com",
  projectId: "collabease-78e40",
  storageBucket: "collabease-78e40.appspot.com",
  messagingSenderId: "777337956149",
  appId: "1:777337956149:web:9bc8b453b112f820bc4e7c",
  measurementId: "G-B0CYRK9QB1",
};

// Initialize Firebase (check if already initialized to prevent re-initialization errors)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firebase services
export const auth = getAuth(app); // Firebase Authentication
export const googleProvider = new GoogleAuthProvider(); // Google Auth Provider
export const db = getFirestore(app); // Firestore Database
export const storage = getStorage(app); // Firebase Storage

export default app;
