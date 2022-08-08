import React, { useEffect, useState } from 'react';
import Login from './Login';
import Feed from './Feed';
import { token } from '../api';

const Home = () => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    setAccessToken(token);
  },[])

  return (
    <>
      {accessToken ? <Feed /> : <Login />}
    </>
  )
}

export default Home;