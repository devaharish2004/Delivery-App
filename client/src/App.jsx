import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from './pages/Home/Home.jsx';
import Login from './components/auth/Login.jsx';
import SignUp from './components/auth/SignUp.jsx';
import Inventory from './pages/Inventory/Inventory.jsx';
import Delivery from './pages/Delivery/Delivery.jsx';
import Profile from './pages/Profile/Profile.jsx';

import './App.css';




const App = () => {


  return (
        <Router>
          <Toaster/>
          <Routes>
            <Route path = "/" element = {<Home/>} />
            <Route path = "/invTeam/signup" element = { <SignUp team = "Inventory" /> } />
            <Route path = "/dlvTeam/signup" element = { <SignUp team = "Delivery" /> } />
            <Route path = "/invTeam/login" element = { <Login team = "Inventory" />} />
            <Route path = "/dlvTeam/login" element = { <Login team = "Delivery" />} />    
            <Route path = "/inventory" element = { <Inventory/> }  />   
            <Route path = "/delivery" element = { <Delivery/> } />  
            <Route path = "/profile" element = {<Profile/>} />
          </Routes>
        </Router>
  )
}

export default App