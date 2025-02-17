import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { createProduct } from '../services/products'

export const Create = () => {

  const [values, setValues] = useState({
    name: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { user } = useAuth()
  console.log(user)

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const product = await createProduct(values.name, user)
      console.log(product)
    } catch (error) {
      setError(true)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Create Todo</h1>
      <div>
        <input
          id='name'
          name='name'
          type="text"
          value={values.name}
          onChange={handleChange}
          placeholder='Name'
        />
      </div>
      {error && <p>There was an error</p>}
      <button type="submit">{loading ? 'Creando...' : 'Crear Todo'}</button>
    </form>
  )
}
