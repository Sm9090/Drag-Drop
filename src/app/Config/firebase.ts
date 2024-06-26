import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database"
import toast from 'react-hot-toast';


const firebaseConfig = {
    apiKey: "AIzaSyD5oHZ2MU6pqQiWhL5se9QWa4FnTXqL2GI",
    authDomain: "fb-post-clone.firebaseapp.com",
    projectId: "fb-post-clone",
    storageBucket: "fb-post-clone.appspot.com",
    messagingSenderId: "284913289437",
    appId: "1:284913289437:web:274d00e03be2fc3149b334",
    measurementId: "G-V9C3ZJPFCB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth()

export const db = getDatabase(app)

interface Props {
    email: string,
    password: string,
    confirmPassword: string,
    name: string
}

interface Login {
    email: string
    password: string
}


export async function Register(values: Props) {
    const { name, confirmPassword, email, password } = values
    const { user: { uid } } = await createUserWithEmailAndPassword(auth, email, password)
    try {
        const userRef = ref(db, `users/${uid}`);
        await set(userRef, {
            name,
            email
        });
        console.log('added in database ', uid)
    } catch (e: unknown) {
        if (e instanceof Error) {
            toast.error(e.message);
        } else {
            toast.error("An unknown error occurred.");
        }
    }
}

export async function SignIn(values: Login) {
    const { email, password } = values
    await signInWithEmailAndPassword(auth, email, password)
}


export const getUser = async (uid: string) => {
    const userRef = ref(db, `users/${uid}`);
    const userSnap = await get(userRef);
    if (userSnap.exists()) {
        const user = userSnap.val();
        return user;
    } else {
        console.log("No such document!");
    }

}

export const resetPassword = async (email:string) => {
    try{
    await sendPasswordResetEmail(auth, email)  
        toast.success("Check Your Email")
       }catch(e:unknown){
        if(e instanceof Error){
        toast.error(e.message)
        }else {
            // Handle other types of errors
            toast.error("An unknown error occurred.");
        }
       }
}


export async function logout() {
    return await signOut(auth)
}