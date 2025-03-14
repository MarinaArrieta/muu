import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    HStack,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Stack,
    StackDivider,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import {
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
import { NavLink } from "react-router-dom";
import carritoVacio from '../assets/carrito-vacio.png';
import purchase from '../assets/compra.png';
import conection from "../assets/conection.png";
import { useAuth } from '../context/AuthContext';
import { db } from "../firebase/config";
import { getProductsFromCart } from "../services/products";

export const Cart = () => {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure()

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
            toast({
                title: 'Hubo un error',
                description: 'Inténtalo de nuevo',
                position: 'top',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

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
            toast({
                title: 'Hubo un error',
                description: 'Inténtalo de nuevo',
                position: 'top',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    };

    useEffect(() => {
        if (!user) return;
    
        const getData = async () => {
            try {
                const data = await getProductsFromCart(user)
                const productsWithCount = data.map(product => ({ ...product, count: product.count || 1 }))
                setProducts(productsWithCount)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
    
        getData()
    }, [user])

    const handleIncrease = (product) => {
        if (product.count < product.stock) {
            setProducts(products.map(p => p.id === product.id ? { ...p, count: p.count + 1 } : p))
        }
    }

    const handleDecrease = (product) => {
        if (product.count > 1) {
            setProducts(products.map(p => p.id === product.id ? { ...p, count: p.count - 1 } : p))
        }
    }

    const handleDelete = async (product) => {
        try {
            await deleteItemCart(product.id, user)
            setProducts(products.filter(p => p.id !== product.id))
        } catch (error) {
            toast({
                title: 'Hubo un error',
                description: 'Inténtalo de nuevo',
                position: 'top',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const totalPrice = () => {
        return products.reduce((total, product) => total + product.price * product.count, 0)
    }

    const confirmPurchase = async () => {
        try {
            await handlePurchase(user, products);
        } catch (error) {
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
        <VStack p='35px'>
                {error ? (
                    <HStack w='100%' marginTop='35px' alignItems='center' justifyContent='center'>
                        <Text color='#5f5525' fontSize='2xl'>Inténtalo de nuevo</Text>
                    </HStack>
                ) : loading ? (
                    <HStack w='100%' marginTop='35px' alignItems='center' justifyContent='center'>
                        <Spinner size='xl' color='#ed5940' filter='drop-shadow(2px 5px 4px #ffb5a8)' thickness='10px' />
                    </HStack>
                ) : (
                    <>
                        {products.map((product) => (
                            <Card
                                key={product.id}
                                direction={{ base: 'column', sm: 'row' }}
                                overflow='hidden'
                                variant='outline'
                                bg='#f2e8d700'
                                border='1px solid #5f5525'
                            >
                                <Image objectFit='cover' maxW={{ base: '100%', sm: '200px' }} src={product.image_url} alt={product.name} />
                                <Stack>
                                    <CardBody>
                                        <Heading size='md' color='#ff77ad'>{product.name}</Heading>
                                        <Text py='2' color='#5f5525'>Precio: $ {product.price}</Text>
                                        <Text py='2' color='#5f5525'>Elegí la cantidad de MUU que quieras comprar</Text>
                                        <InputGroup size='md'>
                                            <Input pr='4.5rem' type='number' min={1} max={product.stock} value={product.count} readOnly />
                                            <InputRightElement width='4.5rem'>
                                                <Button h='1.75rem' size='sm' onClick={() => handleDecrease(product)} disabled={product.count === 1}>-</Button>
                                                <Button h='1.75rem' size='sm' onClick={() => handleIncrease(product)} disabled={product.count === product.stock}>+</Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        <Text py='2' color='#5f5525'>Stock disponible: {product.stock}</Text>
                                    </CardBody>
                                    <CardFooter gap='5px' justify='end'>
                                        <Button variant='solid' colorScheme='orange' onClick={() => handleDelete(product)}>
                                            <RiDeleteBinFill />
                                        </Button>
                                    </CardFooter>
                                </Stack>
                            </Card>
                        ))}
                        <VStack w='100%'>
                            <Card w='100%'>
                                <CardHeader bg='#5f5525'>
                                    <Heading size='md' color='#f2e8d7'>Total en mi carrito</Heading>
                                </CardHeader>
                                <CardBody bg='#f2e8d7'>
                                    <Stack divider={<StackDivider />} spacing='4'>
                                        <Box display='flex' alignItems='center' justify='center'>
                                            <Text pt='2' fontSize='xl' as='b' color='#5f5525'>
                                                {totalPrice() > 0 ? <>🍨 Precio: $ {totalPrice()}</> : (
                                                    <Card maxW='sm' bg='#f2e8d7' boxShadow='none'>
                                                        <CardBody p='0'>
                                                            <Image src={carritoVacio} alt='Carrito vacío' borderRadius='lg' />
                                                        </CardBody>
                                                        <CardFooter p='0' justifyContent='center'>
                                                            <Button variant='solid' colorScheme='pink' w='90%' marginTop='20px' as={NavLink} to={`/`}>
                                                                Ver productos
                                                            </Button>
                                                        </CardFooter>
                                                    </Card>
                                                )}
                                            </Text>
                                        </Box>
                                        {totalPrice() > 0 && (
                                            <ButtonGroup gap='4' flexDirection={{ base: 'column', md: 'row', lg: 'row' }} alignItems='baseline'>
                                                <Button variant='solid' colorScheme='pink' as={NavLink} to='/' w='90%'>
                                                Ver más productos
                                                </Button>
                                                <Button onClick={onOpen} variant='solid' colorScheme='pink' w='90%'>
                                                    Comprar
                                                    <Modal isOpen={isOpen} onClose={onClose} isCentered >
                                                        <ModalOverlay bg='#f2e8d7' display='flex'/>
                                                        <ModalContent bg='#f2e8d7' border='1px solid #ffffff' w='90%'>
                                                            <ModalHeader color='#ff77ad'>Compra realizada con éxito</ModalHeader>
                                                            <ModalBody>
                                                                <Card maxW='sm' bg='#f2e8d7' boxShadow='none'>
                                                                    <CardBody p='0'>
                                                                        <Image src={purchase} alt='Vaca en un jardín' borderRadius='lg' />
                                                                    </CardBody>
                                                                </Card>
                                                            </ModalBody>
                                                            <ModalFooter>
                                                                <Button variant='solid' colorScheme='pink' mr={3} onClick={() => { onClose(); confirmPurchase(); }}>
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
                        </VStack>
                    </>
                )}
        </VStack >
    );
}
