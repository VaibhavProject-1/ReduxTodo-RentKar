import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos ,addTodoAsync, deleteTodo, updateTodo, completeTodo  } from '../redux/actions/todoActions'; // Import the addTodo action creator
import './TodoApp.css';

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
        
      } catch (error) {
        // Handle any errors that occur during the action dispatch
        console.error('Error dispatching fetchTodos:', error.message);
      }
    };
  
    // Call the fetchData function to initiate the action dispatch
    fetchData();
  }, [dispatch]);
  
  

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
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

  const handleCompleteTodo = async (id) => {
    try {
      // Dispatch the UPDATE_TODO action to mark the todo as completed
      dispatch(completeTodo(id));

      // After successful completion, re-fetch the todos
      dispatch(fetchTodos());

    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Error completing todo:', error.message);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      // Dispatch the DELETE_TODO action to delete the todo
      dispatch(deleteTodo(id));

      // After successful deletion, re-fetch the todos
      dispatch(fetchTodos());


    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Error deleting todo:', error.message);
    }
  };

  const handleUpdateTodo = async (id) => {
    try {
      // Implement logic to get new name and description from user input, for example using prompt or a form
      const newName = prompt('Enter new name:');
      const newDescription = prompt('Enter new description:');
  
      if (newName !== null && newDescription !== null) {
        // Dispatch the UPDATE_TODO action to update the todo
        dispatch(updateTodo(id, newName, newDescription));

        // After successful updation, re-fetch the todos
        dispatch(fetchTodos());
      } else {
        // Handle empty input or cancelation
        console.log('Name and description cannot be empty');
      }
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Error updating todo:', error.message);
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
    <div key={todo._id} className={`todo-task ${todo.completed ? 'completed' : ''}`}>
      <h3>{todo.name}</h3>
      <p>{todo.description}</p>
      <button onClick={() => handleCompleteTodo(todo._id)}>Complete</button>
      <button onClick={() => handleUpdateTodo(todo._id)}>Update</button>
      <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
    </div>
  ))
) : (
  <p>No todos</p>
)}

    </div>
  );  
};

export default TodoApp;