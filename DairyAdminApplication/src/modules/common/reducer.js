import * as t from './actionTypes';

export const initialState = {
  appReady: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.SET_APP_READY: {
      return {
        ...state,
        appReady: true,
      };
    }
    case t.RESET_APP_READY: {
      return {
        ...state,
        appReady: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
