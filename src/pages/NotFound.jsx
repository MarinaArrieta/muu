import { Text, VStack } from "@chakra-ui/react"

const NotFound = () => {
  return (
    <VStack>
      <Text color='#ed5940' fontSize='2xl'>404 - Pagina no encontrada 🥴</Text>
      <Text color='#5f5525' fontSize='2xl'>La pagina que estas buscando no se encuentra...</Text>
    </VStack>
  )
}

export default NotFound