import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth'
import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'
import { auth } from '../firebase/config'
import { useToast } from '@chakra-ui/react'
// import { GoogleAuthProvider } from 'firebase/auth/web-extension'
import { GoogleAuthProvider } from "firebase/auth";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const toast = useToast()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                setUser(uid)
                console.log('estas logueado')
                // ...
            } else {
                setUser(null)
                console.log('estabas logueado')
            }
        });
    }, [])

    const registerUser = async ({ email, password }) => {

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            console.log(userCredential)

            const user = userCredential.user
            console.log(user)

            return user
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        };
    }

    console.log("Soy user del state", user)
    const login = ({ email, password }) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                setUser(user.uid)
                console.log(user.uid)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            console.log("Usuario autenticado:", user);
            return user;
        } catch (error) {
            console.error("Error en Google Sign-In:", error.message);
        }
    };

    const logout = () => {
        signOut(auth)
            .then(() => {
                // deleteStorage('order')
                toast({
                    title: 'Se cerró la sesión',
                    description: 'Vuelve pronto',
                    status: 'info',
                    isClosable: true,
                    duration: 3000,
                })
                if (auth.currentUser) {
                    console.log('Sesión abierta')
                } else {
                    console.log('Sesión cerrada')
                    setUser(null)
                }

            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <AuthContext.Provider value={{ user, registerUser, login, signInWithGoogle, logout }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)