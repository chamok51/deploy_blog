import { Link } from 'react-router-dom'
import './login.css'

import axios from 'axios'
import { useContext, useRef } from 'react'
import { Context } from '../../context/Context'

function Login() {
  const userRef = useRef()
  const passwordRef = useRef()
  const { dispatch, isFetching } = useContext(Context)

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })
    try {
      const res = await axios.post('/auth/login', {
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' })
    }
  }

  return (
    <div className='login'>
      <form className='loginForm' onSubmit={handleLogin}>
        <span className='loginTitle'>Login</span>
        <label>Username</label>
        <input
          className='loginInput'
          type='text'
          placeholder='Enter Your username'
          ref={userRef}
        />
        <label>Password</label>
        <input
          className='loginInput'
          type='password'
          placeholder='Enter Your Password'
          ref={passwordRef}
        />
        <button className='loginBtn' disabled={isFetching}>
          Login
        </button>
      </form>
      <Link className='link' to='/register'>
        <button className='registerBtn'>Register</button>
      </Link>
    </div>
  )
}

export default Login
