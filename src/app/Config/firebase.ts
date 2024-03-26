import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

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
const analytics = getAnalytics(app);
export const auth = getAuth()
export const db = getFirestore(app);

interface Props {
    email: string,
    password: string,
    phoneNumber: number | null,
    name: string
}

interface Login {
    email: string
    password: string
}


export async function Register({ email, password, phoneNumber, name }: Props) {
    const { user: { uid } } = await createUserWithEmailAndPassword(auth, email, password)
    try {
        const userRef = await setDoc(doc(db, "users", uid), {
            name,
            phoneNumber,
            email
        });
        console.log(uid)
    } catch (e: any) {
        console.log(e.message)
    }
}

export async function SignIn({ email, password }: Login) {
    await signInWithEmailAndPassword(auth, email, password)
}


// const user = auth.currentUser

// console.log(user)


export const getUser = async (uid: any) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const user = docSnap.data()
        return user
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }

}
