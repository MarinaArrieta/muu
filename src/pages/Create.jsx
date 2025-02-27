import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { createProduct } from '../services/products'
import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'

export const Create = () => {

  const [values, setValues] = useState({
    name: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { user } = useAuth()
  console.log('Hola soy: ', user)

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // console.log(user, 'user')
      const product = await createProduct(values.name, user)
      console.log(product)
    } catch (error) {
      setError(true)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box maxW="400px" mx="auto" mt="10">
      <form onSubmit={onSubmit}>
        <FormControl>
          <FormLabel htmlFor="email" color='#ed5940'>Crear Orden</FormLabel>
          <Input
            id='name'
            name='name'
            type="text"
            value={values.name}
            onChange={handleChange}
            placeholder='Enter product Name'
            _placeholder={{ color: '#c7b65e' }}
            borderColor='#f7b3cd'
          />
        </FormControl>
        {error && <Text>There was an error</Text>}
        <Button mt={4} type="submit" width="100%" colorScheme='pink'>{loading ? 'Creando...' : 'Crear Orden'}</Button>
      </form>
    </Box>
  )
}
