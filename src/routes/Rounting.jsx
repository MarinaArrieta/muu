import { Route, Routes } from 'react-router-dom'
import { Login } from '../pages/auth/Login'
import { Register } from '../pages/auth/Register'
import { Cart } from '../pages/Cart'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import ProductDetail from '../pages/ProductDetail'
import ProtectedRoute from '../components/ProtectedRoute'

const Rounting = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product-detail/:id" element={<ProductDetail />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<Cart />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Rounting
