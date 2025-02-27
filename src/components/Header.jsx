import {
    Heading,
    HStack,
    Button
} from '@chakra-ui/react'
import { Link, NavLink, Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'

const Header = () => {

    const { logout } = useAuth()
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <HStack>
            <Heading>MUU</Heading>
            <HStack>
                {/* <ListItem>Nosotros</ListItem> */}
                <Link as={RouterLink} to="/" fontSize='xs'>
                    Home
                </Link>
                <NavLink as={Link} to="register">
                    Registrarse
                </NavLink>
                <NavLink as={Link} to="create">
                    Crear Orden
                </NavLink>
                {isAuthenticated ? (
                    <NavLink as="button" onClick={logout}>
                        Cerrar sesión
                    </NavLink>
                ) : (
                    <NavLink as="button" to="login">
                        Iniciar sesión
                    </NavLink>
                )}
            </HStack>
        </HStack>
    )
}

export default Header
