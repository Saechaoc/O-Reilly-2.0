// export function filterProducts(
//   products,
//   categories = [],
//   subcategories = [],
//   brands = [],
//   minPrice,
//   maxPrice
// ) {
//   if (Array.isArray(products)) {
//     const filteredProducts = products.filter((product) => {
//       const productCategory = product.category.parentCategory
//         ? product.category.parentCategory.name
//         : null;
//       const productSubcategory = product.category.name;

//       return (
//         (categories.length === 0 || categories.includes(productCategory)) &&
//         (subcategories.length === 0 ||
//           subcategories.includes(productSubcategory)) &&
//         (brands.length === 0 ||
//           brands
//             .map((b) => b.toLowerCase())
//             .includes(product.brand.toLowerCase())) &&
//         ((!minPrice && !maxPrice) || // Filter by price range when both min and max are provided
//           (minPrice && !maxPrice && product.price >= minPrice) || // Only min price provided
//           (!minPrice && maxPrice && product.price <= maxPrice) || // Only max price provided
//           (minPrice &&
//             maxPrice &&
//             product.price >= minPrice &&
//             product.price <= maxPrice)) // Both min and max prices provided
//       );
//     });

//     console.log("Filtered products are: ", filteredProducts);
//     return filteredProducts;
//   } else {
//     console.error("Products is not an array:", products);
//   }
// }

export function filterProducts(
  products,
  categories,
  subcategories,
  brands,
  minPrice,
  maxPrice
) {
  return products.filter((product) => {
    const productCategory = product.category.name;
    const productSubcategory = product.category.parentCategory
      ? product.category.parentCategory.name
      : "";

    // console.log("Product Category: " + productCategory);
    // console.log("Product Category: " + productSubcategory);

    const matchesBrand = !brands.length || brands.includes(product.brand);
    const matchesCategory =
      !categories.length || categories.includes(productCategory);
    const matchesSubcategory =
      !subcategories.length || subcategories.includes(productSubcategory);
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    return (
      matchesBrand && matchesCategory && matchesSubcategory && matchesPrice
    );
  });
}
