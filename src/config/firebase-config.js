import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBmhJJs8iWxzeg6NPrEpeP0MbKjbQFrqI",
  authDomain: "kickoff-15ed7.firebaseapp.com",
  projectId: "kickoff-15ed7",
  storageBucket: "kickoff-15ed7.appspot.com",
  messagingSenderId: "532646995013",
  appId: "1:532646995013:web:64057b9a97596b1a702f2c",
  measurementId: "G-48J32EEXE7",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, auth, app };