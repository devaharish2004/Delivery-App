import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios"
import './Inventory.css'
import columns from '../../data/inventoryCols.js';


const Inventory = () => {  

  const [ goods, setGoods ] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getGoods();
  }, [goods])

 

  const getGoods = async () => {
    const token = localStorage.getItem('token');
    await axios.get("http://localhost:3001/inventory", {
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((response) => {
      const data = response.data.message;
      setGoods(data);
      
    })
    .catch((err) => {
      if(token) localStorage.removeItem('token');
      navigate('/invTeam/login');
    })
  } 

  return (
    <div className = "inventory">
      <h1> Inventory Details </h1>
      <div className='goods'>
        <DataGrid
          rows={goods}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  )
}

export default Inventory