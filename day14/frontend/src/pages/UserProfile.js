// UserProfile.js

import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:4000/details");
        const usersData = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div>UserProfile</div>
      <div>
      {users.map((user, index) => (
              <ul key={index}>
                <li>{user.firstName} {user.lastName}</li>
                <li>{index+1}</li>
                <li>{user.email}</li>
                <li>{user.files.filename}</li>
                <li><img src={`http://localhost:4000/${user.files.path}`} alt="User Image" /></li>
              </ul>
            ))}
      </div>
    </>
  );
};

export default UserProfile;
