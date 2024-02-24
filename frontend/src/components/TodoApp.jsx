import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos ,addTodoAsync, deleteTodo, updateTodo, completeTodo  } from '../redux/actions/todoActions'; // Import the addTodo action creator
import './TodoApp.css';
import UpdateTodoModal from './UpdateTodoModal';
console.log(process.env.REACT_APP_BACKEND_URL);


const TodoApp = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);
  console.log("Todos: ",todos);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null); // Track the selected todo for updating
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

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
    // Find the selected todo from the todos array
    const selected = todos.find(todo => todo._id === id);
    if (selected) {
      // Set the selected todo and open the modal
      setSelectedTodo(selected);
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    // Close the modal
    setShowModal(false);
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
{/* Render the modal if showModal is true */}
{showModal && (
        <UpdateTodoModal
          id={selectedTodo._id}
          currentName={selectedTodo.name}
          currentDescription={selectedTodo.description}
          onUpdate={updateTodo} // Pass the updateTodo action creator
          onClose={handleModalClose}
        />
      )}
    </div>
  );  
};

export default TodoApp;