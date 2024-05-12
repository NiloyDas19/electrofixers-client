import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "../firebase/firebase.config";
import {GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const  AuthContext  = createContext(null);

const AuthProviders = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDark, setIsDark] = useState(localStorage.getItem('theme') || 'light');
    
    useEffect(() => {
        localStorage.setItem('theme', isDark);
      }, [isDark]);


    const provider = new GoogleAuthProvider();

    const createUserWithEmailPassword = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const createWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }


    const loginWithEmailPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }


    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }



    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
           console.log('What happend');
           setUser(currentUser);
           console.log(currentUser);
           setLoading(false);
        });

        return () =>  {
            unSubscribe();
        };

    },[]);



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
        setIsDark
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

AuthProviders.propTypes = {
    children : PropTypes.node
}

export default AuthProviders;