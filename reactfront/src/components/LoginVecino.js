import React from 'react'
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';
const endpoint = 'http://localhost:8000/api/login'

const LoginVecino = () => {

  const signIn = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(endpoint, { email: email, password: password })
      console.log(response)
      signIn({
        token: response.data.access_token,
        expiresIn: 12000,
        tokenType: "Bearer",
        authState: { email: email }
      })
      
      
      navigate('/')
      



    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.msg);
      else if (err && err instanceof Error) setError(err.message);
      console.log("Error : ", error)
    }
  }

  return (
    <div>
      <form onSubmit={login}>

        <div className='mb-3'>
          <label className='form-label'>email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>contraseña</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            className='form-control'
          />
        </div>
        <button type='submit' className='btn btn-primary'>Enviar</button>
      </form>
    </div>
  )
}

export default LoginVecino