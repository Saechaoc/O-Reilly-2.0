import { Button, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import CartQtyContainer from "../../cart-qty/CartQtyContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeCartItem,
  updateCartItem,
} from "../../../State/Cart/Action";
import { useNavigate } from "react-router-dom";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleQuantityChange = (newQuantity) => {
    console.log(cartItem.cartItems);
    const requestBody = {
      id: cartItem.id,
      product: cartItem.product,
      quantity: newQuantity,
      price: cartItem.product?.price,
      userId: userId.id,
    };
    dispatch(updateCartItem(requestBody));
  };

  const handleItemRemoved = () => {
    dispatch(removeCartItem(cartItem));
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

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
          <p className="font-semibold">{cartItem.product?.title}</p>
          <p className="opacity-70">Part # {cartItem.product?.partNumber}</p>
          <p className="opacity-70 mt-2">
            Product Family: {cartItem.product?.productFamily}
          </p>
          <p className="opacity-70 mt-2">
            Product Line: {cartItem.product?.productLine}
          </p>
          <div className="flex space-x-5 items-center text-gray-900 pt-6">
            <p className="font-semibold">
              ${parseFloat(cartItem.product?.price).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="lg:flex items-center lg:space-x-10 pt-6">
        <div className="flex items-center space-x-2">
          <CartQtyContainer
            initialQuantity={cartItem.quantity}
            onQuantityChange={handleQuantityChange}
          />
        </div>
        <div>
          <Button
            className="pt-10"
            sx={{ fontSize: "16px", color: "#067d35" }}
            onClick={handleItemRemoved}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
