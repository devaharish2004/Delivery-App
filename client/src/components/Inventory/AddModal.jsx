import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import RefineData from './RefineData.jsx';
import toast from 'react-hot-toast';

const AddModal = ({ setGoods }) => {

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        sender_mobile_no: '',
        receiver_mobile_no: '',
        delivery_address: '',
        taken_for_delivery : false,
        expected_delivery_date: null,
        expiry_date: null,
        damaged : false,
        agent_id : null
      });

    const navigate = useNavigate();


    //event handlers and functions
    const handleAddClick = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if(!token)
        {
          navigate('/invTeam/login');
        }
        else
        {
          axios.post('http://localhost:3001/inventory/add', formData, {
            headers : {
              "Content-Type" : "application/json",
              "Authorization" : `Bearer ${token}`
            }
          })
          .then((response) => {
            const id = response.data.id;
            const newGood = [{...formData, id : id}];
            const refinedArray = RefineData(newGood);
            setFormData({
              name: '',
              category: '',
              sender_mobile_no: '',
              receiver_mobile_no: '',
              delivery_address: '',
              taken_for_delivery : false,
              expected_delivery_date: null,
              expiry_date: null,
              damaged : false,
              agent_id : null
            });
            toast.success("Successfully Added");
            setGoods((goods) => [...goods, refinedArray[0]]);
          })
          .catch((err) => {
            localStorage.removeItem('token');
            console.log(err);
            navigate('/invTeam/login');
          })
        }
      }

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Enter The Details</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body row g-3">
              <div className="mb-3 col-6">
                <label className="form-label">Name of the Product</label>
                <input type="text" className="form-control required" placeholder="Name" required onChange={(e) => setFormData({...formData, name : e.target.value})} value={formData.name}/>
              </div>
              <div className="mb-3 col-6">
                <label className="form-label">Category</label>
                <input type="text" className="form-control" placeholder="Category" required onChange={(e) => setFormData({...formData, category : e.target.value})} value = {formData.category}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Sender Mobile Number (+91)</label>
                <input type="text" className="form-control" placeholder="Sender Mobile Number" required onChange={(e) => setFormData({...formData, sender_mobile_no : e.target.value})} value={formData.sender_mobile_no}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Receiver Mobile Number (+91)</label>
                <input type="text" className="form-control" placeholder="Receiver Mobile Number" required onChange={(e) => setFormData({...formData, receiver_mobile_no : e.target.value})} value={formData.receiver_mobile_no}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Delivery Address</label>
                <input type="text" className="form-control" placeholder="Delivery Address" required onChange={(e) => setFormData({...formData, delivery_address : e.target.value})} value={formData.delivery_address}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Expected Delivery Date</label>
                <input type="text" className="form-control" placeholder = "YYYY-MM-DD" required onChange={(e) => setFormData({...formData, expected_delivery_date : e.target.value})} value={ (formData.expected_delivery_date) ? formData.expected_delivery_date : ''}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Expiry Date (Not Required) </label>
                <input type="text" className="form-control" placeholder="YYYY-MM-DD" onChange={(e) => setFormData({...formData, expiry_date : e.target.value})} value={ (formData.expiry_date) ? formData.expiry_date : ' '}/>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick = {handleAddClick}>Add This Item</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AddModal