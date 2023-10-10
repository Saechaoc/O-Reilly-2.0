import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILURE,
} from "./ActionType";
import { api } from "../../Config/apiConfig";

const initialState = {
  error: null,
  loading: false,
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    default:
      return state;
  }
};
