// import "./profile.css";
import React, { useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';
import "./profile.css"
import { Link } from "react-router-dom";
const Profile = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decode =  jwtDecode(token);
      setToken(token);
      setUserId(decode.userId);
      fetch(`https://three0-days-mernstack-challenge-1.onrender.com/${decode.userId}`,{
        method:'GET',
        headers: { 
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then(data => {
        setName(data.username);
        setEmail(data.email);
       })
      
    }

  }, []);

  return (
    <div className="profile">

       <h1 className="child">Name: {name}</h1>
       <h2 className="child">Email: {email}</h2>
       <h3 className="token child">Token: {token}</h3>
       <h3 className="child">UserId: {userId}</h3>
        <button className="btn1"><Link to='/editprofile'> &#xf044; click here for updating user detail </Link></button>
         
     </div>

  );
};

export default Profile;
