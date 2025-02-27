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
import logo  from '../../public/logo.png'

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
                    boxSize='150px'
                    objectFit='cover'
                    src={logo}
                    alt='Logo vaca'
                />
                <Center>
                    <Heading>MUU</Heading>
                </Center>
            </Stack>
            <HStack>
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
