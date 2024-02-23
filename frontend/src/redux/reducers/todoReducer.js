// todoReducer.js

import { FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE, ADD_TODO } from '../actions/todoActions';

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
    default:
      return state;
  }
};

export default todoReducer;
