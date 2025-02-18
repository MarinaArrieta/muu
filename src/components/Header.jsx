import { 
    SimpleGrid,
    Heading,
    HStack,
    Button
} from '@chakra-ui/react'
import { Link, NavLink, Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header = () => {
    const { logout } = useAuth()
    return (
        <SimpleGrid>
            <Heading>MUU</Heading>
                <HStack>
                    {/* <ListItem>Nosotros</ListItem> */}
                    <Link as={RouterLink} to="/">
                        Home
                    </Link>
                    <NavLink as={Link} to="login">
                        Iniciar sesión
                    </NavLink>{' '}
                    <NavLink as={Link} to="register">
                        Registrarse
                    </NavLink>{' '}
                    <NavLink as={Link} to="create">
                        Crear Orden
                    </NavLink>{' '}
                    <NavLink as={Button} onClick={logout}>
                        Cerrar sesión
                    </NavLink>
                </HStack>
        </SimpleGrid>
    )
}

export default Header
