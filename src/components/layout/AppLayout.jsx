import { VStack } from '@chakra-ui/react'
import Header from '../Header'
import Rounting from '../../routes/Rounting'
import Footer from '../Footer'

const AppLayout = () => {
  return (
    <VStack>
      <Header />
      <Rounting />
      <Footer />
    </VStack>
  )
}

export default AppLayout
