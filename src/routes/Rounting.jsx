import { Register } from '../pages/auth/Register'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import { Login } from '../pages/auth/Login'
import { Create } from '../pages/Create'
import { Cart } from '../pages/Cart'
import ProductDetail from '../pages/ProductDetail'

const Rounting = () => {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create' element={<Create />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product-detail' element={<ProductDetail />} />
      </Routes>
  )
}

export default Rounting
