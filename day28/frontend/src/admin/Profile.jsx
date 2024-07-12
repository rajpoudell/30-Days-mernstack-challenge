import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/profile/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img className="w-full" src={user.avatar_url} alt={user.login} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{user.name}</div>
          <p className="text-gray-700 text-base">{user.bio}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <div className="flex items-center mb-2">
            <svg
              className="w-6 h-6 text-gray-600 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.1 2 5 5.1 5 9c0 1.7.6 3.2 1.6 4.4L12 22l5.4-8.6c1-1.2 1.6-2.7 1.6-4.4 0-3.9-3.1-7-7-7zm0 10c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" />
            </svg>
            <span>{user.location}</span>
          </div>
          <div className="flex items-center mb-2">
            <svg
              className="w-6 h-6 text-gray-600 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a10 10 0 0 0-3.14 19.45c.5.1.68-.22.68-.48v-1.68c-2.77.6-3.37-1.33-3.37-1.33-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.02 1.53 1.02.89 1.53 2.34 1.09 2.91.84.09-.64.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.96 0-1.1.39-2 .1-2.72 0 0 .82-.26 2.72 1 .78-.22 1.6-.33 2.42-.33s1.64.11 2.42.33c1.9-1.27 2.72-1 2.72-1 .39.73.1 1.62.1 2.72 0 3.86-2.34 4.71-4.57 4.96.36.31.68.92.68 1.85v2.75c0 .26.18.58.68.48A10 10 0 0 0 12 2z" />
            </svg>
            <a
              href={user.html_url}
              className="text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.login}
            </a>
          </div>
          <div className="flex items-center mb-2">
            <svg
              className="w-6 h-6 text-gray-600 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 3.9 2.5 7.24 6 8.48V23h2v-2h2v2h2v-2.52c3.5-1.24 6-4.58 6-8.48 0-4.97-4.03-9-9-9zm-2.5 15.5V20h-2v-1.5C6.67 17.74 5 15.51 5 13c0-3.87 3.13-7 7-7s7 3.13 7 7c0 2.51-1.67 4.74-4.5 5.5zM8 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
            </svg>
            <span>{user.public_repos} Repos</span>
          </div>
          <div className="flex items-center mb-2">
            <svg
              className="w-6 h-6 text-gray-600 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4a8 8 0 1 1-6.61 3.34A7.91 7.91 0 0 1 12 4m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
            <span>{user.followers} Followers</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-gray-600 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
            <span>{user.following} Following</span>
          </div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <a
            href={user.blog}
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
