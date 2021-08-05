import { SET_LOADING, RESET_LOADER } from './actionTypes';

export function setLoading(text) {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
      loading: true,
      text,
    });
  };
}

export function resetLoader() {
  return (dispatch) => {
    dispatch({
      type: RESET_LOADER,
    });
  };
}
