import React, { useState, useEffect } from 'react';
import "./users.css"
const UserDetails = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/details');
        const usersData = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);

 const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data.message);
      if (response.ok) {
        setUsers(users.filter(user => user._id !== id));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="table-container">
      <h1>User Details</h1>
      <div id="usersTable">
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>S/N</th>
              <th>Email</th>
              <th>File Name</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{index+1}</td>
                <td>{user.email}</td>
                <td>{user.files.filename}</td>
                <td><img src={`http://localhost:4000/${user.files.path}`} alt="User Image" /></td>
                <td ><button className='del' onClick={() => handleDelete(user._id)}>Del</button></td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetails;
