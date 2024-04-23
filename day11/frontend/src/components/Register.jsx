import React, { useState ,useRef} from 'react';
import './register.css';

const Register = () => {
  const [message, setMessage] = useState(""); 
  const [imagePath, setImagePath] = useState(""); 
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    try {
      const response = await fetch('http://localhost:4000/register',{
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setMessage(data.message);
      if(response.ok) {
        setImagePath(data.imagePath);
        formRef.current.reset();
      }else{
        setImagePath('');
      }
      setTimeout(() => {
        setMessage('');
      }, 2000);
   
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while uploading.');
      setImagePath('');
    }
  }



  return (
    <div className="centered-form">
      <form id="userForm" ref={formRef} encType="multipart/form-data" onSubmit={handleSubmit}>
        <h1>User Registration</h1>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName"/>
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName"/>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email"/>
        </div>
        <div>
          <label htmlFor="file">Choose a profile picture:</label>
          <input type="file" id="file" name="files"/>
        </div>
        <input type="submit" value="Submit" />
      </form>
      <div id="message">{message}</div>
      {imagePath && (
        <div id="image">
          <img src={imagePath} alt="User" />
        </div>
      )}
    </div>
  );
};

export default Register;
