import { useState, useEffect } from "react"
import { getProducts, getUsers } from "../services/products"
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text, VStack } from "@chakra-ui/react"
import { useAuth } from "../context/AuthContext"

const Home = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getProducts()
        data.map((product) => console.log(product))
        setProducts(data)
      } catch (error) {
        setError(true)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    if (user){
      getData()
    }
  }, [])

  return (
    <Box>
      {error && <Text>There was an error</Text>}
      {loading && <Text>Loading...</Text>}
      {products.map((product) => (
        <VStack key={product.id}>
          <Card maxW='sm'>
            <CardBody>
              <Image
                src={product.image_url}
                alt={product.name}
                borderRadius='lg'
              />
              <Stack mt='6' spacing='3'>
                <Heading size='md'>{product.name}</Heading>
                <Text>
                  {product.description}
                </Text>
                <Text color='blue.600' fontSize='2xl'>
                  $ {product.price}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing='2'>
                <Button variant='solid' colorScheme='blue'>
                  Buy now
                </Button>
                <Button variant='ghost' colorScheme='blue'>
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </VStack>
      ))}
      {!products && <Text>No products available</Text>}
    </Box>
  )
}

export default Home
