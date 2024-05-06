import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode }  from "jwt-decode";

const Profile = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        //get token from localstorage
        const token = localStorage.getItem('token');
        // Get user details from local storage
        const employee = localStorage.getItem('employee');

        const validateResult = validateToken(token);

        if(validateResult) {

          if (employee) {
            setUser(JSON.parse(employee))
          }
        }
        else {
          if(token) localStorage.removeItem('token');
          if(employee) localStorage.removeItem("employee");
          navigate('/');
        }
      }, [])

      const validateToken = (token) => {

        if(!token) {
          return false;
        }

        const decoded = jwtDecode(token);

        if(!decoded || (decoded.exp && Date.now() > decoded.exp * 1000 )) {
          return false;
        }

        return true;
      }

      const handleNav = (e) => {
        e.preventDefault();
        navigate('/inventory')
      }

    return (user) ? (
      <div className = "main-div" style={{height : "100vh", width : "100%", display: "flex", flexDirection: "column", justifyContent : "center", alignItems : "center",}}>
        <div className="container" style={{width : "30%", textAlign : "center"}}>
          <div className="bg-dark text-white" style={{width : "100%", padding : "30px 30px", borderRadius : "16px", textAlign: "left"}}>
              <img className="card-img-top" src="#" alt="Profile Picture"/>
              <div style={{margin : "12px 0"}}>
                  <h5>Name: {user.name}</h5>
                  <p>Email: {user.email}</p>
                  <p>ID: {user.id}</p>
              </div>
          </div>
        <button className="btn btn-primary text-white" style={{margin : "20px 0"}}>See other details</button>
        <button className="btn btn-secondary text-white" onClick={handleNav}>Go to Inventory</button>
        </div>
      </div>
     ) : (
        <div>
          No data to display
        </div>
     )
}

export default Profile