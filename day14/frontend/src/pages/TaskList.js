import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/tasks');
        console.log("response data",response.data);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.response?.data?.message || error.message);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {console.log("Tasks ------>",tasks)}
        {tasks.map((task,_id) => (
          <ul key={task._id}>
          <li >Title: {task.title}</li>
          <li >Description: {task.description}</li>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
