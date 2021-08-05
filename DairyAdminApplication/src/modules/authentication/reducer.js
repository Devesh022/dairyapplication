import * as t from './actionTypes';

export const initialState = {
  user: undefined,
  token: null,
  loading: false,
  error: null,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.LOGGED_IN: {
      let {user} = action;

      return {...state, loading: false, user};
    }

    case t.LOGGED_OUT: {
      return {
        ...state,
        loading: false,
        user: undefined,
        token: null,
        error: null,
      };
    }

    case t.SET_LOADING: {
      let {loading} = action;
      return {...state, loading: loading};
    }

    case t.SET_TOKEN: {
      const {token} = action;
      return {...state, token};
    }

    case t.CLEAR_TOKEN: {
      return {...state, token: null};
    }

    case t.RESET: {
      return {
        ...state,
        ...initialState,
      };
    }

    default:
      return state;
  }
};

export default authenticationReducer;
