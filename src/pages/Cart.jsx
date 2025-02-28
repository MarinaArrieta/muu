import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    Image,
    Select,
    Stack,
    StackDivider,
    Text,
    VStack,
} from "@chakra-ui/react";
import { RiDeleteBinFill } from "react-icons/ri";

export const Cart = () => {

    return (
        <VStack p='35px'>
            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                bg='#f2e8d700'
                border='1px solid #5f5525'
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                    alt='Caffe Latte'
                />
                <Stack>
                    <CardBody>
                        <Heading size='md' color='#ff77ad'>The perfect latte</Heading>
                        <Text py='2' color='#5f5525'>
                            Elejí la cantidad de MUU que quieras comprar
                        </Text>
                        <Select
                            borderColor='#f7b3cd'
                            focusBorderColor='#ffbb00'
                        >
                            <option value='option1'>1</option>
                        </Select>
                    </CardBody>
                    <CardFooter gap='5px' justify='end'>
                        <Button variant='solid' colorScheme='orange'>
                            <RiDeleteBinFill />
                        </Button>
                    </CardFooter>
                </Stack>
            </Card>
            <VStack w='100%'>
                <Card w='100%'>
                    <CardHeader bg='#5f5525'>
                        <Heading size='md' color='#f2e8d7'>Total en mi carrito</Heading>
                    </CardHeader>
                    <CardBody bg='#f2e8d7'>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Box display='flex' alignItems='center' justify='center'>
                                <Text pt='2' fontSize='xl' as='b' color='#5f5525'>
                                    🍨 Precio: $ 300
                                </Text>
                            </Box>
                            <ButtonGroup
                                gap='4'
                                flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
                                alignItems='baseline'
                            >
                                <Button variant='solid' colorScheme='pink' w='90%'>
                                    Ver más productos
                                </Button>
                                <Button variant='solid' colorScheme='pink' w='90%' marginLeft='0'>
                                    Realizar compra
                                </Button>
                            </ButtonGroup>
                        </Stack>
                    </CardBody>
                </Card>
            </VStack>
        </VStack>
    );
};
