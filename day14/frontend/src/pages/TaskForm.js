import React, { useState } from "react";
import axios from "axios";
import "./taskform.css";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:4000/api/task",
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Blog created successfully :)");
      setTitle("");
      setDescription("");
      // Optionally, refresh task list after creating task
    } catch (error) {
      console.error(
        "Error creating task:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="taskForm">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-fieldoftaskForm"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea-fieldtaskForm"
      />
      <button type="submit" className="submit-buttontaskForm">
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
