import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './SignUp.css';

const SignUp = ({ team }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(team === "Inventory") {
            axios.post("http://localhost:3001/auth/invTeamRegister/", { name, email, password })
            .then((response) => {
                toast.success("Successfully Registered. Now Please Log In");
                navigate('/invTeam/login');

            })
            .catch((err) => {
                const status = err.response.status;
                if(status === 409) {
                    toast.error("Email ID already exists. Please Log In ");
                    navigate('/invTeam/login');
                }
                else {
                    toast.error("Internal Server Error. Please try again after some time");
                    navigate('/');
                }
            });
        } else if(team === "Delivery"){
            axios.post("http://localhost:3001/auth/dlvTeamRegister/", { name, email, password })
            .then((response) => {
                console.log(response.data);
                toast.success("Successfully Registered. Please Log In");
                navigate('/dlvTeam/login');
            })
            .catch((err) => {
                const status = err.response.status;
                if(status === 409) {
                    toast.error("Email ID already exists. Please Log In ");
                    navigate('/dlvTeam/login');
                }
                else {
                    toast.error("Internal Server Error. Please try again after some time");
                    navigate('/');
                }
            });
        }
    }

    return (
        <div className='signup_page'>
            <form onSubmit = { handleSubmit } className='signup_form'>
                <h2>SignUp - { team } Team</h2>
                <div className='input_field'>
                    <label>Name</label>
                    <input type = "text" placeholder='Name' required onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div className='input_field'>
                    <label>Email</label>
                    <input type = "email" placeholder='Email' required onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className='input_field'>
                    <label>Password</label>
                    <input type = "password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button type = "submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;