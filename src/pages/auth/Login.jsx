import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link as RouterLink} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { email, password } from "../../components/utils/validation";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const { register, formState, handleSubmit } = useForm();
    const { errors } = formState;
    const { login, signInWithGoogle } = useAuth()
    const navigate = useNavigate();
    console.log(errors);
    console.log('soy login', login)

    const handleGoogleSignIn = async () => {
        const user = await signInWithGoogle();
        if (user) {
            console.log("Usuario autenticado con Google:", user);
        }
    }

    const onSubmit = (data) => {
        console.log('data del user', data)
        login(data)
        navigate('/')
    }
    console.log('estoy en login');

    return (
        <Box maxW="400px" mx="auto" mt="10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.email}>
                    <FormLabel htmlFor="email">Usuario</FormLabel>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Ingresa tu nombre/usuario"
                        {...register("email", email)}
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password}>
                    <FormLabel htmlFor="password">Contraseña</FormLabel>
                    <InputGroup size="md">
                        <Input
                            id="password"
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Ingrese su contraseña"
                            {...register("password", password)}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit" width="100%">Iniciar sesión</Button>
                <Button onClick={handleGoogleSignIn} mt={4} colorScheme="teal" type="button" width="100%">
                    Iniciar sesión con google
                </Button>
            </form>
        </Box>
    );
};