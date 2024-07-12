// src/config/auth-signin.js
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase-config"; // Ensure the correct path to your Firebase config

const auth = getAuth(app);

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return userCredential.user;
    // Handle the signed-in user
  } catch (error) {
    throw error
  }
};

export default signIn;
