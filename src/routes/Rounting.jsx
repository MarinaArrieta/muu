import React from 'react'
import { Register } from '../pages/auth/Register'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import { Login } from '../pages/auth/Login'
import { Create } from '../pages/Create'

const Rounting = () => {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create' element={<Create />} />
      </Routes>
  )
}

export default Rounting
