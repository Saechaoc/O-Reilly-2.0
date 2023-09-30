import { api } from "../../Config/apiConfig";
import {
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_ALL_PRODUCTS_REQUEST,
  FIND_ALL_PRODUCTS_SUCCESS,
  FIND_ALL_PRODUCTS_FAILURE,
} from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({
    type: FIND_PRODUCTS_REQUEST,
  });

  const { minPrice, maxPrice, category, stock, sort, pageNumber, pageSize } =
    reqData;

  try {
    const { data } = await api.get(
      `/api/products/?minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    dispatch({
      type: FIND_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCTS_FAILURE,
      payload: error.message,
    });
  }
};

export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({
    FIND_PRODUCT_BY_ID_REQUEST,
  });
  const { pid } = reqData;
  try {
    const { data } = await api.get(`/api/products/${pid}`);
    dispatch({
      type: FIND_PRODUCT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCT_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};

export const findAllProducts = () => async (dispatch) => {
  dispatch({
    type: FIND_ALL_PRODUCTS_REQUEST,
  });
  try {
    const { data } = await api.get(`/api/products/`);
    dispatch({
      type: FIND_ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_ALL_PRODUCTS_FAILURE,
      payload: error.message,
    });
  }
};
