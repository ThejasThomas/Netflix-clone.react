// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,
         getAuth,
         signInWithEmailAndPassword, 
         signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeO0hRNYassreT-mlP0OR2HtdYhDb-RlM",
  authDomain: "netflix-clone-7b515.firebaseapp.com",
  projectId: "netflix-clone-7b515",
  storageBucket: "netflix-clone-7b515.firebasestorage.app",
  messagingSenderId: "1081949401580",
  appId: "1:1081949401580:web:fbb146b56ba7421c2e10c9",
  measurementId: "G-EGK9F6GR40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore(app)

const signup =async (name,email,password)=>{
    try {
        const res=await createUserWithEmailAndPassword(auth,email,password)
        const user=res.user
        await addDoc(collection(db,'user',{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        }))
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
        
    }
}
const login=async (email,password)=>{
try {
   await signInWithEmailAndPassword(auth,email,password)
} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '))
    
}
}
const logout=()=>{
    signOut(auth)
}

export {auth,db,login,signup,logout}