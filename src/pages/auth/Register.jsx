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
import { password, email } from "../../components/utils/validation";
import { useAuth } from "../../context/AuthContext";

export const Register = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const { register, formState, handleSubmit } = useForm();
    const { errors } = formState;

    const { registerUser } = useAuth();
    console.log(errors);

    const onSubmit = (data) => {
        registerUser(data);
    };
    return (
        <Box maxW="400px" mx="auto" mt="10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.email}>
                    <FormLabel htmlFor="email" color='#ed5940'>Usuario</FormLabel>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Ingresa tu nombre/usuario"
                        _placeholder={{ color: '#c7b65e' }}
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
                            placeholder="Ingrese su contraseña"
                            _placeholder={{ color: '#8d803e' }}
                            borderColor='#f7b3cd'
                            focusBorderColor='#ffbb00'
                            {...register("password", password)}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" colorScheme='orange' onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>
                <Button mt={4} type="submit" width="100%" colorScheme='pink'>
                    Registrarme
                </Button>
            </form>
        </Box>
    );
};