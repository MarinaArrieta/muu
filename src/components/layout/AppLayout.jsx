import { VStack } from '@chakra-ui/react'
import Header from '../Header'
import Rounting from '../../routes/Rounting'

const AppLayout = () => {
  return (
    <VStack>
      <Header />
      <Rounting />
    </VStack>
  )
}

export default AppLayout
