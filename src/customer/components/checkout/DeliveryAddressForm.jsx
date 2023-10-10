import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../State/Order/Action";
import AddressCard from "../address-card/AddressCard";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultShippingAddress = {
    id: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    mobile: "",
  };
  const order = useSelector((store) => store.order);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [shippingAddressLeft, setShippingAddressLeft] = useState(null);

  useEffect(() => {
    const localStorageAddress = localStorage.getItem("address");
    if (localStorageAddress !== null) {
      const unwrappedAddress = JSON.parse(localStorageAddress);
      setShippingAddressLeft(unwrappedAddress.address);
    }
    setShippingAddress(defaultShippingAddress);
  }, []);

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
    localStorage.setItem("address", JSON.stringify(orderData));
  };

  if (shippingAddress === null) {
    return <div></div>;
  }
  return (
    <div>
      <Grid container spacing={4}>
        <Grid
          xs={12}
          lg={5}
          className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll"
        >
          {shippingAddressLeft ? (
            <div className="p-5 py-7 border-b cursor-pointer">
              <AddressCard address={shippingAddressLeft} />
              <Button
                sx={{ mt: 2, bgcolor: "rgb(6, 125, 53)" }}
                size="large"
                variant="contained"
                onClick={() => {
                  const address = shippingAddressLeft;

                  const orderData = { address, navigate };
                  dispatch(createOrder(orderData));
                  // navigate(`/checkout?step=2&order_id=${order?.order?.id}`);
                }}
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
                    onChange={(e) => {
                      const updatedOrder = {
                        ...shippingAddress,
                        firstName: e.target.value,
                      };
                      setShippingAddress(updatedOrder);
                    }}
                    value={shippingAddress.firstName}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    onChange={(e) => {
                      const updatedOrder = {
                        ...shippingAddress,
                        lastName: e.target.value,
                      };
                      setShippingAddress(updatedOrder);
                    }}
                    value={shippingAddress.lastName}
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    onChange={(e) => {
                      const updatedOrder = {
                        ...shippingAddress,
                        streetAddress: e.target.value,
                      };
                      setShippingAddress(updatedOrder);
                    }}
                    value={shippingAddress.streetAddress}
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
                    onChange={(e) => {
                      const updatedOrder = {
                        ...shippingAddress,
                        city: e.target.value,
                      };
                      setShippingAddress(updatedOrder);
                    }}
                    value={shippingAddress.city}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="State"
                    name="State"
                    label="State"
                    fullWidth
                    onChange={(e) => {
                      const updatedOrder = {
                        ...shippingAddress,
                        state: e.target.value,
                      };
                      setShippingAddress(updatedOrder);
                    }}
                    value={shippingAddress.state}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="Zip"
                    name="Zip"
                    label="Zip"
                    fullWidth
                    onChange={(e) => {
                      const updatedOrder = {
                        ...shippingAddress,
                        zip: e.target.value,
                      };
                      setShippingAddress(updatedOrder);
                    }}
                    value={shippingAddress.zip}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    onChange={(e) => {
                      const updatedOrder = {
                        ...shippingAddress,
                        mobile: e.target.value,
                      };
                      setShippingAddress(updatedOrder);
                    }}
                    value={shippingAddress.mobile}
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
