// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ProductCard = ({ product }) => {
//   const navigate = useNavigate();
//   return (
//     <div
//       onClick={() => navigate(`/product/${5}`)}
//       className="productCard w-[15rem] m-3 transition-all cursor-pointer"
//     >
//       <div className="h-[20rem">
//         <img
//           className="h-full w-full object-cover object-left-top"
//           src={product.imageUrl}
//           alt=""
//         />
//         <div className="textPart bg-white p-3">
//           <div>
//             <p className="font-bold opacity-60">{product.brand}</p>
//             <p>{product.title}</p>
//           </div>
//         </div>
//         <div className="flex items-center space-x-2">
//           <p className="font-semibold">${product.price}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { parts as allProducts } from "../../../data/parts/Parts";

const productsPerPage = 12; // Number of products to load per page

export default function ProductCard({ products }) {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // Slice the products array to get the products for the current page
  const currentProducts = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {currentProducts.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <div className="cursor-pointer aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageUrl}
                  alt=""
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                  onClick={() => navigate(`/product/${product.pid}`)}
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                ${product.price}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`${
                currentPage === index + 1
                  ? "bg-indigo-500 text-white"
                  : "text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"
              } px-3 py-1 rounded-md text-sm font-medium mx-1`}
              onClick={() => goToPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
