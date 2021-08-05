import {RESET_APP_READY, SET_APP_READY} from './actionTypes';

export const resetAppReady = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_APP_READY,
    });
  };
};

export const setAppReady = () => {
  return (dispatch) => {
    dispatch({
      type: SET_APP_READY,
    });
  };
};
