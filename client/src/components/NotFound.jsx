import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/spotify.png';

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='flex flex-col items-center justify-center mb-[30px] relative group cursor-pointer'>
        <img src={logo} alt="spotify" className="rounded-full w-16 h-16" />
        <div className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center opacity-0 group-hover:h-full group-hover:opacity-100 bg-greenOverlay"></div>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-4xl md:text-5xl text-white font-bold py-4'>Page not found</h2>
        <p className='text-sm md:text-lg text-white'>We can’t seem to find the page you are looking for.</p>
      </div>
      <div className='flex flex-col items-center justify-center mt-[30px]'>
        <Link to='/' className="border-2 border-white rounded-full px-4 py-2 w-full uppercase text-white font-bold text-sm hover:text-black hover:bg-white text-center">Back to Profile</Link>
      </div>
    </div>
  )
}

export default NotFound;