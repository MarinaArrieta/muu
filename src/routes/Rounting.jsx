import React from 'react'
import { Register } from '../pages/Register'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Header from '../components/Header'
import { Login } from '../pages/auth/Login'

const Rounting = () => {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
  )
}

export default Rounting
