import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: "library-sbssu-6db8e.firebaseapp.com",
  projectId: "library-sbssu-6db8e",
  storageBucket: "library-sbssu-6db8e.firebasestorage.app",
  messagingSenderId: "585358462466",
  appId: "1:585358462466:web:00edd9014d0ebd127de11b",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
