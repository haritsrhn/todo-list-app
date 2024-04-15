import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/"; // Your Django backend URL

// Fetch todo items
const fetchTodoItems = () => {
  return axios.get(`${baseUrl}/tasks/`);
};

// Add new todo item
const addTodoItem = (data) => {
  return axios.post(`${baseUrl}/tasks/add`, data);
};

// Update todo item
const updateTodoItem = (id, data) => {
  return axios.put(`${baseUrl}/tasks/${id}/update/`, data);
};

// Delete todo item
const deleteTodoItem = (id) => {
  return axios.delete(`${baseUrl}/tasks/${id}/delete/`);
};
