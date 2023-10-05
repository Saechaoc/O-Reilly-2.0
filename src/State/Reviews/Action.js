import { api } from "../../Config/apiConfig";
import {
  CREATE_RATING_FAILURE,
  CREATE_RATING_REQUEST,
  CREATE_RATING_SUCCESS,
  GET_PRODUCT_RATING_FAILURE,
  GET_PRODUCT_RATING_REQUEST,
  GET_PRODUCT_RATING_SUCCESS,
} from "./ActionType";

export const createRating = (reqData) => async (dispatch) => {
  dispatch({
    type: CREATE_RATING_REQUEST,
  });

  try {
    const { data } = await api.post("/api/ratings/create", reqData);

    dispatch({
      type: CREATE_RATING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_RATING_FAILURE,
      payload: error.message,
    });
  }
};

export const getProductRating = (reqData) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCT_RATING_REQUEST,
  });

  try {
    const { data } = await api.get(`/api/ratings/product/${reqData.pid}`);

    dispatch({
      type: GET_PRODUCT_RATING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_RATING_FAILURE,
      payload: error.message,
    });
  }
};
