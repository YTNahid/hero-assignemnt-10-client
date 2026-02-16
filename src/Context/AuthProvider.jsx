import { sendPasswordResetEmail, signInWithPopup, updateProfile } from 'firebase/auth';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import auth from '../Firebase/firebase.init';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const userSignUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userSignInWithProvider = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const userUpdateProfile = (data) => {
    return updateProfile(auth.currentUser, data);
  };

  const userSignOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const userResetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    error,
    setError,
    success,
    setSuccess,
    userSignUp,
    userSignIn,
    userSignOut,
    userSignInWithProvider,
    userUpdateProfile,
    userResetPassword,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
