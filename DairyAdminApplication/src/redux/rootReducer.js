import { combineReducers } from 'redux';

import { reducer as loaderReducer } from './loader';
import { reducer as commonReducer } from '../modules/common';
import { reducer as authenticationReducer } from '../modules/authentication';
import { reducer as brandReducer } from '../modules/brands';

// Combine all the reducers
const rootReducer = combineReducers({
  loaderReducer,
  commonReducer,
  authenticationReducer,
  brandReducer,
});

export default rootReducer;
