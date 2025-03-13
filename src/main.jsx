import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider} from '@chakra-ui/react'
import theme from "./theme/theme";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </ChakraProvider>
  </BrowserRouter>
)
