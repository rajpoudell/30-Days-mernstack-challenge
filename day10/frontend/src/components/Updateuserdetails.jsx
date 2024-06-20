import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import "./updateuserdetails.css";
import ChangePassword from "./Changepassword";

const Updateuserdetails = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      setToken(token);
      setUserId(decode.userId);
      fetch(`https://three0-days-mernstack-challenge-1.onrender.com/${decode.userId}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch");
          }
          return response.json();
        })
        .then((data) => {
          setName(data.username);
          setEmail(data.email);
        });
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://three0-days-mernstack-challenge-1.onrender.com/${userId}`,
        { username: newUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setName(newUsername);
        setMessage("Username updated successfully!");
        alert("Username updated successfully!");
        setNewUsername(""); // Clear the input field
      }
    } catch (error) {
      setMessage("Failed to update username.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form action="" onSubmit={handleUpdate} className="profile">
        <label htmlFor="username"> Username: </label>
        <input
          type="text"
          name="Name"
          id="username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="child"
          required
        />
        
        <input
          type="text"
          name="Name"
          id="email"
          value={`Email: ${email}`}
          onChange={(e) => alert("email can't be changed")}
          className="child"
          disabled
        />
        <p>Username: {name}</p>
        <br />
        <button className="btn" type="submit">
          {" "}
          Update Username
        </button>
      </form>
      {message && <p>{message}</p>}

      <ChangePassword/>
    </>
  );
};

export default Updateuserdetails;
