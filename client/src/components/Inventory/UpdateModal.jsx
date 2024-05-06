import React, { useEffect, useState } from 'react'
import axios from 'axios';
import RefineData from './RefineData.jsx';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"

const UpdateModal = ({goods, id, setGoods}) => {

  const [formData, setFormData] = useState({
    id : id,
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



  const updateGood = (event,id) => {
      event.preventDefault();
      const token = localStorage.getItem('token');
      if(!token) {
        navigate('/invTeam/login');
      }
      else {
        axios.put(`http://localhost:3001/inventory/update/${id}`, formData, {
          headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
          }
        })
        .then((response) => {
          //update in the frontend
          toast.success("Good has been updated successfully");
          setGoods(goods => goods.map(good => {
            if(good.id === id) {
              return RefineData([formData])[0];
            }
            else {
              return good;
            }
          }))          
        })
        .catch((err) => {
          localStorage.removeItem('token');
          console.log(err);
          navigate('/invTeam/login');
        })
      }
  }

  useEffect(() => {
    if(id !== -1) {
      const selectedGood = goods.filter(good => good.id === id)[0];
      setFormData({
        id : selectedGood.id,
        name: selectedGood.name,
        category: selectedGood.category,
        sender_mobile_no: selectedGood.sender_mobile_no,
        receiver_mobile_no: selectedGood.receiver_mobile_no,
        delivery_address: selectedGood.delivery_address,
        taken_for_delivery : (selectedGood.taken_for_delivery === "No" ? false : true),
        expected_delivery_date: selectedGood.expected_delivery_date,
        expiry_date: (selectedGood.expiry_date === "Not Specified" ? null : selectedGood.expiry_date),
        damaged : (selectedGood.damaged === "No" ? false : true),
        agent_id : ((selectedGood.agent_id === "Not Specified" || selectedGood.agent_id === "") ? null : selectedGood.agent_id)
      })
    }
  }, [id]);

  return (
        <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateModalLabel">Enter The Updated Details</h1>
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
              <button type="button" className="btn btn-primary" onClick = {(event) => updateGood(event,id)}>Update This Item</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default UpdateModal