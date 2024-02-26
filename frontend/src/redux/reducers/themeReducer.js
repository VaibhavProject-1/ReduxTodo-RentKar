// themeReducer.js

import { TOGGLE_DARK_MODE } from '../actions/themeActions';

const initialState = {
  darkMode: false,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode, // Toggle the dark mode state
      };
    default:
      return state;
  }
};

export default themeReducer;
