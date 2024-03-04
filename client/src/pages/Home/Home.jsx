import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className='home_page'>
      <div className='home'>
        <h2>Login/SignUp As</h2>
        <Link to = "/invTeam/login" className='home_link'>Inventory Team</Link>
        <Link to = "/dlvTeam/login" className='home_link'>Delivery Team</Link>
      </div>
    </div>
  )
}

export default Home;