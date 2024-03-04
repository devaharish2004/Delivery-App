import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvTeamLogin from "./pages/InvTeamLogin.jsx";
import InvTeamSignUp from "./pages/InvTeamSignUp.jsx";
import DlvTeamLogin from "./pages/DlvTeamLogin.jsx";
import DlvTeamSignUp from "./pages/DlvTeamSignUp.jsx";
import Home from './pages/Home/Home.jsx';
import './App.css'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/invTeam/signup" element = {<InvTeamSignUp/>} />
        <Route path = "/dlvTeam/signup" element = {<DlvTeamSignUp/>} />
        <Route path = "/invTeam/login" element = {<InvTeamLogin/>} />
        <Route path = "/dlvTeam/login" element = {<DlvTeamLogin/>} />        
      </Routes>
    </Router>
  )
}

export default App