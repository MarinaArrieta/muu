import {
    Heading,
    HStack,
    Button,
    Image,
    Stack,
    VStack,
    Center,
    Text
} from '@chakra-ui/react'
import { Link, NavLink, Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'
import logo from '../../public/logo3.png'
import helado1 from '../assets/helado1.png'
import helado from '../assets/helado.png'
import { RiShoppingCartFill } from "react-icons/ri";

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
                {/* w={{ base: "40%", lg: "28%" }}  */}
                <Image
                    position="absolute"
                    left="0"
                    // w='40%'
                    w={{ base: "40%", md: '40%', lg: "28%" }}
                    src={helado}
                    filter='opacity(0.5)'
                    alt='Logo vaca'
                />
                <Image
                    position="absolute"
                    right="0"
                    w={{ base: "40%", md: '40%', lg: "28%" }}
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
            <HStack
                color='#7e6909'
                as='b'
                // bg='#e0d4be'
                bgGradient='linear(to-r, #fbeaec, #f5ebc4, #fbeaec)'
                p='5px'
                position="relative"
            >
                {/* <ListItem>Nosotros</ListItem> */}
                <Link
                    as={RouterLink}
                    to="/"
                >
                    <Text
                        fontSize={{ base: '18px', md: '25px', lg: '29px' }}
                    >
                        Home
                    </Text>
                </Link>
                <NavLink as={Link} to="register" fontSize='lg'>
                    <Text
                        fontSize={{ base: '18px', md: '25px', lg: '29px' }}
                    >
                        Registrarse
                    </Text>
                </NavLink>
                <NavLink as={Link} to="create" fontSize='lg'>
                    <Text
                        fontSize={{ base: '18px', md: '25px', lg: '29px' }}
                    >
                        Orden
                    </Text>
                </NavLink>
                {isAuthenticated ? (
                    <NavLink as="button" onClick={logout} fontSize='lg'>
                        <Text
                            fontSize={{ base: '18px', md: '25px', lg: '29px' }}
                        >
                            Logout
                        </Text>
                    </NavLink>
                ) : (
                    <NavLink as="button" to="login" fontSize='lg'>
                        <Text
                            fontSize={{ base: '18px', md: '25px', lg: '29px' }}
                        >
                            Login
                        </Text>
                    </NavLink>
                )}
                <NavLink>
                    <Text fontSize={{ base: '18px', md: '25px', lg: '29px' }}>
                        <RiShoppingCartFill />
                    </Text>
                </NavLink>
            </HStack>
        </VStack>
    )
}

export default Header
