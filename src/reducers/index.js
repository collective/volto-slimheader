/**
 * SlimHeader reducer.
 * @module reducers/slimHeaderReducer
 */

import { GET_SLIMHEADER } from '../actions';

const initialState = {
  error: null,
  hasErrror: false,
  result: [],
  loadingResults: false,
};

export const slimHeaderReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${GET_SLIMHEADER}_PENDING`:
      return {
        ...state,
        loadingResults: true,
      };
    case `${GET_SLIMHEADER}_SUCCESS`:
      return {
        ...state,
        result: action.result,
        loadingResults: false,
      };
    case `${GET_SLIMHEADER}_FAIL`:
      return {
        ...state,
        error: action.error,
        hasError: true,
        loadingResults: false,
      };
    default:
      return state;
  }
};
