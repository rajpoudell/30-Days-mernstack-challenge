import { useState,useEffect } from "react";
import './App.css';


function App() {
const [backendData, setBackendData] = useState([{}]);

useEffect(() => {
  fetch("/api").then(
    response => response.json()
  ).then(
    data =>{
      setBackendData(data)
    }

  )
  .catch(error => console.error("Error fetching /api:", error))

  ;

}, [])


  return (
    <div className="App">
      {(typeof backendData.messages === 'undefined') ? (
        <p>Loading...</p>
      ):
      backendData.messages.map((msg,i) => (
        <p key={i}>{msg}</p>
      ))}
    </div>
  );
}

export default App;
