// rootReducer.js

import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  todos: todoReducer, // Assuming you have a reducer named todoReducer for managing todos
  theme: themeReducer,
});

export default rootReducer;