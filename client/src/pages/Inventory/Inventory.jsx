import React, { useContext, useEffect } from 'react'
import { TokenContext } from '../../contexts/TokenContext'
import { useNavigate } from 'react-router-dom';


const Inventory = () => {

  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {

    if(token === "")
    {
      navigate('/invTeam/login');
    }
  }, [token]);

  

  return (
    <div>
      <h1>Welcome </h1>
    </div>
  )
}

export default Inventory