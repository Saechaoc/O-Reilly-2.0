import { Button, IconButton } from "@mui/material";
import React from "react";
import CartQtyContainer from "../../cart-qty/CartQtyContainer";

const CartItem = () => {
  return (
    <div className="p-5 shadow-lg border rounded-md mt-6">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="flex justify-center items-center w-full h-full object-fill object-top"
            src="https://images.oreillyauto.com/parts/img/large/lis/18980.jpg"
            alt=""
          ></img>
        </div>

        <div className="ml-5 space-y-1">
          <p className="font-semibold">Insert Item Name Here</p>
          <p className="opacity-70">Part # 18980</p>
          <p className="opacity-70 mt-2">Product Line</p>
          <div className="flex space-x-5 items-center text-gray-900 pt-6">
            <p className="font-semibold">$ Price</p>
          </div>
        </div>
      </div>

      <div className="lg:flex items-center lg:space-x-10 pt-6">
        <div className="flex items-center space-x-2">
          <CartQtyContainer />
        </div>
        <div>
          <Button className="pt-10" sx={{ fontSize: "16px", color: "#067d35" }}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
