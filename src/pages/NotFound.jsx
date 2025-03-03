import { Card, CardBody, Image, Stack, Text, VStack } from "@chakra-ui/react"
import error from '../assets/error-404.png'

const NotFound = () => {
  return (
    <VStack>
      <Card maxW='sm' bg='#f2e8d7' boxShadow='none'>
        <Stack mt='6' spacing='3'>
          <Text color='#5f5525' fontSize='2xl' m={{base:'1.25rem', md:'unset'}}>La página que estas buscando no se encuentra</Text>
        </Stack>
        <CardBody>
          <Image
            src={error}
            alt='Desierto error 404'
            borderRadius='lg'
          />
        </CardBody>
      </Card>
    </VStack>
  )
}

export default NotFound