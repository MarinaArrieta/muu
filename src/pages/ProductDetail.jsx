import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Grid,
    Heading,
    Image,
    Stack,
    Text,
    useToast,
    VStack
} from "@chakra-ui/react"
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import { getProducts } from "../services/products"
import { useAuth } from '../context/AuthContext'
// import { auth } from "../firebase/config"
import { addToCart } from './Cart'
import conection from "../assets/conection.png"

const ProductDetail = () => {

    const [product, setProduct] = useState({})
    const [products, setProducts] = useState([])
    const { id } = useParams()
    const { user } = useAuth()
    const toast = useToast()

    useEffect(() => {
        getProducts().then(
            (data) => {
                const product = data.find((product) => product.id === id)
                setProduct(product)
            })
    }, [])

    const addToCartClick = (e) => {
        let product_id = e.target.dataset.id
        let user_id = user

        toast({
            title: 'Se agregó al carrito 😀',
            position: 'top',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })

        addToCart(product_id, user_id)
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getProducts(products)
                setProducts(data)
            } catch (error) {
                setError(true)
            }
        }
        if (user) {
            getData()
        }
        getData()
    }, [])

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

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (product?.category) {
            const filtered = products.filter(p => p.category === product.category && p.id !== product.id)
            // .filter((p, index, self) => self.filter(item => item.id !== product.id))
            setFilteredProducts(filtered)
        }
    }, [product, products])

    return (
        <Grid
            templateColumns={{ base: "1fr", sm: "1fr", lg: "repeat(1, 1fr)" }}
            gap={6}
        >
            <VStack>
                <Card maxW='sm' bg='#f2e8d700' shadow='unset'>
                    <CardBody>
                        <Image
                            src={product.image_url}
                            alt={product.name}
                            filter='drop-shadow(2px 5px 4px #211714)'
                            borderRadius='lg'
                        />
                        <Stack mt='6' spacing='3'>
                            <Heading size='md' color='#ff77ad'>{product.name}</Heading>
                            <Text color='#5f5525'>
                                {product.description}
                            </Text>
                            <Text color='#ed5940' fontSize='2xl'>
                                $ {product.price} c/u
                            </Text>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter justify='end'>
                        {!user ?
                            <VStack alignItems='end'>
                                <Text color='#5f5525'>Registrate o inicia sesión para poder comprar</Text>
                                <ButtonGroup spacing='2'>
                                    <Button variant='solid' colorScheme='pink'>
                                        <Link to={`/register`}>Registrarse</Link>
                                    </Button>
                                    <Button variant='solid' colorScheme='pink'>
                                        <Link to={`/login`}>Iniciar sesión</Link>
                                    </Button>
                                </ButtonGroup>
                            </VStack>
                            :
                            <Button variant='solid' colorScheme='pink' onClick={addToCartClick} data-id={product.id}>
                                Agregar al carrito
                            </Button>
                        }
                    </CardFooter>
                </Card>
            </VStack>
            <VStack spacing={4}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <Card key={item.id} maxW='sm'>
                        <CardBody>
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            borderRadius='lg'
                          />
                          <Stack mt='6' spacing='3'>
                            <Heading size='md'>{item.name}</Heading>
                            <Text color='blue.600' fontSize='2xl'>
                              {item.price}
                            </Text>
                          </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                          <ButtonGroup spacing='2'>
                            <Button variant='solid' colorScheme='blue'>
                              Ver más
                            </Button>
                          </ButtonGroup>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                    <Text color="gray.500">No hay productos en esta categoría.</Text>
                )}
            </VStack>

        </Grid>
    )
}

export default ProductDetail