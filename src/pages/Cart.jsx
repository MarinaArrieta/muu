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
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,

} from "@chakra-ui/react";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    writeBatch
} from "firebase/firestore";
import { useEffect, useState } from 'react';
import { RiDeleteBinFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { db } from "../firebase/config";
import { getProductsFromCart } from "../services/products";

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

                const amount = product.count;
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
                const productsWithCount = data.map(product => ({ ...product, count: product.count || 1 }));
                setProducts(productsWithCount)
            } catch (error) {
                setError(true)
            }
        }
        if (user) {
            getData()
        }
    }, [user])

    const handleIncrease = (product) => {
        if (product.count < product.stock) {
            setProducts(products.map(p => p.id === product.id ? { ...p, count: p.count + 1 } : p));
        }
    };

    const handleDecrease = (product) => {
        if (product.count > 1) {
            setProducts(products.map(p => p.id === product.id ? { ...p, count: p.count - 1 } : p));
        }
    };

    const handleDelete = async (product) => {
        try {
            await deleteItemCart(product.id, user);
            setProducts(products.filter(p => p.id !== product.id));
        } catch (error) {
            console.error("Error deleting product from cart: ", error);
        }
    };

    const totalPrice = () => {
        return products.reduce((total, product) => total + product.price * product.count, 0);
    };

    const confirmPurchase = async (ev) => {
        ev.preventDefault();
        try {

            await handlePurchase(user, products);
        } catch (error) {
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
                                    min={1}
                                    max={product.stock}
                                    value={product.count}
                                    readOnly
                                    onChange={(e) => setProducts(products.map(p => p.id === product.id ? { ...p, count: Number(e.target.value) } : p))}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={() => handleDecrease(product)} disabled={product.count === 1}>
                                        -
                                    </Button>
                                    <Button h='1.75rem' size='sm' onClick={() => handleIncrease(product)} disabled={product.count === product.stock}>
                                        +
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <Text py='2' color='#5f5525'>
                                Stock disponible: {product.stock}
                            </Text>
                        </CardBody>
                        <CardFooter gap='5px' justify='end'>
                            <Button variant='solid' colorScheme='orange' onClick={() => handleDelete(product)}>
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
                                        🍨 Precio: $ {totalPrice()}
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
                                    <Button onClick={confirmPurchase} variant='solid' colorScheme='pink' w='90%'>Comprar</Button>
                                </ButtonGroup>
                            </Stack>
                        </CardBody>
                    </Card>
                </VStack>}
        </VStack>
    );
};
