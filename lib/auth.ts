import { auth, googleProvider } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";

// Sign Up with Email/Password
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign In with Email/Password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign In with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

// Log Out
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};
