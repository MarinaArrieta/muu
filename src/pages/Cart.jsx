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

export const Cart = () => {

    return (
        <Box maxW="400px" mx="auto" mt="10">
            <form>
                <FormControl>
                    <FormLabel htmlFor="email" color='#ed5940'>Tus compras</FormLabel>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Ingresa tu nombre/usuario"
                        _placeholder={{ color: '#8d803e' }}
                        borderColor='#f7b3cd'
                        focusBorderColor='#ffbb00'
                        // {...register("email", email)}
                    />
                    {/* <FormErrorMessage>{errors.email?.message}</FormErrorMessage> */}
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password" color='#ed5940'>Contraseña</FormLabel>
                    <InputGroup size="md">
                        <Input
                            id="password"
                            pr="4.5rem"
                            // type={show ? "text" : "password"}
                            placeholder="Ingrese su contraseña"
                            _placeholder={{ color: '#8d803e' }}
                            borderColor='#f7b3cd'
                            focusBorderColor='#ffbb00'
                            // {...register("password", password)}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" colorScheme='orange'>
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {/* <FormErrorMessage>{errors.password?.message}</FormErrorMessage> */}
                </FormControl>
                <Button mt={4} type="submit" width="100%" colorScheme='pink'>
                    Registrarme
                </Button>
            </form>
        </Box>
    );
};
