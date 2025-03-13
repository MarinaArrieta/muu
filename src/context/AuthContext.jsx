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
import { GoogleAuthProvider } from "firebase/auth";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const toast = useToast()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUser(uid)
            } else {
                setUser(null)
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

            const user = userCredential.user
            toast({
                title: 'Usuario registrado correctamente',
                position: 'top',
                status: 'success',
                isClosable: true,
                duration: 3000,
            })

            return user
        } catch (error) {
            toast({
                title: 'Hubo un error al registrar el usuario',
                description: 'Vuelve a intentarlo',
                position: 'top',
                status: 'error',
                isClosable: true,
                duration: 3000,
            })
        };
    }

    const login = async ({ email, password }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUser(user.uid);
            toast({
                title: 'Iniciaste sesión correctamente',
                description: 'Bienvenido a MUU',
                position: 'top',
                status: 'success',
                isClosable: true,
                duration: 3000,
            });
            return user
        } catch (error) {
            toast({
                title: 'Hubo un error al iniciar la sesión',
                description: 'Vuelve a intentarlo',
                position: 'top',
                status: 'error',
                isClosable: true,
                duration: 3000,
            });
            return null
        }
    }

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            toast({
                title: 'Iniciaste sesión correctamente',
                description: 'Bienvenido a MUU',
                position: 'top',
                status: 'success',
                isClosable: true,
                duration: 3000,
            })

            return user;
        } catch (error) {
            toast({
                title: 'Hubo un error al iniciar sesión',
                description: 'Vuelve a intentarlo',
                position: 'top',
                status: 'error',
                isClosable: true,
                duration: 3000,
            })
        }
    };

    const logout = () => {
        signOut(auth)
            .then(() => {
                toast({
                    title: 'Se cerró la sesión correctamente',
                    description: 'Vuelve pronto',
                    position: 'top',
                    status: 'success',
                    isClosable: true,
                    duration: 3000,
                })
            })
            .catch((error) => {
                toast({
                    title: 'Hubo un error al cerrar la sesión',
                    description: 'Vuelve a intentarlo',
                    position: 'top',
                    status: 'error',
                    isClosable: true,
                    duration: 3000,
                })
            })
    }

    return (
        <AuthContext.Provider value={{ user, registerUser, login, signInWithGoogle, logout }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)