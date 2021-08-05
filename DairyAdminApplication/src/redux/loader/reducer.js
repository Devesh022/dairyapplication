import { SET_LOADING, SET_LOADING_TEXT, RESET_LOADER } from './actionTypes';

export const initialState = {
  loading: false,
  text: null,
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING: {
      let { text } = action;
      return { ...state, loading: true, text };
    }

    case RESET_LOADER: {
      return { ...state, loading: false, text: null };
    }

    default:
      return state;
  }
};

export default loaderReducer;
