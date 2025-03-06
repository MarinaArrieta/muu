import { Divider, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react'
import logo from '../../public/logo.png'
import { Link, NavLink, Link as RouterLink } from 'react-router-dom'
import { RiShoppingCartFill } from "react-icons/ri";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineEmail } from 'react-icons/md';

const Footer = () => {

    return (
        <HStack marginTop='50px'>
            <Image
                boxSize='170px'
                objectFit='cover'
                w='76px'
                h='88px'
                src={logo}
                alt='Logo vaca'
            />
            <Stack direction='row' h='150px' p={4}>
                <Divider orientation='vertical' border='1px solid #f7b3cd' />
            </Stack>
            <VStack
                color='#7e6909'
                as='b'
                p='5px'
            >
                <Link
                    as={RouterLink}
                    to="/"
                >
                    <Text
                        fontSize={{ base: '15px', md: '18px' }}
                    >
                        Home
                    </Text>
                </Link>
                <NavLink as={Link} to="register" fontSize='lg'>
                    <Text
                        fontSize={{ base: '15px', md: '18px' }}
                    >
                        Registrarse
                    </Text>
                </NavLink>
                <NavLink as={Link} to="cart">
                    <Text fontSize={{ base: '15px', md: '18px' }}>
                        <RiShoppingCartFill />
                    </Text>
                </NavLink>
            </VStack>
            <Stack direction='row' h='150px' p={4}>
                <Divider orientation='vertical' border='1px solid #f7b3cd' />
            </Stack>
            <VStack gap='20px' w='76px'>
                <Text fontSize={{ base: '20px', md: '25px' }}>
                    <a href='https://www.linkedin.com/in/marina-arrieta/'>
                        <FaLinkedinIn color='#ed5940' />
                    </a>
                </Text>
                <Text fontSize={{ base: '20px', md: '25px' }}>
                    <a href='https://github.com/MarinaArrieta'>
                        <FaGithub color='#ed5940' />
                    </a>
                </Text>
                <Text fontSize={{ base: '20px', md: '25px' }}>
                    <a href="mailto:arrietamarina12@gmail.com">
                        <MdOutlineEmail color='#ed5940' />
                    </a>
                </Text>
            </VStack>

        </HStack>
    )
}

export default Footer
