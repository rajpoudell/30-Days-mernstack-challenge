import React, { useState, useEffect } from "react";
import axios from "axios";
import "./tasklist.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/tasks");
        // console.log("response data", response.data);
        setTasks(response.data);
      } catch (error) {
        console.error(
          "Error fetching tasks:",
          error.response?.data?.message || error.message
        );
      }
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <hr />
      <div className="task-list">
      {tasks.length == 0 ? <h1>There is no post in databases</h1>
     
     :

        tasks.map((task) => (
          <div key={task._id} className="task-card">
          <div className="task-details">
          <h3 className="task-title">Title: {task.title}</h3>
          <p className="task-description">
          Description: {task.description}
          </p>
          </div>
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default TaskList;
