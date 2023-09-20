import { Link, useNavigate } from 'react-router-dom'
import './register.css'
import { useState } from 'react'
import axios from 'axios'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/auth/register', {
        username,
        email,
        password,
      })
      navigate('/login')
    } catch (error) {
      setError(true)
    }
  }

  return (
    <div className='register'>
      <form className='registerForm' onSubmit={handleSubmit}>
        <span className='registerTitle'>Register</span>
        <label>Username:</label>
        <input
          className='registerInput'
          type='text'
          placeholder='Enter Your Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email:</label>
        <input
          className='registerInput'
          type='email'
          placeholder='Enter Your Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          className='registerInput'
          type='password'
          placeholder='Enter Your Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='registerButton'>Register</button>
      </form>
      <Link className='link' to='/login'>
        <button className='loginButton'>Login</button>
      </Link>
      {error && (
        <span style={{ color: 'red', marginTop: '10px' }}>
          Something went wrong
        </span>
      )}
    </div>
  )
}

export default Register
