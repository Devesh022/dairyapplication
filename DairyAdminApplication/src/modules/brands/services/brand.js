import {
  GET_ALL_BRANDS,
  POST_ALL_BRANDS,
  UPDATE_ALL_BRANDS,
  DELETE_ALL_BRANDS,
} from './../constants';
import { api } from './../../../utils';

export const fetchAllBrands = async () => {
  return await api().get(`${GET_ALL_BRANDS}`);
};

export const addBrand = async (data) => {
  return await api().post(`${POST_ALL_BRANDS}`, data);
};

export const updateBrand = async (data) => {
  return await api().put(`${UPDATE_ALL_BRANDS}/${data.id}`, data);
};

export const deleteBrand = async (data) => {
  return await api().delete(`${DELETE_ALL_BRANDS}/${data.id}`);
};
