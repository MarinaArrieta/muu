import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, Image } from '@chakra-ui/react'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChakraProvider>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </ChakraProvider>
  </BrowserRouter>
)
