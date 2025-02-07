import { 
    ListItem, 
    UnorderedList, 
    VStack 
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <VStack>
            <nav>
                <UnorderedList styleType="''">
                    <ListItem>Nosotros</ListItem>
                    <ListItem>
                        <Link to="/login">Iniciar Sesión</Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/register">Registrarse</Link>
                    </ListItem>
                </UnorderedList>
            </nav>
        </VStack>
    )
}

export default Header
