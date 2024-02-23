// todoReducer.js

import { FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE, ADD_TODO, DELETE_TODO, UPDATE_TODO, COMPLETE_TODO } from '../actions/todoActions';

const initialState = {
  loading: false,
  todos: [],
  error: null
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload,
        error: null
      };
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        todos: [],
        error: action.payload
      };
      case ADD_TODO:
        return {
          ...state,
          todos: [...state.todos, action.payload]
        };
        case DELETE_TODO:
        const updatedTodosAfterDelete = state.todos.filter(todo => todo.id !== action.payload);
        return {
          ...state,
          todos: [...updatedTodosAfterDelete], // Use spread operator to create a new array
        };

      case UPDATE_TODO:
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload.id ? { ...todo, name: action.payload.name, description: action.payload.description } : todo
          )
        };

      case COMPLETE_TODO:
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload ? { ...todo, completed: true } : todo
          )
        };
    default:
      return state;
  }
};

export default todoReducer;
