import {LOGIN, FORGOT_PASSWORD, ME, LOGOUT} from '../constants';
import {api} from './../../../utils';

export const login = async (data) => {
  return await api().post(LOGIN, data);
};

export const forgotPassword = async (data) => {
  return await api().post(FORGOT_PASSWORD, data);
};

export const me = async () => {
  return await api().get(ME, data);
};

export const logout = async () => {
  return await api().post(LOGOUT, {});
};