// import "./profile.css";
import React, { useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';
import "./profile.css"
const Profile = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('tokens');
    if (token) {
      const decode =  jwtDecode(token);
      setToken(token);
      setUserId(decode.userId);
      fetch("http://localhost:4000/",{
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
        setName(data.name);
        setEmail(data.email);
       })
      
    }

  }, []);

  return (
    <>
    <h1>Name: {name}</h1>
    <h2>email: {email}</h2>
    <h3 className="token">token: {token}</h3>
    <h3>userId: {userId}</h3>
    </>

  );
};

export default Profile;
