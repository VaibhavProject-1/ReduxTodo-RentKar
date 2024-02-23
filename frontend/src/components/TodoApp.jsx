import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo,addTodoAsync } from '../redux/actions/todoActions'; // Import the addTodo action creator
import './TodoApp.css';
import axios from 'axios';

const TodoApp = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);
  console.log("Todos: ",todos);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dispatch the fetchTodos action
        dispatch(fetchTodos());

        // Dispatch the fetchTodos action and await its completion
        const action = dispatch(fetchTodos());
        
        // Log the action (including its type and payload)
        
        // Once the action is dispatched and resolved, log a message or perform any other actions
        console.log('Fetch Todos action dispatched successfully');
        console.log('Fetch Todos action dispatched:', action);
        console.log("Todos inside useEffect: ",todos);
      } catch (error) {
        // Handle any errors that occur during the action dispatch
        console.error('Error dispatching fetchTodos:', error.message);
      }
    };
  
    // Call the fetchData function to initiate the action dispatch
    fetchData();
  }, [dispatch]);
  

  // Log the current state of todos
console.log("Todos outside useEffect: ",todos);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make an HTTP POST request to add the todo to the backend
    //   const response = await axios.post('http://localhost:5000/api/todos', { name, description });
      
      // Dispatch the ADD_TODO action to add the todo to the Redux store
      dispatch(addTodoAsync(name, description));
      
      // Reset the form fields
      setName('');
      setDescription('');
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Error adding todo:', error.message);
    }
  };

  

  return (
    <div className="todo-app">
      <h2>My Todos</h2>
      <div className="add-todo">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button type="submit">Add Task</button>
        </form>
      </div>
      {Array.isArray(todos) && todos.length > 0 ? (
  todos.map((todo) => (
    <div key={todo._id} className="todo-task">
      <h3>{todo.name}</h3>
      <p>{todo.description}</p>
      <button>Complete</button>
      <button>Delete</button>
    </div>
  ))
) : (
  <p>No todos</p>
)}

    </div>
  );  
};

export default TodoApp;