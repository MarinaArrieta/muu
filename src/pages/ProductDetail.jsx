import { getProducts } from "../services/products"
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

const ProductDetail = () => {

    const { id } = useParams()
    const product = getProducts.find((e) => id === e.id)

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
                            <Button variant='solid' colorScheme='pink'>
                                Agregar al <IoMdCart />
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            </VStack>
            {/* {!product && <Text>No products available</Text>} */}
        </Grid>
    )
}

export default ProductDetail