import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchTodoItems();
  }, []);

  const fetchTodoItems = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/tasks/");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching todo items:", error);
    }
  };

  const addTask = async (text) => {
    try {
      const currentDate = new Date();
      const newTask = {
        text,
        completed: false,
        date: currentDate.toLocaleDateString(),
        time: currentDate.toLocaleTimeString(),
      };
      await axios.post("http://127.0.0.1:8000/api/tasks/", newTask);
      fetchTodoItems();
      setText("");
    } catch (error) {
      console.error("Error adding todo item:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`);
      fetchTodoItems();
    } catch (error) {
      console.error("Error deleting todo item:", error);
    }
  };

  const editTask = async (id, newText) => {
    try {
      const currentDate = new Date();
      await axios.put(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        text: newText,
        completed: false,
        date: currentDate.toLocaleDateString(),
        time: currentDate.toLocaleTimeString(),
      });
      fetchTodoItems();
    } catch (error) {
      console.error("Error editing todo item:", error);
    }
  };

  const toggleCompleted = async (id) => {
    try {
      const task = tasks.find((task) => task.id === id);
      await axios.put(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        ...task,
        completed: !task.completed,
      });
      fetchTodoItems();
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  return (
    <div className="todo-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
          editTask={editTask}
        />
      ))}
      <input
        className="todo-input"
        placeholder="What is the task today?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="todo-btn" onClick={() => addTask(text)}>
        Add
      </button>
    </div>
  );
}

export default TodoList;
