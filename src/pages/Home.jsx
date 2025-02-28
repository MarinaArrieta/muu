import { useState, useEffect } from "react"
import { getProducts } from "../services/products"
import {
  Button,
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
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"

const Home = () => {

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
                <Text color='#ed5940' fontSize='2xl'>
                  $ {product.price} c/u
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter justify='end'>
              <Button variant='solid' colorScheme='pink'>
                <Link to={`${product.id}`}>Ver más</Link>
              </Button>
            </CardFooter>
          </Card>
        </VStack>
      ))}
      {!products && <Text>No products available</Text>}
    </Grid>
  )
}

export default Home
