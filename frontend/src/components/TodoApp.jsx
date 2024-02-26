import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodoAsync, deleteTodo, updateTodo, completeTodo } from '../redux/actions/todoActions';
import { SnackbarProvider, useSnackbar } from 'notistack';
import './TodoApp.css';
import UpdateTodoModal from './UpdateTodoModal';

const TodoApp = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchTodos());
      } catch (error) {
        console.error('Error dispatching fetchTodos:', error.message);
        enqueueSnackbar('Error fetching todos!', { variant: 'error' });
      }
    };

    fetchData();
  }, [dispatch, enqueueSnackbar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(addTodoAsync(name, description));
      setName('');
      setDescription('');
      enqueueSnackbar('Todo added successfully!', { variant: 'success' });
    } catch (error) {
      console.error('Error adding todo:', error.message);
      enqueueSnackbar('Error adding todo!', { variant: 'error' });
    }
  };

  const handleCompleteTodo = async (id) => {
    try {
      await dispatch(completeTodo(id));
      dispatch(fetchTodos());
      enqueueSnackbar('Todo completed successfully!', { variant: 'success' });
    } catch (error) {
      console.error('Error completing todo:', error.message);
      enqueueSnackbar('Error completing todo!', { variant: 'error' });
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await dispatch(deleteTodo(id));
      dispatch(fetchTodos());
      enqueueSnackbar('Todo deleted successfully!', { variant: 'success' });
    } catch (error) {
      console.error('Error deleting todo:', error.message);
      enqueueSnackbar('Error deleting todo!', { variant: 'error' });
    }
  };

  const handleUpdateTodo = async (id) => {
    const selected = todos.find(todo => todo._id === id);
    if (selected) {
      setSelectedTodo(selected);
      await setShowModal(true); // Wait for the modal to show
    }
  };
  

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleUpdate = async (updatedTodo) => {
    try {
      // Dispatch the updateTodo action with the updated todo object
      dispatch(updateTodo(updatedTodo));
      // Fetch the todos again to update the state
      dispatch(fetchTodos());
      // Show a success snackbar
      enqueueSnackbar('Todo updated successfully!', { variant: 'success' });
      // Close the modal
      setShowModal(false);
    } catch (error) {
      // Show an error snackbar if there was an error
      console.error('Error updating todo:', error.message);
      enqueueSnackbar('Error updating todo!', { variant: 'error' });
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
      {showModal && (
        <UpdateTodoModal
          id={selectedTodo._id}
          currentName={selectedTodo.name}
          currentDescription={selectedTodo.description}
          onUpdate={handleUpdate}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

const AppWithSnackbar = () => (
  <SnackbarProvider maxSnack={3}>
    <TodoApp />
  </SnackbarProvider>
);

export default AppWithSnackbar;