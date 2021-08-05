import AsyncStorage from '@react-native-community/async-storage';

import * as services from './services/authentication';
import { LOGGED_IN, RESET, SET_TOKEN } from './actionTypes';

export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: LOGGED_IN,
      user
    });
  }
}

export const setToken = (token) => {
  return dispatch => {
    dispatch({
      type: SET_TOKEN,
      token
    });
  }
}

export const clearStore = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({
      type: RESET,
    });
  };
};

export function forgotPassword(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      services
        .forgotPassword(data)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  };
}

export function login(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      services
        .login(data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export function me(cancelToken) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      services
        .me(cancelToken)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export function logout(fcmToken) {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      services
        .logout(fcmToken)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}