import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error Response Text:", errorText);
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Response Data:", data);

        setUser(data);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center my-5 font-sans">
        {user.files && (
          <div className="mb-5">
            <img
              src={`http://localhost:4000/${user.files.path}`}
              alt={user.files.filename}
              className="max-w-xs max-h-xs rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        )}
        <h1 className="text-2xl font-bold text-gray-800">
          Name: {user.username}
        </h1>
        <p className="text-lg text-gray-600">Email: {user.email}</p>
        <p className="text-lg text-gray-500">Role: {user.role}</p>
        
      </div>

    </>
  );
};

export default Profile;
