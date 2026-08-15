import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCGlPCCnSLjJtCpUsfBpg7FjcNOcSF_XIM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ofbid-bd.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ofbid-bd",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ofbid-bd.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "369876341619",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:369876341619:web:1d692fa8d922c0da0c6b06",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
