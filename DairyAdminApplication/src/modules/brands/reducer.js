import * as t from './actionTypes';
const initialState = {
  brands: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.SET_BRAND_LIST: {
      const { brands } = action;
      return {
        ...state,
        brands: brands,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
