// UserProfile.js

import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get the authentication token from local storage or cookie
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

        // Make a GET request to fetch user tasks, including the token in the headers
        const response = await fetch("http://localhost:4000/user/task", {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the 'Authorization' header
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user tasks');
        }

        // Parse the response data
        const usersData = await response.json();
        console.log("users data", usersData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <>
      <h1>Your Blog</h1>
      <div className="task-list">
        {users.map((task) => (
          <div key={task._id} className="task-card">
            <div className="task-details">
              <h3 className="task-title">Title: {task.title}</h3>
              <p className="task-description">
                Description: {task.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </>
  );
};

export default UserProfile;
