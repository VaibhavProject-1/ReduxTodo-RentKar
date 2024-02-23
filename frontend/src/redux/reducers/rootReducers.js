// rootReducer.js

import { combineReducers } from 'redux';
import todoReducer from './todoReducer'; // Import your todo reducer

const rootReducer = combineReducers({
  todos: todoReducer // Assuming you have a reducer named todoReducer for managing todos
  // Add more reducers here if needed
});

export default rootReducer;