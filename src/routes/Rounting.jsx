import React from 'react'
import { Routes } from 'react-router-dom'

const Rounting = () => {
  return (
    <Routes>
      <Route path='/register' element={<Register/>} />
    </Routes>
  )
}

export default Rounting
