import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Grid,
  Heading,
  HStack,
  Image,
  Select,
  Spinner,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { getProducts } from "../services/products"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import error2 from "../assets/error.png"
import conection from "../assets/conection.png"

const Home = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [filter, setFilter] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getProducts(products)
        setProducts(data)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    if (user) {
      getData()
    }
    getData()
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredProducts = products.filter(product => {
    if (!filter) return true
    return product.category === filter
  })

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
    <VStack marginTop='15px'>
      <HStack color='#7e6909'>
        <Select
          color='#7e6909'
          placeholder="Todos"
          borderColor='#f8a5c5'
          bg='#ffdfe4'
          focusBorderColor='#ffbb00'
          onChange={handleFilterChange}
        >
          <option value='palito'>Helado palitos</option>
          <option value='cucurucho'>Cucuruchos</option>
          <option value='pote'>Potes</option>
        </Select>
      </HStack>
      {loading &&
        <HStack w='100%' marginTop='35px' alignItems='center' justifyContent='center'>
          <Spinner size='xl' color='#ed5940' filter='drop-shadow(2px 5px 4px #ffb5a8)' thickness='10px' />
        </HStack>
      }
      {error &&
        <Card maxW='sm' bg='#f2e8d7' boxShadow='none'>
          <Stack mt='6' spacing='3'>
            <Text color='#5f5525' fontSize='2xl' textAlign='center' m={{ base: '1.25rem', md: 'unset' }}>Inténtalo de nuevo</Text>
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
      <Grid
        templateColumns={{ base: "1fr", sm: "1fr", lg: "repeat(3, 1fr)" }}
        gap={6}
        flexDirection='column'
      >
        {filteredProducts.map((product) => (
          <VStack key={product.id}>
            <Card
              maxW='sm'
              bg='#f2e8d700'
              shadow='unset'
              h='100%'
            >
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
                <Button variant='solid' colorScheme='pink' as={Link} to={`/product-detail/${product.id}`}>Ver más</Button>
              </CardFooter>
            </Card>
          </VStack>
        ))}
      </Grid>
    </VStack>
  )
}

export default Home
