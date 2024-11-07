import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleEditInputChange = (event) => {
    setEditTaskText(event.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: taskInput, completed: false },
      ]);
      setTaskInput('');
    }
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditTaskId(taskId);
    setEditTaskText(taskToEdit.text);
  };

  const handleSaveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editTaskId ? { ...task, text: editTaskText } : task
      )
    );
    setEditTaskId(null);
    setEditTaskText('');
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="task-input-container">
        <input
          type="text"
          value={taskInput}
          onChange={handleInputChange}
          placeholder="Enter a task"
        />
        <button className="add-task-btn" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      {editTaskId && (
        <div className="edit-task-container">
          <input
            type="text"
            value={editTaskText}
            onChange={handleEditInputChange}
            placeholder="Edit task"
          />
          <button className="save-edit-btn" onClick={handleSaveEdit}>
            Save
          </button>
        </div>
      )}

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span
              className="task-text"
              onClick={() => handleToggleComplete(task.id)}
            >
              {task.text}
            </span>
            <button
              className="edit-btn"
              onClick={() => handleEditTask(task.id)}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDeleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
