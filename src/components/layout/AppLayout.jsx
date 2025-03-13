import { VStack } from '@chakra-ui/react'
import Header from '../Header'
import Footer from '../Footer'
import Main from '../Main'

const AppLayout = () => {
  return (
    <VStack>
      <Header />
      <Main />
      <Footer />
    </VStack>
  )
}

export default AppLayout
