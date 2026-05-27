import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import auth from '../firebase/firebase.config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDark, setIsDark] = useState(localStorage.getItem('theme') || 'light');

    const provider = new GoogleAuthProvider();

    // Persist theme preference
    useEffect(() => {
        localStorage.setItem('theme', isDark);
    }, [isDark]);

    // Auth state listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const createUserWithEmailPassword = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const createWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const loginWithEmailPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const authInfo = {
        user,
        createUserWithEmailPassword,
        loginWithEmailPassword,
        logOut,
        createWithGoogle,
        loginWithGoogle,
        loading,
        setLoading,
        isDark,
        setIsDark,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthProvider;
