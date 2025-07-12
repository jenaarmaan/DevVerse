import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMdQ6sGnkZPkqHecpL6QwJRBlwkVdWr-8",
  authDomain: "devverse-v6l6a.firebaseapp.com",
  projectId: "devverse-v6l6a",
  storageBucket: "devverse-v6l6a.firebasestorage.app",
  messagingSenderId: "764237386812",
  appId: "1:764237386812:web:ae9d835051bb79c90b9f39"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
