import React from 'react';
import logo from '../assets/spotify.png';

const Login = () => {

  const LOGIN_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:8000/login' : 'https://mern-spotify.herokuapp.com/login';

  return (
    <div className='bg-black'>
      <div className='flex flex-col justify-center items-center h-screen'>
        <img src={logo} alt='spotify' className='w-20 py-4 pointer-events-none' />
        <a href={LOGIN_URL} className='w-[250px] h-12 rounded-full bg-[#1DB954] uppercase font-bold text-white text-lg text-center py-2 hover:bg-[#1ed760]'>Log in to Spotify</a>
      </div>
    </div>
  )
}

export default Login;