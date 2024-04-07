import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from 'react-hot-toast';

//Material UI
import { DataGrid } from '@mui/x-data-grid';

import './Inventory.css'
import columns from '../../data/inventoryCols.jsx';
import AddModal from '../../components/Inventory/AddModal.jsx';
import RefineData from '../../components/Inventory/RefineData.jsx';
import UpdateModal from '../../components/Inventory/UpdateModal.jsx';


const Inventory = () => {  

  //Hooks

  const [ goods, setGoods ] = useState([]);
  const [selectedRow, setSelectedRow] = useState(-1);

  const navigate = useNavigate();

  useEffect(() => {
    getGoods();
  }, []);

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
      console.log(err);
      if(token) localStorage.removeItem('token');
      navigate('/invTeam/login');
    })
  } 
  
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3001/inventory/delete/${id}`, {
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((response) => {
      toast.success("Good has been deleted successfully");
      setGoods(prevGoods => prevGoods.filter(good => good.id !== id));
    })
    .catch((err) => {
      console.log(err);
      if(token) localStorage.removeItem("token");
      navigate('/invTeam/login');
    })
  }

  const handleUpdate = (id) => {
    setSelectedRow(id);
  }

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/invTeam/login");
  }


  return (
    <div className = "inventory">
      <div className='header'>
        <h1> Inventory Details </h1>
        <button className = "btn btn-danger" onClick={handleLogOut}>Log Out</button>
      </div>

      <div className='goods'>
        <DataGrid
          rows={goods}
          columns={columns(handleUpdate, handleDelete)}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15]}
        />
      </div>
      
   
      <button type="button" className="btn btn-primary btn_add" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add a New Inventory Item
      </button>

     
      <AddModal setGoods = {setGoods}/>

      <UpdateModal goods = {goods} id = {selectedRow} setGoods = {setGoods} />

    </div>
  )
}

export default Inventory

/*
SAMPLE REFINED DATA
agent_id
: 
"Not Specified"
category
: 
"Laptops"
damaged
: 
"No"
delivery_address
: 
"Theni"
expected_delivery_date
: 
"2024-02-01"
expiry_date
: 
"Not Specified"
id
: 
20
name
: 
"MSI Sword"
receiver_mobile_no
: 
"6651321351"
sender_mobile_no
: 
"5546562"
taken_for_delivery
: 
"No"
*/