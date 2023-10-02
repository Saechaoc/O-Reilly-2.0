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

const initialState = {
  cart: null,
  loading: false,
  error: null,
  cartItems: [],
  cartUpdated: true,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_ITEM_TO_CART_SUCCESS:
      // console.log("In Add to Item cart success", ...state.cartItems);
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.cartItems],
        cart: action.payload,
        loading: false,
        cartUpdated: true,
      };
    case ADD_ITEM_TO_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        cartUpdated: false,
      };
    case GET_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cart: action.payload,
        cartUpdated: false,
        loading: false,
      };
    case GET_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        cartUpdated: false,
      };
    case REMOVE_CART_ITEM_REQUEST:
    case UPDATE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REMOVE_CART_ITEM_SUCCESS:
      // console.log("in remove cart item success");
      return {
        ...state,
        removeCartItem: action.payload,
        // cartItems: action.payload, //working copy
        // cartItems: state.cartItems.filter((item) => item.id !== action.payload),
        cart: action.payload,
        loading: false,
        cartUpdated: true,
      };
    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        // cartItems: state.cartItems.map((item) =>
        //   item.id === action.payload.id ? action.payload : item
        // ),
        updateCartItem: action.payload,
        cart: action.payload,
        cartUpdated: true,
        loading: false,
      };
    case REMOVE_CART_ITEM_FAILURE:
    case UPDATE_CART_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
