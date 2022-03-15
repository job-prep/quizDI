import React from 'react';
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'

const App = () => {
  return (
    <Routes>
      <Route path = '/' element = {<Login />}>
      </Route>
    </Routes>
  )
}

export default App;