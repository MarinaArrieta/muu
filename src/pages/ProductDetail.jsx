import { useState, useEffect } from "react"
import { getProducts, getUsers } from "../services/products"
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Grid,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react"
import { useAuth } from "../context/AuthContext"
import { IoMdCart } from "react-icons/io";

const ProductDetail = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const getData = async () => {
      try {
        console.log('algo')
        const data = await getProducts(products)
        console.log(data)
        data.map((product) => console.log(product))
        setProducts(data)
      } catch (error) {
        setError(true)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    if (user) {
      getData()
    }
  }, [])

  return (
    <Grid 
      templateColumns={{ base: "1fr", sm: "1fr", lg: "repeat(3, 1fr)" }} 
      gap={6}
    >
      {error && <Text as='b' color='#ff2600'>There was an error</Text>}
      {loading && <Text as='b' color='#ed5940'>Loading...</Text>}
      {products.map((product) => (
        <VStack key={product.id}>
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
      ))}
      {!products && <Text>No products available</Text>}
    </Grid>
  )
}

export default ProductDetail