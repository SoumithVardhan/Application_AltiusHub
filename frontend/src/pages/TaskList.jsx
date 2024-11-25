import  { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/tasks").then((res) => setTasks(res.data));
  }, []);

  const deleteTask = (id) => {
    axios.delete(`http://localhost:4000/tasks/${id}`).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  return (
    <div>
      <h1>Task List</h1>
      <Link to="/create">Create Task</Link>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <Link to={`/edit/${task.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
