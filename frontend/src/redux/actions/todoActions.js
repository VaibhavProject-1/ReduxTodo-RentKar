// todoActions.js

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Action types
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';
export const ADD_TODO = 'ADD_TODO'; // Define action type for adding a todo

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
