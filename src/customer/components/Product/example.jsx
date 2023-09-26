import React, { useState, useEffect, useCallback } from "react";
import { filters } from "./UniqueFilters";
import { parts } from "../../../data/parts/Parts";
import { filterProducts } from "./filterData";
import PriceFilter from "./PriceFilter";

export default function ProductList() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const applyFilters = useCallback(() => {
    const filteredProducts = filterProducts(
      selectedCategory,
      selectedSubcategory,
      selectedBrand,
      minPrice,
      maxPrice,
      parseFloat(minPrice),
      parseFloat(maxPrice)
    );
    setFilteredProducts(filteredProducts);
  }, [
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
  };

  return (
    <div>
      {/* Brand filter */}
      <select
        onChange={(e) => {
          const selectedValue = e.target.value;
          setSelectedBrand(selectedValue === "all" ? "" : selectedValue);
        }}
        onBlur={applyFilters}
        value={selectedBrand}
      >
        <option value="all">All Brands</option>
        {filters[0].options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => {
          const selectedValue = e.target.value;
          setSelectedCategory(selectedValue === "all" ? "" : selectedValue);
        }}
        onBlur={applyFilters}
        value={selectedCategory}
      >
        <option value="">All Categories</option>
        {filters[1].options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => {
          const selectedValue = e.target.value;
          setSelectedSubcategory(selectedValue === "all" ? "" : selectedValue);
        }}
        onBlur={applyFilters}
        value={selectedSubcategory}
      >
        <option value="all">All Subcategories</option>
        {filters[2].options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <PriceFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={handleMinPriceChange}
        onMaxPriceChange={handleMaxPriceChange}
      />
      {/* Product list */}
      <button onClick={applyFilters}>Apply Filters</button>

      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.title} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
