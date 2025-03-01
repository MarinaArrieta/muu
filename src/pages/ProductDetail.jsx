import { getProducts } from "../services/products"
import { addToCart } from './Cart'
import { useState, useEffect } from "react"
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
    VStack
} from "@chakra-ui/react"
import { IoMdCart } from "react-icons/io";
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


const ProductDetail = () => {
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const { user } = useAuth()
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

        addToCart(product_id, user_id)
    }

    if (!product) {
        return <Text>Producto no encontrado</Text>
    }

    return (
        <Grid
            templateColumns={{ base: "1fr", sm: "1fr", lg: "repeat(3, 1fr)" }}
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
                        <ButtonGroup spacing='2'>
                            <Button variant='solid' colorScheme='pink'  onClick={addToCartClick} data-id={product.id}>
                                Agregar al <IoMdCart />
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            </VStack>
        </Grid>
    )
}

export default ProductDetail