import { parts } from "../../../data/parts/Parts";

const uniqueBrands = new Set();
const uniqueCategories = new Set();
const uniqueSubCategories = new Set();

// Extract unique brand names from the parts list
parts.forEach((part) => {
  uniqueBrands.add(part.brand);
  uniqueCategories.add(part.category)
  uniqueSubCategories.add(part.subcategory)
});

// Convert the Set of unique brands into an array
const brandOptions = [...uniqueBrands];
const categoryOptions = [...uniqueCategories];
const subcategoryOptions = [...uniqueSubCategories];

// Create the filter options for "Brand"
const brandFilterOptions = brandOptions.map((brand) => ({
  value: brand,
  label: brand,
  checked: false,
}));

const categoryFilterOptions = categoryOptions.map((category) => ({
  value: category,
  label: category,
  checked: false,
}));
const subcategoryFilterOptions = subcategoryOptions.map((subcategory) => ({
  value: subcategory,
  label: subcategory,
  checked: false,
}));

// Define your filters with the updated "Brand" options
export const filters = [
  {
    id: "brand",
    name: "Brand",
    options: brandFilterOptions,
 },
  {
    id: "category",
    name: "Category",
    options: categoryFilterOptions,
 },
  {
    id: "subcategory",
    name: "Subcategory",
    options: subcategoryFilterOptions,
 },
];