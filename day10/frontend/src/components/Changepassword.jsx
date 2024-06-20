import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userId, setUserId] = useState("");
  // const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      // setToken(storedToken);
      setUserId(decodedToken.userId);
    }

    try {
      const response = await fetch(`http://localhost:4000/change-password/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Log the response message
        alert("Success change password");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2 className='changeheading child'>Change Password</h2>
      <form onSubmit={handleSubmit} className='profile'>
        <label>Old Password:</label><br />
        <input type="password" value={oldPassword} className='child' onChange={(e) => setOldPassword(e.target.value)} required /><br />
        <label>New Password:</label><br />
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='child' required /><br /><br />
        <button type="submit" className='btn'>Update Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
