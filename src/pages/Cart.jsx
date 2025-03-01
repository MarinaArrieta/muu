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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { RiDeleteBinFill } from "react-icons/ri";
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import {
    collection,
    addDoc,
    doc,
    getDoc,
    updateDoc,
    query,
    where,
    getDocs,
    deleteDoc,
    writeBatch,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { getProductsFromCart } from "../services/products"
import { Link } from "react-router-dom";

const createItemCart = async (id_product, id_user) => {
    const doc = await addDoc(collection(db, "cart_item"), {
        id_product,
        id_user
    });
    return doc;
}

export const addToCart = async (product_id, user_id) => {
    // const toast = useToast()
    try {
        const item_cart = await createItemCart(
            product_id,
            user_id
        )

    } catch (error) {
        // toast({
        //     title: 'Hubo un error',
        //     description: "Vuelve a intentarlo",
        //     status: 'error',
        //     duration: 9000,
        //     isClosable: true,
        // })
    }
}

const deleteItemCart = async (id_product, id_user) => {
    try {
        const cartItemsRef = collection(db, "cart_item");
        const q = query(
            cartItemsRef,
            where("id_product", "==", id_product),
            where("id_user", "==", id_user)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (docSnap) => {
            const docRef = doc(db, "cart_item", docSnap.id);
            await deleteDoc(docRef);
            console.log(`Deleted cart item with ID: ${docSnap.id}`);
        });
        console.log("Successfully deleted the cart items");
    } catch (error) {
        console.error("Error deleting cart items: ", error);
    }
};



export const Cart = () => {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)
    const { user } = useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handlePurchase = async (user, products) => {
        try {
            alert("here han 01");
            const batch = writeBatch(db);  // Crea un batch de Firestore
    
            // Itera sobre los productos
            for (const product of products) {
                alert("here han 02: " + product.id);
    
                // Verifica si el producto existe en Firestore antes de intentar actualizarlo
                const productRef = doc(db, "productos", product.id);
                const productSnap = await getDoc(productRef);
    
                // Si el producto no existe, muestra un error
                if (!productSnap.exists()) {
                    alert("Product does not exist: " + product.id);
                    return;  // Detén la función si algún producto no existe
                }
    
                const amount = 1;
                const newStock = product.stock - amount;
    
                // Actualiza el stock del producto
                batch.update(productRef, { stock: newStock });
            }
    
            // Realiza el commit del batch
            await batch.commit();
            for (const product of products) {
                await deleteItemCart(product.id, user);
            }
            setProducts([])
            alert("here han 03: Purchase successful!");
    
        } catch (error) {
            console.error("Error during purchase handling:", error);
            alert("Error during purchase: " + error.message);
        }
    };
    

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

    const confirmPurchase = async (ev) => {
        ev.preventDefault();
        try {

            await handlePurchase(user, products);
            alert("here5")
            // toast({
            //     title: 'Compra realizada con éxito',
            //     description: "Gracias por tu compra",
            //     status: 'success',
            //     duration: 9000,
            //     isClosable: true,
            // });
            // Clear the cart after purchase
            // setProducts([]);
        } catch (error) {
            // toast({
            //     title: 'Hubo un error',
            //     description: "Vuelve a intentarlo",
            //     status: 'error',
            //     duration: 9000,
            //     isClosable: true,
            // });
        }
    };

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
                                        🍨 Precio: $ {products.reduce((total, product) => total + product.price * count, 0)}
                                    </Text>
                                </Box>
                                <ButtonGroup
                                    gap='4'
                                    flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
                                    alignItems='baseline'
                                >
                                    <Button variant='solid' colorScheme='pink' w='90%'>
                                        <Link to={`/`}>Ver más productos</Link>
                                    </Button>
                                    <Button onClick={confirmPurchase}>aca</Button>
                                    {/* <Button variant='solid' colorScheme='pink' w='90%' marginLeft='0' onClick={onOpen}>Comprar</Button>
                                    <Modal isOpen={isOpen} onClose={onClose}>
                                        <ModalOverlay />
                                        <ModalContent bg='#ffd8e5'>
                                            <ModalHeader color='#ed5940'>Compra realizada con éxito 😃</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody color='#5f5525'>
                                                Gracias por la compra, vuelve pronto 🧡
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button colorScheme='pink' mr={3} onClick={onClose}>
                                                    Cerrar
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal> */}
                                </ButtonGroup>
                            </Stack>
                        </CardBody>
                    </Card>
                </VStack>}
        </VStack>
    );
};
