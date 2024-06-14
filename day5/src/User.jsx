import React, { useEffect, useState } from 'react';
import "./index.css";

export const User = () => {
  const [fetchData, setFetchData] = useState([]);
  const [loader, setLoader] = useState(true); // Assume loading starts as true initially

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setFetchData(data || []); 
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {

        setLoader(false);

      }
    };

    fetchData(); 

  }, []); 

  return (
    <div className="App">
      {loader ? (
        <div className="loader">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      ) : (
        <div>
          <h1>Posts:</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {fetchData.map((post) => (
                <tr key={post._id}>
                  <td>{post.name}</td>
                  <td>{post.job}</td>
                  <td>{post.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
