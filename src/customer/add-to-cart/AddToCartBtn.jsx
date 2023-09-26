import React from "react";
import { useNavigate } from "react-router-dom";

const AddToCartBtn = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        type="submit"
        className="items-center justify-center border-transparent px-8 py-2 text-base font-medium text-white"
        style={{ backgroundColor: "#067d35" }}
        aria-label="Add to Cart"
        onClick={() => navigate("/cart")}
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default AddToCartBtn;
