import React from "react";

const HomeSectionCard = ({ product }) => {
  return (
    <div
      style={{ height: "22rem" }}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[20rem]"
    >
      <div className="">
        <img
          style={{ height: "10rem" }}
          className="object-cover object-top w-full h-full"
          src={product.image}
          alt=""
        ></img>
      </div>

      <div style={{ paddingTop: "2rem" }} className="p-4 text-center">
        <h3 className="text-lg font-medium text-grey-900">{product.brand}</h3>
        <p className="mt-2 text-sm text-gray-500">{product.description}</p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
