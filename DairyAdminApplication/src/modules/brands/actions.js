import { SET_BRAND_LIST } from './actionTypes';
import * as brandService from './services/brand';

export const setBrandListInStore = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_BRAND_LIST,
      brands: data,
    });
  };
};

export const addNewBrandInStore = (data) => {
  return (dispatch) => {
    // TODO add the new brand to list using javascript functions
  };
};

export const updateBrandInStore = (data) => {
  return (dispatch) => {
    // TODO update the brand using javascript functions
  };
};

export const deleteBrandFromStore = (data) => {
  return (dispatch) => {
    // TODO delete the brand from store using javascript functions
  };
};

export const getAllBrands = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      brandService
        .fetchAllBrands()
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  };
};

export const createBrand = (data) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      brandService
        .addBrand(data)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  };
};

export const updateBrand = (data) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      brandService
        .updateBrand(data)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  };
};

export const deleteBrand = (data) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      brandService
        .deleteBrand(data)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  };
};
