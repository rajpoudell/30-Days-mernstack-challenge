import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const User = () => {

    const [fetchData, setFetchData] = useState([]);

    const [loader, setLoader] = useState(false);
  
  
    // Effect to fetch data when the component mounts
    useEffect(() => {
      let isMounted = true;
  
      const fetchData = async () => {
        try {
          // setLoader(true);
          const response = await axios.get('http://localhost:3001/');
  
          if (!response.data) {
            throw new Error('Failed to fetch data');
          }
  
          if (isMounted) {
            setFetchData(response.data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error state or show an error message to the user
        } finally {
          if (isMounted) {
            setLoader(false);
          }
        }
      };
  
      fetchData();
  
      return () => {
        // Cleanup function to set isMounted to false when the component is unmounted
        isMounted = false;
      };
    }, []);
     
  
    return (
      <div className="App">
  
          {loader ?
          <div className="loader">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
           </div> :
          <div>
            
          <h1>Posts:</h1>
           <ul>
          {fetchData.map((post) => (
            <li key={post._id}>{post.name}</li>
            ))}
        </ul>
            </div>
        }
      </div>
    )
}
