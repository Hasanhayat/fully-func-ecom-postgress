import { useState } from 'react'
import React from 'react'
import {Route,  Routes } from 'react-router'
import Login from './pages/Login'
import './App.css'
import Signup from './pages/Signup'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="*" element={<h1>404 Not Found</h1>} /> 
      

    </Routes>
    
    </>
  )
}

export default App
