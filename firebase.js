import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {initializeFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDGivbDckZ_JQCiCIVnguYRrVJ67QtKJo4",
  authDomain: "wp-clone-71cef.firebaseapp.com",
  projectId: "wp-clone-71cef",
  storageBucket: "wp-clone-71cef.appspot.com",
  messagingSenderId: "810850571115",
  appId: "1:810850571115:web:dfc0e4ffefa060886f722e"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = initializeFirestore(app,
     {experimentalForceLongPolling :true,
    })
export function signIn(email,password){
    return signInWithEmailAndPassword(auth, email,password)
}
export function signUp(email,password){
    return createUserWithEmailAndPassword(auth,email,password)
}