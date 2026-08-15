import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDGA8qn7PSPjyfgMJr0uKrab7UF0DQ6JLo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "estate-lite.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "estate-lite",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "estate-lite.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "252019209722",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:252019209722:web:c7d85e105c3b8ea75c6043",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-QG8664212V",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
