import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/Firebase.config";

const auth = getAuth(app);

export const AuthContext = createContext();

const UserContex = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const adminLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const updateUser = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const updateAdminPassword = (password) => {
    return updatePassword(auth.currentUser, password);
  };

  const updateAdminEmail = (email) => {
    return updateEmail(auth.currentUser, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    adminLogin,
    logOut,
    updateUser,
    updateAdminPassword,
    updateAdminEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default UserContex;
