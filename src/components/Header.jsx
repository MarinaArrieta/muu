import {
    Heading,
    HStack,
    Button,
    Image,
    Stack,
    VStack,
    Center
} from '@chakra-ui/react'
import { Link, NavLink, Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'
import logo from '../../public/logo3.png'
import helado1 from '../assets/helado1.png'
import helado from '../assets/helado.png'

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
        <VStack>
            <Stack direction='column'>
                <Image
                    position="absolute"
                    left="0"
                    w='40%'
                    src={helado}
                    filter='opacity(0.5)'
                    alt='Logo vaca'
                />
                <Image
                    position="absolute"
                    right="0"
                    w='40%'
                    src={helado1}
                    filter='opacity(0.5)'
                    alt='Logo vaca'
                />
                <Image
                    position="relative"
                    boxSize='170px'
                    objectFit='cover'
                    h='205px'
                    filter='drop-shadow(0px 0px 10px #ffff00)'
                    src={logo}
                    alt='Logo vaca'
                />
            </Stack>
            <HStack color='#7e6909' as='b' bg='#e0d4be' p='5px'>
                {/* <ListItem>Nosotros</ListItem> */}
                <Link as={RouterLink} to="/" fontSize='xs'>
                    Home
                </Link>
                <NavLink as={Link} to="register">
                    Registrarse
                </NavLink>
                <NavLink as={Link} to="create">
                    Orden
                </NavLink>
                {isAuthenticated ? (
                    <NavLink as="button" onClick={logout}>
                        Logout
                    </NavLink>
                ) : (
                    <NavLink as="button" to="login">
                        Login
                    </NavLink>
                )}
            </HStack>
        </VStack>
    )
}

export default Header
