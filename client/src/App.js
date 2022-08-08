import React, { useEffect } from 'react';
import Home from './container/Home';
import { Route, Routes, useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  
  const access_token = localStorage.getItem('spotify_access_token'); 

  useEffect(() => {
    if(!access_token) {
      navigate('/');
    }
  },[access_token, navigate])

  return (
    <Routes>
      <Route path='/*' element={<Home />} />
    </Routes>
  )
}

export default App;