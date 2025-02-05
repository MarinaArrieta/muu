import { createUserWithEmailAndPassword } from 'firebase/auth'
import { createContext, useContext, useState } from 'react'
import { auth } from '../firebase/config'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const registerUser = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            const user = userCredential.user
            return user
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        };
    }

return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
)
}

export const useAuth = () => useContext(AuthContext)