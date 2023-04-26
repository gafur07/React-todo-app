import React, { useContext, useEffect, useState } from 'react'
import './Register.scss'
import { AuthContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'


const Register = () => {
  const { state, dispatch } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [dataForBackend, setDataForBackend] = useState({
    name: '',
    phone: '',
    password: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (state.token) {
      navigate('/', { replace: true })
    }
  }, [])

  function register(e) {
    e.preventDefault()
    setLoading(true)
    axios
      .post('https://todo.paydali.uz/api/register', dataForBackend)
      .then(res => {
        Swal.fire({ 
          title: "Register Successful!",
          icon: "success"
         })
        navigate("/login", { replace: true})
      })
      .catch(err => {
        Swal.fire({
          title: "The phone number already exist!",
          icon: "error"
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className='auth-container'>
      <form className='auth-form' onSubmit={register}>
        <h1>Register</h1>
        <input
          onChange={e =>
            setDataForBackend({ ...dataForBackend, name: e.target.value })
          }
          value={dataForBackend.name}
          type='text'
          placeholder='Enter your name'
          required
        />
        <input
          onChange={e => {
            setDataForBackend({ ...dataForBackend, phone: e.target.value })
          }}
          value={dataForBackend.phone}
          type='text'
          placeholder='Enter phone number'
          required
        />
        <input
          onChange={e => {
            setDataForBackend({ ...dataForBackend, password: e.target.value })
          }}
          value={dataForBackend.password}
          type='password'
          placeholder='Password'
          required
        />
        <button disabled={loading}>Register</button>
      </form>
    </div>
  )
}

export default Register
