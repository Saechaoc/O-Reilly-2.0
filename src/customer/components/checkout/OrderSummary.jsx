import React, { useEffect } from "react";
import AddressCard from "../address-card/AddressCard";
import CartItem from "../cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";
import { useLocation } from "react-router-dom";
import { getOrder } from "../../../State/Order/Action";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const order = useSelector((store) => store.order);
  const cart = useSelector((store) => store.cart);
  const cartItems = useSelector((store) => store.cart.cartItems);
  const cartUpdated = useSelector((store) => store.cart.cartUpdated);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, cartUpdated, cart.removeCartItem, cart.updateCartItem]);

  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [dispatch, orderId]);

  console.log(order);
  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-md border">
        <AddressCard address={order?.order?.shippingAddress} />
      </div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        {/* Left side of checkout */}
        <div className="col-span-2">
          {cartItems &&
            cartItems
              ?.filter((item) => item !== undefined)
              .map((item) => <CartItem key={item.id} cartItem={item} />)}
        </div>

        {/*Order Summary*/}
        <div className="px-5 top-0 h-[100vh] mt-6">
          <div className="border rounded-lg p-3">
            <button
              className="flex justify-center mt-2 mx-3 rounded-lg text-center"
              style={{
                padding: "0.3rem 6rem",
                backgroundColor: "#067d35",
                color: "white",
                fontSize: "16px",
              }}
              variant="contained"
              type="submit"
              aria-label="Checkout"
            >
              Place your order
            </button>
            <div
              className="separator"
              style={{ borderBottom: "1px solid #ccc", margin: "10px 0" }}
            ></div>
            <p className="font-bold text-xl pb-4">Order Summary</p>

            {/* Row Items */}
            <div className="space-y-2 font-semibold text-sm">
              <div className="flex justify-between text-black">
                <span>
                  Items (
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  ):
                </span>
                <span>
                  $
                  {parseFloat(
                    cart.cart?.totalPrice ? cart.cart?.totalPrice : 0
                  ).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-black">
                <span>Shipping & handling:</span>
                <span>$0.00</span>
              </div>

              <div className="flex justify-between text-black">
                <span>Tax:</span>
                <span>
                  $
                  {parseFloat(
                    cart.cart?.totalPrice ? cart.cart?.totalPrice * 0.1 : 0
                  ).toFixed(2)}
                </span>
              </div>
              <div
                className="separator"
                style={{ borderBottom: "1px solid #ccc", margin: "10px 0" }}
              ></div>

              <div
                className="flex justify-between text-xl"
                style={{ color: "#B12704" }}
              >
                <span>Order total:</span>
                <span className="mb-4">
                  $
                  {parseFloat(
                    cart.cart?.totalPrice ? cart.cart?.totalPrice * 1.1 : 0
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
