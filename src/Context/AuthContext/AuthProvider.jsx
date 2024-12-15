import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from '../../firebase/firebase.init';
import { signInWithCustomToken } from 'firebase/auth/web-extension';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
          
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const SignInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    const signOutUser = () => {
        setLoading(true);
        return signOut(auth)
    }

    useEffect( () =>{
      const unsubscribe =  onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('State Captured', currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])  

      const authInfo = {
            user, 
            loading,
            createUser,
            SignInUser,
            signOutUser
      }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;