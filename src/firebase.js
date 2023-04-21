import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore"
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSEGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
};


//initializing firebase with configs
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


//initializing auth provider
const googleProvider = new GoogleAuthProvider();

//To sign in with google
const loginWithGooglePopup = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        return user;
    } catch (error) {
        alert(error.message);
    }
}

//to signin user with email and password
const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        if (err) {

            return false
        }
    }
    return true
};



//to create user account with email and password
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        if (res.user) {
            const user = res.user;
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name,
                authProvider: "email",
                email,
            }).catch(e => console.log(e));
        }

        return true
    } catch (err) {
        alert(err)
        return false
    }
};


//to remove the user session to logout the user
const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    loginWithGooglePopup,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout,

};