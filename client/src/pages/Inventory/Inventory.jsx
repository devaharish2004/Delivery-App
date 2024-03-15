import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"

//Material UI
import { DataGrid } from '@mui/x-data-grid';


import './Inventory.css'
import columns from '../../data/inventoryCols.js';
import AddModal from '../../components/Inventory/AddModal.jsx';
import RefineData from '../../components/Inventory/RefineData.jsx';


const Inventory = () => {  

  //Hooks

  const [ goods, setGoods ] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getGoods();
  }, [goods])

  //event-handlers
  // to get all the goods
  const getGoods = async () => {
    const token = localStorage.getItem('token');
    await axios.get("http://localhost:3001/inventory", {
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((response) => {
      const data = RefineData(response.data.message);
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
      
   
      <button type="button" className="btn btn-primary btn_add" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add a New Inventory Item
      </button>

     
      <AddModal/>

    </div>
  )
}

export default Inventory