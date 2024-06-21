import React, { useState, useEffect } from 'react';
import "./users.css"

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // State to hold user being edited
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/details');
      const usersData = await response.json();
      setUsers(usersData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

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

  const handleEdit = (user) => {
    setEditingUser(user);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:4000/edit/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email }),
      });
      const data = await response.json();
      console.log(data.message);
      if (response.ok) {
        fetchUsers(); // Refresh user list
        setEditingUser(null); // Clear editing state
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCloseModal = () => {
    setEditingUser(null); // Clear editing state when modal is closed
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
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>{user.files.filename}</td>
                <td><img src={`http://localhost:4000/${user.files.path}`} alt=""  /></td>
                <td><button className='edit' onClick={() => handleEdit(user)}>Edit</button></td>
                <td><button className='del' onClick={() => handleDelete(user._id)}>Del</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Editing User */}
      {editingUser && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Edit User</h2>
            <form onSubmit={handleUpdate}>
              <label>
                First Name:
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserDetails;
