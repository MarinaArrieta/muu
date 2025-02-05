import React from 'react'
import { Register } from '../pages/Register'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Header from '../components/Header'

const Rounting = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default Rounting
