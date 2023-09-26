// import React, { useEffect } from "react";
// import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
// import { parts } from "../../../data/parts/Parts";

// const PriceFilter = ({
//   open,
//   minPrice,
//   maxPrice,
//   onMinPriceChange,
//   onMaxPriceChange,
// }) => {
//   useEffect(() => {
//     setOriginalMaxPrice(maxPrice); // Store the original maxPrice
//     setMaxPrice(maxPrice); // Set maxPrice to the original value
//   }, []); // Empty dependency array to run this effect only once

//   const originalMaxPrice = parts.reduce(
//     (max, part) => (part.price > max ? part.price : max),
//     0 // Initialize with 0
//   );

//   const setOriginalMaxPrice = (value) => {
//     const originalMaxPrice = parts.reduce(
//       (max, part) => (part.price > max ? part.price : max),
//       0 // Initialize with 0
//     );
//   };
//   const setMaxPrice = (value) => {
//     if (value <= originalMaxPrice) {
//       maxPrice = value;
//     }
//   };
//   return (
//     <div className="space-y-2">
//       <details className="">
//         <summary className="flex w-full items-center justify-between bg-white py-3 text-sm font-medium text-gray-900">
//           <span className="text-sm font-medium"> Price </span>
//           <span className="ml-6 flex items-center text-gray-400 hover:text-gray-500">
//             {open ? (
//               <MinusIcon className="h-5 w-5" aria-hidden="true" />
//             ) : (
//               <PlusIcon className="h-5 w-5" aria-hidden="true" />
//             )}
//           </span>
//         </summary>

//         <div className="border-t border-gray-200 bg-white">
//           <header className="flex items-center justify-between p-4">
//             <span className="text-sm text-gray-700">
//               The highest price is{" "}
//               {maxPrice <= originalMaxPrice ? maxPrice : originalMaxPrice}
//             </span>

//             <button
//               type="button"
//               className="text-sm text-gray-900 underline underline-offset-4"
//             >
//               Reset
//             </button>
//           </header>

//           <div className="border-t border-gray-200 p-4">
//             <div className="flex justify-between gap-4">
//               <label
//                 htmlFor="FilterPriceFrom"
//                 className="flex items-center gap-2"
//               >
//                 <span className="text-sm text-gray-600">$</span>

//                 <input
//                   type="number"
//                   id="FilterPriceFrom"
//                   placeholder="From"
//                   className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
//                   min={0}
//                   value={minPrice}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     if (value <= maxPrice) {
//                       onMinPriceChange(e.target.value);
//                     }
//                   }}
//                 />
//               </label>

//               <label
//                 htmlFor="FilterPriceTo"
//                 className="flex items-center gap-2"
//               >
//                 <span className="text-sm text-gray-600">$</span>

//                 <input
//                   type="number"
//                   id="FilterPriceTo"
//                   placeholder="To"
//                   className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
//                   min={0}
//                   value={maxPrice}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     if (value >= minPrice) {
//                       onMaxPriceChange(e.target.value);
//                     }
//                   }}
//                 />
//               </label>
//             </div>
//           </div>
//         </div>
//       </details>
//     </div>
//   );
// };

// export default PriceFilter;

import React, { useEffect } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { parts } from "../../../data/parts/Parts";

const PriceFilter = ({
  open,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  setMinPrice,
  setMaxPrice,
}) => {
  useEffect(() => {
    setMaxPrice(maxPrice); // Set maxPrice to the original value
  }, []);

  const originalMaxPrice = parts.reduce(
    (max, part) => (part.price > max ? part.price : max),
    0 // Initialize with 0
  );

  return (
    <div className="space-y-2">
      <details className="">
        <summary className="flex w-full items-center justify-between bg-white py-3 text-sm font-medium text-gray-900">
          <span className="text-sm font-medium"> Price </span>
          <span className="ml-6 flex items-center text-gray-400 hover:text-gray-500">
            {open ? (
              <MinusIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </span>
        </summary>

        <div className="border-t border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <span className="text-sm text-gray-700">
              The highest price is{" "}
              {maxPrice && maxPrice <= originalMaxPrice
                ? maxPrice
                : originalMaxPrice}
            </span>

            <button
              type="button"
              className="text-sm text-gray-900 underline underline-offset-4"
              onClick={() => {
                setMinPrice(0);
                setMaxPrice(originalMaxPrice.toString());
              }}
            >
              Reset
            </button>
          </header>

          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between gap-4">
              <label
                htmlFor="FilterPriceFrom"
                className="flex items-center gap-2"
              >
                <span className="text-sm text-gray-600">$</span>

                <input
                  type="number"
                  id="FilterPriceFrom"
                  placeholder="From"
                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  min={0}
                  value={minPrice}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || (value <= maxPrice && value >= 0)) {
                      onMinPriceChange(value);
                    }
                  }}
                />
              </label>

              <label
                htmlFor="FilterPriceTo"
                className="flex items-center gap-2"
              >
                <span className="text-sm text-gray-600">$</span>

                <input
                  type="number"
                  id="FilterPriceTo"
                  placeholder="To"
                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  min={0}
                  value={maxPrice}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || (value >= minPrice && value >= 0)) {
                      onMaxPriceChange(value);
                    }
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};

export default PriceFilter;
