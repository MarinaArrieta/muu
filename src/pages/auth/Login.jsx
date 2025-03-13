import {
    Box,
    Button,
    Card,
    CardBody,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Image,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PiEyeClosedBold, PiEyes } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import conection from "../../assets/conection.png";
import registerUser from '../../assets/registrate.png';
import { password } from "../../components/utils/validation";
import { useAuth } from "../../context/AuthContext";

export const Login = () => {

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const { register, formState, handleSubmit } = useForm();
    const { errors } = formState;
    const { login, signInWithGoogle, email } = useAuth()
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        const user = await signInWithGoogle();
    };

    const onSubmit = async (data) => {
        try {
            const user = await login(data);
            if (user) {
                navigate('/');
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    if (!navigator.onLine) {
        return <Card maxW='sm' bg='#f2e8d7' boxShadow='none'>
            <CardBody>
                <Image
                    src={conection}
                    alt='Desierto error'
                    borderRadius='lg'
                />
            </CardBody>
        </Card>
    }

    return (
        <Box maxW="300px" mx="auto" mt="10" marginTop='10px'>
            <Card maxW='sm' bg='#f2e8d7' boxShadow='none' marginBottom='10px'>
                <CardBody p='0'>
                    <Image src={registerUser} alt='Vaca en un jardín' borderRadius='lg' />
                </CardBody>
            </Card>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.email}>
                    <FormLabel htmlFor="email" color='#ed5940'>Usuario</FormLabel>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Ingresa tu usuario"
                        _placeholder={{ color: '#8d803e' }}
                        borderColor='#f7b3cd'
                        focusBorderColor='#ffbb00'
                        {...register("email", email)}
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password}>
                    <FormLabel htmlFor="password" color='#ed5940'>Contraseña</FormLabel>
                    <InputGroup size="md">
                        <Input
                            id="password"
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Ingresa tu contraseña"
                            _placeholder={{ color: '#8d803e' }}
                            borderColor='#f7b3cd'
                            focusBorderColor='#ffbb00'
                            {...register("password", password)}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" colorScheme='orange' onClick={handleClick}>
                                {show ? <PiEyes /> : <PiEyeClosedBold />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>
                <Button mt={4} type="submit" width="100%" colorScheme='pink'>Iniciar sesión</Button>
                <Button onClick={handleGoogleSignIn} mt={4} colorScheme='pink' type="button" width="100%">
                    Iniciar con Google
                </Button>
            </form>
        </Box>
    );
};