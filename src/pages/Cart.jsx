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
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    StackDivider,
    Text,
    useDisclosure,
    VStack,
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
import carritoVacio from '../assets/carrito-vacio.png'
import purchase from '../assets/compra.png'
import register from '../assets/registrate.png'
import error2 from "../assets/error.png"

const createItemCart = async (id_product, id_user) => {
    const doc = await addDoc(collection(db, "cart_item"), {
        id_product,
        id_user
    });
    return doc;
}

export const addToCart = async (product_id, user_id) => {
    try {
        const item_cart = await createItemCart(
            product_id,
            user_id
        )

    } catch (error) {

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
        });
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
            const batch = writeBatch(db)
            for (const product of products) {
                const productRef = doc(db, "productos", product.id)
                const productSnap = await getDoc(productRef);

                if (!productSnap.exists()) {
                    return;
                }

                const amount = product.count;
                const newStock = product.stock - amount
                batch.update(productRef, { stock: newStock })
            }
            await batch.commit();
            for (const product of products) {
                await deleteItemCart(product.id, user)
            }
            setProducts([])
        } catch (error) {
            console.error("Error:", error)
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getProductsFromCart(user)
                data.map((product) => console.log(product))
                const productsWithCount = data.map(product => ({ ...product, count: product.count || 1 }))
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
            setProducts(products.map(p => p.id === product.id ? { ...p, count: p.count + 1 } : p))
        }
    };

    const handleDecrease = (product) => {
        if (product.count > 1) {
            setProducts(products.map(p => p.id === product.id ? { ...p, count: p.count - 1 } : p))
        }
    };

    const handleDelete = async (product) => {
        try {
            await deleteItemCart(product.id, user)
            setProducts(products.filter(p => p.id !== product.id))
        } catch (error) {
            console.error("Error deleting product from cart: ", error)
        }
    };

    const totalPrice = () => {
        return products.reduce((total, product) => total + product.price * product.count, 0)
    };

    const confirmPurchase = async () => {
        try {
            await handlePurchase(user, products);
        } catch (error) {
        }
    };

    return (
        <VStack p='35px'>
            {error &&
                <Card maxW='sm' bg='#f2e8d7' boxShadow='none'>
                    <Stack mt='6' spacing='3'>
                        <Text color='#5f5525' fontSize='2xl' m={{ base: '1.25rem', md: 'unset' }}>Inténtalo de nuevo</Text>
                    </Stack>
                    <CardBody>
                        <Image
                            src={error2}
                            alt='Desierto error'
                            borderRadius='lg'
                        />
                    </CardBody>
                </Card>
            }
            {!user ?
                <VStack p='9px'>
                    <Card maxW='sm' bg='#f2e8d7' boxShadow='none'>
                        <CardBody p='0'>
                            <Image
                                src={register}
                                alt='Vaca en un jardin'
                                borderRadius='lg'
                            />
                        </CardBody>
                    </Card>
                </VStack>
                :
                products.map((product) => (
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
                                <Heading size='md' color='#ff77ad'>{product.name}</Heading>
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
            {!products.length && <Text></Text>}
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
                                        {totalPrice() > 0 ?
                                            <>🍨 Precio: $ {totalPrice()}</>
                                            :
                                            <Card maxW='sm' bg='#f2e8d7' boxShadow='none'>
                                                <CardBody p='0'>
                                                    <Image
                                                        src={carritoVacio}
                                                        alt='Desierto error carrito vacio'
                                                        borderRadius='lg'
                                                    />
                                                </CardBody>
                                                <CardFooter p='0' justifyContent='center'>
                                                    <Button variant='solid' colorScheme='pink' w='90%' marginTop='20px'>
                                                        <Link to={`/`}>Ver más productos</Link>
                                                    </Button>
                                                </CardFooter>
                                            </Card>}
                                    </Text>
                                </Box>
                                {totalPrice() > 0 && (
                                    <ButtonGroup
                                        gap='4'
                                        flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
                                        alignItems='baseline'
                                    >
                                        <Button variant='solid' colorScheme='pink' w='90%'>
                                            <Link to={`/`}>Ver más productos</Link>
                                        </Button>
                                        <Button onClick={onOpen}
                                            variant='solid'
                                            colorScheme='pink'
                                            w='90%'>
                                            Comprar
                                            <Modal isOpen={isOpen} onClose={onClose}>
                                                <ModalOverlay bg='#f2e8d7' w='100%' h='100vh' alignItems='center' />
                                                <ModalContent bg='#f2e8d7' border='1px solid #ffffff' w='90%'>
                                                    <ModalHeader color='#ff77ad'>Compra realizada con éxito</ModalHeader>
                                                    <ModalBody>
                                                        <Card maxW='sm' bg='#f2e8d7' boxShadow='none'>
                                                            <CardBody p='0'>
                                                                <Image
                                                                    src={purchase}
                                                                    alt='Vaca en un jardin'
                                                                    borderRadius='lg'
                                                                />
                                                            </CardBody>
                                                        </Card>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button variant='solid' colorScheme='pink' mr={3} onClick={() => { onClose(), confirmPurchase() }}>
                                                            Cerrar
                                                        </Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>
                                        </Button>
                                    </ButtonGroup>
                                )}
                            </Stack>
                        </CardBody>
                    </Card>
                </VStack>}
        </VStack>
    );
};
