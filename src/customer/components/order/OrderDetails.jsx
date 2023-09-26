import React from "react";
import AddressCard from "../address-card/AddressCard";
import OrderTaker from "./OrderTaker";
import { Box, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { StarIcon } from "@heroicons/react/24/outline";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const OrderDetails = () => {
  return (
    <div className="px:5 lg:px-20">
      <div className="">
        <h1 className="font-semibold text-lg py-7">Delivery Address</h1>
        <AddressCard />
      </div>
      <div className="py-10">
        <OrderTaker activeStep={3} />
      </div>

      <Grid className="space-y-5" container>
        {[1, 1, 1, 1, 1].map((item) => (
          <Grid
            item
            container
            className="shadow-xl rounded-md p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              <div className="flex items-center space-x-4">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src="https://images.oreillyauto.com/parts/img/medium/category_parttype/07065.jpg"
                  alt=""
                />
                <div className="space-y-2 ml-5">
                  <p className="font-semibold">Product Name</p>
                  <p className="space-x-5 opacity-50 text-xs">
                    <span>Product Family</span>
                  </p>
                  <p>Product Line</p>
                  <p>$125</p>
                </div>
              </div>
            </Grid>

            <Grid item>
              <Box sx={{ color: deepPurple[500] }}>
                <StarBorderIcon sx={{ fontSize: "2rem" }} className="px-2" />
                <span>Rate & Review Product</span>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrderDetails;
