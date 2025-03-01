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
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    StackDivider,
    Text,
    VStack,
    useToast,
} from "@chakra-ui/react";
import { RiDeleteBinFill } from "react-icons/ri";
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import {
    collection,
    addDoc
} from "firebase/firestore";
import { db } from "../firebase/config";
import { getProductsFromCart } from "../services/products"

const createItemCart = async (id_product, id_user) => {
    const doc = await addDoc(collection(db, "cart_item"), {
        id_product,
        id_user
    });
    return doc;
}

export const addToCart = async (product_id, user_id) => {
    const toast = useToast()
    try {
        alert("adding: " + product_id + user_id)
        const item_cart = await createItemCart(
            product_id,
            user_id
        )

    } catch (error) {
        toast({
            title: 'Hubo un error',
            description: "Vuelve a intentarlo",
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
    }
}

export const Cart = () => {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)
    const { user } = useAuth()

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getProductsFromCart(user)
                data.map((product) => console.log(product))
                setProducts(data)
            } catch (error) {
                setError(true)
            }
        }
        if (user) {
            getData()
        }
    }, [user])

    const [count, setCount] = useState(1)
    const minValue = 0
    const maxValue = 1000

    const handleIncrease = () => {
        if (count < maxValue) setCount(count + 1)
    };

    const handleDecrease = () => {
        if (count > minValue) setCount(count - 1)
    };

    const totalPrice = () => {
        if (handleIncrease) {
            handleIncrease(count) + 0
        } else handleIncrease(count) - 0
    }

    return (
        <VStack p='35px'>
            {error && <Text as='b' color='#ff2600'>Hubo un error 😓</Text>}
            {!user ? <Text as='b' color='#ed5940'>Registrate para comprar 😉 </Text> : products.map((product) => (
                <Card
                    key={product.id}
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    bg='#f2e8d700'
                    border='1px solid #5f5525'
                >
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                        src={product.image_url}
                        alt={product.name}
                    />
                    <Stack>
                        <CardBody>
                            <Heading size='md' color='#ff77ad'>The perfect latte</Heading>
                            <Text py='2' color='#5f5525'>
                                Precio: $ {product.price}
                            </Text>
                            <Text py='2' color='#5f5525'>
                                Elegí la cantidad de MUU que quieras comprar
                            </Text>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type='number'
                                    placeholder='Enter password'
                                    value={count}
                                    onChange={(e) => setCount(Number(e.target.value))}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleDecrease} disabled={count === minValue}>
                                        -
                                    </Button>
                                    <Button h='1.75rem' size='sm' onClick={handleIncrease} disabled={count === maxValue}>
                                        +
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <Text py='2' color='#5f5525'>
                                Stock disponible: {product.stock}
                            </Text>
                        </CardBody>
                        <CardFooter gap='5px' justify='end'>
                            <Button variant='solid' colorScheme='orange'>
                                <RiDeleteBinFill />
                            </Button>
                        </CardFooter>
                    </Stack>
                </Card>
            ))}
            {!products && <Text>No products available</Text>}
            {!user ? '' :
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
                                    <Button variant='solid' colorScheme='pink' w='90%' marginLeft='0' onClick={addToCart}>
                                        Realizar compra
                                    </Button>
                                </ButtonGroup>
                            </Stack>
                        </CardBody>
                    </Card>
                </VStack>}
        </VStack>
    );
};
