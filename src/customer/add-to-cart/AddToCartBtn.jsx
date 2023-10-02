import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addItemToCart, updateCartItem } from "../../State/Cart/Action";

const AddToCartBtn = ({ quantity, price }) => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user);
  const cartItem = useSelector((store) => store.cart.cartItems);

  const handleAddToCart = async () => {
    const requestBody = {
      pid: params.pid,
      quantity: quantity,
      price: price,
    };

    console.log("data-----", requestBody);
    try {
      await dispatch(addItemToCart(requestBody))
        .then(() => {
          console.log("item added to cart");
          navigate("/cart");
        })
        .catch((error) => {
          console.error("Error adding item to cart:", error);
        });
      console.log("Completed addItemToCart ");
      console.log("Attempting updateCart Item");

      const updateRequest = {
        id: params.pid,
        product: cartItem[0].product,
        quantity: quantity,
        price: price,
        userId: userId.id,
      };
      await dispatch(updateCartItem(updateRequest));
      console.log(cartItem);
    } catch (error) {
      console.error("Error");
    }
  };

  return (
    <div>
      <button
        type="submit"
        className="items-center justify-center border-transparent px-8 py-2 text-base font-medium text-white"
        style={{ backgroundColor: "#067d35" }}
        aria-label="Add to Cart"
        onClick={handleAddToCart}
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default AddToCartBtn;
