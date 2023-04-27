import React, { useContext, useEffect, useState } from 'react'
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail, updatePassword} from 'firebase/auth'
import { auth } from '../authentication/Firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signUp(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function logIn(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut(){
        return signOut(auth)
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth, email)
    }

    function updateUserEmail(user, email){
        return updateEmail(user, email)
    }

    function updateUserPassword(user, password){
        return updatePassword(user, password)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user) 
            setLoading(false)
        })

        return unsubscribe    // this method above returns a method which when we call, it unsubscribe the evene onAuthStateChanged event
    }, [])

    const value = {
        currentUser,
        signUp,
        logIn,
        logOut,
        resetPassword,
        updateUserEmail,
        updateUserPassword
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
