import {
  CREATE_RATING_FAILURE,
  CREATE_RATING_REQUEST,
  CREATE_RATING_SUCCESS,
  GET_PRODUCT_RATING_FAILURE,
  GET_PRODUCT_RATING_REQUEST,
  GET_PRODUCT_RATING_SUCCESS,
} from "./ActionType";

const initialState = {
  rating: null,
  ratings: [],
  isLoading: false,
  error: null,
};

export const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RATING_REQUEST:
    case GET_PRODUCT_RATING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_RATING_SUCCESS:
      return {
        ...state,
        rating: action.payload,
        isLoading: false,
        error: null,
      };
    case CREATE_RATING_FAILURE:
    case GET_PRODUCT_RATING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_PRODUCT_RATING_SUCCESS:
      return {
        ...state,
        ratings: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
