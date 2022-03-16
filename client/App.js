import React from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'

import Login from './Components/Login'
import Signup from './Components/Signup'
import Layout from './Components/Layout';


const App = () => {
  // test value
  // const user = null;
  const user = 'test'
  // const user =  useSelector((state => state.systemDesign.user))

  return (
    <Routes>
      <Route path = '/' element = {user ? <Layout /> : <Navigate replace to="login" /> } /> 
      <Route path = 'login' element = {<Login />} />
      <Route path = 'signup' element = {<Signup />} />
    </Routes>
  )
}

export default App;