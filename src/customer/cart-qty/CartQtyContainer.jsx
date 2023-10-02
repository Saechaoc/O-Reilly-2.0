import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CartQtyContainer = ({ initialQuantity, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    onQuantityChange(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div>
      <section className="flex items-center space-x-4">
        <div>
          <label htmlFor="Quantity" className="sr-only">
            {" "}
            Quantity{" "}
          </label>

          <div className="flex items-center border border-gray-200 rounded">
            <button
              type="button"
              className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
              onClick={handleDecrease}
            >
              -
            </button>

            <input
              type="number"
              id="Quantity"
              value={quantity}
              className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
            />

            <button
              type="button"
              className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartQtyContainer;
