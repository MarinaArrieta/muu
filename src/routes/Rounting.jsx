import React from 'react'
import { Register } from '../pages/Register'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'

const Rounting = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register/>} />
    </Routes>
  )
}

export default Rounting
