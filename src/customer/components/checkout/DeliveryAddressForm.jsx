import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import AddressCard from "../address-card/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrder } from "../../../State/Order/Action";
import { useNavigate } from "react-router-dom";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((store) => store.order);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("City"),
      state: data.get("State"),
      zip: data.get("Zip"),
      mobile: data.get("phoneNumber"),
    };
    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid
          xs={12}
          lg={5}
          className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll"
        >
          {order?.order?.shippingAddress ? (
            <div className="p-5 py-7 border-b cursor-pointer">
              <AddressCard address={order?.order?.shippingAddress} />
              <Button
                sx={{ mt: 2, bgcolor: "rgb(6, 125, 53)" }}
                size="large"
                variant="contained"
                onClick={() =>
                  navigate(`/checkout?step=2&order_id=${order?.order?.id}`)
                }
              >
                Deliver Here
              </Button>
            </div>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12} lg={7}>
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="address"
                    multiline
                    rows={4}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="City"
                    name="City"
                    label="City"
                    fullWidth
                    autoComplete="City"
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="State"
                    name="State"
                    label="State"
                    fullWidth
                    autoComplete="State"
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="Zip"
                    name="Zip"
                    label="Zip"
                    fullWidth
                    autoComplete="Zip"
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="Phone Number"
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    sx={{ py: 1.5, mt: 2, bgcolor: "rgb(6, 125, 53)" }}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
