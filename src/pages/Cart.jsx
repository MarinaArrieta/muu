import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Heading,
    Image,
    Select,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";

export const Cart = () => {

    return (
        <VStack p='35px'>
            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                    alt='Caffe Latte'
                />
                <Stack>
                    <CardBody>
                        <Heading size='md'>The perfect latte</Heading>
                        <Text py='2'>
                            Elejí la cantidad de MUU que quieras comprar
                        </Text>
                        <Select >
                            <option value='option1'>1</option>
                        </Select>
                    </CardBody>
                    <CardFooter>
                        <Button variant='solid' colorScheme='blue'>
                            Realizar compra
                        </Button>
                    </CardFooter>
                </Stack>
            </Card>
        </VStack>
    );
};
