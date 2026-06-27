import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    onAuthStateChanged,
    signInWithPopup,
    signOut
} from "firebase/auth";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "firebase/firestore";

import { auth, googleProvider, db } from "../config/Firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async(firebaseUser) => {

            if(firebaseUser){

                const userRef = doc(db, "users", firebaseUser.uid);

                const snapshot = await getDoc(userRef);

                if(!snapshot.exists()){

                    await setDoc(userRef,{

                        uid:firebaseUser.uid,

                        name:firebaseUser.displayName,

                        email:firebaseUser.email,

                        photoURL:firebaseUser.photoURL,

                        createdAt:serverTimestamp(),

                        role:"user"

                    });

                }

                setUser(firebaseUser);

            }

            else{

                setUser(null);

            }

            setLoading(false);

        });

        return unsubscribe;

    },[]);

    const login = async()=>{

        const result = await signInWithPopup(auth,googleProvider);
        return result.user;

    }

    const logout = async()=>{

        await signOut(auth);

    }

    return(

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    )

}

export const useAuth = ()=>useContext(AuthContext);