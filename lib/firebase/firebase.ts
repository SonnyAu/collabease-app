// lib/firebase/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyChRVt3AfA9PlTW4IozFvRX1m64gqufSDA",
  authDomain: "collabease-78e40.firebaseapp.com",
  projectId: "collabease-78e40",
  storageBucket: "collabease-78e40.firebasestorage.app",
  messagingSenderId: "777337956149",
  appId: "1:777337956149:web:9bc8b453b112f820bc4e7c",
  measurementId: "G-B0CYRK9QB1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
