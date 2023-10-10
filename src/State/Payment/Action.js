import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILURE,
} from "./ActionType";
import { api } from "../../Config/apiConfig";

export const createPayment = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_REQUEST });
  try {
    //TODO make a unique endpoint for each order
    const { data } = await api.post(
      `/create-payment-intent/${reqData.orderId}`
    );

    if (data.payment_link_url) {
      window.location.href = data.payment_link_url;
    }
    dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message });
  }
};
