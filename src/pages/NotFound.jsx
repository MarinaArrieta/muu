import { Image, Text, VStack } from "@chakra-ui/react"
import error from '../assets/error-404.png'

const NotFound = () => {
  return (
    <VStack>
      <Text color='#5f5525' fontSize='2xl'>La página que estas buscando no se encuentra</Text>
      <Image
        boxSize='170px'
        objectFit='cover'
        w={{ base: '300px', md: '480px', lg: '560px' }}
        h='unset'
        src={error}
        alt='Logo vaca'
      />
    </VStack>
  )
}

export default NotFound