import React, { useEffect, useState, createContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../firebase.config';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext(null);

function Provider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const login = (email, pass) => signInWithEmailAndPassword(auth, email, pass);
  const logout = () => {
    notifySuccess('Logged out successfully');
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const notifySuccess = (message) => toast.success(message);
  const notifyFailed = (message) => toast.error(message);

  const providerInfo = {
    login,
    logout,
    user,
    setUser,
    auth,
    loading,
    setLoading,
    notifySuccess,
    notifyFailed,
  };

  return (
    <AuthContext.Provider value={providerInfo}>
      {children}
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </AuthContext.Provider>
  );
}

export default Provider;
