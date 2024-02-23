// todoActions.js

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Action types
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';
export const ADD_TODO = 'ADD_TODO'; // Define action type for adding a todo
export const DELETE_TODO = 'DELETE_TODO'; // Define action type for deleting a todo
export const UPDATE_TODO = 'UPDATE_TODO'; // Define action type for updating a todo
export const COMPLETE_TODO = 'COMPLETE_TODO'; // Define action type for completing a todo

// Action creators
export const fetchTodosRequest = () => ({
  type: FETCH_TODOS_REQUEST
});

export const fetchTodosSuccess = (todos) => ({
  type: FETCH_TODOS_SUCCESS,
  payload: todos
});

export const fetchTodosFailure = (error) => ({
  type: FETCH_TODOS_FAILURE,
  payload: error
});

export const addTodoSuccess = (todo) => ({
  type: ADD_TODO,
  payload: todo
});


export const deleteTodoSuccess = (id) => ({ // Define action creator for deleting a todo
    type: DELETE_TODO,
    payload: id
  });
  
  export const updateTodoSuccess = (todo) => ({ // Define action creator for updating a todo
    type: UPDATE_TODO,
    payload: todo
  });

  export const completeTodoSuccess = (id) => ({ // Define action creator for completing a todo
    type: COMPLETE_TODO,
    payload: id
  });
  
  

// Async action creator for adding a todo
export const addTodoAsync = (name, description) => {
    return async (dispatch) => {
      try {
        // Make an HTTP POST request to add the todo to the backend
        const response = await axios.post('http://localhost:5000/api/todos', { name, description });
        
        // Dispatch the addTodoSuccess action to add the todo to the Redux store
        dispatch(addTodoSuccess(response.data));
        
        // Reset the form fields
        // You can dispatch additional actions here if needed
        
      } catch (error) {
        // Handle errors (e.g., display an error message)
        console.error('Error adding todo:', error.message);
        // You can dispatch additional actions here if needed
      }
    };
  };

// Async action creator for fetching todos
export const fetchTodos = () => {
    return async (dispatch) => {
      dispatch(fetchTodosRequest());
      try {
        const response = await axios.get('http://localhost:5000/api/todos');
        const todos = response.data; // Extract todos array from response
        // console.log(todos);
        dispatch(fetchTodosSuccess(todos));
      } catch (error) {
        dispatch(fetchTodosFailure(error.message));
      }
    };
  }

// Async action creator for adding a todo
export const addTodo = (todoData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5000/api/todos', todoData);
      dispatch(addTodoSuccess(response.data));
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  };
};

// Async action creator for deleting a todo
export const deleteTodo = (id) => { // Define async action creator for deleting a todo
    return async (dispatch) => {
      try {
        // Make an HTTP DELETE request to delete the todo from the backend
        await axios.delete(`http://localhost:5000/api/todos/${id}`);
        
        // Dispatch the deleteTodoSuccess action to delete the todo from the Redux store
        dispatch(deleteTodoSuccess(id));
        
      } catch (error) {
        // Handle errors (e.g., display an error message)
        console.error('Error deleting todo:', error.message, error.response.data);
      }
    };
  };
  
  // Async action creator for updating a todo
  export const updateTodo = (id, newName, newDescription) => { // Define async action creator for updating a todo
    return async (dispatch) => {
      try {
        // Make an HTTP PATCH request to mark the todo as completed in the backend
        const response = await axios.put(`http://localhost:5000/api/todos/${id}`, { name: newName, description: newDescription });
        
        // Dispatch the updateTodoSuccess action to update the todo in the Redux store
        dispatch(updateTodoSuccess(response.data));
        
      } catch (error) {
        // Handle errors (e.g., display an error message)
        console.error('Error updating todo:', error.message);
      }
    };
  };


  // Async action creator for completing a todo
export const completeTodo = (id) => { // Define async action creator for completing a todo
    return async (dispatch) => {
      try {
        await axios.put(`http://localhost:5000/api/todos/${id}/complete`, { completed: true }); // Assuming your backend expects a boolean value for completion
        dispatch(completeTodoSuccess(id));
      } catch (error) {
        console.error('Error completing todo:', error.message);
      }
    };
  };