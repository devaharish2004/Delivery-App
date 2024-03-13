import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Login.css';



const Login = ({ team }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(team === "Inventory") {
            axios.post("http://localhost:3001/auth/invTeamLogin/", { email, password })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                toast.success("Successfully Logged In");
                navigate('/inventory');

              })
              .catch(error => {
                const status = error.response.status;
                if(status === 404) {
                    toast.error("User Not Found. Please Register");
                    navigate('/invTeam/signup');
                }
                else if(status === 401) {
                    toast.error("Unauthorized Access. Please enter the correct credentials");
                }
                else {
                    toast.error("Internal Server Error. Please try again after some time");
                    navigate('/');
                }
              });
            
        } 
        
        else {
            axios.post("http://localhost:3001/auth/dlvTeamLogin/", { email, password })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                toast.success("Successfully Logged In");
                navigate('/delivery');
              })
              .catch(error => {
                const status = error.response.status;
                if(status === 404) {
                    toast.error("User Not Found. Please Register");
                    navigate('/dlvTeam/signup');
                }
                else if(status === 401) {
                    toast.error("Unauthorized Access. Please enter the correct credentials");
                }
                else {
                    toast.error("Internal Server Error. Please try again after some time");
                    navigate('/');
                }
              });
            
        }
    }

    return (
        <div className='login_page'>
            <form onSubmit = {handleSubmit} className='login_form'>
                <h2>Login - {team} Team</h2>
                <div className='input_field'>
                    <label>Email</label>
                    <input type = "email" placeholder='Email' required onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className='input_field'>
                    <label>Password</label>
                    <input type = "password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button type = "submit">Login</button>
            </form>
        </div>
    )
}

export default Login