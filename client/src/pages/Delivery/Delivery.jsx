import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../contexts/TokenContext';


const Delivery = () => {

  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {

    if(token === "")
    {
      navigate('/dlvTeam/login');
    }
  }, [token]);

  return (
    <div>Delivery</div>
  )
}

export default Delivery