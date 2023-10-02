import { api } from "../../Config/apiConfig";
import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";

export const addItemToCart = (reqData) => async (dispatch) => {
  dispatch({
    type: ADD_ITEM_TO_CART_REQUEST,
  });
  try {
    // console.log("Add item to cart data:", reqData);
    const { data } = await api.put("/api/cart/add", reqData);
    // updateCartItem(reqData);
    // console.log("Data in add Item To Cart ---------", data);

    dispatch({
      type: ADD_ITEM_TO_CART_SUCCESS,
      payload: data,
    });
    // console.log("Successfully dispatched add item to cart");

    return Promise.resolve(data);
  } catch (error) {
    dispatch({
      type: ADD_ITEM_TO_CART_FAILURE,
      payload: error.message,
    });
    return Promise.reject(error);
  }
};

export const removeCartItem = (reqData) => async (dispatch) => {
  dispatch({
    type: REMOVE_CART_ITEM_REQUEST,
  });
  try {
    const { data } = await api.delete(
      `/api/cart_items/${reqData.userId}/${reqData.id}`,
      reqData.data
    );
    dispatch({
      type: REMOVE_CART_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_CART_ITEM_FAILURE,
      payload: error.message,
    });
  }
};
export const updateCartItem = (reqData) => async (dispatch) => {
  dispatch({
    type: UPDATE_CART_ITEM_REQUEST,
  });
  try {
    // console.log("reqData-------", reqData.userId?.id);
    // console.log("reqData-------", reqData.cartItemId);
    // console.log(`/api/cart_items/${reqData.userId?.id}/${reqData.cartItemId}`);
    // console.log("Data in update_cart_item:", reqData);
    const { data } = await api.put(
      `/api/cart_items/${reqData.userId}/${reqData.id}`,
      reqData
    );
    dispatch({
      type: UPDATE_CART_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CART_ITEM_FAILURE,
      payload: error.message,
    });
  }
};

export const getCart = () => async (dispatch) => {
  dispatch({
    type: GET_CART_REQUEST,
  });
  try {
    // console.log("In Get Cart");
    const { data } = await api.get("/api/cart/");
    // console.log("Cart data ------", data);
    dispatch({
      type: GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_FAILURE,
      payload: error.message,
    });
  }
};
