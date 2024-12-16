import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = { email, password };

    try {
      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
    setEmail('');
      setPassword('');
  }
  

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900'>
      <form className='bg-gray-800 p-6 rounded shadow-md w-96' onSubmit={handleSubmit}>
        <h2 className='text-2xl font-bold mb-6 text-center text-white'>Login</h2>
        <div className='mb-4'>
          <label className='block text-gray-300' htmlFor='email'>Email</label>
          <input 
            className='border border-gray-600 p-2 w-full rounded bg-gray-700 text-white' 
            type='email' 
            id='email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-300' htmlFor='password'>Password</label>
          <input 
            className='border border-gray-600 p-2 w-full rounded bg-gray-700 text-white' 
            type='password' 
            id='password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button className='bg-red-600 text-white p-2 rounded w-full hover:bg-red-700' type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login