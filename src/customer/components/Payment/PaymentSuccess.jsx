import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOrder } from "../../../State/Order/Action";
import { createPayment } from "../../../State/Payment/Action";
import { Alert, AlertTitle, Grid } from "@mui/material";
import OrderTaker from "../order/OrderTaker";
import CartItem from "../cart/CartItem";

// http://localhost:3000/payment-completed?payment_intent=pi_3Nz028BTp6tbw9GU1qZ2i4n0&payment_intent_client_secret=pi_3Nz028BTp6tbw9GU1qZ2i4n0_secret_ybqPvpvwR2V8l7OjccdozwjRh&redirect_status=succeeded
const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState();
  const [referenceId, setReferenceId] = useState();
  const [paymentStatus, setPaymentStatus] = useState();
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((store) => store.order);

  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);
    setPaymentId(urlParam.get("stripe_payment_id"));
    setPaymentStatus(urlParam.get("stripe_payment_link_status"));
  }, []);

  useEffect(() => {
    const data = { orderId, paymentId };
    dispatch(getOrder(orderId));
    // dispatch(createPayment(data));
  }, []);

  console.log(order?.order?.orderItemList);
  return (
    <div className="px-2 lg:px-36 p-5">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle>Payment Success</AlertTitle>
          Congratulations Your Order is Now Placed
        </Alert>
      </div>
      <OrderTaker activeStep={1}></OrderTaker>
      <Grid
        container
        item
        className="shadow-xl rounded-md p-5"
        sx={{ alignItems: "center" }}
      >
        {order?.order?.orderItemList?.map((item, index) => (
          <Grid item xs={12} key={index}>
            <CartItem cartItem={item} disabled={true} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PaymentSuccess;
