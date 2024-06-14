import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { User } from "./User";

// ...imports

export const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    job:"",
    salary: "" 
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    // The following log may not reflect the updated state immediately
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        "http://localhost:4000/user",
        formData
      );
      
      console.log("Post created.", response.data);
      alert("Form submitted successfully!");

      // Reset the form fields
      setFormData({
        name: "",
        job: "",
        salary: ""
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          name:
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="job">
          Job:
          <input
            id="job"
            name="job"
            value={formData.job}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="salary">
          salary:
          <input
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add Post</button>
      </form>
      <User/>
    </div>
  );
};
