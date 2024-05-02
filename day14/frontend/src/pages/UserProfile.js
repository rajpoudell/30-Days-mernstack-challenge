// UserProfile.js

import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:4000/tasks");
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

    </>
  );
};

export default UserProfile;
